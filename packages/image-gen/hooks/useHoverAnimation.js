import { useEffect, useRef } from 'react';
import { generateImg } from '../generateImg.js';

/**
 * Manages animation for a generative canvas thumbnail.
 *
 * - Desktop (hover device): animation plays on mouseenter, pauses on mouseleave.
 * - Mobile (touch device):  animation plays when the card scrolls into view,
 *   pauses when it scrolls out. Uses IntersectionObserver.
 */
export function useHoverAnimation({ renderer, seed, options = {} } = {}) {
  const canvasRef        = useRef(null);
  const containerRef     = useRef(null);
  const staticSnapshotRef = useRef(null);
  const rafIdRef         = useRef(null);
  const isRunningRef     = useRef(false);
  const animStartTimeRef = useRef(null);
  const animOffsetRef    = useRef(0);
  const stableSeedRef    = useRef(null);
  const prevOptionsKeyRef = useRef(null);

  // Keep latest renderer/options in refs so the rAF loop and observer
  // callbacks always use current values without needing to be recreated.
  const rendererRef = useRef(renderer);
  const optionsRef  = useRef(options);
  useEffect(() => {
    rendererRef.current = renderer;
    optionsRef.current  = options;
  });

  // ── Shared start / stop (stable — never recreated) ──────────────────────────

  const startLoopRef = useRef(null);
  const stopLoopRef  = useRef(null);

  if (startLoopRef.current === null) {
    startLoopRef.current = function startLoop() {
      if (typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (isRunningRef.current) return;

      cancelAnimationFrame(rafIdRef.current);
      isRunningRef.current   = true;
      animStartTimeRef.current = null;

      function loop(timestamp) {
        if (!isRunningRef.current) return;
        if (animStartTimeRef.current === null) animStartTimeRef.current = timestamp;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const animTime = animOffsetRef.current + (timestamp - animStartTimeRef.current);

        generateImg(canvas, {
          renderer: rendererRef.current || 'lineRect',
          seed: stableSeedRef.current,
          animTime,
          ...optionsRef.current,
        });

        rafIdRef.current = requestAnimationFrame(loop);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };
  }

  if (stopLoopRef.current === null) {
    stopLoopRef.current = function stopLoop() {
      if (animStartTimeRef.current !== null) {
        animOffsetRef.current += performance.now() - animStartTimeRef.current;
        animStartTimeRef.current = null;
      }
      isRunningRef.current = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }

  const startLoop = startLoopRef.current;
  const stopLoop  = stopLoopRef.current;

  // ── Canvas draw effect (re-runs when options change) ────────────────────────
  useEffect(() => {
    const optionsKey = JSON.stringify(options);
    if (prevOptionsKeyRef.current === optionsKey && staticSnapshotRef.current !== null) return;
    prevOptionsKeyRef.current = optionsKey;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (stableSeedRef.current === null) {
      stableSeedRef.current = seed !== undefined ? seed : Math.floor(Math.random() * 2 ** 32);
    }

    canvas.width  = 800;
    canvas.height = 400;
    generateImg(canvas, {
      renderer: renderer || 'lineRect',
      seed: stableSeedRef.current,
      animTime: 0,
      ...options,
    });

    const ctx = canvas.getContext('2d');
    staticSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      staticSnapshotRef.current = null;
    };
  }, [JSON.stringify(options)]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── IntersectionObserver (set up once, never recreated) ─────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: none)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []); // runs once — startLoop/stopLoop are stable refs, no need to re-run

  // ── Hover handlers for desktop ──────────────────────────────────────────────
  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handlers = isTouchDevice
    ? {}
    : { onMouseEnter: startLoop, onMouseLeave: stopLoop };

  return { canvasRef, containerRef, handlers };
}
