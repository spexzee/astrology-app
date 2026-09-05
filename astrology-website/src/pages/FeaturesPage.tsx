import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './FeaturesPage.module.css'

export const FeaturesPage: React.FC = () => {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef} className={styles.page}>
      {/* Page header */}
      <section className={styles.headerSection}>
        <div className="container">
          <PageHeader
            eyebrow="Features"
            title="What Vedic Astrology includes."
            subtitle="A focused set of tools for creating, exploring and documenting Vedic birth charts on the desktop."
          />
        </div>
      </section>

      {/* ---- Feature list ---- */}
      <section className={styles.featureSection}>
        <div className="container">
          {FEATURES.map((feature, i) => (
            <React.Fragment key={feature.title}>
              <div className={`${styles.feature} ${i % 2 === 1 ? styles.featureAlt : ''} reveal`}>
                {/* Visual side */}
                <div className={styles.featureVisual}>
                  <div className={styles.featureIconWrap} aria-hidden="true">
                    {feature.icon}
                  </div>
                  {feature.tags && (
                    <div className={styles.featureTags}>
                      {feature.tags.map((tag) => (
                        <span key={tag} className={`t-label ${styles.featureTag}`}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Text side */}
                <div className={styles.featureText}>
                  <h2 className={`t-display-sm ${styles.featureTitle}`}>{feature.title}</h2>
                  <p className={`t-body-lg ${styles.featureDesc}`}>{feature.desc}</p>
                  {feature.points && (
                    <ul className={styles.featurePoints}>
                      {feature.points.map((pt) => (
                        <li key={pt} className={`t-body-md ${styles.featurePoint}`}>
                          <span className={styles.pointMark} aria-hidden="true">–</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {i < FEATURES.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ---- Summary strip ---- */}
      <section className={styles.summary}>
        <div className="container">
          <div className={styles.summaryInner}>
            <p className={`t-label ${styles.summaryLabel}`}>All included in version 1.0</p>
            <div className={`${styles.summaryGrid} stagger`}>
              {SUMMARY_ITEMS.map((item) => (
                <div key={item} className={`${styles.summaryItem} t-body-sm reveal`}>
                  <span className={styles.summaryMark} aria-hidden="true">✓</span>
                  {item}
                </div>
              ))}
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
const FEATURES = [
  {
    title: 'D1 / Rashi Chart',
    desc: 'North Indian style chart visualization with clear planetary placements. The chart uses the traditional diamond grid layout, showing all twelve houses with their associated signs and planetary occupants.',
    points: [
      'North Indian diamond-grid chart format',
      'All twelve houses displayed',
      'Planetary positions with degrees shown',
      'Ascendant clearly marked',
    ],
    tags: ['Chart', 'Visualization'],
    icon: <RashiChartIcon />,
  },
  {
    title: 'Birth Details',
    desc: 'Capture the complete birth information required for accurate chart calculation. Includes date, time and place of birth with timezone support.',
    points: [
      'Date and time of birth input',
      'Place of birth with coordinate support',
      'Timezone handling',
      'Name and profile information',
    ],
    tags: ['Input', 'Profile'],
    icon: <BirthDetailsIcon />,
  },
  {
    title: 'Planetary Positions',
    desc: 'View all planets with their sign, degree, house placement and Nakshatra information in a clean tabular format. Retrograde status is clearly indicated.',
    points: [
      'All nine classical Vedic planets',
      'Sign and degree information',
      'House placement',
      'Nakshatra and pada',
      'Retrograde status indicated',
    ],
    tags: ['Planets', 'Data'],
    icon: <PlanetTableIcon />,
  },
  {
    title: 'Saved Charts',
    desc: 'Keep previously created birth profiles available locally. Open any saved chart with a single click and pick up exactly where you left off.',
    points: [
      'Local storage of birth profiles',
      'Quick access from dashboard',
      'Open and regenerate any saved chart',
    ],
    tags: ['Storage', 'Workflow'],
    icon: <SavedChartsIcon />,
  },
  {
    title: 'PDF Reports',
    desc: 'Generate a clean, printable PDF report of the birth chart. Includes birth details, the D1 chart and planetary position table — suitable for sharing with clients or keeping records.',
    points: [
      'Single-click PDF generation',
      'Birth details included',
      'Chart and planetary table',
      'Clean, professional layout',
    ],
    tags: ['Export', 'Reports'],
    icon: <PdfIcon />,
  },
  {
    title: 'Desktop Experience',
    desc: 'A dedicated Windows application designed for focused astrology work. No browser required, no cloud account, no subscription. Your charts stay on your machine.',
    points: [
      'Native Windows application',
      'Works offline',
      'Data stored locally',
      'Focused, distraction-free workspace',
    ],
    tags: ['Windows', 'Desktop'],
    icon: <DesktopIcon />,
  },
]

const SUMMARY_ITEMS = [
  'North Indian D1 Chart',
  'Birth Details Input',
  'Planetary Positions',
  'Nakshatra Information',
  'Saved Profiles',
  'PDF Export',
  'Works Offline',
  'Windows 10 / 11',
]

/* ----------------------------------------------------------------
   Feature SVG icons
---------------------------------------------------------------- */
function RashiChartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" />
      <line x1="4" y1="4" x2="44" y2="44" />
      <line x1="44" y1="4" x2="4" y2="44" />
      <line x1="24" y1="4" x2="4" y2="24" />
      <line x1="4" y1="24" x2="24" y2="44" />
      <line x1="24" y1="44" x2="44" y2="24" />
      <line x1="44" y1="24" x2="24" y2="4" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  )
}

function BirthDetailsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="8" y="6" width="32" height="36" rx="1" />
      <line x1="15" y1="16" x2="33" y2="16" />
      <line x1="15" y1="22" x2="33" y2="22" />
      <line x1="15" y1="28" x2="25" y2="28" />
      <circle cx="38" cy="38" r="6" fill="var(--color-background)" />
      <line x1="38" y1="35" x2="38" y2="38" />
      <line x1="38" y1="38" x2="40" y2="38" />
    </svg>
  )
}

function PlanetTableIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="10" width="40" height="28" />
      <line x1="4" y1="18" x2="44" y2="18" />
      <line x1="15" y1="10" x2="15" y2="38" />
      <line x1="28" y1="10" x2="28" y2="38" />
      <circle cx="24" cy="6" r="3" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="34" cy="6" r="2" />
    </svg>
  )
}

function SavedChartsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="6" y="10" width="28" height="32" rx="1" />
      <rect x="14" y="6" width="28" height="32" rx="1" fill="var(--color-background)" />
      <line x1="21" y1="16" x2="35" y2="16" />
      <line x1="21" y1="22" x2="35" y2="22" />
      <line x1="21" y1="28" x2="30" y2="28" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M10 4h20l10 10v30H10V4z" />
      <path d="M30 4v10h10" />
      <line x1="17" y1="22" x2="31" y2="22" />
      <line x1="17" y1="28" x2="31" y2="28" />
      <line x1="17" y1="34" x2="24" y2="34" />
    </svg>
  )
}

function DesktopIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="8" width="40" height="26" rx="1" />
      <line x1="14" y1="40" x2="34" y2="40" />
      <line x1="24" y1="34" x2="24" y2="40" />
      <circle cx="24" cy="21" r="1.5" fill="currentColor" />
    </svg>
  )
}
