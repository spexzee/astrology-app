import { useState, useEffect } from 'react';
import { Layout, type NavItem } from './components/layout/Layout';
import {
  DashboardPage,
  NewChartPage,
  ChartViewPage,
  SavedChartsPage,
  ReportsPage,
} from './pages';
import { generateBirthChart } from './astrology/services/chartService';
import {
  saveProfileToStorage,
  getProfilesFromStorage,
  deleteProfileFromStorage,
} from './services/storageService';
import { generatePdfReport } from './services/pdfService';
import type {
  BirthDetails,
  ChartData,
  SavedProfileRecord,
} from './astrology/types/chart';

export function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>('dashboard');
  const [savedProfiles, setSavedProfiles] = useState<SavedProfileRecord[]>([]);
  const [activeChartData, setActiveChartData] = useState<ChartData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formInitialData, setFormInitialData] = useState<Partial<BirthDetails> | null>(null);

  // Load saved profiles from SQLite on startup
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const profiles = await getProfilesFromStorage();
      setSavedProfiles(profiles);
    } catch (err) {
      console.error('Failed to load profiles from SQLite:', err);
    }
  };

  const handleGenerateChart = async (details: BirthDetails) => {
    setIsCalculating(true);
    setTimeout(() => {
      try {
        const chart = generateBirthChart(details);
        setActiveChartData(chart);
        setIsSaved(!!details.id);
        setIsCalculating(false);
        setCurrentNav('chart-view');
      } catch (err) {
        console.error('Calculation error:', err);
        setIsCalculating(false);
        alert('Failed to generate chart. Please check the birth details.');
      }
    }, 300);
  };

  const handleSaveProfile = async (chart: ChartData) => {
    try {
      const savedRecord = await saveProfileToStorage(chart.birthDetails);
      setIsSaved(true);
      setActiveChartData({
        ...chart,
        birthDetails: {
          ...chart.birthDetails,
          id: savedRecord.id,
          createdAt: savedRecord.createdAt,
          updatedAt: savedRecord.updatedAt,
        },
      });
      await loadProfiles();
    } catch (err: any) {
      console.error('Save failed:', err);
      throw err;
    }
  };

  const handleDeleteProfile = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this saved profile?')) {
      try {
        await deleteProfileFromStorage(id);
        if (activeChartData?.birthDetails.id === id) {
          setIsSaved(false);
        }
        await loadProfiles();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleOpenProfile = (profile: BirthDetails) => {
    try {
      const chart = generateBirthChart(profile);
      setActiveChartData(chart);
      setIsSaved(true);
      setCurrentNav('chart-view');
    } catch (err) {
      console.error('Failed to open chart for profile:', err);
    }
  };

  const handleLoadDemoProfile = (demo: BirthDetails) => {
    setFormInitialData(demo);
    handleGenerateChart(demo);
  };

  const handleExportActivePdf = async () => {
    if (!activeChartData) return;
    try {
      await generatePdfReport(activeChartData);
    } catch (err) {
      console.error('PDF export failed:', err);
    }
  };

  return (
    <Layout
      currentNav={currentNav}
      onNavigate={(nav) => {
        if (nav === 'new-chart') {
          setFormInitialData(null);
        }
        setCurrentNav(nav);
      }}
      activeChartName={activeChartData ? `${activeChartData.birthDetails.name}'s Chart` : undefined}
      hasActiveChart={activeChartData !== null}
      onSave={activeChartData ? () => handleSaveProfile(activeChartData) : undefined}
      onExportPdf={activeChartData ? handleExportActivePdf : undefined}
      isSaved={isSaved}
    >
      {currentNav === 'dashboard' && (
        <DashboardPage
          savedProfiles={savedProfiles}
          onOpenProfile={handleOpenProfile}
          onDeleteProfile={handleDeleteProfile}
          onNewChart={() => {
            setFormInitialData(null);
            setCurrentNav('new-chart');
          }}
          onViewAllSaved={() => setCurrentNav('saved-charts')}
          onViewReports={() => setCurrentNav('reports')}
          onLoadDemoProfile={handleLoadDemoProfile}
        />
      )}

      {currentNav === 'new-chart' && (
        <NewChartPage
          initialData={formInitialData}
          onGenerate={handleGenerateChart}
          isCalculating={isCalculating}
        />
      )}

      {currentNav === 'chart-view' && activeChartData && (
        <ChartViewPage
          chartData={activeChartData}
          onSaveProfile={handleSaveProfile}
          onBack={() => setCurrentNav('dashboard')}
          isSaved={isSaved}
        />
      )}

      {currentNav === 'saved-charts' && (
        <SavedChartsPage
          savedProfiles={savedProfiles}
          onOpenProfile={handleOpenProfile}
          onDeleteProfile={handleDeleteProfile}
          onNewChart={() => {
            setFormInitialData(null);
            setCurrentNav('new-chart');
          }}
        />
      )}

      {currentNav === 'reports' && (
        <ReportsPage
          savedProfiles={savedProfiles}
          activeChartData={activeChartData}
          onNewChart={() => {
            setFormInitialData(null);
            setCurrentNav('new-chart');
          }}
          onOpenChart={handleOpenProfile}
        />
      )}
    </Layout>
  );
}

export default App;
