import React, { useState } from 'react';
import { generatePdfReport } from '../services/pdfService';
import { generateBirthChart } from '../astrology/services/chartService';
import type { SavedProfileRecord, ChartData } from '../astrology/types/chart';

interface ReportsPageProps {
  savedProfiles: SavedProfileRecord[];
  activeChartData?: ChartData | null;
  onNewChart?: () => void;
  onOpenChart: (profile: SavedProfileRecord) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  savedProfiles,
  onOpenChart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setExportingId] = useState<string | null>(null);

  const handleExportProfile = async (profile: SavedProfileRecord) => {
    setExportingId(profile.id);
    try {
      const chartData = generateBirthChart(profile);
      await generatePdfReport(chartData);
    } catch (err) {
      console.error(err);
    } finally {
      setExportingId(null);
    }
  };

  const filtered = savedProfiles.filter((p) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase().trim();
    return p.name.toLowerCase().includes(q) || p.placeOfBirth.toLowerCase().includes(q);
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '32px 48px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
      className="animate-fade-in"
    >
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '40px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(212, 196, 183, 0.35)',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            className="font-title-caps"
            style={{
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Library
          </span>
          <h1 className="font-display-lg" style={{ color: 'var(--color-on-background)', margin: 0 }}>
            Archived Reports
          </h1>
          <p
            className="font-body-md"
            style={{
              color: 'var(--color-on-surface-variant)',
              maxWidth: '680px',
              marginTop: '4px',
              lineHeight: '1.5',
            }}
          >
            A chronological ledger of generated astrological interpretations and chart analyses. These documents represent a snapshot of transits and configurations at the time of creation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              className="font-body-md"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(212, 196, 183, 0.5)',
                padding: '6px 28px 6px 4px',
                color: 'var(--color-on-surface)',
                outline: 'none',
                width: '100%',
                fontSize: '13.5px',
              }}
              placeholder="Search archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                right: '4px',
                top: '4px',
                color: 'var(--color-on-surface-variant)',
                opacity: 0.6,
                fontSize: '18px',
              }}
            >
              search
            </span>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(212, 196, 183, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr 1fr 100px',
            gap: '16px',
            backgroundColor: 'var(--color-surface-container-low)',
            padding: '16px 24px',
          }}
        >
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)', letterSpacing: '0.12em' }}>
            Document Title
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)', letterSpacing: '0.12em' }}>
            Subject Reference
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)', textAlign: 'right', letterSpacing: '0.12em' }}>
            Date Issued
          </div>
          <div className="font-title-caps" style={{ color: 'var(--color-on-surface-variant)', textAlign: 'center', letterSpacing: '0.12em' }}>
            Action
          </div>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: 'var(--color-surface)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary)', opacity: 0.6 }}>
              auto_stories
            </span>
            <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '8px' }}>
              No archived reports available. Create a birth chart to export PDF reports.
            </p>
          </div>
        ) : (
          filtered.map((profile, i) => {
            const initial = (profile.name || 'C').charAt(0).toUpperCase();
            return (
              <div
                key={profile.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 2fr 1fr 100px',
                  gap: '16px',
                  backgroundColor: 'var(--color-surface)',
                  padding: '18px 24px',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(212, 196, 183, 0.25)',
                  transition: 'background-color 0.15s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)';
                  const actions = e.currentTarget.querySelector('.row-actions') as HTMLElement;
                  if (actions) actions.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  const actions = e.currentTarget.querySelector('.row-actions') as HTMLElement;
                  if (actions) actions.style.opacity = '0';
                }}
              >
                {/* Title & Metadata */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="font-headline-sm" style={{ color: 'var(--color-on-background)', fontSize: '18px' }}>
                    D1 Kundali & Natal Synthesis
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      description
                    </span>
                    <span className="font-data-mono" style={{ fontSize: '11px' }}>
                      DOC-{profile.dateOfBirth.replace(/-/g, '')}-{(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span
                      className="font-label-xs"
                      style={{
                        padding: '2px 6px',
                        backgroundColor: 'var(--color-surface-container)',
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Lahiri Sidereal
                    </span>
                  </div>
                </div>

                {/* Subject Reference */}
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
                      fontSize: '14px',
                      border: '1px solid rgba(212, 196, 183, 0.4)',
                    }}
                  >
                    {initial}
                  </div>
                  <span className="font-body-md" style={{ color: 'var(--color-on-surface)' }}>
                    {profile.name}
                  </span>
                </div>

                {/* Date Issued */}
                <div className="font-data-mono" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2px', color: 'var(--color-on-surface-variant)' }}>
                  <span>{new Date(profile.updatedAt).toLocaleDateString()}</span>
                  <span style={{ opacity: 0.6, fontSize: '11px' }}>{profile.timeOfBirth}</span>
                </div>

                {/* Actions */}
                <div
                  className="row-actions"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => onOpenChart(profile)}
                    style={{
                      padding: '6px',
                      borderRadius: '50%',
                      color: 'var(--color-primary)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    title="View Chart"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      visibility
                    </span>
                  </button>
                  <button
                    onClick={() => handleExportProfile(profile)}
                    style={{
                      padding: '6px',
                      borderRadius: '50%',
                      color: 'var(--color-on-surface-variant)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    title="Download PDF"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      download
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
