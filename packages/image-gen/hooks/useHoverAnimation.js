import { useEffect, useRef } from 'react';
import { generateImg } from '../generateImg.js';

/**
 * Manages animation for a generative canvas thumbnail.
 *
 * - Desktop (hover device): animation plays on mouseenter, pauses on mouseleave.
 * - Mobile (touch device):  animation plays when the card scrolls into view,
 *   pauses when it scrolls out. Uses IntersectionObserver.
 *
 * The observer is set up inside the same effect as the canvas draw so it is
 * guaranteed to fire only after the canvas is ready — this fixes the bug where
 * already-visible cards on page load never started animating.
 *
 * @param {object} [config={}]
 * @param {string}  [config.renderer='lineRect']  Renderer name
 * @param {number}  [config.seed]                 RNG seed; stable random if omitted
 * @param {object}  [config.options={}]           Renderer-specific style params
 * @returns {{ canvasRef, containerRef, handlers }}
 */
export function useHoverAnimation({ renderer, seed, options = {} } = {}) {
  /** The <canvas> element. */
  const canvasRef = useRef(null);

  /** The container div — watched by IntersectionObserver on touch devices. */
  const containerRef = useRef(null);

  /** ImageData captured at mount (animTime = 0). */
  const staticSnapshotRef = useRef(null);

  /** Current requestAnimationFrame handle. */
  const rafIdRef = useRef(null);

  /** Whether the animation loop is currently running. */
  const isRunningRef = useRef(false);

  /** rAF timestamp when the current play session started. */
  const animStartTimeRef = useRef(null);

  /** Total animTime accumulated from all previous play sessions. */
  const animOffsetRef = useRef(0);

  /** Stable seed — set once on first draw, never changed. */
  const stableSeedRef = useRef(null);

  /** Serialized options from the previous effect run, used to skip redundant redraws. */
  const prevOptionsKeyRef = useRef(null);

  // ── Shared start / stop ─────────────────────────────────────────────────────

  function startLoop() {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Prevent duplicate loops
    if (isRunningRef.current) return;

    cancelAnimationFrame(rafIdRef.current);
    isRunningRef.current = true;
    animStartTimeRef.current = null;

    function loop(timestamp) {
      if (!isRunningRef.current) return;

      if (animStartTimeRef.current === null) {
        animStartTimeRef.current = timestamp;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const animTime = animOffsetRef.current + (timestamp - animStartTimeRef.current);

      generateImg(canvas, {
        renderer: renderer || 'lineRect',
        seed: stableSeedRef.current,
        animTime,
        ...options,
      });

      rafIdRef.current = requestAnimationFrame(loop);
    }

    rafIdRef.current = requestAnimationFrame(loop);
  }

  function stopLoop() {
    // Save elapsed time so the next session continues from this position
    if (animStartTimeRef.current !== null) {
      animOffsetRef.current += performance.now() - animStartTimeRef.current;
      animStartTimeRef.current = null;
    }
    isRunningRef.current = false;
    cancelAnimationFrame(rafIdRef.current);
  }

  // ── Mount / options-change effect ───────────────────────────────────────────
  // The IntersectionObserver is set up here (not in a separate effect) so it is
  // guaranteed to run after the canvas is drawn and ready.
  useEffect(() => {
    const optionsKey = JSON.stringify(options);
    if (prevOptionsKeyRef.current === optionsKey && staticSnapshotRef.current !== null) return;
    prevOptionsKeyRef.current = optionsKey;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (stableSeedRef.current === null) {
      stableSeedRef.current = seed !== undefined ? seed : Math.floor(Math.random() * 2 ** 32);
    }

    canvas.width = 800;
    canvas.height = 400;
    generateImg(canvas, {
      renderer: renderer || 'lineRect',
      seed: stableSeedRef.current,
      animTime: 0,
      ...options,
    });

    const ctx = canvas.getContext('2d');
    staticSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Set up IntersectionObserver for touch devices — canvas is ready at this point
    let observer = null;
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      const container = containerRef.current;
      if (container) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              startLoop();
            } else {
              stopLoop();
            }
          },
          { threshold: 0.3 }
        );
        // observe() fires immediately with current visibility state —
        // so already-visible cards on page load get startLoop() called right away
        observer.observe(container);
      }
    }

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      staticSnapshotRef.current = null;
      observer?.disconnect();
    };
  }, [JSON.stringify(options)]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hover handlers for desktop ──────────────────────────────────────────────
  // On touch devices these are an empty object so no hover listeners are attached.
  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handlers = isTouchDevice
    ? {}
    : {
        onMouseEnter: startLoop,
        onMouseLeave: stopLoop,
      };

  return { canvasRef, containerRef, handlers };
}
