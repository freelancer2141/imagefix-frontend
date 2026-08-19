import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Lock,
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { PRESET_OPTIONS } from '../utils/presetsData.js';
import { resizeImageToDimensions, compressImageToTargetSize } from '../utils/imageProcessor.js';
import { recordProcessedAction } from '../services/api.js';

export default function ResizeTool({
  imageMeta,
  onProcessComplete,
  isProcessing,
  setIsProcessing,
  initialPresetId = null,
  initialTargetKb = null,
  activeTab = 'resize',
  setActiveTab
}) {
  const [selectedPreset, setSelectedPreset] = useState('custom');
  const [width, setWidth] = useState(imageMeta?.width || 200);
  const [height, setHeight] = useState(imageMeta?.height || 230);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(imageMeta?.aspectRatio || (200 / 230));
  const [format, setFormat] = useState('image/jpeg');
  const [applyTargetKb, setApplyTargetKb] = useState(Boolean(initialTargetKb));
  const [targetKb, setTargetKb] = useState(initialTargetKb || 50);
  const [validationError, setValidationError] = useState('');

  // Sync initial dimensions when a new image loads
  useEffect(() => {
    if (imageMeta) {
      const ratio = imageMeta.width / imageMeta.height;
      setAspectRatio(ratio);
      if (selectedPreset === 'custom') {
        setWidth(imageMeta.width);
        setHeight(imageMeta.height);
      }
    }
  }, [imageMeta]);

  // Sync initialTargetKb if updated from chaining workflow
  useEffect(() => {
    if (initialTargetKb) {
      setApplyTargetKb(true);
      setTargetKb(initialTargetKb);
    }
  }, [initialTargetKb]);

  // If initial preset is passed from guide
  useEffect(() => {
    if (initialPresetId) {
      applyPresetById(initialPresetId);
    }
  }, [initialPresetId]);

  const applyPresetById = (presetId) => {
    if (presetId === 'custom') {
      setSelectedPreset('custom');
      return;
    }
    const found = PRESET_OPTIONS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPreset(found.id);
      setWidth(found.width);
      setHeight(found.height);
      setMaintainAspectRatio(false);
      if (found.targetKb) {
        setTargetKb(found.targetKb);
      }
    }
  };

  const handlePresetChange = (e) => {
    const value = e.target.value;
    applyPresetById(value);
  };

  const handleWidthChange = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num <= 0) {
      setWidth('');
      return;
    }
    setWidth(num);
    if (maintainAspectRatio && aspectRatio) {
      setHeight(Math.round(num / aspectRatio));
    }
    setSelectedPreset('custom');
  };

  const handleHeightChange = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num <= 0) {
      setHeight('');
      return;
    }
    setHeight(num);
    if (maintainAspectRatio && aspectRatio) {
      setWidth(Math.round(num * aspectRatio));
    }
    setSelectedPreset('custom');
  };

  const handleToggleAspectRatio = () => {
    if (!maintainAspectRatio) {
      if (width && height) {
        setAspectRatio(width / height);
      }
    }
    setMaintainAspectRatio(!maintainAspectRatio);
  };

  const handleResetToOriginal = () => {
    if (imageMeta) {
      setWidth(imageMeta.width);
      setHeight(imageMeta.height);
      setAspectRatio(imageMeta.aspectRatio);
      setSelectedPreset('custom');
    }
  };

  const handleResize = async () => {
    if (!imageMeta) {
      setValidationError('Please upload an image first, or click a sample photo below.');
      const fileInput = document.getElementById('file-upload-input');
      if (fileInput) fileInput.click();
      return;
    }

    const w = parseInt(width, 10);
    const h = parseInt(height, 10);

    if (!w || !h || w < 10 || h < 10 || w > 10000 || h > 10000) {
      setValidationError('Please enter valid dimensions between 10 px and 10,000 px.');
      return;
    }

    setValidationError('');
    setIsProcessing(true);

    try {
      let result;
      if (applyTargetKb && targetKb && targetKb > 0) {
        const resizedStep = await resizeImageToDimensions({
          image: imageMeta.imageElement || imageMeta.dataUrl,
          targetWidth: w,
          targetHeight: h,
          format,
        });

        const intermediateImg = new Image();
        intermediateImg.src = resizedStep.dataUrl;
        await new Promise((res) => { intermediateImg.onload = res; });

        const compressed = await compressImageToTargetSize({
          image: intermediateImg,
          targetKb,
          initialWidth: w,
          initialHeight: h,
          format,
          preserveExactDimensions: true,
        });

        result = {
          ...compressed,
          originalWidth: imageMeta.width,
          originalHeight: imageMeta.height,
          originalSize: imageMeta.size,
          originalFormattedSize: imageMeta.formattedSize,
          operation: 'resize_and_compress',
          filename: `imagefix-${w}x${h}-${targetKb}kb.${format === 'image/png' ? 'png' : 'jpg'}`,
        };
      } else {
        const resized = await resizeImageToDimensions({
          image: imageMeta.imageElement || imageMeta.dataUrl,
          targetWidth: w,
          targetHeight: h,
          format,
        });

        result = {
          ...resized,
          originalWidth: imageMeta.width,
          originalHeight: imageMeta.height,
          originalSize: imageMeta.size,
          originalFormattedSize: imageMeta.formattedSize,
          operation: 'resize',
          filename: `imagefix-${w}x${h}.${format === 'image/png' ? 'png' : 'jpg'}`,
        };
      }

      recordProcessedAction('resize', Math.max(0, imageMeta.size - result.size));
      onProcessComplete(result);
    } catch (err) {
      setValidationError(err.message || 'Failed to resize image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div>
        {/* Uppercase tracking label */}
        <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-3">
          Configuration
        </label>

        {/* Mode Switcher Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('resize')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-bold shadow-xs border border-slate-200/60 dark:border-slate-700 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 stroke-[2.2]" />
            <span>Resize</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('compress')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Minimize2 className="w-4 h-4 stroke-[2.2]" />
            <span>Compress</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="preset-select" className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Exam & Standard Presets
            </label>
            <span className="text-[10px] font-medium text-slate-400">SSC • UPSC • Passport</span>
          </div>

          <select
            id="preset-select"
            value={selectedPreset}
            onChange={handlePresetChange}
            className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          >
            <option value="custom"> Custom Dimensions (Specify Below)</option>
            <optgroup label="Government Examination Forms">
              {PRESET_OPTIONS.filter((p) => p.category === 'gov_exam').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.aspectLabel})
                </option>
              ))}
            </optgroup>
            <optgroup label="Banking & Financial Sector">
              {PRESET_OPTIONS.filter((p) => p.category === 'banking').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.aspectLabel})
                </option>
              ))}
            </optgroup>
            <optgroup label="Passport, Visa & ID Cards">
              {PRESET_OPTIONS.filter((p) => p.category === 'passport_id').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.aspectLabel})
                </option>
              ))}
            </optgroup>
            <optgroup label="University & National Entrances">
              {PRESET_OPTIONS.filter((p) => p.category === 'university').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.aspectLabel})
                </option>
              ))}
            </optgroup>
            <optgroup label="Web & Social">
              {PRESET_OPTIONS.filter((p) => p.category === 'social').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.aspectLabel})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Width & Height Numeric Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="resize-width" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
              Width (px)
            </label>
            <input
              id="resize-width"
              type="number"
              min="10"
              max="10000"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              placeholder="200"
              className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-sm font-mono font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="resize-height" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
              Height (px)
            </label>
            <input
              id="resize-height"
              type="number"
              min="10"
              max="10000"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="230"
              className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-sm font-mono font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Maintain Aspect Ratio & Reset */}
        <div className="flex items-center justify-between py-1 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maintain-aspect-checkbox"
              checked={maintainAspectRatio}
              onChange={handleToggleAspectRatio}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer dark:bg-slate-800 dark:border-slate-700"
            />
            <label
              htmlFor="maintain-aspect-checkbox"
              className="text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer select-none"
            >
              Maintain Aspect Ratio
            </label>
          </div>

          {imageMeta && (
            <button
              id="reset-dimensions-btn"
              type="button"
              onClick={handleResetToOriginal}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Original
            </button>
          )}
        </div>

        {/* Optional Target KB Compress checkbox */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="apply-target-kb-checkbox"
                type="checkbox"
                checked={applyTargetKb}
                onChange={(e) => setApplyTargetKb(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer dark:bg-slate-800 dark:border-slate-700"
              />
              <label
                htmlFor="apply-target-kb-checkbox"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none"
              >
                Also compress to max size
              </label>
            </div>

            {applyTargetKb && (
              <div className="flex items-center gap-1 text-xs">
                <input
                  id="resize-target-kb-input"
                  type="number"
                  min="10"
                  max="2000"
                  value={targetKb}
                  onChange={(e) => setTargetKb(parseInt(e.target.value, 10) || 50)}
                  className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
                <span className="font-bold text-indigo-600 dark:text-indigo-400">KB</span>
              </div>
            )}
          </div>
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <button
        id="primary-resize-btn"
        type="button"
        onClick={handleResize}
        disabled={isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing in Browser...</span>
          </>
        ) : (
          <>
            <span>Process & Resize ({width || 0} × {height || 0} px)</span>
            <Maximize2 className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
