// Feature: portfolio-integration, Property 5
// Validates: Requirements 7.2, 7.3, 7.4

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { createCanvas } from 'canvas';
import { generateImg } from '@sedaat/image-gen';

describe('generateImg', () => {
  it('should not throw when called with null', () => {
    expect(() => generateImg(null)).not.toThrow();
  });

  it('should not throw when called with undefined', () => {
    expect(() => generateImg(undefined)).not.toThrow();
  });

  it('Property 5: background pixel (0,0) is #F9F4ED and at least one pixel is #FD7E14 for any valid canvas size', () => {
    fc.assert(
      fc.property(
        fc.record({
          width: fc.integer({ min: 100, max: 1200 }),
          height: fc.integer({ min: 100, max: 800 }),
        }),
        ({ width, height }) => {
          const canvas = createCanvas(width, height);

          // Should not throw
          expect(() => generateImg(canvas)).not.toThrow();

          const ctx = canvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data; // flat [R, G, B, A, R, G, B, A, ...]

          // Assert pixel at (0,0) is background color #F9F4ED = rgb(249, 244, 237)
          const bgR = data[0];
          const bgG = data[1];
          const bgB = data[2];
          expect(bgR).toBe(249);
          expect(bgG).toBe(244);
          expect(bgB).toBe(237);

          // Assert at least one pixel in the canvas is foreground color #FD7E14 = rgb(253, 126, 20)
          const totalPixels = width * height;
          let foundForeground = false;
          for (let i = 0; i < totalPixels; i++) {
            const r = data[i * 4];
            const g = data[i * 4 + 1];
            const b = data[i * 4 + 2];
            if (r === 253 && g === 126 && b === 20) {
              foundForeground = true;
              break;
            }
          }
          expect(foundForeground).toBe(true);
        }
      ),
      { numRuns: 50 }
    );
  });
});
