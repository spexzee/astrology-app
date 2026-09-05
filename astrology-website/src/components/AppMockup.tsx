import React from 'react'
import styles from './AppMockup.module.css'

/**
 * AppMockup — A tasteful representation of the Vedic Astrology desktop
 * application, showing the D1/Rashi chart interface.
 *
 * This is a deliberate editorial mockup, not a fake screenshot.
 * It uses the exact same SVG geometry as the actual RashiChart component.
 */
export const AppMockup: React.FC = () => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* Window chrome */}
      <div className={styles.window}>
        {/* Title bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleBarLeft}>
            <div className={styles.windowDots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.titleBarCenter}>
            <span className={styles.windowTitle}>Vedic Astrology</span>
          </div>
          <div className={styles.titleBarRight}>
            <div className={styles.headerActions}>
              <span className={styles.actionChip}>Save</span>
              <span className={styles.actionChip}>Export PDF</span>
            </div>
          </div>
        </div>

        {/* App body */}
        <div className={styles.appBody}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
              <img src="/logo.png" alt="" width={20} height={20} className={styles.sidebarLogoImg} />
            </div>
            <nav className={styles.sidebarNav}>
              {[
                { label: 'Dashboard', active: false },
                { label: 'New Chart', active: false },
                { label: 'Rashi Chart', active: true },
                { label: 'Saved Charts', active: false },
                { label: 'Reports', active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ''}`}
                >
                  <div className={styles.sidebarDot} />
                  <span className={styles.sidebarLabel}>{item.label}</span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className={styles.mainContent}>
            {/* Birth summary bar */}
            <div className={styles.birthBar}>
              <div className={styles.birthInfo}>
                <span className={styles.birthName}>Arjun Patel</span>
                <span className={styles.birthMeta}>14 Oct 1990 · 08:45 · Mumbai</span>
              </div>
              <div className={styles.birthBadge}>D1 / Rashi</div>
            </div>

            {/* Chart + table layout */}
            <div className={styles.chartLayout}>
              {/* Rashi chart */}
              <div className={styles.chartPanel}>
                <NorthIndianChart />
              </div>

              {/* Planet table */}
              <div className={styles.tablePanel}>
                <div className={styles.tableTitle}>Planetary Positions</div>
                <table className={styles.planetTable}>
                  <thead>
                    <tr>
                      <th>Planet</th>
                      <th>Sign</th>
                      <th>Deg</th>
                      <th>House</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_PLANETS.map((p) => (
                      <tr key={p.planet}>
                        <td className={styles.planetName}>{p.planet}</td>
                        <td>{p.sign}</td>
                        <td className={styles.deg}>{p.deg}</td>
                        <td>{p.house}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Demo data for the mockup
---------------------------------------------------------------- */
const DEMO_PLANETS = [
  { planet: 'As', sign: 'Lib', deg: '12°', house: '1' },
  { planet: 'Su', sign: 'Vir', deg: '27°', house: '12' },
  { planet: 'Mo', sign: 'Tau', deg: '18°', house: '8' },
  { planet: 'Ma', sign: 'Cap', deg: '04°', house: '4' },
  { planet: 'Me', sign: 'Lib', deg: '08°', house: '1' },
  { planet: 'Ju', sign: 'Can', deg: '21°', house: '10' },
  { planet: 'Ve', sign: 'Sco', deg: '15°', house: '2' },
  { planet: 'Sa', sign: 'Cap', deg: '26°', house: '4' },
  { planet: 'Ra', sign: 'Aqu', deg: '03°', house: '5' },
  { planet: 'Ke', sign: 'Leo', deg: '03°', house: '11' },
]

/* ----------------------------------------------------------------
   North Indian Diamond Chart SVG
   Matches the actual RashiChart component geometry exactly
---------------------------------------------------------------- */
const NorthIndianChart: React.FC = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    style={{ color: 'var(--color-on-surface-muted)' }}
    aria-label="D1 Rashi Chart — North Indian style"
  >
    {/* Grid lines */}
    <g strokeWidth="1" opacity="0.5">
      <rect x="10" y="10" width="380" height="380" />
      <line x1="10" y1="10" x2="390" y2="390" />
      <line x1="390" y1="10" x2="10" y2="390" />
      <line x1="200" y1="10" x2="10" y2="200" />
      <line x1="10" y1="200" x2="200" y2="390" />
      <line x1="200" y1="390" x2="390" y2="200" />
      <line x1="390" y1="200" x2="200" y2="10" />
    </g>

    {/* House sign numbers (faint) */}
    <g fill="currentColor" opacity="0.4" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
      <text x="200" y="55">Li</text>   {/* H1 top */}
      <text x="100" y="48">Vi</text>   {/* H12 */}
      <text x="48" y="100">Le</text>   {/* H11 */}
      <text x="48" y="200">Can</text>  {/* H10 */}
      <text x="48" y="300">Gem</text>  {/* H9 */}
      <text x="100" y="355">Tau</text> {/* H8 */}
      <text x="200" y="362">Ari</text> {/* H7 */}
      <text x="300" y="355">Pis</text> {/* H6 */}
      <text x="352" y="300">Aqu</text> {/* H5 */}
      <text x="352" y="200">Cap</text> {/* H4 */}
      <text x="352" y="100">Sag</text> {/* H3 */}
      <text x="300" y="48">Sco</text>  {/* H2 */}
    </g>

    {/* Ascendant — House 1 */}
    <g fill="var(--color-primary)" fontFamily="Inter, sans-serif" textAnchor="middle" fontSize="11" fontWeight="600">
      <text x="200" y="88">As 12°</text>
      <text x="200" y="103">Me 8°</text>
    </g>

    {/* Planets in houses */}
    <g fill="currentColor" opacity="0.8" fontFamily="Inter, sans-serif" textAnchor="middle" fontSize="10" fontWeight="500">
      {/* H12 — Su */}
      <text x="100" y="72">Su 27°</text>
      {/* H4 — Ma, Sa */}
      <text x="200" y="228">Ma 4°</text>
      <text x="200" y="242">Sa 26°</text>
      {/* H8 — Mo */}
      <text x="100" y="318">Mo 18°</text>
      {/* H10 — Ju */}
      <text x="55" y="200">Ju 21°</text>
      {/* H2 — Ve */}
      <text x="300" y="72">Ve 15°</text>
      {/* H5 — Ra */}
      <text x="345" y="275">Ra 3°</text>
      {/* H11 — Ke */}
      <text x="55" y="130">Ke 3°</text>
    </g>
  </svg>
)
