export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export interface BirthDetails {
  id?: string;
  name: string;
  gender?: Gender;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:MM (24-hour)
  placeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: number; // Offset in hours from UTC (e.g. 5.5 for IST)
  createdAt?: string;
  updatedAt?: string;
}

export type PlanetId =
  | 'Ascendant'
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu';

export interface NakshatraInfo {
  index: number; // 1 to 27
  name: string;
  pada: number; // 1 to 4
  lord: string;
}

export interface PlanetPosition {
  id: PlanetId;
  name: string;
  sanskritName: string;
  symbol: string;
  shortCode: string;
  tropicalLongitude: number; // 0 - 360°
  siderealLongitude: number; // 0 - 360°
  sign: number; // 1 to 12 (1 = Aries ... 12 = Pisces)
  signName: string;
  signSanskrit: string;
  signLord: string;
  degreeInSign: number; // 0 - 30°
  degreeFormatted: string; // e.g. 15° 24' 12"
  house: number; // 1 to 12
  nakshatra: NakshatraInfo;
  isRetrograde: boolean;
  isBenefic: boolean;
}

export interface HouseInfo {
  houseNumber: number; // 1 to 12
  sign: number; // 1 to 12
  signName: string;
  signSanskrit: string;
  signLord: string;
  degreeFormatted: string;
  planets: PlanetPosition[];
}

export interface ChartData {
  birthDetails: BirthDetails;
  ascendant: PlanetPosition;
  moonSign: {
    sign: number;
    name: string;
    sanskrit: string;
    lord: string;
  };
  nakshatra: NakshatraInfo;
  planets: PlanetPosition[];
  houses: HouseInfo[];
  ayanamsa: {
    name: string;
    value: number;
    formatted: string;
  };
  julianDate: number;
  localSiderealTime: number;
}

export interface SavedProfileRecord extends BirthDetails {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityData {
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  timezone: number;
}
