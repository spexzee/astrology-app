import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import styles from './Navbar.module.css'
import { downloadConfig } from '../config/downloads'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
  { label: 'Downloads', to: '/downloads' },
  { label: 'Contact', to: '/contact' },
]

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change & manage body scroll
  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Brand */}
          <Link to="/" className={styles.brand} aria-label="Vedic Astrology — Home">
            <img
              src="/logo.png"
              alt="Vedic Astrology logo"
              className={styles.logo}
              width={28}
              height={28}
            />
            <span className={`t-headline ${styles.brandName}`}>Vedic Astrology</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`${styles.navLink} t-body-sm ${location.pathname === link.to ? styles.active : ''
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className={styles.cta}>
            <Button
              variant="primary"
              size="sm"
              as="a"
              href={downloadConfig.windows.available ? downloadConfig.windows.installer : '/downloads'}
              download={downloadConfig.windows.available}
            >
              Download for Windows
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={`${styles.bar} ${mobileOpen ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.bar2Open : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.bar3Open : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`${styles.mobileNavLink} t-display-sm ${location.pathname === link.to ? styles.mobileActive : ''
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Button
              variant="primary"
              size="lg"
              as="a"
              href={downloadConfig.windows.available ? downloadConfig.windows.installer : '/downloads'}
              download={downloadConfig.windows.available}
            >
              Download for Windows
            </Button>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
