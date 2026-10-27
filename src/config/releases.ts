export interface ReleaseAsset {
  platform: 'windows' | 'android';
  title: string;
  filename: string;
  downloadUrl: string;
  extension: '.exe' | '.msi' | '.apk';
  version: string;
  releaseDate: string;
  fileSize: string;
  sha256: string;
  minRequirements: string;
  architecture: string;
  isAvailable: boolean;
  notes?: string;
}

export interface BlackUiReleasesConfig {
  latestVersion: string;
  releaseDate: string;
  tag: string;
  windows: {
    title: string;
    description: string;
    requirements: string;
    standardExe: ReleaseAsset;
    installerMsi: ReleaseAsset;
  };
  android: {
    title: string;
    description: string;
    requirements: string;
    playStoreUrl?: string; // Currently direct verified APK
    apk: ReleaseAsset;
  };
  coreEngine: {
    extractor: string;
    muxer: string;
    storageMode: string;
    telemetry: string;
  };
}

export const BLACKUI_RELEASES: BlackUiReleasesConfig = {
  latestVersion: "1.0.0",
  releaseDate: "October 2026",
  tag: "v1.0.0-stable",
  windows: {
    title: "BLACKUI for Windows",
    description: "Native desktop media utility engineered with Jetpack Compose Multiplatform. Fast, hardware-accelerated interface with embedded yt-dlp & FFmpeg pipeline.",
    requirements: "Windows 10 version 1809 or later, Windows 11 (64-bit architecture)",
    standardExe: {
      platform: "windows",
      title: "Windows Standalone Setup (.exe)",
      filename: "BLACKUI-1.0.0.exe",
      downloadUrl: "/downloads/BLACKUI-1.0.0.exe",
      extension: ".exe",
      version: "1.0.0",
      releaseDate: "2026-10-27",
      fileSize: "95.2 MB",
      sha256: "F51EC679E4E93B130E6332AE4FB881C85723AFABA18C35589F5184F4BDE928D3",
      minRequirements: "Windows 10 / 11 (x64)",
      architecture: "x86_64 / x64",
      isAvailable: true,
      notes: "Recommended for individual desktop users. Includes user-level auto-updates."
    },
    installerMsi: {
      platform: "windows",
      title: "Windows Installer Package (.msi)",
      filename: "BLACKUI-1.0.0.msi",
      downloadUrl: "/downloads/BLACKUI-1.0.0.msi",
      extension: ".msi",
      version: "1.0.0",
      releaseDate: "2026-10-27",
      fileSize: "94.5 MB",
      sha256: "D4780D4DB0FCD1A98A8A5EEFC0ED9DC7975D0E36B733514FC157713708F5E530",
      minRequirements: "Windows 10 / 11 (x64)",
      architecture: "x86_64 / x64",
      isAvailable: true,
      notes: "WiX standard Windows Installer. Recommended for custom directory installs."
    }
  },
  android: {
    title: "BLACKUI for Android",
    description: "Fully native Android application built with modern Jetpack Compose. Clean edge-to-edge dark theme, background download service, and integrated format selector.",
    requirements: "Android 8.0 (Oreo, API Level 26) or later. Compatible with phones and tablets.",
    playStoreUrl: undefined, // Truthful: No fabricated Play Store listing
    apk: {
      platform: "android",
      title: "Official Android Package (.apk)",
      filename: "BLACKUI-1.0.0.apk",
      downloadUrl: "/downloads/BLACKUI-1.0.0.apk",
      extension: ".apk",
      version: "1.0.0",
      releaseDate: "2026-10-26",
      fileSize: "208.7 MB",
      sha256: "7F87EFFA5C611BA6BF84DBBA18835F467C387A0B336C40BD5098BDD11A26341C",
      minRequirements: "Android 8.0+ (ARM64-v8a, ARMeabi-v7a, x86_64)",
      architecture: "Universal (arm64-v8a, armeabi-v7a, x86, x86_64)",
      isAvailable: true,
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
