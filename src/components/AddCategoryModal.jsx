import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

const SUGGESTED_EMOJIS = ['🍸', '🥃', '🍷', '🥂', '🍾', '🍹', '🧉', '🌵', '🍋', '🍊', '🍇', '🍒', '🌾', '☕'];

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🍸');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Lütfen alkol çeşidinin adını girin!');
      return;
    }

    const id = name.trim().toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '_') + '_' + Date.now();

    onAddCategory({
      id,
      name: name.trim(),
      emoji: selectedEmoji,
      isCustom: true
    });

    setName('');
    setSelectedEmoji('🍸');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/40">
        
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{selectedEmoji}</span>
            <div>
              <h3 className="text-lg font-black tracking-tight">Yeni Alkol Çeşidi Ekle</h3>
              <p className="text-xs text-stone-400">Özel alkol veya likör kategorinizi oluşturun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Alkol / İçki Çeşidi Adı *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Rakı, Mezcal, Aperol, Vermut..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Kategori Emojisi / Simgesi Seçin
            </label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_EMOJIS.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-[#FF5500] text-white scale-110 shadow-md ring-2 ring-orange-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-700 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-black shadow-md active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Kategoriyi Ekle</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
