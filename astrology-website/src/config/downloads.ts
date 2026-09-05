/**
 * Downloads configuration — single source of truth for version and download URLs.
 *
 * UPDATING A NEW RELEASE:
 *   1. Change `version` to the new version string (e.g. "1.1.0")
 *   2. Change `releaseDate` accordingly
 *   3. Update the `windows.installer` and `windows.zip` URLs to point
 *      to the new GitHub Release assets.
 *   4. Rebuild and redeploy to Vercel.
 *
 * GitHub Releases URL pattern:
 *   https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/vX.Y.Z/filename
 *
 * NOTE: For the initial demo, files can also be served from the
 *   `/public/downloads/` directory, but GitHub Releases is recommended
 *   for production to keep the repository size small.
 */

export const downloadConfig = {
  version: '1.0.0',
  releaseDate: 'September 2026',
  platform: 'Windows 10 / 11',
  architecture: '64-bit',
  license: 'Free to use',

  windows: {
    /**
     * Option A — GitHub Releases (recommended for production):
     * Replace this URL when you create a GitHub Release.
     *
     * Option B — Static file in /public/downloads/:
     * Use '/downloads/Vedic-Astrology-Studio-Setup-1.0.0.exe'
     * and place the file in astrology-website/public/downloads/
     */
    installer: '/downloads/Vedic Astrology Setup 1.0.0.exe',
    zip: '/downloads/Vedic-Astrology-Studio-1.0.0.zip',

    /**
     * Set this to false if the download files are not yet available.
     * When false, the download buttons will show an "Unavailable" state
     * and link to the releases page instead.
     */
    available: true,

    /**
     * Optional: fallback page if files aren't available yet
     * (e.g. a GitHub Releases page)
     */
    releasesPage: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases',
  },
} as const

export type DownloadConfig = typeof downloadConfig
