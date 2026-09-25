import React from 'react';
import { GlassWater, BookOpen, Plus, Search, Sparkles } from 'lucide-react';

export default function Header({ onOpenBook, onOpenAddModal, searchTerm, setSearchTerm, totalCount }) {
  return (
    <header className="sticky top-0 z-30 bg-[#FF5500]/95 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-11 h-11 rounded-2xl bg-white text-[#FF5500] flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300">
                <GlassWater className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase drop-shadow-sm font-sans">
                    coctail
                  </h1>
                  <span className="bg-white/25 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-sm">
                    {totalCount} Tarif
                  </span>
                </div>
                <p className="text-white/80 text-xs font-medium hidden sm:block">
                  Özel Kokteyl Tarifleri & Miksoloji Rehberi
                </p>
              </div>
            </div>

            {/* Mobile Actions Shortcut */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={onOpenBook}
                className="p-2.5 rounded-xl bg-amber-400 text-stone-900 shadow-md active:scale-95 transition-transform flex items-center font-bold text-xs"
                title="Tarif Kitabını Aç"
              >
                <BookOpen className="w-4 h-4 mr-1 text-stone-950" />
                <span>Kitap</span>
              </button>
              <button
                onClick={onOpenAddModal}
                className="p-2.5 rounded-xl bg-white text-[#FF5500] shadow-md active:scale-95 transition-transform font-bold text-xs flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Ekle</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg mx-auto md:mx-0 w-full">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kokteyl adı veya malzeme ara (örn: Lime, Viski, Mojito)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/15 hover:bg-black/20 focus:bg-black/25 text-white placeholder-white/70 border border-white/25 focus:border-white focus:outline-none transition-all text-sm shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-white/30 hover:bg-white/40 text-white rounded-full px-2 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenBook}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center space-x-2 border border-amber-400/30 group"
            >
              <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Tarif Kitabı Görüntüle</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#FF5500] font-black text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center space-x-2 border border-white/50"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yeni Tarif Ekle</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
