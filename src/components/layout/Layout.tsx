import React from 'react';
import { Sidebar, type NavItem } from './Sidebar';
import { Header } from './Header';

export type { NavItem };

interface LayoutProps {
  currentNav: NavItem;
  onNavigate: (item: NavItem) => void;
  activeChartName?: string;
  hasActiveChart: boolean;
  onSave?: () => void;
  onExportPdf?: () => void;
  isSaved?: boolean;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentNav,
  onNavigate,
  activeChartName,
  hasActiveChart,
  onSave,
  onExportPdf,
  isSaved,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--color-background)',
      }}
    >
      {/* Fixed Sidebar */}
      <Sidebar
        currentNav={currentNav}
        onNavigate={onNavigate}
        hasActiveChart={hasActiveChart}
      />

      {/* Main App Workspace */}
      <div
        style={{
          marginLeft: '240px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <Header
          activeChartName={activeChartName}
          onSave={onSave}
          onExportPdf={onExportPdf}
          isSaved={isSaved}
        />

        {/* Scrollable Viewport */}
        <main
          style={{
            marginTop: '56px',
            flex: 1,
            overflowY: 'auto',
            backgroundColor: 'var(--color-background)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
