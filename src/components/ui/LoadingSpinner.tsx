import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Calculating Birth Chart...',
  subMessage = 'Computing astronomical ephemeris and planetary houses...',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
        textAlign: 'center',
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid var(--border-medium)',
          borderTopColor: 'var(--accent-bronze)',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px',
        }}
      />
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-heading)',
          fontFamily: 'var(--font-serif)',
          marginBottom: '4px',
        }}
      >
        {message}
      </h3>
      {subMessage && (
        <p
          style={{
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            maxWidth: '380px',
          }}
        >
          {subMessage}
        </p>
      )}
    </div>
  );
};
