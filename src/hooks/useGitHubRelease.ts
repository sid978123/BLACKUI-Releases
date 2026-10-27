import { useState, useEffect, useCallback } from 'react';
import { BLACKUI_RELEASES, GITHUB_CONFIG, getGitHubDownloadUrl } from '../config/releases';

export interface GitHubAssetInfo {
  name: string;
  downloadUrl: string;
  sizeBytes: number;
  formattedSize: string;
  downloadCount: number;
  contentType: string;
  updatedAt: string;
}

export interface ResolvedReleaseData {
  tag: string;
  name: string;
  publishedAt: string;
  formattedDate: string;
  htmlUrl: string;
  releaseNotes: string;
  isPrerelease: boolean;
  windowsExe: {
    filename: string;
    downloadUrl: string;
    fileSize: string;
    isLiveFromGitHub: boolean;
    sha256: string;
  };
  windowsMsi: {
    filename: string;
    downloadUrl: string;
    fileSize: string;
    isLiveFromGitHub: boolean;
    sha256: string;
  };
  androidApk: {
    filename: string;
    downloadUrl: string;
    fileSize: string;
    isLiveFromGitHub: boolean;
    sha256: string;
  };
}

export type ReleaseFetchStatus = 'loading' | 'live' | 'not_found' | 'rate_limited' | 'error';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recent';
  }
}

const DEFAULT_RELEASE_DATA: ResolvedReleaseData = {
  tag: BLACKUI_RELEASES.tag,
  name: `BLACKUI ${BLACKUI_RELEASES.latestVersion}`,
  publishedAt: '2026-10-27',
  formattedDate: BLACKUI_RELEASES.releaseDate,
  htmlUrl: GITHUB_CONFIG.releasesUrl,
  releaseNotes: '',
  isPrerelease: false,
  windowsExe: {
    filename: BLACKUI_RELEASES.windows.standardExe.expectedFilename,
    downloadUrl: getGitHubDownloadUrl(BLACKUI_RELEASES.windows.standardExe.expectedFilename),
    fileSize: BLACKUI_RELEASES.windows.standardExe.fileSize,
    isLiveFromGitHub: false,
    sha256: BLACKUI_RELEASES.windows.standardExe.sha256
  },
  windowsMsi: {
    filename: BLACKUI_RELEASES.windows.installerMsi.expectedFilename,
    downloadUrl: getGitHubDownloadUrl(BLACKUI_RELEASES.windows.installerMsi.expectedFilename),
    fileSize: BLACKUI_RELEASES.windows.installerMsi.fileSize,
    isLiveFromGitHub: false,
    sha256: BLACKUI_RELEASES.windows.installerMsi.sha256
  },
  androidApk: {
    filename: BLACKUI_RELEASES.android.apk.expectedFilename,
    downloadUrl: getGitHubDownloadUrl(BLACKUI_RELEASES.android.apk.expectedFilename),
    fileSize: BLACKUI_RELEASES.android.apk.fileSize,
    isLiveFromGitHub: false,
    sha256: BLACKUI_RELEASES.android.apk.sha256
  }
};

interface RawGitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
  download_count: number;
  updated_at: string;
}

interface RawGitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  prerelease: boolean;
  assets?: RawGitHubAsset[];
}

