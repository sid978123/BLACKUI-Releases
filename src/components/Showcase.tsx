import React, { useState } from 'react';
import { Sparkles, Download, Library, Settings, ShieldCheck, ChevronRight } from 'lucide-react';

interface ShowcaseTab {
  id: string;
  title: string;
  label: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  screenshot: string;
  alt: string;
  features: string[];
}

export const Showcase: React.FC = () => {
  const tabs: ShowcaseTab[] = [
    {
      id: 'extractor',
      title: 'Media Extraction',
      label: 'Main Interface',
      icon: <Sparkles className="w-4 h-4" />,
      heading: 'Instant format inspection from any supported stream',
      description:
        'Paste any supported media link. BLACKUI automatically queries the underlying extractor to parse all available video streams, container formats, audio bitrates, and subtitles in milliseconds.',
      screenshot: '/assets/screen_now.png',
      alt: 'BLACKUI Main Extractor Interface',
      features: [
        'Automatic URL clipboard detection',
        'Direct resolution picking from 360p up to 4K',
        'Independent audio extraction (MP3, OPUS, FLAC)',
        'Video and audio muxing without re-encoding',
      ],
    },
    {
      id: 'queue',
      title: 'Active Queue',
      label: 'Progress View',
      icon: <Download className="w-4 h-4" />,
      heading: 'Real-time telemetry and download management',
      description:
        'Follow active downloads with clear transfer rates, byte progress, and estimated time of arrival. Background services ensure jobs continue smoothly even when switching applications.',
      screenshot: '/assets/vanta_queue.png',
      alt: 'BLACKUI Download Queue and Status',
      features: [
        'Concurrent queue execution control',
        'Live transfer rate and ETA calculations',
        'Automatic retry on transient connection drops',
        'Seamless FFmpeg post-processing integration',
      ],
    },
    {
      id: 'library',
      title: 'Local Library',
      label: 'Storage & Playback',
      icon: <Library className="w-4 h-4" />,
      heading: 'All your downloaded media organized in one place',
      description:
        'Keep downloaded files easily accessible. Open directly in your preferred system media player or manage local files without cluttering your system folders.',
      screenshot: '/assets/vanta_library.png',
      alt: 'BLACKUI Media Library',
      features: [
        'Instant folder access and system file reveal',
        'Embedded metadata preservation (title, artist, thumbnails)',
        'Zero cloud reliance — all files stored locally',
        'Clean history management with complete privacy',
      ],
    },
    {
      id: 'settings',
      title: 'Engine & Preferences',
      label: 'Diagnostics & OTA',
      icon: <Settings className="w-4 h-4" />,
      heading: 'Under-the-hood control and automated engine updates',
      description:
        'BLACKUI is built on a modular engine architecture with automated yt-dlp over-the-air updates to ensure extractors stay working when media platforms roll out changes.',
      screenshot: '/assets/vanta_settings.png',
      alt: 'BLACKUI Settings and Engine Configuration',
      features: [
        'Automatic OTA yt-dlp binary synchronizer',
        'Custom output directory selection',
        'Default format and quality presets',
        'Built-in diagnostics and integrity verification',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="product" className="py-24 sm:py-32 border-t border-white/[0.08] relative section-glow scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-[#121419] text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6B6FF]" />
            THE BLACKUI EXPERIENCE
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#F5F5F6] mb-4">
            Powerful tools. A calmer workflow.
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#A0A3AB]">
            An interface designed to keep the important things clear and the unnecessary things out of the way.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => {
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6B6FF] ${
                  isSelected
                    ? 'bg-[#191C22] text-[#F5F5F6] border border-white/[0.18] shadow-sm'
                    : 'text-[#A0A3AB] hover:text-[#F5F5F6] hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <span className={isSelected ? 'text-[#C6B6FF]' : 'text-[#707580]'}>
                  {tab.icon}
                </span>
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center bg-[#0D0F12] border border-white/[0.1] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

          {/* Screenshot Display Frame */}
          <div className="relative rounded-xl border border-white/[0.08] bg-[#08090B] p-2 sm:p-4 flex items-center justify-center overflow-hidden group">
            <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-2xl border border-white/[0.12] bg-black p-1 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
              <img
                src={activeTab.screenshot}
                alt={activeTab.alt}
                className="w-full h-auto rounded-xl object-contain shadow-lg"
                loading="lazy"
              />
            </div>
            
            <div className="absolute bottom-3 left-4 right-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono-code bg-[#121419]/90 border border-white/[0.1] text-[#A0A3AB] backdrop-blur-sm">
                Authentic application screen &bull; {activeTab.label}
              </span>
            </div>
          </div>

          {/* Description & Detail List */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#C6B6FF] mb-2">
                {activeTab.label}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F5F6] tracking-tight leading-snug mb-3">
                {activeTab.heading}
              </h3>
              <p className="text-sm sm:text-base leading-[1.6] text-[#A0A3AB]">
                {activeTab.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
              {activeTab.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F6]">
                  <ChevronRight className="w-4 h-4 text-[#C6B6FF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#downloads"
                className="inline-flex items-center gap-2 text-xs font-mono-code text-[#C6B6FF] hover:text-[#FFFFFF] transition-colors"
              >
                <span>Experience this in version 1.0.0</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
