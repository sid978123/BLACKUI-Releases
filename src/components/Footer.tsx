import { DotMatrixWordmark } from './DotMatrixWordmark';
import { BLACKUI_RELEASES } from '../config/releases';
import { ShieldCheck, Download, Monitor, Smartphone } from 'lucide-react';

interface FooterProps {
  onOpenChecksums: () => void;
  onOpenSideloadGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChecksums, onOpenSideloadGuide }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#08090B] pt-16 pb-12 text-[#A0A3AB]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <DotMatrixWordmark dotSize={2.2} gap={1.1} charSpacing={4.0} activeColor="#F5F5F6" />
            <p className="text-xs leading-relaxed text-[#707580] max-w-xs">
              A high-performance, minimalist media utility engineered for Windows and Android. Focused on speed, calm workflows, and zero telemetry.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#82C9A0] animate-pulse" />
              <span className="text-[11px] font-mono-code text-[#A0A3AB]">
                Release {BLACKUI_RELEASES.tag} &bull; Operational
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F6]">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#product" className="hover:text-[#F5F5F6] transition-colors">
                  Media Extraction
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#F5F5F6] transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-[#F5F5F6] transition-colors">
                  Release Packages
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F5F5F6] transition-colors">
                  FAQ &amp; Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Platforms Column */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F6]">
              Downloads
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={BLACKUI_RELEASES.windows.standardExe.downloadUrl}
                  download="BLACKUI-1.0.0.exe"
                  className="hover:text-[#F5F5F6] transition-colors flex items-center gap-1.5"
                >
                  <Monitor className="w-3.5 h-3.5 text-[#C6B6FF]" />
                  <span>Windows Setup (.exe)</span>
                </a>
              </li>
              <li>
                <a
                  href={BLACKUI_RELEASES.windows.installerMsi.downloadUrl}
                  download="BLACKUI-1.0.0.msi"
                  className="hover:text-[#F5F5F6] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#A0A3AB]" />
                  <span>Windows MSI (.msi)</span>
                </a>
              </li>
              <li>
                <a
                  href={BLACKUI_RELEASES.android.apk.downloadUrl}
                  download="BLACKUI-1.0.0.apk"
                  className="hover:text-[#F5F5F6] transition-colors flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C6B6FF]" />
                  <span>Android Package (.apk)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSideloadGuide}
                  className="hover:text-[#F5F5F6] transition-colors text-left"
                >
                  APK Installation Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Integrity Column */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[#F5F5F6]">
              Integrity &amp; Privacy
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenChecksums}
                  className="hover:text-[#F5F5F6] transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#82C9A0]" />
                  <span>SHA-256 Checksums</span>
                </button>
              </li>
              <li>
                <span className="text-[#707580]">Local On-Device Sandboxing</span>
              </li>
              <li>
                <span className="text-[#707580]">Zero External Telemetry</span>
              </li>
              <li>
                <span className="text-[#707580]">Embedded yt-dlp &amp; FFmpeg</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-code text-[#707580]">
          <div>
            &copy; {new Date().getFullYear()} BLACKUI. Media utility for Windows &amp; Android.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenChecksums} className="hover:text-[#A0A3AB] transition-colors">
              Verify Binaries
            </button>
            <span>&bull;</span>
            <span>Jetpack Compose Native</span>
            <span>&bull;</span>
            <span>Offline-First Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
