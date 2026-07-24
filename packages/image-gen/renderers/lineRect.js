/**
 * lineRect renderer — lines and filled rectangles on a grid.
 * This is the original algorithm, fully parameterised with no hardcoded values.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W   canvas width
 * @param {number} H   canvas height
 * @param {object} rng seeded RNG instance from createRandom()
 * @param {object} p   params (see defaultParams below)
 */
export function draw(ctx, W, H, rng, p) {
  const cellW = W / p.gridSize;
  const cellH = H / p.gridSize;

  for (let i = 0; i < p.pieceCount; i++) {
    const baseX = rng.int(0, p.gridSize - 1) * cellW;
    const baseY = rng.int(0, p.gridSize - 1) * cellH;

    if (rng.chance(p.lineRatio)) {
      // ── Line ──────────────────────────────────
      const length = rng.range(
        cellW * p.lineLengthMin,
        cellW * p.lineLengthMax
      );
      const angle = rng.int(0, p.angleDivisions - 1) * (Math.PI / 2);
      const x1 = baseX + rng.range(0, cellW * p.scatter);
      const y1 = baseY + rng.range(0, cellH * p.scatter);
      const x2 = x1 + length * Math.cos(angle);
      const y2 = y1 + length * Math.sin(angle) * p.verticalStretch;

      ctx.beginPath();
      ctx.strokeStyle = p.lineColor;
      ctx.lineWidth = rng.range(p.lineWeightMin, p.lineWeightMax);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    } else {
      // ── Filled rectangle ──────────────────────
      const w = rng.range(cellW * p.rectWidthMin, cellW * p.rectWidthMax);
      const h = rng.range(cellH * p.rectHeightMin, cellH * p.rectHeightMax);
      const x = baseX + rng.range(0, cellW * p.scatter * 0.5);
      const y = baseY + rng.range(0, cellH * p.scatter * 0.5);

      ctx.fillStyle = p.rectColor;
      ctx.fillRect(x, y, w, h);
    }
  }
}

export const defaultParams = {
  // Composition
  pieceCount: 60,
  gridSize: 70,
  lineRatio: 0.7,       // 0 = all rects, 1 = all lines
  scatter: 1.7,         // position offset multiplier (0 = snap to grid, 2 = loose)

  // Lines
  lineColor: '#FD7E14',
  lineWeightMin: 1.0,
  lineWeightMax: 1.5,
  lineLengthMin: 0.2,   // as multiple of cellSize
  lineLengthMax: 1.0,
  angleDivisions: 4,    // how many 90° steps to pick from
  verticalStretch: 4,   // y-axis stretch on lines (1 = isotropic)

  // Rectangles
  rectColor: '#FD7E14',
  rectWidthMin: 2,      // as multiple of cellSize
  rectWidthMax: 3,
  rectHeightMin: 0.75,  // as multiple of cellSize
  rectHeightMax: 1.0,
};
