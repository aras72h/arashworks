/**
 * Seeded pseudo-random number generator (mulberry32 algorithm).
 * Deterministic: same seed always produces the same sequence.
 *
 * @param {number} seed  Integer seed value
 * @returns {{ value, range, int, chance, pick }}
 */
export function createRandom(seed) {
  let s = seed >>> 0;

  function value() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return {
    /** Raw value in [0, 1) */
    value,
    /** Float in [min, max) */
    range(min, max) {
      return min + value() * (max - min);
    },
    /** Integer in [min, max] */
    int(min, max) {
      return Math.floor(min + value() * (max - min + 1));
    },
    /** Returns true with given probability (0–1) */
    chance(prob = 0.5) {
      return value() < prob;
    },
    /** Pick a random element from an array */
    pick(arr) {
      return arr[Math.floor(value() * arr.length)];
    },
  };
}
