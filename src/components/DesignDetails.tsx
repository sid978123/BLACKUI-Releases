import React from 'react';
import { Eye, SlidersHorizontal, Grid } from 'lucide-react';

export const DesignDetails: React.FC = () => {
  const pillars = [
    {
      title: "CLARITY",
      summary: "Information is easy to scan. Actions are easy to understand.",
      description:
        "High-contrast monochromatic typography, disciplined hierarchy, and intentional spacing allow you to parse file details, extraction diagnostics, and download speeds at a glance without visual noise.",
      icon: <Eye className="w-5 h-5 text-[#C6B6FF]" />,
    },
    {
      title: "CONTROL",
      summary: "Important settings and progress remain accessible.",
      description:
        "Pause, resume, or cancel jobs whenever needed. Select output directories, format presets, and video quality profiles without navigating buried submenus or obscure configuration files.",
      icon: <SlidersHorizontal className="w-5 h-5 text-[#C6B6FF]" />,
    },
    {
      title: "CONSISTENCY",
      summary: "A coherent visual language across the BLACKUI experience.",
      description:
        "From the Jetpack Compose Multiplatform desktop window on Windows to the AMOLED dark mobile companion on Android, components, buttons, and status tokens share an identical design grammar.",
      icon: <Grid className="w-5 h-5 text-[#C6B6FF]" />,
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0D0F12]/40">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-3">
            DESIGN PHILOSOPHY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#F5F5F6]">
            Every detail has a purpose.
          </h2>
        </div>

        {/* 3 Pillars Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#121419] border border-white/[0.08] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <span className="text-xs font-mono-code font-semibold tracking-[0.2em] text-[#C6B6FF]">
                  {pillar.title}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-[#F5F5F6] tracking-tight leading-snug">
                "{pillar.summary}"
              </h3>

              <p className="text-xs sm:text-sm leading-[1.6] text-[#A0A3AB]">
                {pillar.description}
              </p>

              <div className="pt-2">
                <div className="w-8 h-px bg-white/[0.12]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
