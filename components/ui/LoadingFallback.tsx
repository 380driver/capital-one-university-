import React from 'react';

export const LoadingFallback = () => (
  <div className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-spin opacity-75"></div>
      <div className="absolute inset-2 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
    </div>
  </div>
);
