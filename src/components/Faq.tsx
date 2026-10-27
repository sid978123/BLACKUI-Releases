import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BLACKUI_RELEASES } from '../config/releases';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Which platforms does BLACKUI officially support?",
      answer: `BLACKUI is officially available for Windows 10 and Windows 11 (64-bit systems) via standalone installer (.exe) or Windows Installer (.msi), as well as Android 8.0 (API Level 26) and above via direct standalone APK. Both platforms share the same underlying architecture and design language.`,
      category: "Platform",
    },
    {
      question: "How does BLACKUI handle video stream parsing and extraction?",
      answer: `BLACKUI utilizes an embedded, optimized yt-dlp binary paired with FFmpeg 8.x for stream multiplexing. When you supply a supported media link, BLACKUI queries the local engine to inspect all available video streams, audio bitrates, and codecs, allowing you to choose the exact resolution and container format before downloading.`,
      category: "Engine",
    },
    {
      question: "Does BLACKUI collect telemetry, analytics, or user accounts?",
      answer: `No. BLACKUI does not use any cloud servers, account logins, usage tracking, or third-party telemetry beacons. Download URLs and saved media are processed entirely on your local machine and stored in your specified directories.`,
      category: "Privacy",
    },
    {
      question: "What output formats and resolutions are supported?",
      answer: `Depending on the source video, BLACKUI supports resolutions from 360p and 720p HD up to 1080p Full HD, 1440p, and 4K Ultra HD. Video streams can be saved as MP4 or MKV. Audio extraction supports high-bitrate MP3, AAC/M4A, OPUS, and lossless FLAC.`,
      category: "Media",
    },
    {
      question: "Why does Android warn me when installing the downloaded APK?",
      answer: `Android flags any app installed outside of the Google Play Store as an "Unknown App." This is standard operating system security behavior for sideloaded applications. To install, you simply need to toggle "Allow from this source" for your browser or file manager. You can independently verify the package hash against our published SHA-256 checksum (${BLACKUI_RELEASES.android.apk.sha256.slice(0, 16)}...) before installation.`,
      category: "Android",
    },
    {
      question: "How do engine updates work when media services update their players?",
      answer: `BLACKUI features an integrated engine update system within Settings. When streaming services change their player clients or throttling parameters, you can update the underlying yt-dlp extraction definitions directly from the application without having to reinstall the entire client.`,
      category: "Updates",
    },
    {
      question: "How can I verify the cryptographic integrity of my downloaded files?",
      answer: `Every build published on this website includes an authentic SHA-256 checksum generated directly from the release binaries. On Windows, you can open PowerShell and run: Get-FileHash -Algorithm SHA256 "BLACKUI-1.0.0.exe" and confirm that the resulting hash matches the one shown on our downloads panel.`,
      category: "Security",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-white/[0.08] relative scroll-mt-20">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-[#121419] text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#A0A3AB] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C6B6FF]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#F5F5F6] mb-4">
            Everything you need to know.
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#A0A3AB]">
            Transparent answers regarding engine capabilities, security, and platform requirements.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/[0.08] bg-[#0D0F12] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:bg-white/[0.03]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-[11px] font-mono-code text-[#707580] w-6 shrink-0">
                      0{index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-[#F5F5F6]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A0A3AB] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C6B6FF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-5 pb-6 sm:px-6 pt-0 border-t border-white/[0.04]"
                  >
                    <p className="text-xs sm:text-sm leading-[1.7] text-[#A0A3AB] pl-9">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
