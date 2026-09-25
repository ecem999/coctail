import React from 'react';
import { Plus, X } from 'lucide-react';

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  cocktailCounts,
  onOpenAddCategory,
  onDeleteCategory
}) {
  const allCount = Object.values(cocktailCounts).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="w-full py-2">
      {/* Responsive Flex Wrap: Asla taşma yapmaz, ekrana göre alt alta sıralanır */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        
        {/* All Categories Option */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
            activeCategory === 'all'
              ? 'bg-stone-900 text-white shadow-md scale-105 border-2 border-white/40'
              : 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-sm'
          }`}
        >
          <span className="text-base">✨</span>
          <span>Tüm Kokteyller</span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
            activeCategory === 'all' ? 'bg-amber-400 text-stone-950' : 'bg-black/20 text-white'
          }`}>
            {allCount}
          </span>
        </button>

        {/* Categories List (7 defaults + custom added categories) */}
        {categories.map((cat) => {
          const count = cocktailCounts[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              className="relative inline-flex items-center group"
            >
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-md scale-105 border-2 border-white/40'
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-sm'
                } ${cat.isCustom ? 'pr-7' : ''}`}
              >
                <span className="text-base">{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-amber-400 text-stone-950' : 'bg-black/20 text-white'
                }`}>
                  {count}
                </span>
              </button>

              {/* If custom category, allow deletion */}
              {cat.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`"${cat.name}" alkol kategorisini silmek istediğinize emin misiniz?`)) {
                      onDeleteCategory(cat.id);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  title="Kategoriyi Sil"
                >
                  <X className="w-2.5 h-2.5 stroke-[3]" />
                </button>
              )}
            </div>
          );
        })}

        {/* Hemen Yanlarında: Alkol Çeşidi Ekle Butonu */}
        <button
          onClick={onOpenAddCategory}
          className="flex items-center space-x-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-black/25 hover:bg-black/40 border-2 border-dashed border-white/50 backdrop-blur-sm transition-all duration-200 active:scale-95 shadow-sm hover:border-white"
          title="Yeni bir alkol veya likör kategorisi tanımlayın"
        >
          <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>Alkol Çeşidi Ekle</span>
        </button>

      </div>
    </div>
  );
}
