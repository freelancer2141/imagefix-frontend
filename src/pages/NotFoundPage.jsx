import React from 'react';
import { Home, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 p-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-6">
          <ImageIcon className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
          404
        </h1>

        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
          Page Not Found
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          The page you are looking for does not exist. Return to ImageFix to resize or compress your image.
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to ImageFix</span>
        </button>
      </div>
    </div>
  );
}