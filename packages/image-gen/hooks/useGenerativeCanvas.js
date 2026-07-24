import { useRef, useEffect } from 'react';
import { generateImg } from '../generateImg.js';

/**
 * Attaches generative canvas art to a <canvas> ref on mount.
 *
 * @param {object} [options={}]
 * @param {string} [options.bgColor]
 * @param {string} [options.strokeColor]
 * @param {number} [options.pieceCount]
 * @returns {{ ref: React.RefObject<HTMLCanvasElement> }}
 */
export function useGenerativeCanvas(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) generateImg(ref.current, options);
  }, []);
  return { ref };
}
