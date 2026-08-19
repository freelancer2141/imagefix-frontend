import React, { useState, useEffect } from 'react';
import {
  Minimize2,
  Maximize2,
  Sliders,
  Sparkles,
  CheckCircle2,
  Info,
  AlertCircle,
  Zap,
  ArrowRight,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { compressImageToTargetSize } from "../utils/imageProcessor.js";
import { formatBytes } from "../utils/formatters.js";
import { recordProcessedAction } from '../services/api.js';

export default function CompressTool({
  imageMeta,
  onProcessComplete,
  isProcessing,
  setIsProcessing,
  activeTab = 'compress',
  setActiveTab,
  initialTargetKb = null
}) {
  const originalKb = imageMeta ? Math.round((imageMeta.size / 1024) * 10) / 10 : 200;

  // Set initial target
  const [targetKb, setTargetKb] = useState(() => {
    if (initialTargetKb !== null) {
      return initialTargetKb;
    }

    if (!imageMeta) return 50;
    if (originalKb > 100) return 50;
    if (originalKb > 50) return 20;

    return Math.max(10, Math.round(originalKb * 0.8));
  });

  const [inputTargetKb, setInputTargetKb] = useState(targetKb.toString());
  const [preserveExactDimensions, setPreserveExactDimensions] = useState(true);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // Popular Quick-Pick KB values common in recruitment forms
  const QUICK_KB_PRESETS = [20, 50, 100, 200, 500];

  useEffect(() => {
    if (initialTargetKb !== null) {
      setTargetKb(initialTargetKb);
      setInputTargetKb(initialTargetKb.toString());
      return;
    }

    if (imageMeta) {
      const orig = Math.round((imageMeta.size / 1024) * 10) / 10;

      let initialVal = 50;

      if (orig <= 50) {
        initialVal = 20;
      } else if (orig <= 200) {
        initialVal = 50;
      } else {
        initialVal = 100;
      }

      setTargetKb(initialVal);
      setInputTargetKb(initialVal.toString());
    }
  }, [imageMeta, initialTargetKb]);

  // Sync slider change with input text box
  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setTargetKb(val);
    setInputTargetKb(val.toString());
    setValidationError('');
  };

  // Sync custom input text change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputTargetKb(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 10 && parsed <= 5000) {
      setTargetKb(parsed);
      setValidationError('');
    }
  };

  // "Set Target" explicit button click handler
  const handleSetTarget = (valToSet) => {
    const parsed = parseInt(valToSet || inputTargetKb, 10);
    if (isNaN(parsed) || parsed < 10) {
      setValidationError('Minimum target size is 10 KB.');
      return;
    }
    if (parsed > 5000) {
      setValidationError('Maximum target size is 5000 KB (5 MB).');
      return;
    }
    setTargetKb(parsed);
    setInputTargetKb(parsed.toString());
    setValidationError('');
  };

  const handleCompress = async () => {
    if (!imageMeta) {
      // If user clicks compress before uploading, prompt and trigger native upload picker
      setValidationError('Please upload an image first, or click a sample photo below.');
      const fileInput = document.getElementById('file-upload-input');
      if (fileInput) fileInput.click();
      return;
    }

    const targetVal = parseInt(targetKb, 10);
    if (isNaN(targetVal) || targetVal < 10) {
      setValidationError('Please specify a valid target size (minimum 10 KB).');
      return;
    }

    setValidationError('');
    setIsProcessing(true);
    setCompressionProgress(10);
    setStatusMessage('Analyzing image and optimizing byte stream...');

    try {
      const origBytes = imageMeta.size;
      const targetBytes = targetVal * 1024;

      if (origBytes <= targetBytes) {
        setStatusMessage('Your image is already smaller than the selected target size.');
      }

      const result = await compressImageToTargetSize({
        image: imageMeta.imageElement || imageMeta.dataUrl,
        targetKb: targetVal,
        initialWidth: imageMeta.width,
        initialHeight: imageMeta.height,
        format: 'image/jpeg',
        preserveExactDimensions: preserveExactDimensions,
        onProgress: (p) => setCompressionProgress(p),
      });

      const finalResult = {
        ...result,
        originalWidth: imageMeta.width,
        originalHeight: imageMeta.height,
        originalSize: imageMeta.size,
        originalFormattedSize: imageMeta.formattedSize,
        operation: 'compress',
        filename: `imagefix-${result.width}x${result.height}-${targetVal}kb.jpg`,
        alreadySmaller: origBytes <= targetBytes,
      };

      recordProcessedAction('compress', Math.max(0, imageMeta.size - finalResult.size));
      onProcessComplete(finalResult);
    } catch (err) {
      setValidationError(err.message || 'Failed to compress image.');
    } finally {
      setIsProcessing(false);
      setCompressionProgress(0);
      setStatusMessage('');
    }
  };

  const isAlreadySmaller = imageMeta && (imageMeta.size / 1024) <= targetKb;

  return (
    <div className="flex flex-col justify-between h-full space-y-5">
      <div>
        {/* Uppercase tracking label */}
        <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-3">
          Configuration
        </label>

        {/* Mode Switcher Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-4 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('resize')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 stroke-[2.2]" />
            <span>Resize</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('compress')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-bold shadow-xs border border-slate-200/60 dark:border-slate-700 cursor-pointer"
          >
            <Minimize2 className="w-4 h-4 stroke-[2.2]" />
            <span>Compress</span>
          </button>
        </div>

        {/* Current Dimension Status & Exact Dimension Lock */}
        {imageMeta && (
          <div className="mb-4 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Original Resolution: <strong className="font-mono text-indigo-700 dark:text-indigo-300 font-bold">{imageMeta.width} × {imageMeta.height} px</strong></span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-300/80 dark:border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                0 Pixels Removed
              </span>
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-white/70 dark:bg-slate-900/60 p-2 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>
                <strong>Pure File Size Compression:</strong> Retains all <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{imageMeta.width} × {imageMeta.height}</span> pixels exactly as uploaded while compressing file weight to your target KB.
              </span>
            </div>
          </div>
        )}

        {/* Target KB Display & Numeric Input */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="compress-target-input" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Target File Size Limit
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="compress-target-input"
                type="number"
                min="10"
                max="5000"
                value={inputTargetKb}
                onChange={handleInputChange}
                className="w-20 px-2.5 py-1 text-center font-mono font-bold text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">KB</span>
            </div>
          </div>

          {/* Range Slider */}
          <input
            id="target-kb-slider"
            type="range"
            min="10"
            max="1000"
            step="5"
            value={Math.min(1000, targetKb || 50)}
            onChange={handleSliderChange}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-mono">
            <span>10 KB (Signatures)</span>
            <span>200 KB</span>
            <span>1000 KB (Max)</span>
          </div>
        </div>

        {/* Quick Presets Pills */}
        <div className="mb-4">
          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider">
            Quick Exam Limits
          </span>
          <div className="grid grid-cols-5 gap-1.5">
            {QUICK_KB_PRESETS.map((kb) => {
              const isSelected = targetKb === kb;
              return (
                <button
                  key={kb}
                  id={`quick-kb-btn-${kb}`}
                  type="button"
                  onClick={() => handleSetTarget(kb)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${isSelected
                    ? 'bg-indigo-600 text-white shadow-xs border border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-950/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                >
                  {kb} KB
                </button>
              );
            })}
          </div>
        </div>

        {/* Informative message if image is already smaller */}
        {isAlreadySmaller && (
          <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong>Note:</strong> Original image ({imageMeta?.formattedSize}) is already within {targetKb} KB. Compressing will preserve optimal fidelity.
            </div>
          </div>
        )}

        {/* Validation error */}
        {validationError && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Progress indicator during compression */}
        {isProcessing && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-1.5">
              <span>Optimizing image quality...</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{compressionProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-150"
                style={{ width: `${compressionProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <button
        id="primary-compress-btn"
        type="button"
        onClick={handleCompress}
        disabled={isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Compressing to ≤ {targetKb} KB...</span>
          </>
        ) : (
          <>
            <span>Compress to ≤ {targetKb} KB</span>
            <Minimize2 className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
