import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../data/cities';
import { validateBirthDetails } from '../astrology/services/chartService';
import type { BirthDetails, CityData } from '../astrology/types/chart';

interface NewChartPageProps {
  initialData?: Partial<BirthDetails> | null;
  onGenerate: (details: BirthDetails) => void;
  isCalculating?: boolean;
}

export const NewChartPage: React.FC<NewChartPageProps> = ({
  initialData,
  onGenerate,
  isCalculating = false,
}) => {
  const [formData, setFormData] = useState<Partial<BirthDetails>>({
    name: '',
    gender: 'Prefer not to say',
    dateOfBirth: '1995-08-15',
    timeOfBirth: '10:30',
    placeOfBirth: 'Bengaluru, Karnataka, India',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 5.5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placeQuery, setPlaceQuery] = useState('Bengaluru, Karnataka, India');
  const [citySuggestions, setCitySuggestions] = useState<CityData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
      if (initialData.placeOfBirth) {
        setPlaceQuery(initialData.placeOfBirth);
      }
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySearch = (query: string) => {
    setPlaceQuery(query);
    setFormData((prev) => ({ ...prev, placeOfBirth: query }));
    if (query.trim().length > 0) {
      const matches = searchCities(query, 6);
      setCitySuggestions(matches);
      setShowDropdown(true);
    } else {
      setCitySuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city: CityData) => {
    const fullName = `${city.city}${city.state ? `, ${city.state}` : ''}, ${city.country}`;
    setPlaceQuery(fullName);
    setFormData((prev) => ({
      ...prev,
      placeOfBirth: fullName,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.timezone,
    }));
    setShowDropdown(false);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.placeOfBirth;
      delete next.latitude;
      delete next.longitude;
      delete next.timezone;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBirthDetails(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    onGenerate(formData as BirthDetails);
  };

  if (isCalculating) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
        }}
        className="animate-fade-in"
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '2px solid var(--color-outline-variant)',
            borderTopColor: 'var(--color-primary)',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '16px',
          }}
        />
        <h3 className="font-headline-sm" style={{ color: 'var(--color-on-surface)', marginBottom: '6px' }}>
          Calculating Astronomical Alignments...
        </h3>
        <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>
          Computing planetary positions using Lahiri Sidereal Ephemeris.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        backgroundColor: 'var(--color-background)',
        paddingBottom: '60px',
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Page Header */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(121, 84, 46, 0.3)' }} />
            <span
              className="material-symbols-outlined"
              style={{ color: 'var(--color-primary)', fontSize: '24px' }}
            >
              flare
            </span>
            <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(121, 84, 46, 0.3)' }} />
          </div>
          <h1 className="font-display-lg" style={{ color: 'var(--color-on-surface)', margin: 0 }}>
            Create Birth Chart
          </h1>
          <p
            className="font-body-md"
            style={{
              color: 'var(--color-on-surface-variant)',
              maxWidth: '460px',
              opacity: 0.85,
              lineHeight: '1.5',
            }}
          >
            Enter the birth details below to calculate the precise astrological alignments at the moment of birth.
          </p>
        </header>

        {/* Main Form */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              maxWidth: '760px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
            className="animate-slide-up"
          >
            {/* Section I: Personal Details */}
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: '8px',
                padding: '36px',
                border: '1px solid rgba(212, 196, 183, 0.35)',
                boxShadow: '0 8px 32px rgba(121, 84, 46, 0.03)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  className="font-title-caps"
                  style={{
                    color: 'var(--color-primary)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  I. Personal Details
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(212, 196, 183, 0.4), transparent)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  columnGap: '36px',
                  rowGap: '28px',
                }}
              >
                {/* Native Name */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gridColumn: '1 / -1' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="name"
                  >
                    Native's Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="font-headline-sm"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${errors.name ? 'var(--color-error)' : 'rgba(212, 196, 183, 0.6)'}`,
                      padding: '8px 0',
                      color: 'var(--color-on-surface)',
                      outline: 'none',
                      fontSize: '18px',
                    }}
                    placeholder="E.g., Ananya Sharma"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && (
                    <span style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Date of Birth */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      id="dob"
                      type="date"
                      className="font-data-mono"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${errors.dateOfBirth ? 'var(--color-error)' : 'rgba(212, 196, 183, 0.6)'}`,
                        padding: '8px 0',
                        color: 'var(--color-on-surface)',
                        outline: 'none',
                        fontSize: '13.5px',
                      }}
                      value={formData.dateOfBirth || ''}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <span style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
                      {errors.dateOfBirth}
                    </span>
                  )}
                </div>

                {/* Time of Birth */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="tob"
                  >
                    Time of Birth
                  </label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      id="tob"
                      type="time"
                      className="font-data-mono"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${errors.timeOfBirth ? 'var(--color-error)' : 'rgba(212, 196, 183, 0.6)'}`,
                        padding: '8px 0',
                        color: 'var(--color-on-surface)',
                        outline: 'none',
                        fontSize: '13.5px',
                      }}
                      value={formData.timeOfBirth || ''}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                    />
                  </div>
                  {errors.timeOfBirth && (
                    <span style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
                      {errors.timeOfBirth}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Section II: Birth Location */}
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: '8px',
                padding: '36px',
                border: '1px solid rgba(212, 196, 183, 0.35)',
                boxShadow: '0 8px 32px rgba(121, 84, 46, 0.03)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  className="font-title-caps"
                  style={{
                    color: 'var(--color-primary)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  II. Birth Location
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(212, 196, 183, 0.4), transparent)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  columnGap: '36px',
                  rowGap: '28px',
                }}
              >
                {/* Search City / Location */}
                <div
                  style={{ display: 'flex', flexDirection: 'column', position: 'relative', gridColumn: '1 / -1' }}
                  ref={dropdownRef}
                >
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="location"
                  >
                    City, State, Country
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--color-on-surface-variant)',
                        opacity: 0.6,
                        fontSize: '20px',
                      }}
                    >
                      location_on
                    </span>
                    <input
                      id="location"
                      type="text"
                      className="font-headline-sm"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${errors.placeOfBirth ? 'var(--color-error)' : 'rgba(212, 196, 183, 0.6)'}`,
                        padding: '8px 0 8px 30px',
                        color: 'var(--color-on-surface)',
                        outline: 'none',
                        fontSize: '17px',
                      }}
                      placeholder="Search birthplace..."
                      value={placeQuery}
                      onChange={(e) => handleCitySearch(e.target.value)}
                      onFocus={() => {
                        if (citySuggestions.length > 0) setShowDropdown(true);
                      }}
                    />
                  </div>
                  {errors.placeOfBirth && (
                    <span style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
                      {errors.placeOfBirth}
                    </span>
                  )}

                  {/* Suggestions Dropdown */}
                  {showDropdown && citySuggestions.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--color-outline-variant)',
                        borderRadius: '4px',
                        marginTop: '4px',
                        zIndex: 50,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        maxHeight: '220px',
                        overflowY: 'auto',
                      }}
                    >
                      {citySuggestions.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '10px 14px',
                            cursor: 'pointer',
                            borderBottom: '1px solid rgba(212, 196, 183, 0.25)',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => handleSelectCity(c)}
                        >
                          <div>
                            <strong style={{ color: 'var(--color-on-surface)' }}>{c.city}</strong>
                            {c.state && <span style={{ color: 'var(--color-on-surface-variant)' }}>, {c.state}</span>}
                            <span style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7 }}> • {c.country}</span>
                          </div>
                          <span
                            className="font-data-mono"
                            style={{ fontSize: '11.5px', color: 'var(--color-primary)' }}
                          >
                            {c.lat.toFixed(2)}°, {c.lng.toFixed(2)}° (UTC {c.timezone >= 0 ? '+' : ''}{c.timezone})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Latitude */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="lat"
                  >
                    Latitude
                  </label>
                  <input
                    id="lat"
                    type="number"
                    step="any"
                    className="font-data-mono"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(212, 196, 183, 0.6)',
                      padding: '8px 0',
                      color: 'var(--color-on-surface)',
                      outline: 'none',
                      fontSize: '13px',
                    }}
                    placeholder="Auto-filled"
                    value={formData.latitude ?? ''}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  />
                </div>

                {/* Longitude */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="lng"
                  >
                    Longitude
                  </label>
                  <input
                    id="lng"
                    type="number"
                    step="any"
                    className="font-data-mono"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(212, 196, 183, 0.6)',
                      padding: '8px 0',
                      color: 'var(--color-on-surface)',
                      outline: 'none',
                      fontSize: '13px',
                    }}
                    placeholder="Auto-filled"
                    value={formData.longitude ?? ''}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  />
                </div>

                {/* Timezone */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gridColumn: '1 / -1' }}>
                  <label
                    className="font-label-xs"
                    style={{
                      color: 'var(--color-on-surface-variant)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}
                    htmlFor="timezone"
                  >
                    Timezone (UTC Offset)
                  </label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      id="timezone"
                      type="number"
                      step="0.25"
                      className="font-data-mono"
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(212, 196, 183, 0.6)',
                        padding: '8px 0',
                        color: 'var(--color-on-surface)',
                        outline: 'none',
                        fontSize: '13px',
                      }}
                      placeholder="e.g. 5.5 for IST (UTC+5:30)"
                      value={formData.timezone ?? ''}
                      onChange={(e) => setFormData({ ...formData, timezone: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 32px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-on-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
              >
                <span className="font-title-caps" style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Generate Chart
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
