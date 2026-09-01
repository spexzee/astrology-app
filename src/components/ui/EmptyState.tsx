import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-surface-subtle)',
        border: '1px dashed var(--border-medium)',
        borderRadius: 'var(--radius-md)',
      }}
      className="animate-fade-in"
    >
      {icon && (
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-bronze)',
            marginBottom: '14px',
          }}
        >
          {icon}
        </div>
      )}
      <h4
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-heading)',
          fontFamily: 'var(--font-serif)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          maxWidth: '360px',
          marginBottom: actionText ? '18px' : '0',
        }}
      >
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
