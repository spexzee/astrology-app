import React from 'react';

interface BadgeProps {
  variant?: 'bronze' | 'slate' | 'neutral' | 'success' | 'danger';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  icon,
  children,
}) => {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
