import type { CityData } from '../astrology/types/chart';

export const POPULAR_CITIES: CityData[] = [
  // ==========================================
  // KARNATAKA — ALL DISTRICTS & MAJOR TALUKS/CITIES
  // ==========================================
  
  // Bengaluru Urban & Rural
  { city: 'Bengaluru (Bangalore)', state: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 5.5 },
  { city: 'Yelahanka', state: 'Karnataka', country: 'India', lat: 13.1007, lng: 77.5963, timezone: 5.5 },
  { city: 'K.R. Puram', state: 'Karnataka', country: 'India', lat: 13.0075, lng: 77.6959, timezone: 5.5 },
  { city: 'Anekal', state: 'Karnataka', country: 'India', lat: 12.7107, lng: 77.6974, timezone: 5.5 },
  { city: 'Electronics City', state: 'Karnataka', country: 'India', lat: 12.8452, lng: 77.6602, timezone: 5.5 },
  { city: 'Whitefield', state: 'Karnataka', country: 'India', lat: 12.9698, lng: 77.75, timezone: 5.5 },
  { city: 'Nelamangala', state: 'Karnataka', country: 'India', lat: 13.0984, lng: 77.3918, timezone: 5.5 },
  { city: 'Doddaballapura', state: 'Karnataka', country: 'India', lat: 13.2929, lng: 77.5434, timezone: 5.5 },
  { city: 'Hoskote', state: 'Karnataka', country: 'India', lat: 13.0709, lng: 77.7981, timezone: 5.5 },
  { city: 'Devanahalli', state: 'Karnataka', country: 'India', lat: 13.2483, lng: 77.7126, timezone: 5.5 },

  // Mysuru (Mysore) District
  { city: 'Mysuru (Mysore)', state: 'Karnataka', country: 'India', lat: 12.2958, lng: 76.6394, timezone: 5.5 },
  { city: 'Nanjangud', state: 'Karnataka', country: 'India', lat: 12.1186, lng: 76.6806, timezone: 5.5 },
  { city: 'Hunsur', state: 'Karnataka', country: 'India', lat: 12.3083, lng: 76.2917, timezone: 5.5 },
  { city: 'K.R. Nagar (Krishnarajanagara)', state: 'Karnataka', country: 'India', lat: 12.4419, lng: 76.3817, timezone: 5.5 },
  { city: 'Piriyapatna', state: 'Karnataka', country: 'India', lat: 12.3411, lng: 76.0967, timezone: 5.5 },
  { city: 'T. Narasipura (Tirumakudalu Narasipura)', state: 'Karnataka', country: 'India', lat: 12.2122, lng: 76.9044, timezone: 5.5 },
  { city: 'H.D. Kote (Heggadadevankote)', state: 'Karnataka', country: 'India', lat: 12.0864, lng: 76.3267, timezone: 5.5 },
  { city: 'Saragur', state: 'Karnataka', country: 'India', lat: 11.9792, lng: 76.3878, timezone: 5.5 },
  { city: 'Saligrama', state: 'Karnataka', country: 'India', lat: 12.5694, lng: 76.2625, timezone: 5.5 },

  // Hubballi - Dharwad District
  { city: 'Hubballi (Hubli)', state: 'Karnataka', country: 'India', lat: 15.3647, lng: 75.124, timezone: 5.5 },
  { city: 'Dharwad', state: 'Karnataka', country: 'India', lat: 15.4589, lng: 75.0078, timezone: 5.5 },
  { city: 'Navalgund', state: 'Karnataka', country: 'India', lat: 15.5656, lng: 75.3653, timezone: 5.5 },
  { city: 'Kundgol', state: 'Karnataka', country: 'India', lat: 15.2536, lng: 75.2536, timezone: 5.5 },
  { city: 'Kalghatgi', state: 'Karnataka', country: 'India', lat: 15.1764, lng: 74.9744, timezone: 5.5 },
  { city: 'Alnavar', state: 'Karnataka', country: 'India', lat: 15.4389, lng: 74.7333, timezone: 5.5 },

  // Dakshina Kannada & Udupi (Coastal Karnataka)
  { city: 'Mangaluru (Mangalore)', state: 'Karnataka', country: 'India', lat: 12.9141, lng: 74.856, timezone: 5.5 },
  { city: 'Udupi', state: 'Karnataka', country: 'India', lat: 13.3409, lng: 74.7421, timezone: 5.5 },
  { city: 'Manipal', state: 'Karnataka', country: 'India', lat: 13.3525, lng: 74.7867, timezone: 5.5 },
  { city: 'Kundapura', state: 'Karnataka', country: 'India', lat: 13.6267, lng: 74.6933, timezone: 5.5 },
  { city: 'Karkala', state: 'Karnataka', country: 'India', lat: 13.2144, lng: 74.9986, timezone: 5.5 },
  { city: 'Puttur', state: 'Karnataka', country: 'India', lat: 12.7667, lng: 75.2, timezone: 5.5 },
  { city: 'Bantwal', state: 'Karnataka', country: 'India', lat: 12.8944, lng: 75.035, timezone: 5.5 },
  { city: 'Belthangady', state: 'Karnataka', country: 'India', lat: 12.9961, lng: 75.2583, timezone: 5.5 },
  { city: 'Moodabidri', state: 'Karnataka', country: 'India', lat: 13.0722, lng: 74.9961, timezone: 5.5 },
  { city: 'Sullia', state: 'Karnataka', country: 'India', lat: 12.5622, lng: 75.3886, timezone: 5.5 },
  { city: 'Byndoor', state: 'Karnataka', country: 'India', lat: 13.8767, lng: 74.6303, timezone: 5.5 },
  { city: 'Brahmavara', state: 'Karnataka', country: 'India', lat: 13.4356, lng: 74.7478, timezone: 5.5 },
  { city: 'Kaup (Kapu)', state: 'Karnataka', country: 'India', lat: 13.2247, lng: 74.7417, timezone: 5.5 },
  { city: 'Malpe', state: 'Karnataka', country: 'India', lat: 13.3514, lng: 74.7042, timezone: 5.5 },

  // Belagavi (Belgaum) District
  { city: 'Belagavi (Belgaum)', state: 'Karnataka', country: 'India', lat: 15.8497, lng: 74.4977, timezone: 5.5 },
  { city: 'Gokak', state: 'Karnataka', country: 'India', lat: 16.1667, lng: 74.8333, timezone: 5.5 },
  { city: 'Chikkodi', state: 'Karnataka', country: 'India', lat: 16.4333, lng: 74.6, timezone: 5.5 },
  { city: 'Athani', state: 'Karnataka', country: 'India', lat: 16.7333, lng: 75.0667, timezone: 5.5 },
  { city: 'Bailhongal', state: 'Karnataka', country: 'India', lat: 15.8167, lng: 74.8667, timezone: 5.5 },
  { city: 'Saundatti (Yellamma)', state: 'Karnataka', country: 'India', lat: 15.7667, lng: 75.1167, timezone: 5.5 },
  { city: 'Ramdurg', state: 'Karnataka', country: 'India', lat: 15.9467, lng: 75.2978, timezone: 5.5 },
  { city: 'Raybag', state: 'Karnataka', country: 'India', lat: 16.4917, lng: 74.7806, timezone: 5.5 },
  { city: 'Hukkeri', state: 'Karnataka', country: 'India', lat: 16.2306, lng: 74.6056, timezone: 5.5 },
  { city: 'Khanapur', state: 'Karnataka', country: 'India', lat: 15.6333, lng: 74.5167, timezone: 5.5 },
  { city: 'Nipani', state: 'Karnataka', country: 'India', lat: 16.4, lng: 74.3833, timezone: 5.5 },
  { city: 'Kittur', state: 'Karnataka', country: 'India', lat: 15.6022, lng: 74.7933, timezone: 5.5 },
  { city: 'Mudalgi', state: 'Karnataka', country: 'India', lat: 16.3389, lng: 75.0028, timezone: 5.5 },
  { city: 'Sankeshwar', state: 'Karnataka', country: 'India', lat: 16.2625, lng: 74.4842, timezone: 5.5 },

  // Shivamogga (Shimoga) District
  { city: 'Shivamogga (Shimoga)', state: 'Karnataka', country: 'India', lat: 13.9299, lng: 75.5681, timezone: 5.5 },
  { city: 'Bhadravati', state: 'Karnataka', country: 'India', lat: 13.84, lng: 75.7022, timezone: 5.5 },
  { city: 'Sagar', state: 'Karnataka', country: 'India', lat: 14.1667, lng: 75.0333, timezone: 5.5 },
  { city: 'Shikaripura', state: 'Karnataka', country: 'India', lat: 14.2667, lng: 75.35, timezone: 5.5 },
  { city: 'Soraba', state: 'Karnataka', country: 'India', lat: 14.3833, lng: 75.1, timezone: 5.5 },
  { city: 'Thirthahalli', state: 'Karnataka', country: 'India', lat: 13.6928, lng: 75.2447, timezone: 5.5 },
  { city: 'Hosanagara', state: 'Karnataka', country: 'India', lat: 13.9167, lng: 75.0667, timezone: 5.5 },
  { city: 'Jog Falls', state: 'Karnataka', country: 'India', lat: 14.2285, lng: 74.8124, timezone: 5.5 },

  // Davanagere & Chitradurga
  { city: 'Davanagere', state: 'Karnataka', country: 'India', lat: 14.4644, lng: 75.9218, timezone: 5.5 },
  { city: 'Harihar', state: 'Karnataka', country: 'India', lat: 14.5167, lng: 75.8, timezone: 5.5 },
  { city: 'Channagiri', state: 'Karnataka', country: 'India', lat: 14.0278, lng: 75.9333, timezone: 5.5 },
  { city: 'Honnali', state: 'Karnataka', country: 'India', lat: 14.2444, lng: 75.6417, timezone: 5.5 },
  { city: 'Jagalur', state: 'Karnataka', country: 'India', lat: 14.5244, lng: 76.3478, timezone: 5.5 },
  { city: 'Chitradurga', state: 'Karnataka', country: 'India', lat: 14.2251, lng: 76.398, timezone: 5.5 },
  { city: 'Challakere', state: 'Karnataka', country: 'India', lat: 14.3167, lng: 76.65, timezone: 5.5 },
  { city: 'Hiriyur', state: 'Karnataka', country: 'India', lat: 13.9472, lng: 76.6208, timezone: 5.5 },
  { city: 'Hosadurga', state: 'Karnataka', country: 'India', lat: 13.7972, lng: 76.2878, timezone: 5.5 },
  { city: 'Holalkere', state: 'Karnataka', country: 'India', lat: 14.0333, lng: 76.1833, timezone: 5.5 },
  { city: 'Molakalmuru', state: 'Karnataka', country: 'India', lat: 14.7264, lng: 76.7556, timezone: 5.5 },

  // Ballari (Bellary) & Vijayanagara
  { city: 'Ballari (Bellary)', state: 'Karnataka', country: 'India', lat: 15.1394, lng: 76.9214, timezone: 5.5 },
  { city: 'Hosapete (Hospet / Hampi)', state: 'Karnataka', country: 'India', lat: 15.2689, lng: 76.3909, timezone: 5.5 },
  { city: 'Sandur', state: 'Karnataka', country: 'India', lat: 15.0833, lng: 76.55, timezone: 5.5 },
  { city: 'Siruguppa', state: 'Karnataka', country: 'India', lat: 15.6333, lng: 76.8833, timezone: 5.5 },
  { city: 'Kampli', state: 'Karnataka', country: 'India', lat: 15.4, lng: 76.6167, timezone: 5.5 },
  { city: 'Harapanahalli', state: 'Karnataka', country: 'India', lat: 14.7961, lng: 75.9867, timezone: 5.5 },
  { city: 'Hagaribommanahalli', state: 'Karnataka', country: 'India', lat: 15.0833, lng: 76.0167, timezone: 5.5 },
  { city: 'Hoovina Hadagali', state: 'Karnataka', country: 'India', lat: 15.0167, lng: 75.95, timezone: 5.5 },
  { city: 'Kudligi', state: 'Karnataka', country: 'India', lat: 14.9, lng: 76.3833, timezone: 5.5 },
  { city: 'Kotturu', state: 'Karnataka', country: 'India', lat: 14.825, lng: 76.2208, timezone: 5.5 },

  // Kalaburagi (Gulbarga), Bidar & Yadgir
  { city: 'Kalaburagi (Gulbarga)', state: 'Karnataka', country: 'India', lat: 17.3297, lng: 76.8343, timezone: 5.5 },
  { city: 'Aland', state: 'Karnataka', country: 'India', lat: 17.5667, lng: 76.5667, timezone: 5.5 },
  { city: 'Afzalpur', state: 'Karnataka', country: 'India', lat: 17.2, lng: 76.35, timezone: 5.5 },
  { city: 'Jevargi', state: 'Karnataka', country: 'India', lat: 17.0167, lng: 76.7667, timezone: 5.5 },
  { city: 'Sedam', state: 'Karnataka', country: 'India', lat: 17.1833, lng: 77.2833, timezone: 5.5 },
  { city: 'Chittapur', state: 'Karnataka', country: 'India', lat: 17.1167, lng: 77.0833, timezone: 5.5 },
  { city: 'Chincholi', state: 'Karnataka', country: 'India', lat: 17.4667, lng: 77.4333, timezone: 5.5 },
  { city: 'Shahabad', state: 'Karnataka', country: 'India', lat: 17.1333, lng: 76.9333, timezone: 5.5 },
  { city: 'Bidar', state: 'Karnataka', country: 'India', lat: 17.9104, lng: 77.5199, timezone: 5.5 },
  { city: 'Basavakalyan', state: 'Karnataka', country: 'India', lat: 17.8744, lng: 76.9506, timezone: 5.5 },
  { city: 'Bhalki', state: 'Karnataka', country: 'India', lat: 18.0417, lng: 77.2167, timezone: 5.5 },
  { city: 'Humnabad', state: 'Karnataka', country: 'India', lat: 17.7667, lng: 77.1333, timezone: 5.5 },
  { city: 'Aurad', state: 'Karnataka', country: 'India', lat: 18.25, lng: 77.4333, timezone: 5.5 },
  { city: 'Yadgir', state: 'Karnataka', country: 'India', lat: 16.7667, lng: 77.1333, timezone: 5.5 },
  { city: 'Shahapur', state: 'Karnataka', country: 'India', lat: 16.7, lng: 76.8333, timezone: 5.5 },
  { city: 'Shorapur (Surpur)', state: 'Karnataka', country: 'India', lat: 16.5167, lng: 76.7667, timezone: 5.5 },
  { city: 'Gurmitkal', state: 'Karnataka', country: 'India', lat: 16.8667, lng: 77.4, timezone: 5.5 },

  // Vijayapura (Bijapur) & Bagalkote
  { city: 'Vijayapura (Bijapur)', state: 'Karnataka', country: 'India', lat: 16.8302, lng: 75.71, timezone: 5.5 },
  { city: 'Indi', state: 'Karnataka', country: 'India', lat: 17.1833, lng: 75.9667, timezone: 5.5 },
  { city: 'Sindagi', state: 'Karnataka', country: 'India', lat: 16.9167, lng: 76.2333, timezone: 5.5 },
  { city: 'Basavana Bagewadi', state: 'Karnataka', country: 'India', lat: 16.5833, lng: 75.9667, timezone: 5.5 },
  { city: 'Muddebihal', state: 'Karnataka', country: 'India', lat: 16.3333, lng: 76.1333, timezone: 5.5 },
  { city: 'Talikoti', state: 'Karnataka', country: 'India', lat: 16.4833, lng: 76.3167, timezone: 5.5 },
  { city: 'Bagalkote', state: 'Karnataka', country: 'India', lat: 16.1817, lng: 75.6958, timezone: 5.5 },
  { city: 'Badami', state: 'Karnataka', country: 'India', lat: 15.9186, lng: 75.6797, timezone: 5.5 },
  { city: 'Jamkhandi', state: 'Karnataka', country: 'India', lat: 16.5114, lng: 75.2978, timezone: 5.5 },
  { city: 'Mudhol', state: 'Karnataka', country: 'India', lat: 16.35, lng: 75.2833, timezone: 5.5 },
  { city: 'Ilkal', state: 'Karnataka', country: 'India', lat: 15.9667, lng: 76.1167, timezone: 5.5 },
  { city: 'Guledgudda', state: 'Karnataka', country: 'India', lat: 16.05, lng: 75.8, timezone: 5.5 },
  { city: 'Rabkavi-Banhatti', state: 'Karnataka', country: 'India', lat: 16.4833, lng: 75.1167, timezone: 5.5 },
  { city: 'Mahalingpur', state: 'Karnataka', country: 'India', lat: 16.3833, lng: 75.1167, timezone: 5.5 },
  { city: 'Bilgi', state: 'Karnataka', country: 'India', lat: 16.35, lng: 75.6167, timezone: 5.5 },
  { city: 'Hunagund', state: 'Karnataka', country: 'India', lat: 16.0667, lng: 76.05, timezone: 5.5 },

  // Raichur & Koppal
  { city: 'Raichur', state: 'Karnataka', country: 'India', lat: 16.2076, lng: 77.3463, timezone: 5.5 },
  { city: 'Sindhanur', state: 'Karnataka', country: 'India', lat: 15.7667, lng: 76.7667, timezone: 5.5 },
  { city: 'Manvi', state: 'Karnataka', country: 'India', lat: 15.9833, lng: 77.05, timezone: 5.5 },
  { city: 'Lingsugur', state: 'Karnataka', country: 'India', lat: 16.1667, lng: 76.5167, timezone: 5.5 },
  { city: 'Devadurga', state: 'Karnataka', country: 'India', lat: 16.4167, lng: 76.9333, timezone: 5.5 },
  { city: 'Maski', state: 'Karnataka', country: 'India', lat: 15.9667, lng: 76.6667, timezone: 5.5 },
  { city: 'Koppal', state: 'Karnataka', country: 'India', lat: 15.3533, lng: 76.1558, timezone: 5.5 },
  { city: 'Gangavathi', state: 'Karnataka', country: 'India', lat: 15.4333, lng: 76.5333, timezone: 5.5 },
  { city: 'Kushtagi', state: 'Karnataka', country: 'India', lat: 15.75, lng: 76.2, timezone: 5.5 },
  { city: 'Yelburga', state: 'Karnataka', country: 'India', lat: 15.6167, lng: 76.0167, timezone: 5.5 },
  { city: 'Kanakagiri', state: 'Karnataka', country: 'India', lat: 15.5667, lng: 76.4167, timezone: 5.5 },

  // Tumakuru (Tumkur) & Hassan
  { city: 'Tumakuru (Tumkur)', state: 'Karnataka', country: 'India', lat: 13.3379, lng: 77.1006, timezone: 5.5 },
  { city: 'Tiptur', state: 'Karnataka', country: 'India', lat: 13.2611, lng: 76.4789, timezone: 5.5 },
  { city: 'Sira', state: 'Karnataka', country: 'India', lat: 13.7431, lng: 76.9083, timezone: 5.5 },
  { city: 'Kunigal', state: 'Karnataka', country: 'India', lat: 13.0236, lng: 77.0347, timezone: 5.5 },
  { city: 'Gubbi', state: 'Karnataka', country: 'India', lat: 13.3111, lng: 76.9417, timezone: 5.5 },
  { city: 'Pavagada', state: 'Karnataka', country: 'India', lat: 14.1, lng: 77.2833, timezone: 5.5 },
  { city: 'Madhugiri', state: 'Karnataka', country: 'India', lat: 13.6625, lng: 77.2083, timezone: 5.5 },
  { city: 'Chikkanayakanahalli', state: 'Karnataka', country: 'India', lat: 13.4167, lng: 76.6167, timezone: 5.5 },
  { city: 'Turuvekere', state: 'Karnataka', country: 'India', lat: 13.1611, lng: 76.6694, timezone: 5.5 },
  { city: 'Hassan', state: 'Karnataka', country: 'India', lat: 13.0033, lng: 76.1004, timezone: 5.5 },
  { city: 'Arsikere', state: 'Karnataka', country: 'India', lat: 13.3117, lng: 76.2575, timezone: 5.5 },
  { city: 'Channarayapatna', state: 'Karnataka', country: 'India', lat: 12.9039, lng: 76.3894, timezone: 5.5 },
  { city: 'Holenarasipur', state: 'Karnataka', country: 'India', lat: 12.7878, lng: 76.2417, timezone: 5.5 },
  { city: 'Sakleshpur', state: 'Karnataka', country: 'India', lat: 12.9422, lng: 75.7872, timezone: 5.5 },
  { city: 'Belur', state: 'Karnataka', country: 'India', lat: 13.1644, lng: 75.8617, timezone: 5.5 },
  { city: 'Arkalgud', state: 'Karnataka', country: 'India', lat: 12.7667, lng: 76.05, timezone: 5.5 },
  { city: 'Shravanabelagola', state: 'Karnataka', country: 'India', lat: 12.8592, lng: 76.4864, timezone: 5.5 },

  // Chikkamagaluru & Kodagu (Coorg)
  { city: 'Chikkamagaluru (Chikmagalur)', state: 'Karnataka', country: 'India', lat: 13.3161, lng: 75.772, timezone: 5.5 },
  { city: 'Sringeri (Sharada Peetham)', state: 'Karnataka', country: 'India', lat: 13.4197, lng: 75.2583, timezone: 5.5 },
  { city: 'Kadur', state: 'Karnataka', country: 'India', lat: 13.55, lng: 76.0167, timezone: 5.5 },
  { city: 'Tarikere', state: 'Karnataka', country: 'India', lat: 13.7167, lng: 75.8167, timezone: 5.5 },
  { city: 'Mudigere', state: 'Karnataka', country: 'India', lat: 13.1333, lng: 75.6333, timezone: 5.5 },
  { city: 'Koppa', state: 'Karnataka', country: 'India', lat: 13.5333, lng: 75.3667, timezone: 5.5 },
  { city: 'Narasimharajapura', state: 'Karnataka', country: 'India', lat: 13.6278, lng: 75.5222, timezone: 5.5 },
  { city: 'Madikeri (Mercara / Coorg)', state: 'Karnataka', country: 'India', lat: 12.4244, lng: 75.7382, timezone: 5.5 },
  { city: 'Virajpet', state: 'Karnataka', country: 'India', lat: 12.1972, lng: 75.8028, timezone: 5.5 },
  { city: 'Somwarpet', state: 'Karnataka', country: 'India', lat: 12.5972, lng: 75.8569, timezone: 5.5 },
  { city: 'Kushalnagar', state: 'Karnataka', country: 'India', lat: 12.4567, lng: 75.9611, timezone: 5.5 },
  { city: 'Gonikoppal', state: 'Karnataka', country: 'India', lat: 12.1764, lng: 75.9264, timezone: 5.5 },

  // Uttara Kannada (Karwar & Western Ghats)
  { city: 'Karwar', state: 'Karnataka', country: 'India', lat: 14.8185, lng: 74.1306, timezone: 5.5 },
  { city: 'Sirsi', state: 'Karnataka', country: 'India', lat: 14.6194, lng: 74.8519, timezone: 5.5 },
  { city: 'Kumta', state: 'Karnataka', country: 'India', lat: 14.4258, lng: 74.4089, timezone: 5.5 },
  { city: 'Bhatkal', state: 'Karnataka', country: 'India', lat: 13.9786, lng: 74.565, timezone: 5.5 },
  { city: 'Honnavar', state: 'Karnataka', country: 'India', lat: 14.2808, lng: 74.4439, timezone: 5.5 },
  { city: 'Ankola', state: 'Karnataka', country: 'India', lat: 14.6647, lng: 74.3017, timezone: 5.5 },
  { city: 'Dandeli', state: 'Karnataka', country: 'India', lat: 15.2417, lng: 74.6222, timezone: 5.5 },
  { city: 'Gokarna', state: 'Karnataka', country: 'India', lat: 14.5479, lng: 74.3188, timezone: 5.5 },
  { city: 'Siddapur', state: 'Karnataka', country: 'India', lat: 14.3333, lng: 74.9, timezone: 5.5 },
  { city: 'Yellapur', state: 'Karnataka', country: 'India', lat: 14.9667, lng: 74.7167, timezone: 5.5 },
  { city: 'Haliyal', state: 'Karnataka', country: 'India', lat: 15.3333, lng: 74.7667, timezone: 5.5 },

  // Mandya, Ramanagara & Chamarajanagar
  { city: 'Mandya', state: 'Karnataka', country: 'India', lat: 12.5233, lng: 76.8967, timezone: 5.5 },
  { city: 'Maddur', state: 'Karnataka', country: 'India', lat: 12.5833, lng: 77.05, timezone: 5.5 },
  { city: 'Malavalli', state: 'Karnataka', country: 'India', lat: 12.3833, lng: 77.0667, timezone: 5.5 },
  { city: 'Srirangapatna', state: 'Karnataka', country: 'India', lat: 12.4181, lng: 76.6947, timezone: 5.5 },
  { city: 'Pandavapura', state: 'Karnataka', country: 'India', lat: 12.4972, lng: 76.6708, timezone: 5.5 },
  { city: 'Nagamangala', state: 'Karnataka', country: 'India', lat: 12.8222, lng: 76.7583, timezone: 5.5 },
  { city: 'K.R. Pet (Krishnarajpet)', state: 'Karnataka', country: 'India', lat: 12.6667, lng: 76.4833, timezone: 5.5 },
  { city: 'Ramanagara', state: 'Karnataka', country: 'India', lat: 12.7208, lng: 77.2797, timezone: 5.5 },
  { city: 'Channapatna', state: 'Karnataka', country: 'India', lat: 12.6517, lng: 77.2028, timezone: 5.5 },
  { city: 'Kanakapura', state: 'Karnataka', country: 'India', lat: 12.5461, lng: 77.4172, timezone: 5.5 },
  { city: 'Magadi', state: 'Karnataka', country: 'India', lat: 12.9567, lng: 77.2289, timezone: 5.5 },
  { city: 'Harohalli', state: 'Karnataka', country: 'India', lat: 12.6847, lng: 77.4583, timezone: 5.5 },
  { city: 'Chamarajanagar', state: 'Karnataka', country: 'India', lat: 11.9261, lng: 76.9436, timezone: 5.5 },
  { city: 'Gundlupet', state: 'Karnataka', country: 'India', lat: 11.8, lng: 76.6833, timezone: 5.5 },
  { city: 'Kollegal', state: 'Karnataka', country: 'India', lat: 12.1556, lng: 77.1111, timezone: 5.5 },
  { city: 'Yelandur', state: 'Karnataka', country: 'India', lat: 12.0667, lng: 77.0333, timezone: 5.5 },
  { city: 'Hanur', state: 'Karnataka', country: 'India', lat: 12.0917, lng: 77.2972, timezone: 5.5 },

  // Kolar & Chikkaballapura
  { city: 'Kolar', state: 'Karnataka', country: 'India', lat: 13.1367, lng: 78.1292, timezone: 5.5 },
  { city: 'Robertsonpet (KGF - Kolar Gold Fields)', state: 'Karnataka', country: 'India', lat: 12.9569, lng: 78.2717, timezone: 5.5 },
  { city: 'Bangarapet', state: 'Karnataka', country: 'India', lat: 12.9961, lng: 78.1969, timezone: 5.5 },
  { city: 'Malur', state: 'Karnataka', country: 'India', lat: 13.0039, lng: 77.9406, timezone: 5.5 },
  { city: 'Mulbagal', state: 'Karnataka', country: 'India', lat: 13.1636, lng: 78.3956, timezone: 5.5 },
  { city: 'Srinivaspur', state: 'Karnataka', country: 'India', lat: 13.3369, lng: 78.2144, timezone: 5.5 },
  { city: 'Chikkaballapura', state: 'Karnataka', country: 'India', lat: 13.4355, lng: 77.7281, timezone: 5.5 },
  { city: 'Gauribidanur', state: 'Karnataka', country: 'India', lat: 13.6139, lng: 77.5186, timezone: 5.5 },
  { city: 'Bagepalli', state: 'Karnataka', country: 'India', lat: 13.7844, lng: 77.795, timezone: 5.5 },
  { city: 'Sidlaghatta', state: 'Karnataka', country: 'India', lat: 13.3917, lng: 77.8639, timezone: 5.5 },
  { city: 'Chintamani', state: 'Karnataka', country: 'India', lat: 13.4006, lng: 78.0569, timezone: 5.5 },

  // Haveri & Gadag
  { city: 'Haveri', state: 'Karnataka', country: 'India', lat: 14.7958, lng: 75.4019, timezone: 5.5 },
  { city: 'Ranebennur', state: 'Karnataka', country: 'India', lat: 14.6228, lng: 75.6214, timezone: 5.5 },
  { city: 'Byadgi', state: 'Karnataka', country: 'India', lat: 14.6833, lng: 75.4833, timezone: 5.5 },
  { city: 'Hangal', state: 'Karnataka', country: 'India', lat: 14.7667, lng: 75.1333, timezone: 5.5 },
  { city: 'Savanur', state: 'Karnataka', country: 'India', lat: 14.9667, lng: 75.35, timezone: 5.5 },
  { city: 'Shiggaon', state: 'Karnataka', country: 'India', lat: 14.9833, lng: 75.2333, timezone: 5.5 },
  { city: 'Hirekerur', state: 'Karnataka', country: 'India', lat: 14.4667, lng: 75.3833, timezone: 5.5 },
  { city: 'Gadag-Betageri', state: 'Karnataka', country: 'India', lat: 15.4289, lng: 75.6311, timezone: 5.5 },
  { city: 'Nargund', state: 'Karnataka', country: 'India', lat: 15.7167, lng: 75.3833, timezone: 5.5 },
  { city: 'Ron', state: 'Karnataka', country: 'India', lat: 15.6983, lng: 75.7333, timezone: 5.5 },
  { city: 'Shirhatti', state: 'Karnataka', country: 'India', lat: 15.2333, lng: 75.5833, timezone: 5.5 },
  { city: 'Mundargi', state: 'Karnataka', country: 'India', lat: 15.2072, lng: 75.8833, timezone: 5.5 },
  { city: 'Gajendragad', state: 'Karnataka', country: 'India', lat: 15.7333, lng: 75.9667, timezone: 5.5 },
  { city: 'Lakshmeshwar', state: 'Karnataka', country: 'India', lat: 15.1278, lng: 75.4694, timezone: 5.5 },

  // ==========================================
  // REST OF INDIA — MAJOR METROS & SPIRITUAL CENTERS
  // ==========================================
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.076, lng: 72.8777, timezone: 5.5 },
  { city: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lng: 77.209, timezone: 5.5 },
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707, timezone: 5.5 },
  { city: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639, timezone: 5.5 },
  { city: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.385, lng: 78.4867, timezone: 5.5 },
  { city: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567, timezone: 5.5 },
  { city: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lng: 72.5714, timezone: 5.5 },
  { city: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 5.5 },
  { city: 'Surat', state: 'Gujarat', country: 'India', lat: 21.1702, lng: 72.8311, timezone: 5.5 },
  { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, timezone: 5.5 },
  { city: 'Nagpur', state: 'Maharashtra', country: 'India', lat: 21.1458, lng: 79.0882, timezone: 5.5 },
  { city: 'Indore', state: 'Madhya Pradesh', country: 'India', lat: 22.7196, lng: 75.8577, timezone: 5.5 },
  { city: 'Bhopal', state: 'Madhya Pradesh', country: 'India', lat: 23.2599, lng: 77.4126, timezone: 5.5 },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', lat: 17.6868, lng: 83.2185, timezone: 5.5 },
  { city: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lng: 85.1376, timezone: 5.5 },
  { city: 'Vadodara', state: 'Gujarat', country: 'India', lat: 22.3072, lng: 73.1812, timezone: 5.5 },
  { city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', lat: 11.0168, lng: 76.9558, timezone: 5.5 },
  { city: 'Varanasi (Kashi)', state: 'Uttar Pradesh', country: 'India', lat: 25.3176, lng: 82.9739, timezone: 5.5 },
  { city: 'Ujjain (Mahakaleshwar)', state: 'Madhya Pradesh', country: 'India', lat: 23.1765, lng: 75.7885, timezone: 5.5 },
  { city: 'Haridwar', state: 'Uttarakhand', country: 'India', lat: 29.9457, lng: 78.1642, timezone: 5.5 },
  { city: 'Rishikesh', state: 'Uttarakhand', country: 'India', lat: 30.0869, lng: 78.2676, timezone: 5.5 },
  { city: 'Ayodhya', state: 'Uttar Pradesh', country: 'India', lat: 26.7922, lng: 82.1998, timezone: 5.5 },
  { city: 'Tirupati', state: 'Andhra Pradesh', country: 'India', lat: 13.6288, lng: 79.4192, timezone: 5.5 },
  { city: 'Madurai', state: 'Tamil Nadu', country: 'India', lat: 9.9252, lng: 78.1198, timezone: 5.5 },
  { city: 'Kochi (Cochin)', state: 'Kerala', country: 'India', lat: 9.9312, lng: 76.2673, timezone: 5.5 },
  { city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', lat: 8.5241, lng: 76.9366, timezone: 5.5 },
  { city: 'Bhubaneswar', state: 'Odisha', country: 'India', lat: 20.2961, lng: 85.8245, timezone: 5.5 },
  { city: 'Chandigarh', state: 'Chandigarh', country: 'India', lat: 30.7333, lng: 76.7794, timezone: 5.5 },
  { city: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lng: 91.7362, timezone: 5.5 },
  { city: 'Ranchi', state: 'Jharkhand', country: 'India', lat: 23.3441, lng: 85.3096, timezone: 5.5 },
  { city: 'Raipur', state: 'Chhattisgarh', country: 'India', lat: 21.2514, lng: 81.6296, timezone: 5.5 },
  { city: 'Dehradun', state: 'Uttarakhand', country: 'India', lat: 30.3165, lng: 78.0322, timezone: 5.5 },
  { city: 'Shimla', state: 'Himachal Pradesh', country: 'India', lat: 31.1048, lng: 77.1734, timezone: 5.5 },
  { city: 'Srinagar', state: 'Jammu and Kashmir', country: 'India', lat: 34.0837, lng: 74.7973, timezone: 5.5 },
  { city: 'Amritsar', state: 'Punjab', country: 'India', lat: 31.634, lng: 74.8723, timezone: 5.5 },
  { city: 'Jodhpur', state: 'Rajasthan', country: 'India', lat: 26.2389, lng: 73.0243, timezone: 5.5 },
  { city: 'Gurugram (Gurgaon)', state: 'Haryana', country: 'India', lat: 28.4595, lng: 77.0266, timezone: 5.5 },
  { city: 'Noida', state: 'Uttar Pradesh', country: 'India', lat: 28.5355, lng: 77.391, timezone: 5.5 },

  // ==========================================
  // INTERNATIONAL MAJOR HUBS
  // ==========================================
  { city: 'London', state: 'England', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 0 },
  { city: 'New York', state: 'New York', country: 'United States', lat: 40.7128, lng: -74.006, timezone: -5 },
  { city: 'San Francisco', state: 'California', country: 'United States', lat: 37.7749, lng: -122.4194, timezone: -8 },
  { city: 'Los Angeles', state: 'California', country: 'United States', lat: 34.0522, lng: -118.2437, timezone: -8 },
  { city: 'Chicago', state: 'Illinois', country: 'United States', lat: 41.8781, lng: -87.6298, timezone: -6 },
  { city: 'Toronto', state: 'Ontario', country: 'Canada', lat: 43.6532, lng: -79.3832, timezone: -5 },
  { city: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 4 },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 8 },
  { city: 'Kuala Lumpur', state: 'Federal Territory', country: 'Malaysia', lat: 3.139, lng: 101.6869, timezone: 8 },
  { city: 'Sydney', state: 'New South Wales', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 10 },
  { city: 'Melbourne', state: 'Victoria', country: 'Australia', lat: -37.8136, lng: 144.9631, timezone: 10 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 9 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 1 },
  { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405, timezone: 1 },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, timezone: 5.5 },
  { city: 'Kathmandu', country: 'Nepal', lat: 27.7172, lng: 85.324, timezone: 5.75 },
  { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 6 },
];

/**
 * Searches the offline cities database with instant prefix and fuzzy matching.
 */
export function searchCities(query: string, limit = 10): CityData[] {
  if (!query || query.trim().length === 0) {
    return POPULAR_CITIES.slice(0, limit);
  }

  const q = query.toLowerCase().trim();

  // Score matching: cities starting with query come first, then contains
  const exactPrefixMatches: CityData[] = [];
  const containsMatches: CityData[] = [];

  for (const item of POPULAR_CITIES) {
    const cityName = item.city.toLowerCase();
    const stateName = item.state ? item.state.toLowerCase() : '';
    const countryName = item.country.toLowerCase();

    if (cityName.startsWith(q)) {
      exactPrefixMatches.push(item);
    } else if (cityName.includes(q) || stateName.includes(q) || countryName.includes(q)) {
      containsMatches.push(item);
    }

    if (exactPrefixMatches.length + containsMatches.length >= limit * 3) {
      break;
    }
  }

  return [...exactPrefixMatches, ...containsMatches].slice(0, limit);
}
