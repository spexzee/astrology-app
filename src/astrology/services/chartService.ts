import {
  calculateJulianDay,
  formatDegree,
  normalizeDegrees,
} from '../calculations/julian';
import { calculateLahiriAyanamsa } from '../calculations/ayanamsa';
import { calculateTropicalAscendant } from '../calculations/ascendant';
import { calculateAllTropicalPlanets } from '../calculations/ephemeris';
import { calculateNakshatra } from '../calculations/nakshatras';
import { ZODIAC_SIGNS, PLANET_METADATA } from '../calculations/constants';
import type {
  BirthDetails,
  ChartData,
  HouseInfo,
  PlanetPosition,
} from '../types/chart';

/**
 * Generates complete Vedic Astrology D1 (Rashi) Chart Data from Birth Details.
 */
export function generateBirthChart(details: BirthDetails): ChartData {
  const [yearStr, monthStr, dayStr] = details.dateOfBirth.split('-');
  const [hourStr, minStr] = details.timeOfBirth.split(':');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);

  // 1. Julian Day
  const jd = calculateJulianDay({
    year,
    month,
    day,
    hour,
    minute,
    second: 0,
    timezone: details.timezone,
  });

  // 2. Lahiri Ayanamsa
  const ayanamsa = calculateLahiriAyanamsa(jd);

  // 3. Ascendant / Lagna
  const ascendantResult = calculateTropicalAscendant(
    jd,
    details.latitude,
    details.longitude
  );

  const ascSidereal = normalizeDegrees(
    ascendantResult.tropicalLongitude - ayanamsa.value
  );
  const lagnaSignNumber = Math.floor(ascSidereal / 30) + 1; // 1 - 12
  const lagnaDegreeInSign = ascSidereal % 30;
  const lagnaSignObj = ZODIAC_SIGNS[lagnaSignNumber - 1];
  const lagnaNakshatra = calculateNakshatra(ascSidereal);

  const ascendantPlanet: PlanetPosition = {
    id: 'Ascendant',
    name: 'Ascendant',
    sanskritName: 'Lagna',
    symbol: 'Asc',
    shortCode: 'Asc',
    tropicalLongitude: ascendantResult.tropicalLongitude,
    siderealLongitude: ascSidereal,
    sign: lagnaSignNumber,
    signName: lagnaSignObj.name,
    signSanskrit: lagnaSignObj.sanskrit,
    signLord: lagnaSignObj.lord,
    degreeInSign: lagnaDegreeInSign,
    degreeFormatted: formatDegree(lagnaDegreeInSign),
    house: 1,
    nakshatra: lagnaNakshatra,
    isRetrograde: false,
    isBenefic: true,
  };

  // 4. Calculate Planets
  const rawPlanets = calculateAllTropicalPlanets(jd);

  const planets: PlanetPosition[] = rawPlanets.map((raw) => {
    const sidereal = normalizeDegrees(raw.tropicalLongitude - ayanamsa.value);
    const signNum = Math.floor(sidereal / 30) + 1;
    const degInSign = sidereal % 30;
    const signObj = ZODIAC_SIGNS[signNum - 1];
    const meta = PLANET_METADATA[raw.id];
    const nakshatra = calculateNakshatra(sidereal);

    // Whole sign house: House 1 = Lagna Sign
    const houseNum = ((signNum - lagnaSignNumber + 12) % 12) + 1;

    return {
      id: raw.id,
      name: meta.name,
      sanskritName: meta.sanskritName,
      symbol: meta.symbol,
      shortCode: meta.shortCode,
      tropicalLongitude: raw.tropicalLongitude,
      siderealLongitude: sidereal,
      sign: signNum,
      signName: signObj.name,
      signSanskrit: signObj.sanskrit,
      signLord: signObj.lord,
      degreeInSign: degInSign,
      degreeFormatted: formatDegree(degInSign),
      house: houseNum,
      nakshatra,
      isRetrograde: raw.isRetrograde,
      isBenefic: meta.isBenefic,
    };
  });

  // 5. Construct 12 Houses
  const houses: HouseInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const signNumber = ((lagnaSignNumber + h - 2) % 12) + 1;
    const signObj = ZODIAC_SIGNS[signNumber - 1];
    const planetsInHouse = planets.filter((p) => p.house === h);

    houses.push({
      houseNumber: h,
      sign: signNumber,
      signName: signObj.name,
      signSanskrit: signObj.sanskrit,
      signLord: signObj.lord,
      degreeFormatted: `${(h - 1) * 30}° - ${h * 30}°`,
      planets: planetsInHouse,
    });
  }

  // 6. Moon details
  const moon = planets.find((p) => p.id === 'Moon')!;
  const moonSign = {
    sign: moon.sign,
    name: moon.signName,
    sanskrit: moon.signSanskrit,
    lord: moon.signLord,
  };

  return {
    birthDetails: details,
    ascendant: ascendantPlanet,
    moonSign,
    nakshatra: moon.nakshatra,
    planets,
    houses,
    ayanamsa,
    julianDate: jd,
    localSiderealTime: ascendantResult.lst,
  };
}

/**
 * Validates birth details before generation.
 */
export function validateBirthDetails(details: Partial<BirthDetails>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!details.name || details.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  if (!details.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const parts = details.dateOfBirth.split('-');
    if (parts.length !== 3) {
      errors.dateOfBirth = 'Invalid date format (YYYY-MM-DD)';
    } else {
      const yr = parseInt(parts[0], 10);
      const mo = parseInt(parts[1], 10);
      const da = parseInt(parts[2], 10);
      if (isNaN(yr) || yr < 1800 || yr > 2100 || isNaN(mo) || mo < 1 || mo > 12 || isNaN(da) || da < 1 || da > 31) {
        errors.dateOfBirth = 'Please enter a valid date between 1800 and 2100';
      }
    }
  }

  if (!details.timeOfBirth) {
    errors.timeOfBirth = 'Time of birth is required';
  } else {
    const parts = details.timeOfBirth.split(':');
    if (parts.length < 2) {
      errors.timeOfBirth = 'Invalid time format (HH:MM)';
    } else {
      const hr = parseInt(parts[0], 10);
      const mn = parseInt(parts[1], 10);
      if (isNaN(hr) || hr < 0 || hr > 23 || isNaN(mn) || mn < 0 || mn > 59) {
        errors.timeOfBirth = 'Please enter a valid time (00:00 - 23:59)';
      }
    }
  }

  if (!details.placeOfBirth || details.placeOfBirth.trim().length === 0) {
    errors.placeOfBirth = 'Place of birth is required';
  }

  if (details.latitude === undefined || isNaN(details.latitude) || details.latitude < -90 || details.latitude > 90) {
    errors.latitude = 'Valid latitude between -90 and +90 is required';
  }

  if (details.longitude === undefined || isNaN(details.longitude) || details.longitude < -180 || details.longitude > 180) {
    errors.longitude = 'Valid longitude between -180 and +180 is required';
  }

  if (details.timezone === undefined || isNaN(details.timezone) || details.timezone < -12 || details.timezone > 14) {
    errors.timezone = 'Valid timezone offset between -12 and +14 is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
