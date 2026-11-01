/**
 * Pure utility functions for deriving CSS tokens and art parameters
 * from season palette data and live weather API data.
 *
 * All three exports are side-effect-free: same input always yields the same output,
 * and no input objects are mutated.
 */

import { seasonThemes } from '../data/seasonThemes.js';

// ---------------------------------------------------------------------------
// blendHex
// ---------------------------------------------------------------------------

/**
 * Linearly interpolate between two #RRGGBB hex colors.
 *
 * @param {string} hex1 - source color, e.g. '#F9F4ED'
 * @param {string} hex2 - target color, e.g. '#A8C0D0'
 * @param {number} t    - blend factor in [0.0, 1.0]  (0 = hex1, 1 = hex2)
 * @returns {string} interpolated color as '#RRGGBB'
 */
export function blendHex(hex1, hex2, t) {
  const parse = (hex) => {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };

  const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');

  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);

  const r = r1 + (r2 - r1) * t;
  const g = g1 + (g2 - g1) * t;
  const b = b1 + (b2 - b1) * t;

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ---------------------------------------------------------------------------
// computeCssTokens
// ---------------------------------------------------------------------------

/**
 * Derives the full set of 7 CSS custom-property values for the given season,
 * optionally modulated by live weather data (rain tint only).
 *
 * Text tokens (--foreground, --muted-foreground) are never modified.
 *
 * @param {'fall'|'winter'|'spring'|'summer'} season
 * @param {object|null|undefined} weatherData - shape: { precipitation, ... }
 * @returns {{ [cssVar: string]: string }} flat object with all 7 CSS var keys
 */
export function computeCssTokens(season, weatherData) {
  // Shallow copy — never mutate the original palette
  const tokens = { ...seasonThemes[season] };

  // No weather data → return base season palette as-is
  if (weatherData == null) return tokens;

  // Rain tint: blend --background, --border, --muted 15% toward cool blue-gray
  if (weatherData.precipitation > 0) {
    const RAIN_COLOR = '#A8C0D0';
    const RAIN_BLEND = 0.15;

    tokens['--background'] = blendHex(tokens['--background'], RAIN_COLOR, RAIN_BLEND);
    tokens['--border']     = blendHex(tokens['--border'],     RAIN_COLOR, RAIN_BLEND);
    tokens['--muted']      = blendHex(tokens['--muted'],      RAIN_COLOR, RAIN_BLEND);
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// computeArtParams
// ---------------------------------------------------------------------------

/**
 * Derives generative-art parameters for the given season and weather conditions.
 *
 * Modulation rules (applied only when weatherData is not null):
 *   - opacity   : 1.0 − (cloudCover / 100) × 0.45        (range 0.55–1.0)
 *   - speed     : 0.02 + (clamp(wind, 0, 60) / 60) × 0.10 (range 0.02–0.12 px/ms)
 *   - pieceCount: 72 if precipitation > 0, else 60
 *
 * Fallback (weatherData null): opacity 1.0, speed 0.04, pieceCount 60.
 *
 * @param {'fall'|'winter'|'spring'|'summer'} season
 * @param {object|null|undefined} weatherData
 * @returns {{ lineColor: string, rectColor: string, opacity: number,
 *             rectSpeedX: number, lineSpeedY: number, pieceCount: number }}
 */
export function computeArtParams(season, weatherData) {
  const primary = seasonThemes[season]['--primary'];

  if (weatherData == null) {
    return {
      lineColor:  primary,
      rectColor:  primary,
      opacity:    1.0,
      rectSpeedX: 0.02,
      lineSpeedY: 0.02,
      pieceCount: 60,
    };
  }

  const cloudCover = weatherData.cloud_cover     ?? 0;
  const wind       = weatherData.wind_speed_10m  ?? 0;
  const precip     = weatherData.precipitation   ?? 0;

  const opacity    = 1.0 - (cloudCover / 100) * 0.45;
  const speed      = 0.02 + (Math.min(Math.max(wind, 0), 60) / 60) * 0.06; // calm=0.02, windy=0.08
  const pieceCount = 60;

  return {
    lineColor:  primary,
    rectColor:  primary,
    opacity,
    rectSpeedX: speed,
    lineSpeedY: speed,
    pieceCount,
  };
}
