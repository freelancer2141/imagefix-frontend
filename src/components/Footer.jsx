import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors duration-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
                <span className="text-sm font-black">IF</span>
              </div>

              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Image<span className="text-indigo-600 dark:text-indigo-400">Fix</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, privacy-focused online photo resizer and file-size
              compressor engineered for government exam candidates, students,
              job applicants, and digital citizens.
            </p>

          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Image Tools
            </h4>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">

              <li>
                <Link
                  to="/image-resizer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Resizer
                </Link>
              </li>

              <li>
                <Link
                  to="/image-compressor"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Compressor
                </Link>
              </li>

              <li>
                <Link
                  to="/compress-image-to-20kb"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Compress Image to 20KB
                </Link>
              </li>

              <li>
                <Link
                  to="/compress-image-to-50kb"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Compress Image to 50KB
                </Link>
              </li>

              <li>
                <Link
                  to="/compress-image-to-100kb"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Compress Image to 100KB
                </Link>
              </li>

            </ul>
          </div>

          {/* Photo Resizers */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Photo Resizers
            </h4>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">

              <li>
                <Link
                  to="/passport-photo-resizer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Passport Photo Resizer
                </Link>
              </li>

              <li>
                <Link
                  to="/signature-resizer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Signature Resizer
                </Link>
              </li>

              <li>
                <Link
                  to="/ssc-photo-resizer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  SSC Photo Resizer
                </Link>
              </li>

              <li>
                <Link
                  to="/upsc-photo-resizer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  UPSC Photo Resizer
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 mb-6">

          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2">
            Disclaimer
          </h4>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
            Examination presets provided are for convenience and reference
            only. Candidates are strictly advised to cross-check requirements
            against the official examination portal and recruitment notification.
          </p>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">

          <div>
            © {new Date().getFullYear()} ImageFix. Built for fast, private image processing.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>•</span>
            <span>Privacy First</span>
            <span>•</span>
            <span>No Account Required</span>
          </div>

        </div>

      </div>
    </footer>
  );
}