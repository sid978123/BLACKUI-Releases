import { useState } from 'react';
import { Download, Smartphone, ArrowRight, CheckCircle2, Monitor, Layers, Sparkles } from 'lucide-react';
import { BLACKUI_RELEASES } from '../config/releases';

interface HeroProps {
  onSelectPlatform?: (platform: 'windows' | 'android') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPlatform }) => {
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile'>('desktop');
  const [inputUrl, setInputUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [selectedFormat, setSelectedFormat] = useState('1080p MP4');

  const scrollToDownloads = (platform: 'windows' | 'android') => {
    if (onSelectPlatform) {
      onSelectPlatform(platform);
    }
    const el = document.getElementById('downloads');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-36 overflow-hidden hero-glow">
      {/* Background subtle noise/grid effect */}
      <div className="absolute inset-0 subtle-grid opacity-50 pointer-events-none" />

      {/* Radial soft flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C6B6FF]/[0.035] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.09] bg-[#121419]/90 text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6B6FF] animate-pulse" />
          MEDIA UTILITY FOR WINDOWS &amp; ANDROID
        </div>

        {/* Main Headline */}
        <h1 className="text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] sm:leading-[1.02] font-semibold tracking-[-0.035em] text-[#F5F5F6] max-w-4xl mx-auto mb-6">
          Your media.
          <br />
          <span className="text-[#A0A3AB]">Your control.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg lg:text-[1.125rem] leading-[1.6] text-[#A0A3AB] max-w-2xl mx-auto mb-10 font-normal">
          Meet <strong className="text-[#F5F5F6] font-medium">BLACKUI</strong>. A thoughtfully designed media utility built to make downloading, managing, and accessing supported media simpler.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <button
            onClick={() => scrollToDownloads('windows')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14px] font-medium text-[#08090B] bg-[#F5F5F6] hover:bg-[#FFFFFF] border border-transparent rounded-lg transition-all shadow-[0_2px_12px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6B6FF] active:scale-[0.99] cursor-pointer group"
          >
            <Download className="w-4 h-4 text-[#08090B] group-hover:-translate-y-0.5 transition-transform" />
            <span>Download for Windows</span>
            <span className="text-[11px] font-mono-code opacity-60 ml-0.5">.exe</span>
          </button>

          <button
            onClick={() => scrollToDownloads('android')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14px] font-medium text-[#F5F5F6] bg-[#121419] hover:bg-[#191C22] border border-white/[0.12] hover:border-white/[0.2] rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6B6FF] active:scale-[0.99] cursor-pointer group shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-[#A0A3AB] group-hover:text-[#F5F5F6] transition-colors" />
            <span>Get BLACKUI for Android</span>
            <span className="text-[11px] font-mono-code text-[#707580]">.apk</span>
          </button>
        </div>

        {/* Tertiary Link */}
        <div className="mb-6">
          <button
            onClick={scrollToFeatures}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#A0A3AB] hover:text-[#C6B6FF] transition-colors cursor-pointer group"
          >
            <span>Explore features</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Compatibility Line */}
        <div className="flex items-center justify-center gap-3 text-[12px] font-mono-code text-[#707580] mb-14">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C6B6FF]" />
            Windows desktop (64-bit)
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C6B6FF]" />
            Android 8.0+
          </span>
        </div>

        {/* Hero Product Preview Switcher */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setPreviewTab('desktop')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              previewTab === 'desktop'
                ? 'bg-[#191C22] text-[#F5F5F6] border border-white/[0.15] shadow-sm'
                : 'text-[#A0A3AB] hover:text-[#F5F5F6] border border-transparent'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows Desktop UI</span>
          </button>
          <button
            onClick={() => setPreviewTab('mobile')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              previewTab === 'mobile'
                ? 'bg-[#191C22] text-[#F5F5F6] border border-white/[0.15] shadow-sm'
                : 'text-[#A0A3AB] hover:text-[#F5F5F6] border border-transparent'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Mobile UI</span>
          </button>
        </div>

        {/* Product Preview Container */}
        <div className="relative mx-auto max-w-5xl rounded-xl border border-white/[0.12] bg-[#0D0F12] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
          {/* Subtle top edge specular highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent pointer-events-none" />

          {previewTab === 'desktop' ? (
            /* Desktop App Preview */
            <div className="text-left font-sans">
              {/* Window Titlebar */}
              <div className="h-10 px-4 bg-[#121419] border-b border-white/[0.08] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#EF8585]/80 hover:bg-[#EF8585] transition-colors" />
                    <span className="w-3 h-3 rounded-full bg-[#E6BD78]/80 hover:bg-[#E6BD78] transition-colors" />
                    <span className="w-3 h-3 rounded-full bg-[#82C9A0]/80 hover:bg-[#82C9A0] transition-colors" />
                  </div>
                  <span className="text-[12px] font-mono-code text-[#A0A3AB] ml-2">
                    BLACKUI &mdash; Media Downloader (v{BLACKUI_RELEASES.latestVersion})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#191C22] text-[#A0A3AB] border border-white/[0.06]">
                    Engine: yt-dlp 2025.x
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#82C9A0]" title="Engine Ready" />
                </div>
              </div>

              {/* App Body Simulation matching Compose UI */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[460px] bg-[#08090B]">
                {/* Desktop Sidebar */}
                <div className="hidden md:flex flex-col justify-between p-4 bg-[#0D0F12] border-r border-white/[0.08]">
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-[11px] font-mono-code uppercase tracking-wider text-[#707580]">
                      Navigation
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-[#191C22] text-[#F5F5F6] border border-white/[0.08] text-xs font-medium">
                      <Layers className="w-3.5 h-3.5 text-[#E6BD78]" />
                      <span>Extractor</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 rounded-md text-[#A0A3AB] hover:text-[#F5F5F6] hover:bg-white/[0.02] text-xs font-medium">
                      <div className="flex items-center gap-2.5">
                        <Download className="w-3.5 h-3.5" />
                        <span>Queue</span>
                      </div>
                      <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-white/[0.06] text-[#A0A3AB]">
                        1
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[#A0A3AB] hover:text-[#F5F5F6] hover:bg-white/[0.02] text-xs font-medium">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Library</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121419] border border-white/[0.06] space-y-1">
                    <div className="text-[11px] text-[#A0A3AB] font-mono-code">Local Storage</div>
                    <div className="text-[11px] text-[#707580] truncate font-mono-code">
                      C:\Users\Downloads\BLACKUI
                    </div>
                    <div className="w-full bg-[#191C22] h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#E6BD78] h-full w-2/5" />
                    </div>
                  </div>
                </div>

                {/* Desktop Main Workspace */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  {/* Link Input Bar */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium uppercase tracking-wider text-[#A0A3AB] font-mono-code">
                        Supported Media Link
                      </label>
                      <span className="text-[11px] font-mono-code text-[#82C9A0] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#82C9A0]" />
                        Valid Media Stream Detected
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          className="w-full px-4 py-2.5 text-xs font-mono-code bg-[#121419] border border-white/[0.12] focus:border-[#C6B6FF] rounded-lg text-[#F5F5F6] focus:outline-none transition-colors"
                          placeholder="Paste YouTube, Vimeo, Twitter, or direct link..."
                        />
                      </div>
                      <button className="px-5 py-2.5 text-xs font-medium bg-[#E6BD78] hover:bg-[#F5D99C] text-[#08090B] rounded-lg transition-colors font-sans flex items-center justify-center gap-1.5 cursor-pointer">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Inspect Streams</span>
                      </button>
                    </div>
                  </div>

                  {/* Format Selector Grid */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium uppercase tracking-wider text-[#A0A3AB] font-mono-code">
                      Available Output Formats &amp; Resolutions
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: '4K Ultra HD', ext: 'MP4 (2160p)', size: '~320 MB', isGold: true },
                        { label: '1080p Full HD', ext: 'MP4 (1080p)', size: '~88 MB', isGold: false },
                        { label: '720p HD', ext: 'MP4 (720p)', size: '~42 MB', isGold: false },
                        { label: 'Lossless Audio', ext: 'FLAC / MP3 320k', size: '~9.5 MB', isGold: false },
                      ].map((fmt, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedFormat(fmt.label)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            selectedFormat === fmt.label
                              ? 'bg-[#191C22] border-[#E6BD78] shadow-[0_0_12px_rgba(230,189,120,0.15)]'
                              : 'bg-[#121419] border-white/[0.08] hover:border-white/[0.16]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-[#F5F5F6]">{fmt.label}</span>
                            {selectedFormat === fmt.label && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E6BD78]" />
                            )}
                          </div>
                          <div className="text-[11px] font-mono-code text-[#A0A3AB]">{fmt.ext}</div>
                          <div className="text-[10px] font-mono-code text-[#707580] mt-1">{fmt.size}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Download Preview Card */}
                  <div className="p-4 rounded-xl bg-[#121419] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#191C22] border border-white/[0.08] flex items-center justify-center">
                          <Download className="w-4 h-4 text-[#E6BD78]" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#F5F5F6]">
                            Cinematic Architecture Showcase &mdash; Tokyo Nightfall
                          </div>
                          <div className="text-[11px] font-mono-code text-[#707580]">
                            1080p 60fps &bull; MP4 &bull; 88.4 MB of 112.0 MB
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono-code text-[#82C9A0] font-medium">
                          14.2 MB/s
                        </span>
                        <div className="text-[10px] font-mono-code text-[#707580]">ETA: 2s</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-[#191C22] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#E6BD78] to-[#F5D99C] h-full rounded-full transition-all duration-300"
                          style={{ width: '78%' }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono-code text-[#707580]">
                        <span>Status: Merging video &amp; audio streams via FFmpeg</span>
                        <span>78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile App Preview (Curated actual mobile screenshots) */
            <div className="p-6 sm:p-10 flex flex-col items-center justify-center bg-[#08090B]">
              <div className="max-w-xs w-full rounded-3xl border-2 border-white/[0.15] bg-[#000000] p-2 shadow-2xl relative">
                {/* Mobile camera notch / pill */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2 border border-white/[0.06] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white/[0.1]" />
                </div>
                <img
                  src="/assets/vanta_home.png"
                  alt="BLACKUI Mobile Interface"
                  className="w-full h-auto rounded-2xl object-cover shadow-inner"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-mono-code text-[#A0A3AB] mt-4">
                Native Android app screenshot &mdash; AMOLED dark interface with bottom navigation
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
