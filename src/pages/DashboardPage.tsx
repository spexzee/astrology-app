import React from 'react';
import type { SavedProfileRecord, BirthDetails } from '../astrology/types/chart';

interface DashboardPageProps {
  savedProfiles: SavedProfileRecord[];
  onOpenProfile: (profile: BirthDetails) => void;
  onDeleteProfile: (id: string) => void;
  onNewChart: () => void;
  onViewAllSaved: () => void;
  onViewReports: () => void;
  onLoadDemoProfile: (demo: BirthDetails) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  savedProfiles,
  onOpenProfile,
  onDeleteProfile,
  onNewChart,
  onViewAllSaved,
  onLoadDemoProfile,
}) => {
  const samplePresets: BirthDetails[] = [
    {
      name: 'Arjun Patel',
      gender: 'Male',
      dateOfBirth: '1990-10-14',
      timeOfBirth: '08:45',
      placeOfBirth: 'Mumbai, India',
      latitude: 19.076,
      longitude: 72.8777,
      timezone: 5.5,
    },
    {
      name: 'Sarah Jenkins',
      gender: 'Female',
      dateOfBirth: '1985-03-03',
      timeOfBirth: '14:15',
      placeOfBirth: 'London, UK',
      latitude: 51.5074,
      longitude: -0.1278,
      timezone: 0,
    },
    {
      name: 'Kavya Sharma',
      gender: 'Female',
      dateOfBirth: '1995-11-22',
      timeOfBirth: '18:30',
      placeOfBirth: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 5.5,
    },
  ];

  const recentList = savedProfiles.length > 0 ? savedProfiles.slice(0, 6) : samplePresets;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }} className="animate-fade-in">
      {/* Welcome Hero Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '72px 24px',
          backgroundColor: 'rgba(250, 242, 236, 0.7)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background astrological geometry */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.12,
            pointerEvents: 'none',
            color: 'var(--color-primary)',
          }}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 8 50 L 92 50 M 50 8 L 50 92" stroke="currentColor" strokeWidth="0.25" />
          <polygon points="50,8 92,50 50,92 8,50" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 className="font-display-lg" style={{ color: 'var(--color-on-surface)', margin: 0 }}>
              Vedic Astrology Studio
            </h1>
            <p
              className="font-body-md"
              style={{
                color: 'var(--color-on-surface-variant)',
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              Create and explore birth charts with precision and clarity. A professional suite for rigorous astrological analysis.
            </p>
          </div>

          <button
            onClick={onNewChart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 32px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(121, 84, 46, 0.2)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              add
            </span>
            <span className="font-title-caps" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              New Birth Chart
            </span>
          </button>
        </div>
      </section>

      {/* Recent Charts Section */}
      <section
        style={{
          padding: '48px 24px',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <h2 className="font-headline-sm" style={{ color: 'var(--color-on-surface)' }}>
            Recent Charts
          </h2>
          {savedProfiles.length > 0 && (
            <button
              onClick={onViewAllSaved}
              className="font-label-xs"
              style={{
                color: 'var(--color-primary)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View All</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                arrow_forward
              </span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentList.map((item, idx) => {
            const initial = (item.name || 'C').charAt(0).toUpperCase();
            const isSaved = 'id' in item && typeof item.id === 'string';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: 'var(--color-surface-container)',
                  borderRadius: '2px',
                  border: '1px solid rgba(212, 196, 183, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)';
                  const btnGroup = e.currentTarget.querySelector('.action-group') as HTMLElement;
                  if (btnGroup) btnGroup.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
                  const btnGroup = e.currentTarget.querySelector('.action-group') as HTMLElement;
                  if (btnGroup) btnGroup.style.opacity = '0';
                }}
                onClick={() => (isSaved ? onOpenProfile(item) : onLoadDemoProfile(item))}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(166, 124, 82, 0.08)',
                    }}
                  >
                    <span className="font-display-md" style={{ fontSize: '20px', lineHeight: 1, paddingTop: '2px' }}>
                      {initial}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                      {item.name}
                    </span>
                    <div
                      className="font-data-mono"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-on-surface-variant)',
                        opacity: 0.8,
                        marginTop: '3px',
                      }}
                    >
                      <span>{item.dateOfBirth}</span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-outline-variant)' }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.placeOfBirth}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="action-group"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isSaved && item.id && (
                    <button
                      onClick={() => onDeleteProfile(item.id!)}
                      style={{
                        padding: '6px',
                        color: 'var(--color-on-surface-variant)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                      title="Delete profile"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        delete
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => (isSaved ? onOpenProfile(item) : onLoadDemoProfile(item))}
                    className="font-label-xs"
                    style={{
                      padding: '8px 16px',
                      color: 'var(--color-primary)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(121, 84, 46, 0.25)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(121, 84, 46, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
