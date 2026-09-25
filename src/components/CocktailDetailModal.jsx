import React, { useState } from 'react';
import { X, Sparkles, Lightbulb, Edit3, Trash2, Share2, Check } from 'lucide-react';
import { ALCOHOL_CATEGORIES } from '../data/initialCocktails';

export default function CocktailDetailModal({
  cocktail,
  onClose,
  onEdit,
  onDelete
}) {
  const [selectedImage, setSelectedImage] = useState(cocktail?.image);
  const [copied, setCopied] = useState(false);

  if (!cocktail) return null;

  const categoryInfo = ALCOHOL_CATEGORIES.find(c => c.id === cocktail.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cocktail.name,
        text: `${cocktail.name} kokteyl tarifi - ${cocktail.alcoholType}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${cocktail.name} - Malzemeler: ${cocktail.ingredients.map(i => `${i.name} (${i.amount})`).join(', ')}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-white/40 flex flex-col max-h-[92vh]">
        
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{categoryInfo?.emoji || '🍸'}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500] bg-orange-100 px-2.5 py-1 rounded-full">
              {cocktail.alcoholType || categoryInfo?.name}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
              title="Tarifi Paylaş / Kopyala"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => onEdit(cocktail)}
              className="p-2 rounded-full hover:bg-orange-50 text-[#FF5500] transition-colors"
              title="Tarifi Düzenle"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`"${cocktail.name}" tarifini silmek istediğinize emin misiniz?`)) {
                  onDelete(cocktail.id);
                  onClose();
                }
              }}
              className="p-2 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
              title="Tarifi Sil"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Main Photo Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-inner bg-stone-900 h-64 sm:h-80 w-full">
            <img
              src={selectedImage || cocktail.image}
              alt={cocktail.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {cocktail.name}
              </h2>
              <p className="text-white/85 text-sm font-medium mt-1">
                Kategori: <span className="text-amber-300 font-bold">{cocktail.alcoholType}</span>
              </p>
            </div>
          </div>

          {/* Mini Gallery (Mini Görseller) */}
          {cocktail.gallery && cocktail.gallery.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Sunum & Mini Görseller (Büyütmek için tıklayın)
              </h4>
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedImage(cocktail.image)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    (selectedImage || cocktail.image) === cocktail.image ? 'border-[#FF5500] ring-2 ring-orange-300 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={cocktail.image} alt="Ana" className="w-full h-full object-cover" />
                </button>
                {cocktail.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-[#FF5500] ring-2 ring-orange-300 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Galeri ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients Section (Malzemeler & Ölçüler) */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                <span className="text-xl">🧪</span>
                <span>Malzemeler & Ölçüler</span>
              </h3>
              <span className="text-xs font-bold text-stone-500 bg-white px-2.5 py-1 rounded-full border border-stone-200">
                {cocktail.ingredients?.length} Malzeme
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cocktail.ingredients?.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-stone-200/80 shadow-xs"
                >
                  <span className="font-semibold text-stone-800 text-sm">{ing.name}</span>
                  <span className="text-xs font-black text-[#FF5500] bg-orange-50 px-2 py-1 rounded-md border border-orange-200">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Section (Yapılışı / Hazırlanışı) */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-xl">🍸</span>
              <span>Hazırlanışı / Yapılışı</span>
            </h3>
            <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-200/80 text-stone-800 font-medium text-sm sm:text-base leading-relaxed">
              {cocktail.instructions}
            </div>
          </div>

          {/* Tips Section (Püf Noktaları) */}
          {cocktail.tips && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border-l-4 border-amber-500 shadow-xs">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm flex-shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-amber-900 text-base mb-1">
                    Barmen Püf Noktaları & Sunum Sırrı
                  </h4>
                  <p className="text-amber-950 text-sm leading-relaxed">
                    {cocktail.tips}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
