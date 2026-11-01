/**
 * lineRect renderer — lines and filled rectangles on a grid.
 * This is the original algorithm, fully parameterised with no hardcoded values.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W         canvas width
 * @param {number} H         canvas height
 * @param {object} rng       seeded RNG instance from createRandom()
 * @param {object} p         params (see defaultParams below)
 * @param {number} [animTime=0]  elapsed ms since hover start; 0 = static (default)
 */
export function draw(ctx, W, H, rng, p, animTime = 0) {
  const cellW = W / p.gridSize;
  const cellH = H / p.gridSize;

  for (let i = 0; i < p.pieceCount; i++) {
    const baseX = rng.int(0, p.gridSize - 1) * cellW;
    const baseY = rng.int(0, p.gridSize - 1) * cellH;

    // Each piece gets its own speed multiplier (0.5×–1.5× of base speed)
    const speedMult = rng.range(0.5, 1.5);

    if (rng.chance(p.lineRatio)) {
      // ── Line ──────────────────────────────────
      const length = rng.range(
        cellW * p.lineLengthMin,
        cellW * p.lineLengthMax,
      );
      // Lines are always vertical (angle = 90°) so they drift downward naturally
      const angle = Math.PI / 2;
      const x1 = baseX + rng.range(0, cellW * p.scatter);
      const y1Raw = baseY + rng.range(0, cellH * p.scatter);

      // Apply vertical drift with per-piece speed and wrap-around
      const y1 = (((y1Raw + animTime * p.lineSpeedY * speedMult) % H) + H) % H;
      const x2 = x1 + length * Math.cos(angle);
      const y2 = y1 + length * Math.sin(angle) * p.verticalStretch;

      ctx.strokeStyle = p.lineColor;
      ctx.lineWidth = rng.range(p.lineWeightMin, p.lineWeightMax);

      // Draw the line at its wrapped position, and again offset by -H so the
      // clone enters from the top as the original exits through the bottom.
      for (const offsetY of [0, -H]) {
        ctx.beginPath();
        ctx.moveTo(x1, y1 + offsetY);
        ctx.lineTo(x2, y2 + offsetY);
        ctx.stroke();
      }
    } else {
      // ── Filled rectangle ──────────────────────
      const w = rng.range(cellW * p.rectWidthMin, cellW * p.rectWidthMax);
      const h = rng.range(cellH * p.rectHeightMin, cellH * p.rectHeightMax);
      const xRaw = baseX + rng.range(0, cellW * p.scatter * 0.5);
      const y = baseY + rng.range(0, cellH * p.scatter * 0.5);

      // Apply horizontal drift with per-piece speed and wrap-around
      const x = (((xRaw + animTime * p.rectSpeedX * speedMult) % W) + W) % W;

      ctx.fillStyle = p.rectColor;

      // Draw the rect at its wrapped position, and again offset by -W so the
      // clone enters from the left as the original exits through the right.
      for (const offsetX of [0, -W]) {
        ctx.fillRect(x + offsetX, y, w, h);
      }
    }
  }
}

export const defaultParams = {
  // Composition
  pieceCount: 40,
  gridSize: 65,
  lineRatio: 0.5, // 0 = all rects, 1 = all lines
  scatter: 1.7, // position offset multiplier (0 = snap to grid, 2 = loose)

  // Animation speeds (px per ms)
  rectSpeedX: 0.02, // horizontal drift speed for rectangles
  lineSpeedY: 0.02, // vertical drift speed for lines

  // Lines
  lineColor: "#FD7E14",
  lineWeightMin: 1.0,
  lineWeightMax: 1.5,
  lineLengthMin: 0.23, // as multiple of cellSize (+15%)
  lineLengthMax: 0.8,
  angleDivisions: 4, // how many 90° steps to pick from
  verticalStretch: 4, // y-axis stretch on lines (1 = isotropic)

  // Rectangles
  rectColor: "#FD7E14",
  rectWidthMin: 2.3, // as multiple of cellSize (+15%)
  rectWidthMax: 3.45,
  rectHeightMin: 0.86, // as multiple of cellSize (+15%)
  rectHeightMax: 1.15,
};
