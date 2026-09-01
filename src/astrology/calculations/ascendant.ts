import {
  calculateLST,
  calculateObliquity,
  degToRad,
  radToDeg,
  normalizeDegrees,
} from './julian';

/**
 * Calculates the Tropical Ascendant (Lagna) in degrees [0, 360).
 * Uses standard spherical trigonometry based on Local Sidereal Time and Latitude.
 */
export function calculateTropicalAscendant(
  jd: number,
  latitude: number,
  longitude: number
): { tropicalLongitude: number; lst: number } {
  const lst = calculateLST(jd, longitude);
  const eps = calculateObliquity(jd);

  const lstRad = degToRad(lst);
  const latRad = degToRad(latitude);
  const epsRad = degToRad(eps);

  const y = Math.cos(lstRad);
  const x =
    -Math.sin(lstRad) * Math.cos(epsRad) -
    Math.tan(latRad) * Math.sin(epsRad);

  let ascDeg = radToDeg(Math.atan2(y, x));
  ascDeg = normalizeDegrees(ascDeg);

  return {
    tropicalLongitude: ascDeg,
    lst,
  };
}
