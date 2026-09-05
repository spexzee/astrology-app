import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { downloadConfig } from '../config/downloads'
import styles from './DownloadsPage.module.css'

export const DownloadsPage: React.FC = () => {
  const revealRef = useScrollReveal()
  const { windows, version, releaseDate, platform, architecture, license } = downloadConfig

  return (
    <div ref={revealRef} className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <PageHeader
            eyebrow="Downloads"
            title="Download Vedic Astrology"
            subtitle="Get the latest Windows desktop version."
          />
        </div>
      </section>

      <section className={styles.downloadSection}>
        <div className="container">
          <div className={styles.layout}>
            {/* ---- Download options ---- */}
            <div className={`${styles.options} reveal`}>
              {/* Primary — Installer */}
              <div className={styles.primaryDownload}>
                <div className={styles.downloadHeader}>
                  <p className={`t-label ${styles.downloadLabel}`}>Windows Application</p>
                  <h2 className={`t-display-sm ${styles.downloadTitle}`}>
                    Vedic Astrology
                  </h2>
                  <p className={`t-body-md ${styles.downloadMeta}`}>
                    Version {version} · {platform} · {architecture}
                  </p>
                </div>

                <div className={styles.downloadAction}>
                  {windows.available ? (
                    <Button
                      variant="primary"
                      size="lg"
                      as="a"
                      href={windows.installer}
                      download
                      id="download-installer-btn"
                    >
                      <DownloadIcon />
                      Download Installer (.exe)
                    </Button>
                  ) : (
                    <div className={styles.unavailableWrap}>
                      <Button
                        variant="outline"
                        size="lg"
                        as="a"
                        href={windows.releasesPage}
                        id="download-releases-btn"
                      >
                        View Releases Page
                      </Button>
                      <p className={`t-body-sm ${styles.unavailableNote}`}>
                        The installer download will be available on the first public release.
                        Check the releases page for updates.
                      </p>
                    </div>
                  )}
                </div>

                {/* Portable ZIP */}
                <div className={styles.secondaryDownload}>
                  <div className={styles.secondaryHeader}>
                    <div>
                      <p className={`t-label ${styles.secondaryLabel}`}>Portable Version</p>
                      <p className={`t-body-md ${styles.secondaryDesc}`}>
                        Run the application without a traditional installation. Extract and run directly.
                      </p>
                    </div>
                    {windows.available ? (
                      <Button
                        variant="outline"
                        size="sm"
                        as="a"
                        href={windows.zip}
                        download
                        id="download-zip-btn"
                      >
                        <DownloadIcon size={13} />
                        Download ZIP
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        as="a"
                        href={windows.releasesPage}
                        id="download-zip-releases-btn"
                      >
                        View Releases
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Notice if unavailable */}
              {!windows.available && (
                <div className={`${styles.notice} reveal`}>
                  <span className={styles.noticeIcon} aria-hidden="true">ℹ</span>
                  <p className={`t-body-sm ${styles.noticeText}`}>
                    <strong>Coming soon.</strong> Download files will be hosted on GitHub Releases.
                    When the first version is published, the download buttons above will link directly
                    to the installer and ZIP files.
                  </p>
                </div>
              )}
            </div>

            {/* ---- Version info sidebar ---- */}
            <aside className={`${styles.versionInfo} reveal`}>
              <p className={`t-label ${styles.versionLabel}`}>Release information</p>

              <dl className={styles.versionList}>
                <div className={styles.versionRow}>
                  <dt className={`t-label ${styles.versionDt}`}>Latest Version</dt>
                  <dd className={`t-body-md ${styles.versionDd}`}>{version}</dd>
                </div>
                <div className={styles.versionRow}>
                  <dt className={`t-label ${styles.versionDt}`}>Released</dt>
                  <dd className={`t-body-md ${styles.versionDd}`}>{releaseDate}</dd>
                </div>
                <div className={styles.versionRow}>
                  <dt className={`t-label ${styles.versionDt}`}>Platform</dt>
                  <dd className={`t-body-md ${styles.versionDd}`}>{platform}</dd>
                </div>
                <div className={styles.versionRow}>
                  <dt className={`t-label ${styles.versionDt}`}>Architecture</dt>
                  <dd className={`t-body-md ${styles.versionDd}`}>{architecture}</dd>
                </div>
                <div className={styles.versionRow}>
                  <dt className={`t-label ${styles.versionDt}`}>License</dt>
                  <dd className={`t-body-md ${styles.versionDd}`}>{license}</dd>
                </div>
              </dl>

              <div className={styles.systemReqs}>
                <p className={`t-label ${styles.reqsLabel}`}>System requirements</p>
                <ul className={styles.reqsList}>
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className={`t-body-sm ${styles.reqsItem}`}>
                      <span aria-hidden="true">–</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* ---- GitHub Releases note ---- */}
          <div className={`${styles.releasesNote} reveal`}>
            <p className={`t-label ${styles.releasesNoteLabel}`}>About download hosting</p>
            <p className={`t-body-md ${styles.releasesNoteText}`}>
              Release binaries are hosted on GitHub Releases. This keeps the repository small
              and makes version management straightforward. Future versions will follow the same pattern —
              each release will have a tagged installer and portable ZIP available for download.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ----------------------------------------------------------------
   Data
---------------------------------------------------------------- */
const REQUIREMENTS = [
  'Windows 10 or Windows 11',
  '64-bit processor',
  '4 GB RAM minimum',
  '200 MB disk space',
  'Internet not required',
]

/* ----------------------------------------------------------------
   Icons
---------------------------------------------------------------- */
function DownloadIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7.5 2v8M4 7l3.5 3.5L11 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 13h11" strokeLinecap="round" />
    </svg>
  )
}
