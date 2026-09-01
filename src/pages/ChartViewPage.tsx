import React, { useState } from 'react';
import { RashiChart } from '../components/chart/RashiChart';
import { generatePdfReport } from '../services/pdfService';
import type { ChartData, HouseInfo } from '../astrology/types/chart';

interface ChartViewPageProps {
  chartData: ChartData;
  onSaveProfile: (chartData: ChartData) => Promise<void>;
  onBack: () => void;
  isSaved?: boolean;
}

const PLANET_ICONS: Record<string, string> = {
  Sun: 'brightness_5',
  Moon: 'bedtime',
  Mars: 'local_fire_department',
  Mercury: 'speed',
  Jupiter: 'stars',
  Venus: 'diamond',
  Saturn: 'public',
  Rahu: 'hdr_strong',
  Ketu: 'hdr_weak',
  Ascendant: 'flare',
};

export const ChartViewPage: React.FC<ChartViewPageProps> = ({
  chartData,
  onSaveProfile,
  onBack,
  isSaved = false,
}) => {
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(isSaved);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<HouseInfo | null>(
    chartData.houses.find((h) => h.houseNumber === 1) || null
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveProfile(chartData);
      setSavedSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      await generatePdfReport(chartData);
    } catch (err) {
      console.error(err);
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '24px',
        gap: '24px',
      }}
      className="animate-fade-in"
    >
      {/* Top Split Workspace (60% Chart / 40% Sidebar) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(420px, 6fr) minmax(320px, 4fr)',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {/* Left: Main Chart Area (60%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                className="font-title-caps"
                style={{
                  color: 'var(--color-on-surface-variant)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Rashi Chart (D1)
              </span>
              <span className="font-headline-sm" style={{ color: 'var(--color-on-surface)', fontSize: '22px' }}>
                {chartData.birthDetails.name || 'Birth Chart'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '6px 14px',
                  backgroundColor: savedSuccess ? 'var(--color-surface-container-highest)' : 'var(--color-surface-container-high)',
                  border: '1px solid rgba(212, 196, 183, 0.4)',
                  color: savedSuccess ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  cursor: saving ? 'wait' : 'pointer',
                  borderRadius: '2px',
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {saving ? 'Saving...' : savedSuccess ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleExportPdf}
                disabled={exportingPdf}
                style={{
                  padding: '6px 14px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  border: '1px solid rgba(212, 196, 183, 0.4)',
                  color: 'var(--color-on-surface-variant)',
                  cursor: exportingPdf ? 'wait' : 'pointer',
                  borderRadius: '2px',
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-body)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  picture_as_pdf
                </span>
                <span>{exportingPdf ? 'Exporting...' : 'Export PDF'}</span>
              </button>
            </div>
          </div>

          {/* North Indian D1 SVG Chart */}
          <RashiChart
            chartData={chartData}
            selectedHouseNumber={selectedHouse?.houseNumber}
            onSelectHouse={(house) => setSelectedHouse(house)}
          />
        </div>

        {/* Right Side Panels (40%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Birth Details Panel */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid rgba(212, 196, 183, 0.4)',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid rgba(212, 196, 183, 0.3)',
                backgroundColor: 'var(--color-surface-container-low)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                className="font-title-caps"
                style={{
                  color: 'var(--color-on-surface-variant)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Birth Details
              </span>
              <button
                onClick={onBack}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--color-on-surface-variant)',
                  cursor: 'pointer',
                }}
                title="Edit / New Chart"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  edit
                </span>
              </button>
            </div>

            <div
              style={{
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '20px',
                rowGap: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                  Name
                </span>
                <span className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                  {chartData.birthDetails.name || 'Unnamed Native'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                  Date
                </span>
                <span className="font-body-md" style={{ color: 'var(--color-on-surface)' }}>
                  {chartData.birthDetails.dateOfBirth}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                  Time
                </span>
                <span className="font-body-md" style={{ color: 'var(--color-on-surface)' }}>
                  {chartData.birthDetails.timeOfBirth}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                  Place
                </span>
                <span className="font-body-md" style={{ color: 'var(--color-on-surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {chartData.birthDetails.placeOfBirth}
                </span>
              </div>

              <div
                style={{
                  gridColumn: '1 / -1',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(212, 196, 183, 0.3)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                    Ascendant
                  </span>
                  <span className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                    {chartData.ascendant.signName}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                    Moon Sign
                  </span>
                  <span className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                    {chartData.moonSign.name}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="font-label-xs" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7, textTransform: 'uppercase' }}>
                    Nakshatra
                  </span>
                  <span className="font-body-md" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                    {chartData.nakshatra.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Indicators Panel */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid rgba(212, 196, 183, 0.4)',
              borderRadius: '2px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid rgba(212, 196, 183, 0.3)',
                backgroundColor: 'var(--color-surface-container-low)',
              }}
            >
              <span
                className="font-title-caps"
                style={{
                  color: 'var(--color-on-surface-variant)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Key Indicators
              </span>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(212, 196, 183, 0.25)',
                  paddingBottom: '8px',
                }}
              >
                <span className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Ascendant Lord
                </span>
                <span className="font-data-mono" style={{ color: 'var(--color-on-surface)', fontWeight: 600 }}>
                  {chartData.ascendant.signLord}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(212, 196, 183, 0.25)',
                  paddingBottom: '8px',
                }}
              >
                <span className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Rashi Lord
                </span>
                <span className="font-data-mono" style={{ color: 'var(--color-on-surface)', fontWeight: 600 }}>
                  {chartData.moonSign.lord}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Ayanamsa
                </span>
                <span className="font-data-mono" style={{ color: 'var(--color-on-surface)', fontWeight: 600 }}>
                  {chartData.ayanamsa.formatted} (Lahiri)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Planetary Positions Table (Full Width Bottom) */}
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <span
            className="font-title-caps"
            style={{
              color: 'var(--color-on-surface-variant)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Planetary Positions
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span
              className="font-label-xs"
              style={{
                color: 'var(--color-on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
              Exalted
            </span>
            <span
              className="font-label-xs"
              style={{
                color: 'var(--color-on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-error)' }} />
              Debilitated
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            border: '1px solid rgba(212, 196, 183, 0.4)',
            overflowX: 'auto',
            borderRadius: '2px',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  borderBottom: '1px solid rgba(212, 196, 183, 0.5)',
                }}
              >
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  Planet
                </th>
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  Sign
                </th>
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  Degree
                </th>
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  House
                </th>
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  Nakshatra
                </th>
                <th style={{ padding: '8px 16px' }} className="font-title-caps">
                  Pada
                </th>
              </tr>
            </thead>
            <tbody className="font-data-mono" style={{ color: 'var(--color-on-surface)' }}>
              {[chartData.ascendant, ...chartData.planets].map((p) => {
                const iconName = PLANET_ICONS[p.name] || 'circle';
                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid rgba(212, 196, 183, 0.25)',
                      transition: 'background-color 0.12s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: '16px',
                            color: p.id === 'Ascendant' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                          }}
                        >
                          {iconName}
                        </span>
                        <span className="font-body-sm" style={{ fontWeight: p.id === 'Ascendant' ? 600 : 400 }}>
                          {p.name} ({p.shortCode})
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      {p.signName} ({p.signSanskrit})
                    </td>
                    <td style={{ padding: '10px 16px' }}>{p.degreeFormatted}</td>
                    <td style={{ padding: '10px 16px' }}>{p.house}</td>
                    <td style={{ padding: '10px 16px' }}>{p.nakshatra.name}</td>
                    <td style={{ padding: '10px 16px' }}>{p.nakshatra.pada}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
