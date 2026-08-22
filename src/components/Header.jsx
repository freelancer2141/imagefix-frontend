import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  Minimize2,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function Header({
  activeNav = 'resize'
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const scrollPauseTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHasScrolled(currentScrollY > 15);

      if (currentScrollY <= 60) {
        setIsVisible(true);

        if (scrollPauseTimer.current) {
          clearTimeout(scrollPauseTimer.current);
        }

        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (lastScrollY.current - currentScrollY > 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (scrollPauseTimer.current) {
        clearTimeout(scrollPauseTimer.current);
      }

      scrollPauseTimer.current = setTimeout(() => {
        setIsVisible(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollPauseTimer.current) {
        clearTimeout(scrollPauseTimer.current);
      }
    };
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -96,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 340,
        damping: 28,
        mass: 0.8
      }}
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors duration-200 ${hasScrolled
        ? 'border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md shadow-sm shadow-slate-200/40 dark:shadow-black/40'
        : 'border-slate-200/70 dark:border-slate-800/70 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 dark:from-indigo-500 dark:to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Maximize2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              Image<span className="text-indigo-600 dark:text-indigo-400">Fix</span>
            </span>

            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Exam & Online Form Image Suite
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex ml-auto items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80">

          {/* Resize */}
          <Link
            id="nav-btn-resize"
            to="/image-resizer"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeNav === 'resize'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Resize</span>
          </Link>

          {/* Compress */}
          <Link
            id="nav-btn-compress"
            to="/image-compressor"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeNav === 'compress'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Compress (KB)</span>
          </Link>

          {/* Presets */}
          <a
            id="nav-btn-presets"
            href="/#presets-guide"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeNav === 'presets'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Presets</span>
          </a>

          {/* FAQ */}
          <a
            id="nav-btn-about"
            href="/#faq-section"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeNav === 'faq'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </a>

        </nav>

      </div>
    </motion.header>
  );
}