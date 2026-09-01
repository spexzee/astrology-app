/**
 * Astronomical time and coordinate conversions based on standard astronomical algorithms (Jean Meeus).
 */

export interface DateTimeParams {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  second?: number; // 0-59
  timezone: number; // Offset in hours from UTC (e.g. 5.5 for IST)
}

/**
 * Calculates Julian Day number for a given UTC date and time.
 */
export function calculateJulianDay(params: DateTimeParams): number {
  const { year, month, day, hour, minute, second = 0, timezone } = params;

  // Convert local time to UTC decimal hours
  const localDecimalHours = hour + minute / 60 + second / 3600;
  const utcDecimalHours = localDecimalHours - timezone;

  let y = year;
  let m = month;

  // Day fraction in UTC
  let d = day + utcDecimalHours / 24;

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    b -
    1524.5;

  return jd;
}

/**
 * Julian Centuries from J2000.0 (JD 2451545.0)
 */
export function julianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Normalizes an angle to 0 - 360 degrees.
 */
export function normalizeDegrees(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Degrees to radians.
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Radians to degrees.
 */
export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Greenwich Mean Sidereal Time (GMST) in degrees.
 */
export function calculateGMST(jd: number): number {
  const T = julianCenturies(jd);
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  return normalizeDegrees(gmst);
}

/**
 * Local Sidereal Time (LST) in degrees for a given longitude.
 * East longitude is positive.
 */
export function calculateLST(jd: number, longitude: number): number {
  const gmst = calculateGMST(jd);
  return normalizeDegrees(gmst + longitude);
}

/**
 * Mean Obliquity of the Ecliptic (in degrees).
 */
export function calculateObliquity(jd: number): number {
  const T = julianCenturies(jd);
  const eps =
    23.43929111 -
    0.013004167 * T -
    0.000000164 * T * T +
    0.000000504 * T * T * T;
  return eps;
}

/**
 * Formats a decimal degree into degrees, minutes, seconds string.
 * Example: 15.4033 -> "15° 24' 12\""
 */
export function formatDegree(decimalDeg: number): string {
  const totalSeconds = Math.round(decimalDeg * 3600);
  const deg = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = totalSeconds % 60;
  return `${deg}° ${min.toString().padStart(2, '0')}' ${sec.toString().padStart(2, '0')}"`;
}
