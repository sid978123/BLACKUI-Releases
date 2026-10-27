/**
 * ============================================================================
 * BLACKUI Centralized Release & Distribution Configuration
 * ============================================================================
 * 
 * Configures the GitHub repository, expected release assets, fallback
 * metadata, and cryptographic checksums for installer distribution.
 */

export interface ReleaseAssetConfig {
  platform: 'windows' | 'android';
  title: string;
  expectedFilename: string;
  fallbackFilename: string;
  extension: '.exe' | '.msi' | '.apk';
  version: string;
  releaseDate: string;
  fileSize: string;
  sha256: string;
  minRequirements: string;
  architecture: string;
  notes?: string;
}

export interface GitHubRepoConfig {
  owner: string;
  repo: string;
  defaultTag: string;
  repoUrl: string;
  releasesUrl: string;
  latestReleasePageUrl: string;
  apiUrl: string;
}

export interface BlackUiReleasesConfig {
  latestVersion: string;
  releaseDate: string;
  tag: string;
  github: GitHubRepoConfig;
  siteUrl: string;
  windows: {
    title: string;
    description: string;
    requirements: string;
    standardExe: ReleaseAssetConfig;
    installerMsi: ReleaseAssetConfig;
  };
  android: {
    title: string;
    description: string;
    requirements: string;
    apk: ReleaseAssetConfig;
  };
  coreEngine: {
    extractor: string;
    muxer: string;
    storageMode: string;
    telemetry: string;
  };
}

// Read centralized configuration from Vite environment variables (with safe fallbacks)
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || 'sid978123';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO_NAME || 'BLACKUI';
const GITHUB_DEFAULT_TAG = import.meta.env.VITE_GITHUB_DEFAULT_TAG || 'v1.0.0';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://blackui.vercel.app';

const repoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
const releasesUrl = `${repoUrl}/releases`;
const latestReleasePageUrl = `${releasesUrl}/latest`;
const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;

export const GITHUB_CONFIG: GitHubRepoConfig = {
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  defaultTag: GITHUB_DEFAULT_TAG,
  repoUrl,
  releasesUrl,
  latestReleasePageUrl,
  apiUrl,
};

/**
 * Generate direct GitHub Release asset download URL
 */
export function getGitHubDownloadUrl(filename: string, tag: string = GITHUB_DEFAULT_TAG): string {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${tag}/${filename}`;
}

export const BLACKUI_RELEASES: BlackUiReleasesConfig = {
  latestVersion: "1.0.0",
  releaseDate: "October 2026",
  tag: GITHUB_DEFAULT_TAG,
  github: GITHUB_CONFIG,
  siteUrl: SITE_URL,
  windows: {
    title: "BLACKUI for Windows",
    description: "Native desktop media utility engineered with Jetpack Compose Multiplatform. Fast, hardware-accelerated interface with embedded yt-dlp & FFmpeg pipeline.",
    requirements: "Windows 10 version 1809 or later, Windows 11 (64-bit architecture)",
    standardExe: {
      platform: "windows",
      title: "Windows Standalone Setup (.exe)",
      expectedFilename: "BLACKUI-Setup.exe",
      fallbackFilename: "BLACKUI-1.0.0.exe",
      extension: ".exe",
      version: "1.0.0",
      releaseDate: "2026-10-27",
      fileSize: "95.2 MB",
      sha256: "F51EC679E4E93B130E6332AE4FB881C85723AFABA18C35589F5184F4BDE928D3",
      minRequirements: "Windows 10 / 11 (x64)",
      architecture: "x86_64 / x64",
      notes: "Recommended for individual desktop users. Includes user-level auto-updates."
    },
    installerMsi: {
      platform: "windows",
      title: "Windows Installer Package (.msi)",
      expectedFilename: "BLACKUI-Setup.msi",
      fallbackFilename: "BLACKUI-1.0.0.msi",
      extension: ".msi",
      version: "1.0.0",
      releaseDate: "2026-10-27",
      fileSize: "94.5 MB",
      sha256: "D4780D4DB0FCD1A98A8A5EEFC0ED9DC7975D0E36B733514FC157713708F5E530",
      minRequirements: "Windows 10 / 11 (x64)",
      architecture: "x86_64 / x64",
      notes: "WiX standard Windows Installer. Recommended for custom directory installs."
    }
  },
  android: {
    title: "BLACKUI for Android",
    description: "Fully native Android application built with modern Jetpack Compose. Clean edge-to-edge dark theme, background download service, and integrated format selector.",
    requirements: "Android 8.0 (Oreo, API Level 26) or later. Compatible with phones and tablets.",
    apk: {
      platform: "android",
      title: "Official Android Package (.apk)",
      expectedFilename: "BLACKUI-Android.apk",
      fallbackFilename: "BLACKUI-1.0.0.apk",
      extension: ".apk",
      version: "1.0.0",
      releaseDate: "2026-10-26",
      fileSize: "208.7 MB",
      sha256: "7F87EFFA5C611BA6BF84DBBA18835F467C387A0B336C40BD5098BDD11A26341C",
      minRequirements: "Android 8.0+ (ARM64-v8a, ARMeabi-v7a, x86_64)",
      architecture: "Universal (arm64-v8a, armeabi-v7a, x86, x86_64)",
      notes: "Standalone direct APK build with full offline extraction binaries."
    }
  },
  coreEngine: {
    extractor: "Integrated yt-dlp runtime with automatic OTA patch sync",
    muxer: "FFmpeg 8.x for lossless stream muxing and audio transcode",
    storageMode: "100% On-device sandbox and user-selected storage directory",
    telemetry: "Zero analytics, zero tracking, zero remote telemetry"
  }
};
