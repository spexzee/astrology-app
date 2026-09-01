import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'flat' | 'subtle';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  variant = 'default',
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`panel ${className}`}
      style={{
        backgroundColor: variant === 'subtle' ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: variant === 'flat' ? 'none' : 'var(--shadow-subtle)',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-subtle)',
            gap: '12px',
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  marginTop: '1px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  );
};
