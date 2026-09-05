import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { FeaturesPage } from './pages/FeaturesPage'
import { AboutPage } from './pages/AboutPage'
import { DownloadsPage } from './pages/DownloadsPage'
import { ContactPage } from './pages/ContactPage'

/**
 * ScrollToTop — scroll to the top of the page on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/**
 * PageTitle — update document title on route change
 */
function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const base = 'Vedic Astrology'
    const routes: Record<string, string> = {
      '/': `${base} — Professional Vedic Astrology Desktop Software`,
      '/features': `Features — ${base}`,
      '/about': `About — ${base}`,
      '/downloads': `Downloads — ${base}`,
      '/contact': `Contact — ${base}`,
    }
    document.title = routes[pathname] ?? base
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div style={{
      paddingTop: 'calc(var(--nav-height) + 80px)',
      paddingBottom: '80px',
      textAlign: 'center',
    }}>
      <div className="container">
        <p className="t-label" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>404</p>
        <h1 className="t-display-md" style={{ marginBottom: '16px' }}>Page not found</h1>
        <p className="t-body-lg" style={{ color: 'var(--color-on-surface-muted)', marginBottom: '32px' }}>
          The page you are looking for does not exist.
        </p>
        <a href="/" className="t-body-md" style={{ color: 'var(--color-primary)' }}>
          ← Return home
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
