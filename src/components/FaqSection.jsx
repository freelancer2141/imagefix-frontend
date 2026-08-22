import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How does ImageFix compress images to a specific KB size?',
    a: 'ImageFix processes your image directly in your browser using the HTML5 Canvas API. It adjusts JPEG compression settings to reduce the file size toward your selected KB target while preserving the image dimensions and aiming for the best practical visual quality.',
  },
  {
    q: 'Are my personal photos or signature documents uploaded to your servers?',
    a: 'No, absolutely not. ImageFix operates 100% inside your web browser using HTML5 Canvas API and JavaScript. Your sensitive photographs, signatures, and certificates never leave your computer or phone.',
  },
  {
    q: 'Why do government exam portals reject uploaded photos?',
    a: 'Government and recruitment portals may check requirements such as image dimensions and file-size limits. For example, a portal may require a specific pixel size or a file between certain KB limits. If your image does not meet the published requirements, the portal may reject it. ImageFix helps you resize and compress your image toward the required dimensions and file-size limits.'
  },
  {
    q: 'How do I convert 3.5 cm × 4.5 cm into pixels?',
    a: 'At the standard high-resolution print standard of 300 DPI (dots per inch), 3.5 cm is approximately 413 pixels and 4.5 cm is approximately 531 pixels. At 200 DPI, it is roughly 276 × 354 pixels. ImageFix provides ready-made presets calibrated to standard 300 DPI print quality.',
  },
  {
    q: 'Can I resize and compress both photo and signature?',
    a: 'Yes! You can resize your photograph using the photo presets (or custom 200×230 px), download it, and then process your signature image using the signature preset (140×60 px, ≤ 20 KB).',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2 border border-indigo-200/80 dark:border-indigo-800">
          <HelpCircle className="w-3.5 h-3.5" />
          Help & Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Simple guidelines to ensure your photograph is accepted on the first upload.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3"
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
