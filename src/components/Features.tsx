import React from 'react';
import { Workflow, Sliders, Activity, MonitorSmartphone } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export const Features: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Workflow className="w-5 h-5 text-[#F5F5F6]" />,
      number: "01",
      title: "Simple media workflow",
      summary: "A straightforward process from supported media link to local file.",
      detail:
        "Paste a supported URL, inspect extracted resolutions and bitrates, and save directly to your storage in seconds. No clutter, unnecessary popups, or multi-step redirects.",
    },
    {
      icon: <Sliders className="w-5 h-5 text-[#F5F5F6]" />,
      number: "02",
      title: "Format and quality selection",
      summary: "Choose from the formats and quality options actually provided by BLACKUI.",
      detail:
        "Select your preferred container and target resolution—from lightweight 360p clips up to 4K Ultra HD video, or pure lossless audio streams in MP3, OPUS, and FLAC.",
    },
    {
      icon: <Activity className="w-5 h-5 text-[#F5F5F6]" />,
      number: "03",
      title: "Download progress",
      summary: "Follow active downloads and their current status.",
      detail:
        "Precise byte-accurate progress meters, live bandwidth metrics, ETA countdowns, and active multiplexing status give you complete transparency over every job.",
    },
    {
      icon: <MonitorSmartphone className="w-5 h-5 text-[#F5F5F6]" />,
      number: "04",
      title: "Desktop and Android availability",
      summary: "Access BLACKUI on supported platforms with platform-appropriate interfaces.",
      detail:
        "Enjoy a keyboard-friendly, high-density desktop application on Windows 10/11, alongside a tactile, gesture-optimized AMOLED dark companion app on Android 8.0+.",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 border-t border-white/[0.08] relative scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-3">
            BUILT FOR PURPOSE
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#F5F5F6] mb-4">
            Engineered around the essentials.
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#A0A3AB]">
            Every feature in BLACKUI solves a specific bottleneck in acquiring, organizing, and playing media.
          </p>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#08090B] p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#0D0F12] transition-colors duration-200 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 rounded-lg bg-[#121419] border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.18] transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-mono-code text-[#707580] group-hover:text-[#A0A3AB] transition-colors">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F5F5F6] tracking-tight mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm font-medium text-[#C6B6FF]/90 mb-3 leading-relaxed">
                  {feature.summary}
                </p>

                <p className="text-xs sm:text-[13px] leading-[1.6] text-[#A0A3AB]">
                  {feature.detail}
                </p>
              </div>

              {/* Bottom indicator line on hover */}
              <div className="mt-8 pt-4 border-t border-white/[0.04]">
                <div className="w-6 h-[1.5px] bg-[#C6B6FF]/40 group-hover:w-12 group-hover:bg-[#C6B6FF] transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
