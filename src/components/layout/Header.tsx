import React from 'react';
import logoImg from '../../assets/logo.png';

interface HeaderProps {
  activeChartName?: string;
  onSave?: () => void;
  onExportPdf?: () => void;
  isSaved?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeChartName,
  onSave,
  onExportPdf,
  isSaved = false,
}) => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: '240px',
        right: 0,
        height: '56px',
        backgroundColor: 'rgba(255, 248, 243, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(212, 196, 183, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 40,
      }}
    >
      {/* Brand Logo & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img
          src={logoImg}
          alt="Vedic Astrology Logo"
          style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
        />
        <span
          className="font-headline-sm"
          style={{ color: 'var(--color-on-surface-variant)', fontSize: '18px' }}
        >
          Vedic Astrology
        </span>
      </div>

      {/* Center Active Chart Indicator */}
      <div style={{ flex: 1, padding: '0 32px', textAlign: 'center' }}>
        <span
          className="font-title-caps"
          style={{
            color: 'var(--color-on-surface-variant)',
            opacity: 0.65,
            fontStyle: 'italic',
            fontSize: '11.5px',
          }}
        >
          {activeChartName || 'Untilled Chart'}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {onSave && (
          <button
            onClick={onSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              color: isSaved ? '#2d6a4f' : 'var(--color-primary)',
              backgroundColor: isSaved ? 'rgba(45, 106, 79, 0.08)' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSaved) e.currentTarget.style.backgroundColor = 'rgba(121, 84, 46, 0.08)';
            }}
            onMouseLeave={(e) => {
              if (!isSaved) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {isSaved ? 'check_circle' : 'save'}
            </span>
            <span className="font-label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>
        )}

        {onExportPdf && (
          <button
            onClick={onExportPdf}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(80, 69, 59, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              picture_as_pdf
            </span>
            <span className="font-label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Export
            </span>
          </button>
        )}

        <div
          style={{
            marginLeft: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-on-primary)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            person
          </span>
        </div>
      </div>
    </header>
  );
};
