import React from 'react';
import ImageToolPage from '../components/ImageToolPage.jsx';

export default function CompressImageTargetPage({ targetKb }) {
  return (
    <ImageToolPage
      pageType={`compress${targetKb}`}
      toolType="compress"
      targetKb={targetKb}

      title={`Compress Image to ${targetKb}KB Online Free | ImageFix`}

      description={`Compress JPG, JPEG, PNG and WebP images to ${targetKb}KB online for free. Reduce image file size for SSC, UPSC, IBPS, government exams, passport, visa and job application forms.`}

      heading={`Compress Image to ${targetKb}KB`}

      content={
        <>
          <div>
            <h2 className="text-2xl font-bold">
              Compress Photos to {targetKb}KB Online
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              ImageFix lets you reduce an image to a target file size
              of approximately {targetKb}KB directly in your browser.
              This can be useful when an online application requires
              a photograph or signature below a specific file-size
              limit.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              How to Compress an Image to {targetKb}KB
            </h2>

            <ol className="mt-4 space-y-3 text-slate-600 dark:text-slate-400 list-decimal list-inside">
              <li>Select or drag your image into the upload area.</li>
              <li>Choose the {targetKb}KB compression target.</li>
              <li>Process the image.</li>
              <li>Download the compressed image.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Supported Image Formats
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              ImageFix supports common image formats including JPG,
              JPEG, PNG and WebP.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Important Note About File Size Requirements
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              File-size requirements can vary between examinations,
              recruitment portals and application forms. Always
              check the official notification or application portal
              for the exact permitted image dimensions, format and
              maximum file size.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Other Image Compression Sizes
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">

              {targetKb !== 20 && (
                <a
                  href="/compress-image-to-20kb"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Compress Image to 20KB
                </a>
              )}

              {targetKb !== 50 && (
                <a
                  href="/compress-image-to-50kb"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Compress Image to 50KB
                </a>
              )}

              {targetKb !== 100 && (
                <a
                  href="/compress-image-to-100kb"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Compress Image to 100KB
                </a>
              )}

            </div>
          </div>
        </>
      }
    />
  );
}