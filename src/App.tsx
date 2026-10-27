import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Features } from './components/Features';
import { DesignDetails } from './components/DesignDetails';
import { TechSpecs } from './components/TechSpecs';
import { Downloads } from './components/Downloads';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { SideloadModal } from './components/SideloadModal';
import { ChecksumModal } from './components/ChecksumModal';

export function App() {
  const [isSideloadModalOpen, setIsSideloadModalOpen] = useState(false);
  const [isChecksumModalOpen, setIsChecksumModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F6] flex flex-col selection:bg-[#C6B6FF]/20 selection:text-[#C6B6FF]">
      {/* Navigation Header */}
      <Header onOpenChecksums={() => setIsChecksumModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectPlatform={(platform) => {
            if (platform === 'android') {
              // Any additional state if needed
            }
          }}
        />

        {/* Product Showcase */}
        <Showcase />

        {/* Features Grid */}
        <Features />

        {/* Design Philosophy */}
        <DesignDetails />

        {/* Technical Architecture */}
        <TechSpecs />

        {/* Official Downloads Panel */}
        <Downloads
          onOpenSideloadGuide={() => setIsSideloadModalOpen(true)}
          onOpenChecksums={() => setIsChecksumModalOpen(true)}
        />

        {/* Technical FAQ */}
        <Faq />
      </main>

      {/* Linear-style Footer */}
      <Footer
        onOpenChecksums={() => setIsChecksumModalOpen(true)}
        onOpenSideloadGuide={() => setIsSideloadModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <SideloadModal
        isOpen={isSideloadModalOpen}
        onClose={() => setIsSideloadModalOpen(false)}
      />

      <ChecksumModal
        isOpen={isChecksumModalOpen}
        onClose={() => setIsChecksumModalOpen(false)}
      />
    </div>
  );
}

export default App;
