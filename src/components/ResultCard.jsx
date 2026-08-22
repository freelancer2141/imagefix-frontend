import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  RefreshCw,
  ArrowDownRight,
  Maximize2,
  Minimize2,
  Eye,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { downloadBlob } from '../utils/imageProcessor.js';

export default function ResultCard({ result, onReset, onContinueWithImage }) {
  const [copied, setCopied] = useState(false);
  const [customFilename, setCustomFilename] = useState(result.filename || 'resized-image.jpg');
  const [showFullPreview, setShowFullPreview] = useState(false);

  if (!result) return null;

  // Calculate percentage reduction
  const reductionPercent = result.originalSize && result.size
    ? Math.max(0, Math.round(((result.originalSize - result.size) / result.originalSize) * 1000) / 10)
    : 0;

  const isResizeOp = result.operation === 'resize' || (!result.achievedKb && result.width && result.height);
  const targetKbUsed = result.achievedKb || Math.round(result.size / 1024);

  const handleDownload = () => {
    const name = customFilename.trim() || 'imagefix-result.jpg';
    downloadBlob(result.blob, name);
  };

  const handleCopyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.ClipboardItem && result.blob) {
        const item = new ClipboardItem({ [result.blob.type || 'image/png']: result.blob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.warn('Clipboard copy failed, downloading instead:', e);
      handleDownload();
    }
  };

  return (
    <div id="result-card" className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50 p-6 sm:p-8 space-y-6">
      {/* Header status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
              Ready for Download
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Processed Locally
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generated locally in browser • Ready for exam/form submission
            </p>
          </div>
        </div>

        <button
          id="process-another-top-btn"
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Process New Image
        </button>
      </div>

      {/* Main Preview & Key Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Visual Image Preview Box */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-[280px] aspect-auto rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-[#0c1220] p-3 flex items-center justify-center">
            <img
              src={result.dataUrl}
              alt="Processed image preview"
              className="max-h-56 max-w-full object-contain rounded-xl shadow-xs"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2">
            Dimensions: {result.width} × {result.height} px
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* File Size Box */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block mb-1">
                File Size
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {result.formattedSize}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono">
                  {result.originalFormattedSize}
                </span>
              </div>
              {reductionPercent > 0 && (
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  {reductionPercent}% reduced
                </div>
              )}
            </div>

            {/* Dimensions Box */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                  Dimensions
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  {isResizeOp ? 'Dimensions Changed' : 'Dimensions Retained'}
                </span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {result.width} × {result.height} <span className="text-xs font-normal text-slate-400">px</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1 font-mono">
                Original: {result.originalWidth} × {result.originalHeight} px
                {!isResizeOp && ' (dimensions retained)'}
              </span>
            </div>
          </div>

          {/* Custom Filename editor */}
          <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
            <label htmlFor="result-filename-input" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Download File Name:
            </label>
            <input
              id="result-filename-input"
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="download-result-btn"
              type="button"
              onClick={handleDownload}
              className="flex-1 py-3.5 sm:py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-200 dark:shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>Download Image</span>
            </button>

            <button
              id="copy-result-btn"
              type="button"
              onClick={handleCopyToClipboard}
              className="py-3.5 sm:py-4 px-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Next-Step Continuous Workflow Card */}
      {onContinueWithImage && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-violet-50/50 to-indigo-50/90 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold">
                2
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {isResizeOp
                  ? `Need to compress this resized photo to KB size?`
                  : `Need to resize this compressed photo's width & height?`}
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 pl-7">
              {isResizeOp
                ? `Lock exact ${result.width} × ${result.height} px dimensions and reduce only the file size (KB).`
                : `Change height & width while strictly preserving your ≤ ${targetKbUsed} KB file size limit.`}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto pl-7 sm:pl-0">
            {isResizeOp ? (
              <button
                id="chain-compress-btn"
                type="button"
                onClick={() => onContinueWithImage(result, 'compress')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 dark:shadow-indigo-950 transition-all cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Compress to KB (Keeps {result.width}×{result.height} px)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                id="chain-resize-btn"
                type="button"
                onClick={() => onContinueWithImage(result, 'resize', targetKbUsed)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 dark:shadow-indigo-950 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Resize Dimensions (Keeps ≤ {targetKbUsed} KB)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Full preview modal */}
      {showFullPreview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full resolution image preview"
          onClick={() => setShowFullPreview(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowFullPreview(false)}
              aria-label="Close full resolution preview"
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={result.dataUrl}
              alt="Full resolution processed image preview"
              className="max-h-[80vh] max-w-full object-contain rounded-xl"
            />

            <div className="text-center p-2 text-xs text-slate-500 dark:text-slate-400">
              Click outside the image or close button to exit
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
