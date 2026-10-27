# BLACKUI — Official Website

Official production-quality web platform for **BLACKUI**, a minimalist, dark-themed media utility for Windows and Android. Built with a Linear.app-inspired design language, robust GitHub Releases distribution, and zero database dependencies.

---

## 1. Architecture & Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite`
- **Typography**: Geist & Inter via Google Fonts with `font-display: swap`
- **Icons**: Lucide React monochrome line icons
- **Hosting Target**: [Vercel](https://vercel.com/) (configured in `vercel.json`)
- **Distribution Backend**: [GitHub Releases](https://github.com/sid978123/BLACKUI/releases)
- **Database**: None (100% database-free, client-side static & GitHub API integration)

---

## 2. GitHub Releases Distribution

The website uses GitHub Releases as its installer delivery system:

| Platform | Target Asset Filename | Format | Checksum (SHA-256) |
| :--- | :--- | :--- | :--- |
| **Windows Desktop** | `BLACKUI-Setup.exe` | Standalone Installer | `F51EC679E4E93B130E6332AE4FB881C85723AFABA18C35589F5184F4BDE928D3` |
| **Windows MSI** | `BLACKUI-Setup.msi` | WiX Windows Installer | `D4780D4DB0FCD1A98A8A5EEFC0ED9DC7975D0E36B733514FC157713708F5E530` |
| **Android APK** | `BLACKUI-Android.apk`| Standalone Package | `7F87EFFA5C611BA6BF84DBBA18835F467C387A0B336C40BD5098BDD11A26341C` |

### Dynamic GitHub Releases Sync

The site automatically inspects `https://api.github.com/repos/{owner}/{repo}/releases/latest`:
- **When live**: Downloads link directly to GitHub's CDN assets with live byte sizes.
- **When pending**: Buttons point to the configured GitHub release URL while clearly indicating publication status.
- **When rate-limited or offline**: Seamlessly displays cached release configuration without errors or broken UI.

---

## 3. Configuration & Environment Variables

Copy `.env.example` to `.env.local` to override defaults:

```env
# GitHub repository configuration (public)
VITE_GITHUB_REPO_OWNER=sid978123
VITE_GITHUB_REPO_NAME=BLACKUI
VITE_GITHUB_DEFAULT_TAG=v1.0.0

# Canonical production URL (for SEO and OpenGraph)
VITE_SITE_URL=https://blackui.vercel.app
```

---

## 4. Local Development & Verification

```bash
# Install dependencies
npm install

# Start development server with Hot Module Replacement
npm run dev

# Run Oxlint security & syntax linter
npm run lint

# Compile production build & run TypeScript type checking
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Vercel Deployment Process

1. Connect the Git repository to your [Vercel Dashboard](https://vercel.com/new).
2. Framework Preset: **Vite** (auto-detected).
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variables:
   - `VITE_GITHUB_REPO_OWNER`: Your GitHub username.
   - `VITE_GITHUB_REPO_NAME`: `BLACKUI`.
   - `VITE_SITE_URL`: Your Vercel production URL (e.g. `https://blackui.vercel.app`).
6. Deploy.
