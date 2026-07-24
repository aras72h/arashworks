/**
 * dots renderer — scattered circles, optionally filled or stroked.
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

    // Radius varies per dot; large dots are rarer when sizeSkew > 1
    const t = Math.pow(rng.value(), p.sizeSkew);
    const radius = p.radiusMin + t * (p.radiusMax - p.radiusMin);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);

    if (p.fillRatio > 0 && rng.chance(p.fillRatio)) {
      ctx.fillStyle = p.fillColor;
      ctx.fill();
    }

    if (p.strokeRatio > 0 && rng.chance(p.strokeRatio)) {
      ctx.strokeStyle = p.strokeColor;
      ctx.lineWidth = p.strokeWeight;
      ctx.stroke();
    }
  }
}

export const defaultParams = {
  pieceCount: 300,
  gridSize: 80,
  scatter: 1.0,

  // Size
  radiusMin: 2,
  radiusMax: 20,
  sizeSkew: 2,          // >1 = more small dots, <1 = more large dots

  // Fill
  fillColor: '#FD7E14',
  fillRatio: 0.7,       // probability a given dot is filled

  // Stroke
  strokeColor: '#FD7E14',
  strokeWeight: 1.0,
  strokeRatio: 0.4,     // probability a given dot is stroked
};
