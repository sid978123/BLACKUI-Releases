import React from 'react';
import { Cpu, HardDrive, Shield, Zap } from 'lucide-react';
import { BLACKUI_RELEASES } from '../config/releases';

export const TechSpecs: React.FC = () => {
  const specs = [
    {
      icon: <Zap className="w-5 h-5 text-[#C6B6FF]" />,
      title: "Core Extraction Engine",
      value: "yt-dlp 2025.x (Automated OTA Sync)",
      description:
        "BLACKUI wraps the industry-standard yt-dlp backend with automatic background updates, ensuring robust format parsing without breaking when upstream services change.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#C6B6FF]" />,
      title: "Audio/Video Multiplexer",
      value: "FFmpeg 8.x Pipeline",
      description:
        "Direct stream copy and lossless remuxing into standard MP4, MKV, MP3, OPUS, and FLAC containers without degrading original media fidelity.",
    },
    {
      icon: <HardDrive className="w-5 h-5 text-[#C6B6FF]" />,
      title: "Local Storage Isolation",
      value: "100% On-Device",
      description:
        "Media is saved directly to your chosen desktop or Android storage directory. No proxy servers, cloud caches, or third-party relay nodes.",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#C6B6FF]" />,
      title: "Privacy Guarantee",
      value: "Zero Telemetry / Zero Tracking",
      description:
        "No account creation, no usage analytics, no crash beacons, and no behavioral tracking. Your download history remains strictly confidential on your machine.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.08] relative bg-[#0D0F12]/30">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-3">
            TECHNICAL SPECIFICATIONS
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-[#F5F5F6]">
            Architected for reliability.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#08090B] border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#121419] border border-white/[0.08] flex items-center justify-center mb-4">
                  {spec.icon}
                </div>
                <div className="text-xs font-mono-code text-[#707580] mb-1">
                  {spec.title}
                </div>
                <div className="text-sm font-semibold text-[#F5F5F6] mb-3">
                  {spec.value}
                </div>
                <p className="text-xs leading-relaxed text-[#A0A3AB]">
                  {spec.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono-code text-[#707580]">
                Verified v{BLACKUI_RELEASES.latestVersion}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
