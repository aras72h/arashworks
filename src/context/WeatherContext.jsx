import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSeason } from '../data/seasonThemes.js';
import { computeCssTokens, computeArtParams } from '../utils/weatherToTheme.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const OPEN_METEO_URL =
  'https://api.open-meteo.com/v1/forecast' +
  '?latitude=35.6892&longitude=51.3890' +
  '&current=temperature_2m,cloud_cover,wind_speed_10m,precipitation' +
  '&forecast_days=1';

const FALLBACK_ART_PARAMS = {
  lineColor:  '#FD7E14',
  rectColor:  '#FD7E14',
  opacity:    1.0,
  rectSpeedX: 0.04,
  lineSpeedY: 0.04,
  pieceCount: 60,
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const WeatherContext = createContext({
  season:        'fall',
  weatherStatus: 'loading',
  artParams:     FALLBACK_ART_PARAMS,
});

// ---------------------------------------------------------------------------
// Convenience hook
// ---------------------------------------------------------------------------

export function useWeather() {
  return useContext(WeatherContext);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Write a flat token map as CSS custom properties onto <html>.
 * Guarded for SSR / no-window environments.
 */
function applyTokens(tokens) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

/**
 * Fetch current Tehran weather from Open-Meteo with a 3-second timeout.
 * Returns `json.current` on success, or `null` on any failure.
 */
async function fetchWeather() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res  = await fetch(OPEN_METEO_URL, { signal: controller.signal });
    const json = await res.json();
    return json.current ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// WeatherProvider
// ---------------------------------------------------------------------------

export function WeatherProvider({ children }) {
  // Detect season and apply its base tokens synchronously so the page never
  // starts with the wrong palette — no flash, no gap.
  const season = getCurrentSeason();
  const [state, setState] = useState(() => {
    const fallbackArt = computeArtParams(season, null);
    // Write CSS vars immediately (sync) before first paint
    if (typeof window !== 'undefined') {
      const tokens = computeCssTokens(season, null);
      const root = document.documentElement;
      Object.entries(tokens).forEach(([key, val]) => root.style.setProperty(key, val));
    }
    return { season, weatherStatus: 'loading', artParams: fallbackArt };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      const result = await fetchWeather();
      const tokens = computeCssTokens(season, result);
      const art    = computeArtParams(season, result);
      applyTokens(tokens);
      setState({ season, weatherStatus: result ? 'ok' : 'fallback', artParams: art });
    })();
  }, []); // runs exactly once on mount

  return (
    <WeatherContext.Provider value={state}>
      {children}
    </WeatherContext.Provider>
  );
}
