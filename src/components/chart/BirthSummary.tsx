import React from 'react';
import type { ChartData } from '../../astrology/types/chart';

interface BirthSummaryProps {
  chartData: ChartData;
}

export const BirthSummary: React.FC<BirthSummaryProps> = ({ chartData }) => {
  const { birthDetails, ascendant, moonSign, nakshatra, ayanamsa } = chartData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Astrological Summary Block */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-heading)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '10px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '6px',
          }}
        >
          Astrological Fundamentals
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ascendant (Lagna)
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '2px' }}>
              {ascendant.signName}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-bronze-dark)' }}>
              {ascendant.signSanskrit} • {ascendant.degreeFormatted}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Moon Sign (Rashi)
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '2px' }}>
              {moonSign.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {moonSign.sanskrit} • Lord: {moonSign.lord}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Janma Nakshatra
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '2px' }}>
              {nakshatra.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Pada {nakshatra.pada} • Lord: {nakshatra.lord}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ayanamsa (Lahiri)
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '2px' }}>
              {ayanamsa.formatted}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Chitrapaksha
            </div>
          </div>
        </div>
      </div>

      {/* Birth Coordinates Block */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Date & Time: </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}>
              {birthDetails.dateOfBirth}, {birthDetails.timeOfBirth}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Place: </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}>
              {birthDetails.placeOfBirth}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Coordinates: </span>
            <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-heading)' }}>
              {birthDetails.latitude.toFixed(2)}°N, {birthDetails.longitude.toFixed(2)}°E (UTC {birthDetails.timezone >= 0 ? '+' : ''}{birthDetails.timezone})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
