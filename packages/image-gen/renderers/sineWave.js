/**
 * sineWave renderer — layered sine waves drawn across the canvas.
 *
 * Each wave is a continuous path from left to right, oscillating
 * vertically. Waves are stacked evenly then scattered by `scatter`.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W
 * @param {number} H
 * @param {object} rng
 * @param {object} p
 */
export function draw(ctx, W, H, rng, p) {
  const waveSpacing = H / (p.waveCount + 1);

  for (let i = 0; i < p.waveCount; i++) {
    // Base y position — evenly spaced with optional scatter
    const baseY = waveSpacing * (i + 1) + rng.range(-waveSpacing * p.scatter, waveSpacing * p.scatter);

    // Each wave gets its own random phase and slight frequency variation
    const phase     = rng.range(0, Math.PI * 2);
    const freqMult  = 1 + rng.range(-p.freqVariance, p.freqVariance);
    const ampMult   = 1 + rng.range(-p.ampVariance, p.ampVariance);
    const freq      = p.frequency * freqMult;
    const amp       = p.amplitude * ampMult;

    // Color per wave — pick from stroke color with optional opacity variation
    ctx.strokeStyle = p.strokeColor;
    ctx.lineWidth   = rng.range(p.strokeWeightMin, p.strokeWeightMax);
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';

    // Build path
    ctx.beginPath();
    let started = false;

    for (let x = 0; x <= W; x += p.step) {
      const t = (x / W) * Math.PI * 2 * freq;
      const y = baseY + Math.sin(t + phase) * amp;

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  }
}

export const defaultParams = {
  waveCount:       20,
  amplitude:       30,       // px — max height of oscillation
  ampVariance:     0.4,      // ±fraction of amplitude per wave
  frequency:       3,        // full cycles across canvas width
  freqVariance:    0.3,      // ±fraction of frequency per wave
  scatter:         0.15,     // fraction of waveSpacing to drift vertically
  step:            2,        // px per path point (lower = smoother)

  strokeColor:     '#FD7E14',
  strokeWeightMin: 0.5,
  strokeWeightMax: 2.0,
};
