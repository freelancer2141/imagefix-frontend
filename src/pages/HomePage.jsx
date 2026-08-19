import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import ResizeTool from '../components/ResizeTool.jsx';
import CompressTool from '../components/CompressTool.jsx';
import ResultCard from '../components/ResultCard.jsx';
import CommonPresetsGuide from '../components/CommonPresetsGuide.jsx';
import FaqSection from '../components/FaqSection.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('resize'); // 'resize' | 'compress'
  const [activeNav, setActiveNav] = useState('resize'); // 'resize' | 'compress' | 'presets' | 'faq'
  const [imageMeta, setImageMeta] = useState(null);
  const [processedResult, setProcessedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [presetToApply, setPresetToApply] = useState(null);
  const [targetKbToApply, setTargetKbToApply] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const scrollToHash = () => {
      const element = document.getElementById(hash.substring(1));

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        if (hash === '#presets-guide') {
          setActiveNav('presets');
        }

        if (hash === '#faq-section') {
          setActiveNav('faq');
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToHash();
      });
    });
  }, []);



  // Synchronize scroll position with active navbar highlight & auto-fading scrollbar
  useEffect(() => {
    let scrollIdleTimer = null;

    const handleScroll = () => {
      // Manage auto-fading scrollbars
      document.body.classList.remove('scroll-idle');
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        document.body.classList.add('scroll-idle');
      }, 1200);

      // Section tracker for navbar
      const presetsEl = document.getElementById('presets-guide');
      const faqEl = document.getElementById('faq-section');
      const scrollPosition = window.scrollY + 220;

      if (faqEl && scrollPosition >= faqEl.offsetTop) {
        setActiveNav('faq');
      } else if (presetsEl && scrollPosition >= presetsEl.offsetTop) {
        setActiveNav('presets');
      } else {
        setActiveNav(activeTab);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
    };
  }, [activeTab]);

  const scrollToSection = (id) => {
    if (id === 'presets-guide') {
      setActiveNav('presets');
    } else if (id === 'faq-section') {
      setActiveNav('faq');
    } else if (id === 'tool-section') {
      setActiveNav(activeTab);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    setImageMeta(null);
    setProcessedResult(null);
    setError(null);
    setPresetToApply(null);
    setTargetKbToApply(null);
  };

  const handleSelectPresetFromGuide = (preset) => {
    setActiveTab('resize');
    setActiveNav('resize');
    setPresetToApply(preset.id);
    scrollToSection('tool-section');
  };

  // Seamless Next-Step Workflow: Feed processed output directly into next tool
  const handleContinueWithProcessedImage = (result, nextTab, customTargetKb = null) => {
    const updatedMeta = {
      name: result.filename || (nextTab === 'compress' ? 'resized-photo.jpg' : 'compressed-photo.jpg'),
      type: 'image/jpeg',
      size: result.size,
      formattedSize: result.formattedSize,
      width: result.width,
      height: result.height,
      aspectRatio: result.width / result.height,
      dataUrl: result.dataUrl,
      imageElement: null,
    };

    setImageMeta(updatedMeta);
    setProcessedResult(null);
    setActiveTab(nextTab);
    setActiveNav(nextTab);
    if (customTargetKb) {
      setTargetKbToApply(customTargetKb);
    }
    scrollToSection('tool-section');
  };

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Subtle background ambient gradients for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent dark:from-indigo-600/15 dark:via-indigo-950/10 dark:to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <Header
        activeNav={activeNav}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <HeroSection
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setActiveNav(tab);
            setProcessedResult(null);
          }}
          scrollToSection={scrollToSection}
        />

        {/* Main Interactive Tool Container */}
        {/* <div id="tool-section" className="max-w-5xl mx-auto px-4 mb-16"> */}
        <section
          id="tool-section"
          aria-labelledby="image-tool-heading"
          className="max-w-5xl mx-auto px-4 mb-16"
        >
          <h2 id="image-tool-heading" className="sr-only">
            Resize and Compress Images Online
          </h2>

          {/* If an image has already been processed, show ResultCard directly */}
          {processedResult ? (
            <ResultCard
              result={processedResult}
              onReset={handleReset}
              onContinueWithImage={handleContinueWithProcessedImage}
            />
          ) : (
            <div className="w-full bg-white dark:bg-slate-900/90 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row min-h-[480px]">
              {/* Left Column: Dropzone / Preview Stage */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center bg-slate-50/70 dark:bg-[#0c1220] border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800/80 relative">
                <ImageUploader
                  imageMeta={imageMeta}
                  setImageMeta={(meta) => {
                    setImageMeta(meta);
                    setProcessedResult(null);
                    setError(null);
                  }}
                  onReset={handleReset}
                  error={error}
                  setError={setError}
                />
              </div>

              {/* Right Column: Configuration & Process Controls */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900/90">
                {activeTab === 'resize' ? (
                  <ResizeTool
                    imageMeta={imageMeta}
                    onProcessComplete={(res) => setProcessedResult(res)}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    initialPresetId={presetToApply}
                    initialTargetKb={targetKbToApply}
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                      setActiveTab(tab);
                      setProcessedResult(null);
                    }}
                  />
                ) : (
                  <CompressTool
                    imageMeta={imageMeta}
                    onProcessComplete={(res) => setProcessedResult(res)}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                      setActiveTab(tab);
                      setProcessedResult(null);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </section>

        <section
          aria-labelledby="popular-tools-heading"
          className="max-w-5xl mx-auto px-4 mb-16"
        >
          <div className="text-center mb-8">
            <h2
              id="popular-tools-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
            >
              Popular Image Tools
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Quickly resize and compress images for common online applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <a
              href="/image-resizer"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Image Resizer
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Resize images to exact pixel dimensions online.
              </p>
            </a>

            <a
              href="/image-compressor"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Image Compressor
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Reduce image file size for online forms and applications.
              </p>
            </a>

            <a
              href="/compress-image-to-20kb"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Compress Image to 20KB
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Reduce an image to approximately 20KB online.
              </p>
            </a>

            <a
              href="/compress-image-to-50kb"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Compress Image to 50KB
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Compress images to approximately 50KB for applications.
              </p>
            </a>

            <a
              href="/compress-image-to-100kb"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Compress Image to 100KB
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Compress images to approximately 100KB online.
              </p>
            </a>

            <a
              href="/passport-photo-resizer"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Passport Photo Resizer
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Resize passport photos for online applications.
              </p>
            </a>

            <a
              href="/signature-resizer"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                Signature Resizer
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Resize signatures for forms and applications.
              </p>
            </a>

            <a
              href="/ssc-photo-resizer"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                SSC Photo Resizer
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Resize photos for SSC application forms.
              </p>
            </a>

            <a
              href="/upsc-photo-resizer"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                UPSC Photo Resizer
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Resize photos for UPSC application forms.
              </p>
            </a>

          </div>
        </section>

        {/* Common Presets Directory & Guide */}
        <CommonPresetsGuide onSelectPreset={handleSelectPresetFromGuide} />

        {/* FAQ & Best Practices Guide */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
