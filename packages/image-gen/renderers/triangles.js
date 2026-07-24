/**
 * triangles renderer — equilateral triangles, randomly rotated.
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

    const size = rng.range(p.sizeMin, p.sizeMax);
    // Snap rotation to angleDivisions steps across a full circle
    const angleStep = (Math.PI * 2) / p.angleDivisions;
    const rotation = rng.int(0, p.angleDivisions - 1) * angleStep;

    // Build equilateral triangle points centred at (cx, cy)
    ctx.beginPath();
    for (let v = 0; v < 3; v++) {
      const a = rotation + (v / 3) * Math.PI * 2;
      const px = cx + size * Math.cos(a);
      const py = cy + size * Math.sin(a);
      v === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();

    if (rng.chance(p.fillRatio)) {
      ctx.fillStyle = p.fillColor;
      ctx.globalAlpha = p.fillOpacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (rng.chance(p.strokeRatio)) {
      ctx.strokeStyle = p.strokeColor;
      ctx.lineWidth = p.strokeWeight;
      ctx.stroke();
    }
  }
}

export const defaultParams = {
  pieceCount: 150,
  gridSize: 60,
  scatter: 1.0,

  // Size (in px)
  sizeMin: 4,
  sizeMax: 30,

  // Rotation
  angleDivisions: 6,    // discrete rotation steps across 360°

  // Fill
  fillColor: '#FD7E14',
  fillRatio: 0.6,
  fillOpacity: 0.7,

  // Stroke
  strokeColor: '#FD7E14',
  strokeWeight: 1.0,
  strokeRatio: 0.5,
};
