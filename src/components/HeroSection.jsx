import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function HeroSection({
  pageType = 'home',
}) {
  const pageContent = {
    home: {
      title: 'Free Online Image Resizer & Image Compressor',
      description:
        'Resize images to exact pixel dimensions or compress them to specific KB sizes for SSC, UPSC, IBPS, passport, visa, and job applications.',
    },

    resize: {
      title: 'Free Online Image Resizer',
      description:
        'Resize images to exact pixel dimensions for SSC, UPSC, IBPS, Railways, passport, visa, job applications, and other online forms.',
    },

    compress: {
      title: 'Free Online Image Compressor',
      description:
        'Compress images to specific KB sizes such as 20KB, 50KB, 100KB, and 200KB for SSC, UPSC, IBPS, Railways, passport, visa, and job applications.',
    },
    compress20: {
      title: 'Compress Image to 20KB Online Free',
      description:
        'Compress images to approximately 20KB online for SSC, UPSC, IBPS, passport, visa, job applications and other online forms.',
    },

    compress50: {
      title: 'Compress Image to 50KB Online Free',
      description:
        'Compress images to approximately 50KB online for SSC, UPSC, IBPS, passport, visa, job applications and other online forms.',
    },

    compress100: {
      title: 'Compress Image to 100KB Online Free',
      description:
        'Compress images to approximately 100KB online for SSC, UPSC, IBPS, passport, visa, job applications and other online forms.',
    },
    passport: {
      title: 'Free Passport Photo Resizer Online',
      description:
        'Resize passport photos to the required pixel dimensions for passport, visa, ID, and online application forms. Adjust image dimensions quickly and easily with ImageFix.',
    },
    signature: {
      title: 'Free Signature Resizer Online',
      description: 'Resize signature images to the required dimensions for government forms, exams, job applications and online application portals.',
    },
    ssc: {
      title: 'Free SSC Photo Resizer Online',
      description:
        'Resize photos to the required dimensions for SSC applications and examination forms. Prepare your image online with ImageFix.',
    },
    upsc: {
      title: 'Free UPSC Photo Resizer Online',
      description:
        'Resize photos to the required dimensions for UPSC applications and examination forms. Prepare your image online with ImageFix.',
    },
  };

  const content = pageContent[pageType] || pageContent.home;

  return (
    <section className="relative pt-3 pb-3 sm:pt-5 sm:pb-4 text-center max-w-4xl mx-auto px-4">

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3">
        {content.title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-5 leading-relaxed">
        {content.description}
      </p>

      {/* Benefit Pillars */}
      <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          No registration required
        </span>

        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          20KB, 50KB & 100KB compression
        </span>

        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
         Exam & ID photo presets
        </span>
      </div>
    </section>
  );
}