function parseRelease(json: RawGitHubRelease): ResolvedReleaseData {
  const assets: RawGitHubAsset[] = json.assets || [];

  const exeAsset = assets.find(a => 
    a.name.toLowerCase() === BLACKUI_RELEASES.windows.standardExe.expectedFilename.toLowerCase() ||
    a.name.toLowerCase() === BLACKUI_RELEASES.windows.standardExe.fallbackFilename.toLowerCase() ||
    (a.name.toLowerCase().endsWith('.exe') && a.name.toLowerCase().includes('blackui'))
  );

  const msiAsset = assets.find(a => 
    a.name.toLowerCase() === BLACKUI_RELEASES.windows.installerMsi.expectedFilename.toLowerCase() ||
    a.name.toLowerCase() === BLACKUI_RELEASES.windows.installerMsi.fallbackFilename.toLowerCase() ||
    (a.name.toLowerCase().endsWith('.msi') && a.name.toLowerCase().includes('blackui'))
  );

  const apkAsset = assets.find(a => 
    a.name.toLowerCase() === BLACKUI_RELEASES.android.apk.expectedFilename.toLowerCase() ||
    a.name.toLowerCase() === BLACKUI_RELEASES.android.apk.fallbackFilename.toLowerCase() ||
    (a.name.toLowerCase().endsWith('.apk') && a.name.toLowerCase().includes('blackui'))
  );

  return {
    tag: json.tag_name || BLACKUI_RELEASES.tag,
    name: json.name || `BLACKUI ${json.tag_name}`,
    publishedAt: json.published_at || '',
    formattedDate: json.published_at ? formatDate(json.published_at) : BLACKUI_RELEASES.releaseDate,
    htmlUrl: json.html_url || GITHUB_CONFIG.latestReleasePageUrl,
    releaseNotes: json.body || '',
    isPrerelease: !!json.prerelease,
    windowsExe: {
      filename: exeAsset ? exeAsset.name : BLACKUI_RELEASES.windows.standardExe.expectedFilename,
      downloadUrl: exeAsset ? exeAsset.browser_download_url : getGitHubDownloadUrl(BLACKUI_RELEASES.windows.standardExe.expectedFilename, json.tag_name),
      fileSize: exeAsset ? formatBytes(exeAsset.size) : BLACKUI_RELEASES.windows.standardExe.fileSize,
      isLiveFromGitHub: !!exeAsset,
      sha256: BLACKUI_RELEASES.windows.standardExe.sha256
    },
    windowsMsi: {
      filename: msiAsset ? msiAsset.name : BLACKUI_RELEASES.windows.installerMsi.expectedFilename,
      downloadUrl: msiAsset ? msiAsset.browser_download_url : getGitHubDownloadUrl(BLACKUI_RELEASES.windows.installerMsi.expectedFilename, json.tag_name),
      fileSize: msiAsset ? formatBytes(msiAsset.size) : BLACKUI_RELEASES.windows.installerMsi.fileSize,
      isLiveFromGitHub: !!msiAsset,
      sha256: BLACKUI_RELEASES.windows.installerMsi.sha256
    },
    androidApk: {
      filename: apkAsset ? apkAsset.name : BLACKUI_RELEASES.android.apk.expectedFilename,
      downloadUrl: apkAsset ? apkAsset.browser_download_url : getGitHubDownloadUrl(BLACKUI_RELEASES.android.apk.expectedFilename, json.tag_name),
      fileSize: apkAsset ? formatBytes(apkAsset.size) : BLACKUI_RELEASES.android.apk.fileSize,
      isLiveFromGitHub: !!apkAsset,
      sha256: BLACKUI_RELEASES.android.apk.sha256
    }
  };
}

export function useGitHubRelease() {
  const [status, setStatus] = useState<ReleaseFetchStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [releaseData, setReleaseData] = useState<ResolvedReleaseData>(DEFAULT_RELEASE_DATA);

  const fetchRelease = useCallback(async () => {
    try {
      const response = await fetch(GITHUB_CONFIG.apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.status === 404) {
        setStatus('not_found');
        setErrorMessage(`GitHub Release not yet published on ${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}.`);
        return;
      }

      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        setStatus('rate_limited');
        setErrorMessage(
          rateLimitRemaining === '0'
            ? 'GitHub API rate limit reached. Displaying configured release metadata.'
            : 'Access to GitHub Releases API was restricted.'
        );
        return;
      }

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(`GitHub API error (HTTP ${response.status}).`);
        return;
      }

      const json: RawGitHubRelease = await response.json();
      setReleaseData(parseRelease(json));
      setStatus('live');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to reach GitHub Releases API.');
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const response = await fetch(GITHUB_CONFIG.apiUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (ignore) return;

        if (response.status === 404) {
          setStatus('not_found');
          setErrorMessage(`GitHub Release not yet published on ${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}.`);
          return;
        }

        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
          setStatus('rate_limited');
          setErrorMessage(
            rateLimitRemaining === '0'
              ? 'GitHub API rate limit reached. Displaying configured release metadata.'
              : 'Access to GitHub Releases API was restricted.'
          );
          return;
        }

        if (!response.ok) {
          setStatus('error');
          setErrorMessage(`GitHub API error (HTTP ${response.status}).`);
          return;
        }

        const json: RawGitHubRelease = await response.json();
        if (!ignore) {
          setReleaseData(parseRelease(json));
          setStatus('live');
        }
      } catch (err) {
        if (!ignore) {
          setStatus('error');
          setErrorMessage(err instanceof Error ? err.message : 'Failed to reach GitHub Releases API.');
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const manualRefresh = useCallback(() => {
    setStatus('loading');
    fetchRelease();
  }, [fetchRelease]);

  return {
    status,
    errorMessage,
    data: releaseData,
    refresh: manualRefresh,
    repoConfig: GITHUB_CONFIG,
  };
}
