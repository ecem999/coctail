import React from 'react';
import { Sparkles, ChevronRight, Edit3 } from 'lucide-react';
import { ALCOHOL_CATEGORIES } from '../data/initialCocktails';

export default function CocktailCard({ cocktail, onClick, onEdit }) {
  const categoryInfo = ALCOHOL_CATEGORIES.find(c => c.id === cocktail.category);
  const ingredientCount = cocktail.ingredients?.length || 0;

  return (
    <div
      onClick={() => onClick(cocktail)}
      className="group relative bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-100">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center space-x-1.5 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
            <span>{categoryInfo?.emoji || '🍸'}</span>
            <span>{cocktail.alcoholType || categoryInfo?.name}</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(cocktail);
            }}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            title="Tarifi Düzenle"
          >
            <Edit3 className="w-4 h-4 text-stone-700" />
          </button>
        </div>

        {/* Bottom overlay inside image: Title & Ingredients count */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md tracking-tight">
            {cocktail.name}
          </h3>
          <p className="text-white/80 text-xs font-medium flex items-center space-x-2 mt-0.5">
            <span>{ingredientCount} Malzeme</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">{cocktail.ingredients?.[0]?.name} bazlı</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Ingredients Preview */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {cocktail.ingredients?.slice(0, 4).map((ing, idx) => (
              <span
                key={idx}
                className="bg-orange-50 text-[#FF5500] text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-200/60"
              >
                {ing.name} <span className="text-stone-600 font-normal">({ing.amount})</span>
              </span>
            ))}
            {cocktail.ingredients?.length > 4 && (
              <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-2 py-1 rounded-lg">
                +{cocktail.ingredients.length - 4} daha
              </span>
            )}
          </div>

          {/* Quick Tip / Instructions preview */}
          <p className="text-stone-600 text-xs line-clamp-2 italic leading-relaxed">
            "{cocktail.tips || cocktail.instructions}"
          </p>
        </div>

        {/* Card Footer: Mini Gallery preview and View Action */}
        <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mini Gallery Previews */}
            {cocktail.gallery && cocktail.gallery.length > 0 && (
              <div className="flex -space-x-2 overflow-hidden">
                {cocktail.gallery.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="mini"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-sm"
                  />
                ))}
              </div>
            )}
            <span className="text-xs text-stone-500 font-medium">
              Özel Reçete
            </span>
          </div>

          <span className="inline-flex items-center text-xs font-bold text-[#FF5500] group-hover:translate-x-1 transition-transform">
            <span>Tarifi Gör</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
