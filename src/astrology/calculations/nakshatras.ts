import { NAKSHATRAS } from './constants';
import type { NakshatraInfo } from '../types/chart';
import { normalizeDegrees } from './julian';

const NAKSHATRA_SPAN = 360 / 27; // 13.333333° (13° 20')
const PADA_SPAN = NAKSHATRA_SPAN / 4; // 3.333333° (3° 20')

/**
 * Calculates Nakshatra, Pada and Lord for a given sidereal longitude.
 */
export function calculateNakshatra(siderealLongitude: number): NakshatraInfo {
  const normDeg = normalizeDegrees(siderealLongitude);
  const nakshatraIndex = Math.floor(normDeg / NAKSHATRA_SPAN); // 0 - 26
  const remDeg = normDeg % NAKSHATRA_SPAN;
  const pada = Math.floor(remDeg / PADA_SPAN) + 1; // 1 - 4

  const item = NAKSHATRAS[nakshatraIndex % 27];

  return {
    index: item.index,
    name: item.name,
    pada,
    lord: item.lord,
  };
}
