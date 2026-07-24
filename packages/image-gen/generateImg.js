import { createRandom } from './random.js';
import * as lineRect  from './renderers/lineRect.js';
import * as dots      from './renderers/dots.js';
import * as triangles from './renderers/triangles.js';
import * as arcs      from './renderers/arcs.js';
import * as sineWave  from './renderers/sineWave.js';

export const RENDERERS = {
  lineRect,
  dots,
  triangles,
  arcs,
  sineWave,
};

/**
 * Returns the default params for a given renderer, merged with shared defaults.
 * @param {string} rendererName
 * @returns {object}
 */
export function getDefaultParams(rendererName) {
  const renderer = RENDERERS[rendererName];
  if (!renderer) throw new Error(`Unknown renderer: "${rendererName}"`);
  return {
    renderer: rendererName,
    bgColor: '#F9F4ED',
    opacity: 1,
    seed: 42,
    ...renderer.defaultParams,
  };
}

/**
 * Draws generative art onto a canvas element.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 * @param {string} [options.renderer='lineRect']  Which renderer to use
 * @param {string} [options.bgColor='#F9F4ED']    Background colour
 * @param {number} [options.opacity=1]            Global opacity for shapes
 * @param {number} [options.seed]                 RNG seed (omit for random)
 * @param {...*}                                  Renderer-specific params
 */
export function generateImg(canvas, options = {}) {
  if (!canvas || !canvas.getContext) return;

  const { renderer: rendererName = 'lineRect', bgColor = '#F9F4ED', opacity = 1, seed, ...params } = options;

  const renderer = RENDERERS[rendererName];
  if (!renderer) {
    console.error(`[image-gen] Unknown renderer "${rendererName}", falling back to lineRect.`);
    return generateImg(canvas, { ...options, renderer: 'lineRect' });
  }

  const rng = createRandom(
    seed !== undefined ? seed : Math.floor(Math.random() * 2 ** 32)
  );

  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Fill background
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);

  // Draw shapes
  ctx.globalAlpha = opacity;
  renderer.draw(ctx, W, H, rng, { ...renderer.defaultParams, ...params });
  ctx.globalAlpha = 1;

  // Guarantee pixel (0,0) is always background colour
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 1, 1);
}
