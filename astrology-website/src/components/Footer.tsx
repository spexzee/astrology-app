import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
  { label: 'Downloads', to: '/downloads' },
]

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand column */}
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink} aria-label="Vedic Astrology — Home">
            <img
              src="/logo.png"
              alt="Vedic Astrology logo"
              className={styles.logo}
              width={24}
              height={24}
            />
            <span className={`t-headline ${styles.brandName}`}>Vedic Astrology</span>
          </Link>
          <p className={`t-body-sm ${styles.tagline}`}>
            Professional Vedic Astrology Desktop Software
          </p>
        </div>

        {/* Nav links */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.navList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={`t-body-sm ${styles.navLink}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={`t-body-sm ${styles.copyright}`}>
            © 2026 Vedic Astrology. All rights reserved.
          </p>
          <p className={`t-body-sm ${styles.platform}`}>
            Windows Desktop Application
          </p>
        </div>
      </div>
    </footer>
  )
}
