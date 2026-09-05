import React from 'react'
import { Button } from '../components/Button'
import { AppMockup } from '../components/AppMockup'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { downloadConfig } from '../config/downloads'
import styles from './HomePage.module.css'

export const HomePage: React.FC = () => {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef}>
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          {/* Left: Copy */}
          <div className={styles.heroText}>
            <p className={`t-label ${styles.heroEyebrow}`}>
              Version {downloadConfig.version} — Windows Desktop
            </p>
            <h1 className={`t-display-xl ${styles.heroHeading}`}>
              Professional Vedic Astrology,{' '}
              <em className={styles.heroHeadingEm}>Designed for the Desktop.</em>
            </h1>
            <p className={`t-body-lg ${styles.heroSubtitle}`}>
              Create, explore and manage Kundali charts with a focused desktop
              application built for professional astrology workflows.
            </p>
            <div className={styles.heroActions}>
              <Button
                variant="primary"
                size="lg"
                as="a"
                href={downloadConfig.windows.available ? downloadConfig.windows.installer : '/downloads'}
                download={downloadConfig.windows.available}
                id="hero-download-btn"
              >
                <WindowsIcon />
                Download for Windows
              </Button>
              <Button
                variant="ghost"
                size="lg"
                as="a"
                href="/features"
                id="hero-features-btn"
              >
                Explore Features
                <ArrowIcon />
              </Button>
            </div>
            <p className={`t-body-sm ${styles.heroPlatform}`}>
              Windows 10 / 11 · 64-bit
            </p>
          </div>

          {/* Right: Mockup */}
          <div className={styles.heroMockup}>
            <AppMockup />
          </div>
        </div>

        {/* Ambient geometry */}
        <div className={styles.heroGeometry} aria-hidden="true">
          <AmbientGeometry />
        </div>
      </section>

      {/* ============================================================
          PRODUCT INTRO
      ============================================================ */}
      <section className={styles.intro}>
        <div className="container">
          <div className={`${styles.introHeader} reveal`}>
            <h2 className={`t-display-md ${styles.introHeading}`}>
              A focused workspace for Vedic astrology.
            </h2>
            <p className={`t-body-lg ${styles.introText}`}>
              Vedic Astrology brings essential birth chart information into one
              focused desktop workspace — from birth details and D1&nbsp;/&nbsp;Rashi charts
              to planetary positions and printable reports.
            </p>
          </div>

          <div className={`${styles.highlights} stagger`}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className={`${styles.highlight} reveal`}>
                <div className={styles.highlightIcon} aria-hidden="true">
                  {h.icon}
                </div>
                <div className={styles.highlightBody}>
                  <h3 className={`t-headline ${styles.highlightTitle}`}>{h.title}</h3>
                  <p className={`t-body-md ${styles.highlightDesc}`}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ============================================================
          HOW IT WORKS
      ============================================================ */}
      <section className={styles.howItWorks}>
        <div className="container">
          <p className={`t-label ${styles.sectionLabel}`}>How it works</p>
          <h2 className={`t-display-md ${styles.sectionHeading} reveal`}>
            From birth details to a complete chart.
          </h2>

          <div className={`${styles.steps} stagger`}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={`${styles.step} reveal`}>
                <div className={styles.stepNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className={styles.stepDivider} aria-hidden="true" />
                <div className={styles.stepBody}>
                  <h3 className={`t-headline ${styles.stepTitle}`}>{step.title}</h3>
                  <p className={`t-body-md ${styles.stepDesc}`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ============================================================
          WHY DESKTOP
      ============================================================ */}
      <section className={styles.whyDesktop}>
        <div className="container">
          <div className={styles.whyDesktopInner}>
            <div className={styles.whyDesktopLeft}>
              <p className={`t-label ${styles.sectionLabel}`}>Why desktop</p>
              <h2 className={`t-display-md reveal`}>
                Built for focused desktop work.
              </h2>
            </div>
            <div className={`${styles.whyDesktopRight} reveal`}>
              <ul className={styles.whyList}>
                {WHY_ITEMS.map((item) => (
                  <li key={item} className={`t-body-lg ${styles.whyItem}`}>
                    <span className={styles.whyBullet} aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ============================================================
          DOWNLOAD CTA
      ============================================================ */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2 className={`t-display-md ${styles.ctaHeading}`}>
                Ready to explore Vedic Astrology?
              </h2>
              <p className={`t-body-lg ${styles.ctaSubtext}`}>
                Download the Windows application and create your first birth chart.
              </p>
            </div>
            <div className={styles.ctaAction}>
              <Button
                variant="primary"
                size="lg"
                as="a"
                href={downloadConfig.windows.available ? downloadConfig.windows.installer : '/downloads'}
                download={downloadConfig.windows.available}
                id="cta-download-btn"
              >
                <WindowsIcon />
                Download for Windows
              </Button>
              <div className={styles.ctaMeta}>
                <span className={`t-label ${styles.ctaMetaItem}`}>Windows</span>
                <span className={styles.ctaMetaDot} aria-hidden="true" />
                <span className={`t-label ${styles.ctaMetaItem}`}>Desktop Application</span>
                <span className={styles.ctaMetaDot} aria-hidden="true" />
                <span className={`t-label ${styles.ctaMetaItem}`}>
                  Version {downloadConfig.version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ----------------------------------------------------------------
   Data
---------------------------------------------------------------- */
const HIGHLIGHTS = [
  {
    title: 'D1 / Rashi Chart',
    desc: 'Explore the North Indian style birth chart with clear planetary placements.',
    icon: <ChartIcon />,
  },
  {
    title: 'Planetary Information',
    desc: 'Review planetary signs, degrees, houses and Nakshatras in a structured format.',
    icon: <PlanetIcon />,
  },
  {
    title: 'PDF Reports',
    desc: 'Generate a clean birth chart report for sharing or record keeping.',
    icon: <PdfIcon />,
  },
]

const STEPS = [
  {
    title: 'Enter Birth Details',
    desc: 'Enter the person\'s date, time and place of birth.',
  },
  {
    title: 'Generate Kundali',
    desc: 'Generate the D1/Rashi chart and planetary information instantly.',
  },
  {
    title: 'Save & Export',
    desc: 'Keep charts locally and generate a PDF report for sharing.',
  },
]

const WHY_ITEMS = [
  'Work from a dedicated desktop workspace.',
  'Keep birth charts available locally on your machine.',
  'Review chart information without opening a browser dashboard.',
  'Generate clean reports exactly when needed.',
]

/* ----------------------------------------------------------------
   Inline SVG icons (tiny, no external dependency)
---------------------------------------------------------------- */
function WindowsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <path d="M0 2.1L6.2 1.3V7H0V2.1zm0 10.8L6.2 13.7V8H0v4.9zm7-9.7l8-1.1V7H7V3.2zm0 11.6l8 1.1V8H7v6.8z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" />
      <line x1="2" y1="2" x2="18" y2="18" />
      <line x1="18" y1="2" x2="2" y2="18" />
      <line x1="10" y1="2" x2="2" y2="10" />
      <line x1="2" y1="10" x2="10" y2="18" />
      <line x1="10" y1="18" x2="18" y2="10" />
      <line x1="18" y1="10" x2="10" y2="2" />
    </svg>
  )
}

function PlanetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <ellipse cx="10" cy="10" rx="7" ry="3" />
      <line x1="10" y1="3" x2="10" y2="17" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M5 2h8l3 3v13H4V2h1z" />
      <path d="M13 2v3h3" />
      <line x1="7" y1="9" x2="13" y2="9" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <line x1="7" y1="15" x2="10" y2="15" />
    </svg>
  )
}

function AmbientGeometry() {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="300" cy="200" r="180" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.12" />
      <circle cx="300" cy="200" r="120" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.1" />
      <circle cx="300" cy="200" r="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.1" />
      <ellipse cx="300" cy="200" rx="180" ry="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.08" />
      <ellipse cx="300" cy="200" rx="180" ry="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.08" transform="rotate(60 300 200)" />
      <ellipse cx="300" cy="200" rx="180" ry="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.08" transform="rotate(120 300 200)" />
    </svg>
  )
}


