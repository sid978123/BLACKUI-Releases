import { useState, useEffect } from 'react';
import { X, Smartphone, Check, Copy, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import { BLACKUI_RELEASES, getGitHubDownloadUrl } from '../config/releases';

interface SideloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideloadModal: React.FC<SideloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyHash = () => {
    navigator.clipboard.writeText(BLACKUI_RELEASES.android.apk.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '1',
      title: 'Download the APK',
      desc: `Save ${BLACKUI_RELEASES.android.apk.expectedFilename} directly to your Android device via Chrome, Firefox, or your chosen browser.`,
    },
    {
      num: '2',
      title: 'Authorize "Install Unknown Apps"',
      desc: 'When prompted by Android, tap "Settings" and enable "Allow from this source" for your browser or file manager.',
    },
    {
      num: '3',
      title: 'Confirm Package Installation',
      desc: 'Review the application permissions and tap "Install" to complete setup. BLACKUI requires only standard storage and notification permissions.',
    },
    {
      num: '4',
      title: 'Optional: Verify SHA-256 Checksum',
      desc: 'Use any on-device hash checker or computer terminal to verify that the downloaded package hash matches our official release hash.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#0D0F12] border border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sideload-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#121419]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191C22] border border-white/[0.08] flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#C6B6FF]" />
            </div>
            <div>
              <h3 id="sideload-modal-title" className="text-base sm:text-lg font-semibold text-[#F5F5F6]">
                Android APK Sideloading Guide
              </h3>
              <p className="text-xs font-mono-code text-[#A0A3AB]">
                Package: {BLACKUI_RELEASES.android.apk.expectedFilename} ({BLACKUI_RELEASES.android.apk.fileSize})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A0A3AB] hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Important Security Notice */}
          <div className="p-4 rounded-xl bg-[#121419] border border-white/[0.08] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D8C4A0] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#A0A3AB]">
              <strong className="text-[#F5F5F6] block mb-1">Android Security Notice</strong>
              Because BLACKUI is distributed directly as an APK without the Google Play Store, Android will request confirmation before installing. This is normal behavior for standalone Android packages.
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[#707580]">
              Installation Instructions
            </div>
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#191C22] border border-white/[0.1] text-xs font-mono-code text-[#C6B6FF] flex items-center justify-center shrink-0">
                  {s.num}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-[#F5F5F6]">
                    {s.title}
                  </div>
                  <div className="text-xs text-[#A0A3AB] leading-relaxed mt-0.5">
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hash Verification Box */}
          <div className="p-4 rounded-xl bg-[#08090B] border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code text-[#707580] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#82C9A0]" />
                Official SHA-256 Checksum
              </span>
              <button
                onClick={copyHash}
                className="text-[11px] font-mono-code text-[#C6B6FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
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
            <div className="font-mono-code text-[11px] text-[#A0A3AB] bg-[#121419] p-2.5 rounded border border-white/[0.06] select-all break-all">
              {BLACKUI_RELEASES.android.apk.sha256}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#121419] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-mono-code text-[#A0A3AB] hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={getGitHubDownloadUrl(BLACKUI_RELEASES.android.apk.expectedFilename)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#08090B] bg-[#F5F5F6] hover:bg-white rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#08090B]" />
            <span>Download APK ({BLACKUI_RELEASES.android.apk.fileSize})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
