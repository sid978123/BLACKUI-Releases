import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ShieldCheck } from 'lucide-react';
import { DotMatrixWordmark } from './DotMatrixWordmark';
import { BLACKUI_RELEASES } from '../config/releases';

interface HeaderProps {
  onOpenChecksums?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChecksums }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active state
      const sections = ['product', 'features', 'downloads', 'faq'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Product', href: '#product', id: 'product' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Downloads', href: '#downloads', id: 'downloads' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#08090B]/85 backdrop-blur-md border-b border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[#08090B]/60 backdrop-blur-sm border-b border-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-[1240px] h-full mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: BLACKUI Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6B6FF] rounded px-1 py-1"
          aria-label="BLACKUI Home"
        >
          <DotMatrixWordmark dotSize={2.4} gap={1.2} charSpacing={4.2} activeColor="#F5F5F6" />
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono-code font-medium px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-[#A0A3AB]">
            {BLACKUI_RELEASES.tag}
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium transition-colors rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6B6FF] ${
                  isActive
                    ? 'text-[#F5F5F6]'
                    : 'text-[#A0A3AB] hover:text-[#F5F5F6] hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#C6B6FF] rounded-full shadow-[0_0_8px_rgba(198,182,255,0.4)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenChecksums && (
            <button
              onClick={onOpenChecksums}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono-code text-[#A0A3AB] hover:text-[#F5F5F6] border border-white/[0.08] hover:border-white/[0.18] rounded-md transition-colors bg-white/[0.02] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6B6FF]"
              title="Verify SHA-256 Checksums"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6B6FF]" />
              <span>Verify Hashes</span>
            </button>
          )}

          <a
            href="#downloads"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#downloads');
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium text-[#08090B] bg-[#F5F5F6] hover:bg-[#FFFFFF] border border-transparent rounded-md transition-all shadow-[0_1px_2px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6B6FF] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-[#08090B]" />
            <span>Download</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#downloads"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#downloads');
            }}
            className="px-3 py-1 text-[12px] font-medium text-[#08090B] bg-[#F5F5F6] rounded-md"
          >
            Get App
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A0A3AB] hover:text-[#F5F5F6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6B6FF] rounded-md border border-white/[0.08]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] bg-[#08090B]/98 backdrop-blur-xl z-40 sm:hidden flex flex-col px-6 py-8 border-t border-white/[0.09] animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#707580] mb-2 px-3">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 text-lg font-medium text-[#F5F5F6] hover:bg-white/[0.04] rounded-lg transition-colors border border-transparent hover:border-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.09] flex flex-col gap-3">
            <a
              href="#downloads"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#downloads');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-[14px] font-semibold text-[#08090B] bg-[#F5F5F6] hover:bg-white rounded-lg shadow-md"
            >
              <Download className="w-4 h-4 text-[#08090B]" />
              <span>Download BLACKUI {BLACKUI_RELEASES.latestVersion}</span>
            </a>

            {onOpenChecksums && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChecksums();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-[13px] font-mono-code text-[#A0A3AB] border border-white/[0.08] bg-white/[0.02] rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6B6FF]" />
                <span>Verify SHA-256 Hashes</span>
              </button>
            )}

            <div className="flex items-center justify-between text-[11px] font-mono-code text-[#707580] pt-2">
              <span>Windows 10/11 & Android 8+</span>
              <span>{BLACKUI_RELEASES.tag}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
