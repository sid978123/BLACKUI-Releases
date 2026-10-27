import { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Copy, Terminal } from 'lucide-react';
import { BLACKUI_RELEASES, GITHUB_CONFIG } from '../config/releases';

interface ChecksumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecksumModal: React.FC<ChecksumModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const artifacts = [
    {
      platform: 'Windows Setup (.exe)',
      file: BLACKUI_RELEASES.windows.standardExe.expectedFilename,
      size: BLACKUI_RELEASES.windows.standardExe.fileSize,
      hash: BLACKUI_RELEASES.windows.standardExe.sha256,
      id: 'win-exe',
    },
    {
      platform: 'Windows Installer Package (.msi)',
      file: BLACKUI_RELEASES.windows.installerMsi.expectedFilename,
      size: BLACKUI_RELEASES.windows.installerMsi.fileSize,
      hash: BLACKUI_RELEASES.windows.installerMsi.sha256,
      id: 'win-msi',
    },
    {
      platform: 'Android Universal APK',
      file: BLACKUI_RELEASES.android.apk.expectedFilename,
      size: BLACKUI_RELEASES.android.apk.fileSize,
      hash: BLACKUI_RELEASES.android.apk.sha256,
      id: 'android-apk',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#0D0F12] border border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checksums-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#121419]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#191C22] border border-white/[0.08] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#82C9A0]" />
            </div>
            <div>
              <h3 id="checksums-modal-title" className="text-base sm:text-lg font-semibold text-[#F5F5F6]">
                Cryptographic Integrity Hashes
              </h3>
              <p className="text-xs font-mono-code text-[#A0A3AB]">
                Release: {BLACKUI_RELEASES.tag} &bull; SHA-256 Digest
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-[#A0A3AB] leading-relaxed">
            Verify your downloaded installer or package against the authentic cryptographic hashes below to ensure that your files were built authentically and without corruption or tampering.
          </p>

          {/* Artifacts List */}
          <div className="space-y-4">
            {artifacts.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-xl bg-[#08090B] border border-white/[0.08] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#F5F5F6] mr-2">
                      {art.platform}
                    </span>
                    <span className="text-[11px] font-mono-code text-[#707580]">
                      {art.file} ({art.size})
                    </span>
                  </div>
                  <button
                    onClick={() => copyText(art.hash, art.id)}
                    className="text-[11px] font-mono-code text-[#C6B6FF] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === art.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#82C9A0]" />
                        <span className="text-[#82C9A0]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy SHA-256</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono-code text-[11px] text-[#A0A3AB] bg-[#121419] p-2.5 rounded border border-white/[0.06] select-all break-all">
                  {art.hash}
                </div>
              </div>
            ))}
          </div>

          {/* Verification Commands Snippet */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#707580]">
              <Terminal className="w-4 h-4 text-[#A0A3AB]" />
              <span>Verification Terminal Commands</span>
            </div>

            {/* PowerShell */}
            <div className="p-3 rounded-lg bg-[#08090B] border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#707580]">
                <span>Windows PowerShell:</span>
                <button
                  onClick={() =>
                    copyText(
                      `Get-FileHash -Algorithm SHA256 .\\${BLACKUI_RELEASES.windows.standardExe.expectedFilename}`,
                      'cmd-ps'
                    )
                  }
                  className="text-[#C6B6FF] hover:text-white cursor-pointer"
                >
                  {copiedKey === 'cmd-ps' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-[11px] font-mono-code text-[#82C9A0] block select-all">
                Get-FileHash -Algorithm SHA256 .\{BLACKUI_RELEASES.windows.standardExe.expectedFilename}
              </code>
            </div>

            {/* Windows CMD */}
            <div className="p-3 rounded-lg bg-[#08090B] border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#707580]">
                <span>Windows Command Prompt:</span>
                <button
                  onClick={() =>
                    copyText(
                      `certutil -hashfile ${BLACKUI_RELEASES.windows.standardExe.expectedFilename} SHA256`,
                      'cmd-cmd'
                    )
                  }
                  className="text-[#C6B6FF] hover:text-white cursor-pointer"
                >
                  {copiedKey === 'cmd-cmd' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-[11px] font-mono-code text-[#82C9A0] block select-all">
                certutil -hashfile {BLACKUI_RELEASES.windows.standardExe.expectedFilename} SHA256
              </code>
            </div>

            {/* Linux / macOS */}
            <div className="p-3 rounded-lg bg-[#08090B] border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#707580]">
                <span>Linux / macOS / Android Termux:</span>
                <button
                  onClick={() =>
                    copyText(`sha256sum ${BLACKUI_RELEASES.android.apk.expectedFilename}`, 'cmd-sh')
                  }
                  className="text-[#C6B6FF] hover:text-white cursor-pointer"
                >
                  {copiedKey === 'cmd-sh' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-[11px] font-mono-code text-[#82C9A0] block select-all">
                sha256sum {BLACKUI_RELEASES.android.apk.expectedFilename}
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#121419] flex items-center justify-between">
          <a
            href={GITHUB_CONFIG.releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-[#C6B6FF] hover:underline"
          >
            Browse Releases on GitHub &rarr;
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono-code text-[#08090B] bg-[#F5F5F6] hover:bg-white rounded-lg transition-colors font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
