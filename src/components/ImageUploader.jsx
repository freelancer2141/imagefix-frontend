import React, { useRef, useState, useEffect } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  FileText, 
  X, 
  RefreshCw, 
  AlertCircle, 
  Sparkles,
  UserCheck,
  PenTool
} from 'lucide-react';
import { getOriginalImageMeta, createSampleImage } from '../utils/imageProcessor.js';

export default function ImageUploader({ imageMeta, setImageMeta, onReset, error, setError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Clipboard Paste support
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleProcessFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleProcessFile = async (file) => {
    if (!file) return;
    setError(null);
    setIsLoading(true);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (file.type && !validTypes.includes(file.type.toLowerCase())) {
      setError('Please select a JPG, JPEG, PNG, or WebP image.');
      setIsLoading(false);
      return;
    }

    // Limit maximum file size (30MB)
    if (file.size && file.size > 30 * 1024 * 1024) {
      setError('Please select an image smaller than 30 MB.');
      setIsLoading(false);
      return;
    }

    try {
      const meta = await getOriginalImageMeta(file);
      setImageMeta(meta);
    } catch (err) {
      setError(err.message || 'Failed to read image. The file may be corrupt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (type = 'passport') => {
    setError(null);
    setIsLoading(true);
    try {
      const sampleMeta = createSampleImage(type);
      setImageMeta(sampleMeta);
    } catch (err) {
      setError('Failed to generate sample image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
    // Reset input value so re-selecting same file fires event
    e.target.value = '';
  };

  const triggerUploadClick = (e) => {
    if (e) e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center relative min-h-[360px] sm:min-h-[440px]">
      {/* Hidden native input always mounted */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        id="file-upload-input"
      />

      {/* Error alert */}
      {error && (
        <div className="absolute top-3 left-3 right-3 z-30 p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-start gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
          <button 
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-200 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Dropzone or Loaded Preview */}
      {!imageMeta ? (
        <div className="flex flex-col h-full justify-between">
          <div
            id="image-dropzone"
            onClick={triggerUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative w-full flex-1 min-h-[280px] sm:min-h-[320px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center bg-white dark:bg-slate-900 group cursor-pointer transition-all p-6 sm:p-8 select-none ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 scale-[0.99]'
                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-xs'
            }`}
          >
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/80 rounded-full mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors shadow-xs">
              {isLoading ? (
                <RefreshCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
              ) : (
                <UploadCloud className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>

            <p className="text-base font-bold text-slate-800 dark:text-slate-100 text-center">
              {isLoading ? 'Processing Image...' : 'Click to Upload Image'}
            </p>
            <p className="text-xs text-slate-400 mt-1 text-center">
              or drag and drop your JPG, PNG, or WebP photo here
            </p>

            <button
              type="button"
              onClick={triggerUploadClick}
              className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-200 dark:shadow-none transition-all cursor-pointer"
            >
              Browse Files
            </button>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Paste from clipboard (Ctrl+V)
            </div>
          </div>

        </div>
      ) : (
        /* Image Loaded Preview & Floating Glass Info Card */
        <div className="w-full h-full min-h-[340px] sm:min-h-[400px] rounded-2xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Main Visual Image */}
          <div className="flex-1 flex items-center justify-center w-full pb-16 pt-2">
            <img
              src={imageMeta.dataUrl}
              alt="Uploaded Preview"
              className="max-h-56 sm:max-h-64 max-w-full object-contain rounded-xl shadow-xs"
            />
          </div>

          {/* Floating Bottom Glass Info Card */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-md flex items-center gap-3 z-20">
            <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <img
                src={imageMeta.dataUrl}
                alt="thumb"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title={imageMeta.name}>
                {imageMeta.name}
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                {imageMeta.width} × {imageMeta.height} px • {imageMeta.formattedSize}
              </p>
            </div>

            <button
              id="change-image-btn"
              type="button"
              onClick={() => {
                setImageMeta(null);
                if (onReset) onReset();
                setTimeout(() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }, 50);
              }}
              title="Upload a different image"
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
