import React from 'react';

export type NavItem = 'dashboard' | 'new-chart' | 'saved-charts' | 'chart-view' | 'reports';

interface SidebarProps {
  currentNav: NavItem;
  onNavigate: (item: NavItem) => void;
  hasActiveChart: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  hasActiveChart,
}) => {
  const navItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: 'dashboard' },
    { id: 'new-chart' as NavItem, label: 'New Chart', icon: 'add_circle' },
    { id: 'saved-charts' as NavItem, label: 'Saved Charts', icon: 'folder_shared' },
    ...(hasActiveChart
      ? [{ id: 'chart-view' as NavItem, label: 'Active Kundali', icon: 'flare' }]
      : []),
    { id: 'reports' as NavItem, label: 'Reports', icon: 'auto_stories' },
  ];

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        width: '240px',
        backgroundColor: 'var(--color-surface-container-low)',
        borderRight: '1px solid rgba(212, 196, 183, 0.4)',
        boxShadow: '4px 0 12px rgba(166, 124, 82, 0.04)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          className="font-title-caps"
          style={{
            color: 'var(--color-primary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Menu
        </span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {navItems.map((item) => {
          const isActive = currentNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 24px',
                width: '100%',
                backgroundColor: isActive ? 'var(--color-surface-container-high)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  marginRight: '16px',
                  fontSize: '20px',
                  color: isActive ? 'var(--color-primary)' : 'inherit',
                }}
              >
                {item.icon}
              </span>
              <span className="font-body-sm" style={{ fontWeight: isActive ? 500 : 400 }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
