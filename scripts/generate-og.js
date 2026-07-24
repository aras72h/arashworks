/**
 * OG Image Generator Script
 *
 * Uses node-canvas to run generateImg() in a Node.js environment and writes
 * the result to apps/web/public/og-default.jpg.
 *
 * Usage: node scripts/generate-og.js
 * Requirements: 8.1, 8.3, 8.4, 8.5
 */

import { createCanvas } from 'canvas';
import { generateImg } from '@sedaat/image-gen';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

try {
  const W = 1200;
  const H = 630;

  // Create a node-canvas instance — same Canvas 2D API surface as the browser
  const canvas = createCanvas(W, H);

  // Draw the generative art onto the canvas
  generateImg(canvas);

  // Resolve output path relative to this script's location so it works
  // regardless of the cwd from which the script is invoked.
  // import.meta.dirname requires Node 20.11+/22+; fall back to fileURLToPath
  // for older Node versions.
  const __dirname =
    typeof import.meta.dirname === 'string'
      ? import.meta.dirname
      : dirname(fileURLToPath(import.meta.url));

  const outPath = resolve(__dirname, '../../web/public/og-default.jpg');

  writeFileSync(outPath, canvas.toBuffer('image/jpeg', { quality: 0.9 }));

  console.log(`OG image written to ${outPath}`);
  process.exit(0);
} catch (err) {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
}
