import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './AboutPage.module.css'

export const AboutPage: React.FC = () => {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef} className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <PageHeader
            eyebrow="About"
            title="About Vedic Astrology"
          />
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.layout}>
            {/* Main description */}
            <div className={styles.main}>
              <div className={`reveal`}>
                <p className={`t-body-lg ${styles.lead}`}>
                  Vedic Astrology is a desktop application designed to provide
                  a focused workspace for creating and exploring Vedic astrology birth charts.
                </p>
              </div>

              <div className={`${styles.body} reveal`}>
                <p className={`t-body-lg`}>
                  The application brings together the essential tools needed to work with
                  a birth chart in one dedicated workspace — without the distractions of a
                  web application or the overhead of a complex professional software package.
                </p>
                <p className={`t-body-lg`}>
                  Charts are stored locally on your machine. No account is required and
                  no data is sent to external servers.
                </p>
              </div>

              <div className={`${styles.focusSection} reveal`}>
                <h2 className={`t-display-sm ${styles.focusHeading}`}>
                  Version 1.0 focuses on:
                </h2>
                <ul className={styles.focusList}>
                  {FOCUS_ITEMS.map((item) => (
                    <li key={item.title} className={styles.focusItem}>
                      <span className={`t-label ${styles.focusTitle}`}>{item.title}</span>
                      <p className={`t-body-md ${styles.focusDesc}`}>{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar info */}
            <aside className={`${styles.sidebar} reveal`}>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Application</p>
                <p className={`t-body-md ${styles.infoValue}`}>Vedic Astrology</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Version</p>
                <p className={`t-body-md ${styles.infoValue}`}>1.0.0</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Platform</p>
                <p className={`t-body-md ${styles.infoValue}`}>Windows 10 / 11</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Architecture</p>
                <p className={`t-body-md ${styles.infoValue}`}>64-bit</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Chart Style</p>
                <p className={`t-body-md ${styles.infoValue}`}>North Indian / Vedic</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={`t-label ${styles.infoLabel}`}>Data storage</p>
                <p className={`t-body-md ${styles.infoValue}`}>Local only</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ----------------------------------------------------------------
   Data
---------------------------------------------------------------- */
const FOCUS_ITEMS = [
  {
    title: 'Birth Details',
    desc: 'Date, time and place of birth for accurate chart calculation.',
  },
  {
    title: 'D1 / Rashi Chart',
    desc: 'North Indian style birth chart with planetary placements.',
  },
  {
    title: 'Planetary Information',
    desc: 'Sign, degree, house, Nakshatra and retrograde status for each planet.',
  },
  {
    title: 'Saved Charts',
    desc: 'Local storage and quick retrieval of previously created profiles.',
  },
  {
    title: 'PDF Reports',
    desc: 'Clean, printable PDF output of the birth chart and planetary data.',
  },
]
