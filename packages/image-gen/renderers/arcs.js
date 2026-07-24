/**
 * arcs renderer — partial circles (arcs / curves).
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W
 * @param {number} H
 * @param {object} rng
 * @param {object} p
 */
export function draw(ctx, W, H, rng, p) {
  const cellW = W / p.gridSize;
  const cellH = H / p.gridSize;

  for (let i = 0; i < p.pieceCount; i++) {
    const baseX = rng.int(0, p.gridSize - 1) * cellW;
    const baseY = rng.int(0, p.gridSize - 1) * cellH;
    const cx = baseX + rng.range(0, cellW * p.scatter);
    const cy = baseY + rng.range(0, cellH * p.scatter);

    const radius = rng.range(p.radiusMin, p.radiusMax);
    // Snap start angle to divisions
    const angleStep = (Math.PI * 2) / p.angleDivisions;
    const startAngle = rng.int(0, p.angleDivisions - 1) * angleStep;
    // Sweep is a fraction of a full circle
    const sweep = rng.range(p.sweepMin, p.sweepMax) * Math.PI * 2;
    const ccw = rng.chance(p.ccwRatio);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, startAngle + sweep, ccw);

    if (rng.chance(p.fillRatio)) {
      ctx.fillStyle = p.fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = p.strokeColor;
    ctx.lineWidth = rng.range(p.strokeWeightMin, p.strokeWeightMax);
    ctx.stroke();
  }
}

export const defaultParams = {
  pieceCount: 200,
  gridSize: 70,
  scatter: 1.0,

  // Radius (px)
  radiusMin: 5,
  radiusMax: 40,

  // Sweep (fraction of full circle, 0–1)
  sweepMin: 0.1,
  sweepMax: 0.5,

  // Start angle divisions
  angleDivisions: 8,

  // Direction
  ccwRatio: 0.5,        // probability of counter-clockwise arc

  // Fill
  fillColor: '#FD7E14',
  fillRatio: 0.0,       // 0 = stroke-only by default

  // Stroke
  strokeColor: '#FD7E14',
  strokeWeightMin: 1.0,
  strokeWeightMax: 3.0,
};
