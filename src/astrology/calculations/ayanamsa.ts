import { formatDegree } from './julian';

/**
 * Standard Lahiri (Chitrapaksha) Ayanamsa calculation.
 * Adopted by the Calendar Reform Committee of the Government of India.
 * Value at J2000.0 (JD 2451545.0) is approx 23° 51' 25.53" = 23.857092°
 * Precession rate is approx 50.290966 arcseconds per year.
 */
export function calculateLahiriAyanamsa(jd: number): {
  name: string;
  value: number; // in decimal degrees
  formatted: string;
} {
  const daysSinceJ2000 = jd - 2451545.0;
  const precessionPerDay = (50.290966 / 365.25) / 3600; // in degrees
  const ayanamsa = 23.857092 + daysSinceJ2000 * precessionPerDay;

  return {
    name: 'Lahiri (Chitrapaksha)',
    value: ayanamsa,
    formatted: formatDegree(ayanamsa),
  };
}
