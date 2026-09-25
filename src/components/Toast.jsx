import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 animate-in slide-in-from-bottom-5 duration-300">
      {toast.type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-rose-400" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      )}
      <span className="text-sm font-semibold">{toast.message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
