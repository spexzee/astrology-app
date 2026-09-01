import React, { useState } from 'react';
import type { SavedProfileRecord, BirthDetails } from '../astrology/types/chart';

interface SavedChartsPageProps {
  savedProfiles: SavedProfileRecord[];
  onOpenProfile: (profile: BirthDetails) => void;
  onDeleteProfile: (id: string) => void;
  onNewChart: () => void;
}

export const SavedChartsPage: React.FC<SavedChartsPageProps> = ({
  savedProfiles,
  onOpenProfile,
  onDeleteProfile,
  onNewChart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = savedProfiles.filter((p) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.placeOfBirth.toLowerCase().includes(q) ||
      p.dateOfBirth.includes(q)
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '32px 48px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
      className="animate-fade-in"
    >
      {/* Page Header & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 className="font-display-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '8px', margin: 0 }}>
            Saved Charts
          </h1>
          <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '640px', marginTop: '4px' }}>
            Access and manage previously calculated Kundli charts. All times are stored in local time of birth.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '260px' }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-on-surface-variant)',
                opacity: 0.6,
                fontSize: '20px',
              }}
            >
              search
            </span>
            <input
              type="text"
              className="font-body-md"
              style={{
                width: '100%',
                backgroundColor: 'var(--color-surface-container-high)',
                border: 'none',
                padding: '10px 16px 10px 40px',
                borderRadius: '8px',
                color: 'var(--color-on-surface)',
                outline: 'none',
                fontSize: '13.5px',
              }}
              placeholder="Search by name or place..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={onNewChart}
            className="font-label-xs"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              backgroundColor: 'var(--color-surface-container-high)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--color-on-surface)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              add
            </span>
            <span>New Chart</span>
          </button>
        </div>
      </div>

      {/* Data Table Container */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(121, 84, 46, 0.06)',
          border: '1px solid rgba(212, 196, 183, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 2fr) minmax(120px, 1fr) minmax(120px, 1fr) minmax(160px, 1.5fr) minmax(120px, 1fr) 100px',
            gap: '16px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-surface-container-low)',
            borderBottom: '1px solid rgba(212, 196, 183, 0.35)',
          }}
        >
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Native Name
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Date of Birth
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Time
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Place
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Last Updated
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)', textAlign: 'right' }}>
            Action
          </div>
        </div>

        {/* Table Body */}
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary)', opacity: 0.6 }}>
                folder_open
              </span>
              <p className="font-body-md" style={{ marginTop: '8px' }}>
                {searchTerm ? `No charts matching "${searchTerm}".` : 'No saved charts in local SQLite database.'}
              </p>
            </div>
          ) : (
            filtered.map((profile) => {
              const initial = (profile.name || 'C').charAt(0).toUpperCase();
              return (
                <div
                  key={profile.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(180px, 2fr) minmax(120px, 1fr) minmax(120px, 1fr) minmax(160px, 1.5fr) minmax(120px, 1fr) 100px',
                    gap: '16px',
                    padding: '14px 24px',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(212, 196, 183, 0.15)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(121, 84, 46, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => onOpenProfile(profile)}
                >
                  {/* Name with initial avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-surface-container-high)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 600,
                      }}
                    >
                      {initial}
                    </div>
                    <div>
                      <div className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                        {profile.name}
                      </div>
                      <div className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', display: 'flex', gap: '4px', opacity: 0.8 }}>
                        <span>{profile.gender || 'Native'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="font-data-mono" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {profile.dateOfBirth}
                  </div>

                  {/* Time */}
                  <div className="font-data-mono" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {profile.timeOfBirth}
                  </div>

                  {/* Place */}
                  <div className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {profile.placeOfBirth}
                  </div>

                  {/* Last Updated */}
                  <div className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div
                    style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onOpenProfile(profile)}
                      className="font-label-xs"
                      style={{
                        padding: '6px 12px',
                        color: 'var(--color-primary)',
                        border: '1px solid rgba(121, 84, 46, 0.25)',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-surface-container-lowest)',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => onDeleteProfile(profile.id)}
                      style={{
                        padding: '6px',
                        color: 'var(--color-on-surface-variant)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      title="Delete profile"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderTop: '1px solid rgba(212, 196, 183, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <span className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Showing {filtered.length} of {savedProfiles.length} charts
          </span>
        </div>
      </div>
    </div>
  );
};
