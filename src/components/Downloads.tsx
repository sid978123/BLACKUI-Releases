import { useState } from 'react';
import { Download, Monitor, Smartphone, Check, Copy, AlertCircle, FileCheck, ExternalLink, HelpCircle, GitBranch, RefreshCw, FileText, ChevronDown } from 'lucide-react';
import { BLACKUI_RELEASES, GITHUB_CONFIG } from '../config/releases';
import { useGitHubRelease } from '../hooks/useGitHubRelease';

interface DownloadsProps {
  onOpenSideloadGuide: () => void;
  onOpenChecksums: () => void;
}

export const Downloads: React.FC<DownloadsProps> = ({ onOpenSideloadGuide, onOpenChecksums }) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const { status, data, refresh } = useGitHubRelease();

  const copyToClipboard = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  return (
    <section id="downloads" className="py-24 sm:py-32 border-t border-white/[0.08] relative scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-[#121419] text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-4">
            <Download className="w-3.5 h-3.5 text-[#C6B6FF]" />
            OFFICIAL RELEASES &bull; {data.tag}
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#F5F5F6] mb-4">
            Download BLACKUI
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#A0A3AB]">
            Official installer packages distributed via GitHub Releases. Built for Windows and Android with zero telemetry.
          </p>
        </div>

        {/* GitHub Releases Integration Status Bar */}
        <div className="max-w-4xl mx-auto mb-10 p-3.5 rounded-xl bg-[#0D0F12] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-[#C6B6FF] shrink-0" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#707580]">Distribution:</span>
              <span className="text-[#F5F5F6] font-medium">GitHub Releases</span>
              <span>&bull;</span>
              <a
                href={GITHUB_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6B6FF] hover:underline"
              >
                {GITHUB_CONFIG.owner}/{GITHUB_CONFIG.repo}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {status === 'live' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#82C9A0]/10 text-[#82C9A0] border border-[#82C9A0]/20 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#82C9A0] animate-pulse" />
                Live Release Active
              </span>
            )}
            {status === 'not_found' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D8C4A0]/10 text-[#D8C4A0] border border-[#D8C4A0]/20 text-[11px]" title="Repository configured. Awaiting initial GitHub Release publication.">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8C4A0]" />
                Configured (Release Pending)
              </span>
            )}
            {status === 'rate_limited' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#A0A3AB] border border-white/[0.08] text-[11px]">
                Cached Release Metadata
              </span>
            )}
            {status === 'loading' && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#A0A3AB]">
                <RefreshCw className="w-3 h-3 animate-spin text-[#C6B6FF]" />
                Checking GitHub API...
              </span>
            )}

            <button
              onClick={() => refresh()}
              className="p-1 rounded text-[#707580] hover:text-[#F5F5F6] hover:bg-white/[0.04] transition-colors"
              title="Refresh GitHub Release metadata"
              aria-label="Refresh release info"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Panel Layout: Windows & Android */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
          {/* PANEL A: WINDOWS */}
          <div className="bg-[#0D0F12] border border-white/[0.1] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative flex flex-col justify-between h-full">
            {/* Top edge subtle line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#121419] border border-white/[0.1] flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-[#C6B6FF]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F5F6] tracking-tight">
                      {BLACKUI_RELEASES.windows.title}
                    </h3>
                    <div className="text-xs font-mono-code text-[#A0A3AB]">
                      Version {data.tag} &bull; Desktop (x86_64)
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-[#82C9A0]/10 text-[#82C9A0] border border-[#82C9A0]/20">
                  {status === 'live' ? 'Live GitHub Asset' : 'Configured Build'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#A0A3AB] mb-6">
                {BLACKUI_RELEASES.windows.description}
              </p>

              {/* System Specs Pill */}
              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.08] mb-6 space-y-2 text-xs font-mono-code">
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Requirements:</span>
                  <span className="text-[#F5F5F6] text-right">{BLACKUI_RELEASES.windows.requirements}</span>
                </div>
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Architecture:</span>
                  <span className="text-[#F5F5F6]">x86_64 / 64-bit native</span>
                </div>
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Release Date:</span>
                  <span className="text-[#F5F5F6]">{data.formattedDate}</span>
                </div>
              </div>

              {/* Download Actions */}
              <div className="space-y-3 mb-6">
                {/* Standard .exe */}
                <a
                  href={data.windowsExe.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-[#F5F5F6] hover:bg-white text-[#08090B] rounded-xl font-medium transition-all shadow-[0_2px_10px_rgba(255,255,255,0.08)] active:scale-[0.99] group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-[#08090B] group-hover:-translate-y-0.5 transition-transform" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">
                        Download Windows Setup (.exe)
                      </div>
                      <div className="text-[11px] font-mono-code text-[#707580]">
                        {data.windowsExe.filename} &bull; {data.windowsExe.fileSize}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code uppercase px-2 py-0.5 rounded bg-black/10 font-bold">
                    Primary
                  </span>
                </a>

                {/* WiX .msi */}
                <a
                  href={data.windowsMsi.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-5 py-3 bg-[#121419] hover:bg-[#191C22] text-[#F5F5F6] border border-white/[0.1] hover:border-white/[0.2] rounded-xl font-medium transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-[#A0A3AB] group-hover:text-[#F5F5F6] transition-colors" />
                    <div className="text-left">
                      <div className="text-sm">Download Windows MSI Package (.msi)</div>
                      <div className="text-[11px] font-mono-code text-[#707580]">
                        {data.windowsMsi.filename} &bull; {data.windowsMsi.fileSize}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code text-[#707580]">
                    Enterprise
                  </span>
                </a>
              </div>
            </div>

            {/* Checksum Box */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono-code uppercase text-[#707580] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#C6B6FF]" />
                  SHA-256 (Windows Setup)
                </span>
                <button
                  onClick={() => copyToClipboard(data.windowsExe.sha256, 'win-exe')}
                  className="text-[11px] font-mono-code text-[#C6B6FF] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedHash === 'win-exe' ? (
                    <>
                      <Check className="w-3 h-3 text-[#82C9A0]" />
                      <span className="text-[#82C9A0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono-code text-[11px] text-[#A0A3AB] bg-[#08090B] p-2 rounded border border-white/[0.06] select-all break-all">
                {data.windowsExe.sha256}
              </div>
            </div>
          </div>

          {/* PANEL B: ANDROID */}
          <div className="bg-[#0D0F12] border border-white/[0.1] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative flex flex-col justify-between h-full">
            {/* Top edge subtle line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#121419] border border-white/[0.1] flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#C6B6FF]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F5F6] tracking-tight">
                      {BLACKUI_RELEASES.android.title}
                    </h3>
                    <div className="text-xs font-mono-code text-[#A0A3AB]">
                      Version {data.tag} &bull; Standalone APK
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-[#82C9A0]/10 text-[#82C9A0] border border-[#82C9A0]/20">
                  {status === 'live' ? 'Live GitHub Asset' : 'Configured Build'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#A0A3AB] mb-6">
                {BLACKUI_RELEASES.android.description}
              </p>

              {/* System Specs Pill */}
              <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.08] mb-6 space-y-2 text-xs font-mono-code">
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Requirements:</span>
                  <span className="text-[#F5F5F6] text-right">{BLACKUI_RELEASES.android.requirements}</span>
                </div>
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Architecture:</span>
                  <span className="text-[#F5F5F6]">Universal (arm64, armv7, x86_64)</span>
                </div>
                <div className="flex justify-between text-[#A0A3AB]">
                  <span className="text-[#707580]">Release Date:</span>
                  <span className="text-[#F5F5F6]">{data.formattedDate}</span>
                </div>
              </div>

              {/* Download Action */}
              <div className="space-y-3 mb-6">
                <a
                  href={data.androidApk.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-[#F5F5F6] hover:bg-white text-[#08090B] rounded-xl font-medium transition-all shadow-[0_2px_10px_rgba(255,255,255,0.08)] active:scale-[0.99] group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-[#08090B] group-hover:-translate-y-0.5 transition-transform" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Download Android Package (.apk)</div>
                      <div className="text-[11px] font-mono-code text-[#707580]">
                        {data.androidApk.filename} &bull; {data.androidApk.fileSize}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code uppercase px-2 py-0.5 rounded bg-black/10 font-bold">
                    Direct APK
                  </span>
                </a>

                {/* Sideload Walkthrough Trigger */}
                <button
                  type="button"
                  onClick={onOpenSideloadGuide}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono-code text-[#A0A3AB] hover:text-[#F5F5F6] border border-white/[0.08] hover:border-white/[0.16] bg-[#121419] transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#C6B6FF]" />
                  <span>View APK Installation &amp; Authorization Guide</span>
                </button>
              </div>

              {/* Sideload Notice */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] mb-6">
                <AlertCircle className="w-4 h-4 text-[#D8C4A0] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-[#707580]">
                  Sideloaded APK distribution requires authorizing "Install Unknown Apps" in Android security settings. Sideloaded packages are not distributed via Google Play Store.
                </p>
              </div>
            </div>

            {/* Checksum Box */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono-code uppercase text-[#707580] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#C6B6FF]" />
                  SHA-256 (Android Package)
                </span>
                <button
                  onClick={() => copyToClipboard(data.androidApk.sha256, 'android-apk')}
                  className="text-[11px] font-mono-code text-[#C6B6FF] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedHash === 'android-apk' ? (
                    <>
                      <Check className="w-3 h-3 text-[#82C9A0]" />
                      <span className="text-[#82C9A0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono-code text-[11px] text-[#A0A3AB] bg-[#08090B] p-2 rounded border border-white/[0.06] select-all break-all">
                {data.androidApk.sha256}
              </div>
            </div>
          </div>
        </div>

        {/* Live Release Notes Accordion (if available from GitHub) */}
        {data.releaseNotes && (
          <div className="mb-12 rounded-2xl bg-[#0D0F12] border border-white/[0.08] overflow-hidden">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#C6B6FF]" />
                <span className="text-sm font-semibold text-[#F5F5F6]">
                  GitHub Release Notes &bull; {data.tag}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#A0A3AB] transition-transform ${showNotes ? 'rotate-180' : ''}`} />
            </button>
            {showNotes && (
              <div className="p-5 border-t border-white/[0.06] text-xs font-mono-code leading-relaxed text-[#A0A3AB] whitespace-pre-wrap bg-[#08090B]">
                {data.releaseNotes}
              </div>
            )}
          </div>
        )}

        {/* Global Security & Verification Banner */}
        <div className="p-6 rounded-2xl bg-[#08090B] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#121419] border border-white/[0.08] flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4 text-[#82C9A0]" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#F5F5F6]">
                Cryptographic Integrity Verification
              </div>
              <div className="text-xs text-[#A0A3AB]">
                Verify release binaries with CertUtil on Windows or sha256sum on Linux/macOS before running.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={data.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-code text-[#A0A3AB] hover:text-[#F5F5F6] bg-[#121419] hover:bg-[#191C22] border border-white/[0.1] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <span>View All Releases on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C6B6FF]" />
            </a>

            <button
              onClick={onOpenChecksums}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-code text-[#F5F5F6] bg-[#121419] hover:bg-[#191C22] border border-white/[0.1] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <span>View All Checksums</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C6B6FF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
