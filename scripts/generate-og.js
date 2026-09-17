/**
 * OG Image Generator Script
 *
 * Uses node-canvas to run generateImg() in a Node.js environment and writes
 * the result to public/og-default.jpg.
 *
 * Usage: node scripts/generate-og.js
 */

import { createCanvas } from 'canvas';
import { generateImg } from '@sedaat/image-gen';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

try {
  const W = 1200;
  const H = 630;

  const canvas = createCanvas(W, H);
  generateImg(canvas);

  const __dirname =
    typeof import.meta.dirname === 'string'
      ? import.meta.dirname
      : dirname(fileURLToPath(import.meta.url));

  const outPath = resolve(__dirname, '../public/og-default.jpg');

  writeFileSync(outPath, canvas.toBuffer('image/jpeg', { quality: 0.9 }));

  console.log(`OG image written to ${outPath}`);
  process.exit(0);
} catch (err) {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
}
