/**
 * Season palette token sets and season detection for Tehran meteorological boundaries.
 * No imports, no side effects — pure data and a pure function.
 */

export const seasonThemes = {
  fall: {
    '--primary':          '#FD7E14',
    '--background':       '#F9F4ED',
    '--border':           '#E8DDCE',
    '--muted':            '#E8DDCE',
    '--card':             '#FFFFFF',
    '--foreground':       '#2C1A0E',
    '--muted-foreground': '#576076',
  },
  winter: {
    '--primary':          '#7B94B5',
    '--background':       '#F0F2F6',
    '--border':           '#C8D4E3',
    '--muted':            '#DCE4EF',
    '--card':             '#F7F9FC',
    '--foreground':       '#1A2030',
    '--muted-foreground': '#4A5878',
  },
  spring: {
    '--primary':          '#6B9E78',
    '--background':       '#F2F5EF',
    '--border':           '#C5D9C8',
    '--muted':            '#D5E8D8',
    '--card':             '#F7FAF7',
    '--foreground':       '#0E2010',
    '--muted-foreground': '#4A6858',
  },
  summer: {
    '--primary':          '#E8A020',
    '--background':       '#FDF8EC',
    '--border':           '#EFE0BB',
    '--muted':            '#F2E4C0',
    '--card':             '#FFFDF5',
    '--foreground':       '#2A1800',
    '--muted-foreground': '#705830',
  },
};

/**
 * Returns the meteorological season for Tehran based on the given date.
 * Uses month boundaries only (day-of-month granularity is not required by the spec).
 *
 * @param {Date} date - defaults to today
 * @returns {'fall' | 'winter' | 'spring' | 'summer'}
 */
export function getCurrentSeason(date = new Date()) {
  const m = date.getMonth() + 1; // 1-based month

  if (m >= 9 && m <= 11) return 'fall';    // Sep–Nov
  if (m === 12 || m <= 2) return 'winter'; // Dec–Feb
  if (m >= 3 && m <= 5)  return 'spring';  // Mar–May
  return 'summer';                          // Jun–Aug
}
