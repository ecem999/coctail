import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Sparkles, Upload, Image as ImageIcon, Check, Lightbulb } from 'lucide-react';
import { SUGGESTED_INGREDIENTS } from '../data/initialCocktails';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1574056067201-ac04b5093740?auto=format&fit=crop&w=1200&q=80',
];

export default function CocktailFormModal({
  isOpen,
  onClose,
  onSave,
  cocktailToEdit,
  categories,
  defaultCategory
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(defaultCategory || (categories?.[0]?.id || 'votka'));
  const [alcoholType, setAlcoholType] = useState(categories?.find(c => c.id === defaultCategory)?.name || categories?.[0]?.name || 'Votka');
  const [image, setImage] = useState(PRESET_IMAGES[0]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [ingredients, setIngredients] = useState([
    { name: 'Votka', amount: '50 ml' },
    { name: 'Lime suyu', amount: '20 ml' },
  ]);
  const [customIngName, setCustomIngName] = useState('');
  const [customIngAmount, setCustomIngAmount] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tips, setTips] = useState('');

  const mainFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  // Populate data when editing or changing initial category
  useEffect(() => {
    if (cocktailToEdit) {
      setName(cocktailToEdit.name || '');
      setCategory(cocktailToEdit.category || 'votka');
      setAlcoholType(cocktailToEdit.alcoholType || 'Votka');
      setImage(cocktailToEdit.image || PRESET_IMAGES[0]);
      setGalleryImages(cocktailToEdit.gallery || []);
      setIngredients(cocktailToEdit.ingredients || []);
      setInstructions(cocktailToEdit.instructions || '');
      setTips(cocktailToEdit.tips || '');
    } else {
      const initialCatId = defaultCategory && defaultCategory !== 'all' ? defaultCategory : (categories?.[0]?.id || 'votka');
      const initialCat = categories?.find(c => c.id === initialCatId);

      setName('');
      setCategory(initialCatId);
      setAlcoholType(initialCat?.name || 'Votka');
      setImage(PRESET_IMAGES[0]);
      setGalleryImages([]);
      setIngredients([
        { name: initialCat?.name || 'Ana İçecek', amount: '50 ml' }
      ]);
      setInstructions('');
      setTips('');
    }
  }, [cocktailToEdit, isOpen, defaultCategory, categories]);

  // Sync category change with alcoholType label
  const handleCategoryChange = (catId) => {
    setCategory(catId);
    const cat = categories.find(c => c.id === catId);
    if (cat) {
      setAlcoholType(cat.name);
    }
  };

  // Add suggested ingredient on click
  const handleAddSuggestedIngredient = (suggested) => {
    const exists = ingredients.some(ing => ing.name.toLowerCase() === suggested.toLowerCase());
    if (exists) return;
    setIngredients([...ingredients, { name: suggested, amount: '30 ml' }]);
  };

  // Add custom ingredient
  const handleAddCustomIngredient = () => {
    if (!customIngName.trim()) return;
    setIngredients([...ingredients, {
      name: customIngName.trim(),
      amount: customIngAmount.trim() || 'Göz kararı'
    }]);
    setCustomIngName('');
    setCustomIngAmount('');
  };

  // Remove an ingredient
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Update ingredient field
  const handleUpdateIngredient = (index, field, value) => {
    const next = [...ingredients];
    next[index][field] = value;
    setIngredients(next);
  };

  // Handle Main Image file upload from device
  const handleMainFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP vb.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Gallery Images upload from device
  const handleGalleryFilesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setGalleryImages((prev) => [...prev, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setGalleryImages(galleryImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Lütfen tarif adını girin!');
      return;
    }
    if (ingredients.length === 0) {
      alert('Lütfen en az bir malzeme ekleyin!');
      return;
    }

    const cocktailData = {
      id: cocktailToEdit ? cocktailToEdit.id : `cocktail-${Date.now()}`,
      name: name.trim(),
      category,
      alcoholType,
      image: image.trim() || PRESET_IMAGES[0],
      gallery: galleryImages.length > 0 ? galleryImages : [image],
      ingredients,
      instructions: instructions.trim(),
      tips: tips.trim()
    };

    onSave(cocktailData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-white/50 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div>
            <h2 className="text-xl font-black tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{cocktailToEdit ? 'Tarifi Düzenle' : 'Yeni Kokteyl Tarifi Ekle'}</span>
            </h2>
            <p className="text-stone-400 text-xs">
              Seçilen kategori: <span className="text-amber-300 font-bold">{alcoholType}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Cocktail Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Tarifin Adı *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Passion Fruit Martini"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#FF5500] text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Alkol Çeşidi *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#FF5500] text-sm font-semibold bg-white cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* INGREDIENTS SECTION WITH SUGGESTIONS */}
          <div className="bg-orange-50/60 rounded-2xl p-4 sm:p-5 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-[#FF5500] uppercase tracking-wider">
                🧪 Malzemeler ve Ölçüleri / Adetleri *
              </label>
              <span className="text-xs font-bold text-stone-500">
                {ingredients.length} malzeme seçildi
              </span>
            </div>

            {/* Suggested Ingredients Clickable Badges */}
            <div className="mb-4">
              <p className="text-xs text-stone-600 font-semibold mb-2">
                Öneri Malzemeler (Hızlıca eklemek için tıklayın):
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-white rounded-xl border border-stone-200">
                {SUGGESTED_INGREDIENTS.map((item, idx) => {
                  const isAdded = ingredients.some(ing => ing.name.toLowerCase() === item.toLowerCase());
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSuggestedIngredient(item)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all flex items-center space-x-1 ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                          : 'bg-stone-100 hover:bg-orange-100 hover:text-[#FF5500] text-stone-700 border border-stone-200'
                      }`}
                    >
                      {isAdded ? <Check className="w-3 h-3 text-emerald-600" /> : <Plus className="w-3 h-3 text-stone-400" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Ingredients Dynamic List */}
            <div className="space-y-2 mb-3">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-stone-200 shadow-xs">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(index, 'name', e.target.value)}
                    placeholder="Malzeme adı"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#FF5500]"
                  />
                  <input
                    type="text"
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(index, 'amount', e.target.value)}
                    placeholder="Ölçü (örn: 50 ml, 2 adet)"
                    className="w-28 sm:w-36 px-3 py-1.5 rounded-lg border border-stone-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#FF5500]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Ingredient Manual Entry */}
            <div className="flex items-center space-x-2 pt-2 border-t border-orange-200/80">
              <input
                type="text"
                value={customIngName}
                onChange={(e) => setCustomIngName(e.target.value)}
                placeholder="Özel yeni malzeme adı..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
              />
              <input
                type="text"
                value={customIngAmount}
                onChange={(e) => setCustomIngAmount(e.target.value)}
                placeholder="Ölçü / Adet"
                className="w-24 sm:w-32 px-3 py-1.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
              />
              <button
                type="button"
                onClick={handleAddCustomIngredient}
                className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-black transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ekle</span>
              </button>
            </div>
          </div>

          {/* Instructions (İçerik / Yapılışı) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Hazırlanışı / Yapılışı Adımları *
            </label>
            <textarea
              required
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Bardağı buzla doldur, malzemeleri shaker'da çalkala ve süz..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#FF5500] text-sm leading-relaxed"
            />
          </div>

          {/* Tips Section (Püf Noktaları) */}
          <div>
            <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Barmen Püf Noktaları & Sunum Sırrı</span>
            </label>
            <textarea
              rows={2}
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              placeholder="Örn: Bakır kupada servis ediniz, limon kabuğu esansını kadehin kenarına sıkınız..."
              className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm leading-relaxed"
            />
          </div>

          {/* IMAGES SECTION: DIRECT DEVICE UPLOAD + URL + PRESETS */}
          <div className="space-y-4 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-stone-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4 text-[#FF5500]" />
                  <span>Tarifin Ana Görseli *</span>
                </label>
                <span className="text-[11px] font-semibold text-stone-500">
                  Cihazınızdan fotoğraf seçin veya hazır kullanın
                </span>
              </div>

              {/* Main Image Upload Buttons & Preview */}
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                {/* Image Preview Box */}
                <div className="relative w-full sm:w-40 h-32 rounded-2xl overflow-hidden border-2 border-stone-300 bg-stone-900 flex-shrink-0 group">
                  <img
                    src={image}
                    alt="Ana Görsel Önizleme"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Önizleme</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  {/* File Upload Button (Device) */}
                  <input
                    type="file"
                    ref={mainFileInputRef}
                    accept="image/*"
                    onChange={handleMainFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => mainFileInputRef.current?.click()}
                    className="w-full px-4 py-3 rounded-xl bg-[#FF5500] hover:bg-[#E64D00] text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98"
                  >
                    <Upload className="w-4 h-4" />
                    <span>📸 Cihazımdan Fotoğraf Yükle (Galeri / Dosya)</span>
                  </button>

                  {/* Or Image URL Input */}
                  <div className="relative">
                    <input
                      type="url"
                      value={image.startsWith('data:') ? '' : image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder={image.startsWith('data:') ? '✓ Cihazınızdan görsel seçildi' : 'Veya görsel web URL\'si yapıştırın...'}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Pick Presets */}
              <div className="mt-3">
                <p className="text-xs text-stone-500 mb-1.5 font-medium">Veya hazır kokteyl fotoğraflarından seçin:</p>
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImage(preset)}
                      className={`flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        image === preset ? 'border-[#FF5500] ring-2 ring-orange-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MINI GALLERY IMAGES: DEVICE UPLOAD */}
            <div className="pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-stone-700 uppercase tracking-wider">
                  Mini Görseller (Sunum & Galeri)
                </label>
                <span className="text-[11px] text-stone-500 font-medium">
                  {galleryImages.length} mini görsel
                </span>
              </div>

              {/* Upload Mini Images from Device Button */}
              <input
                type="file"
                ref={galleryFileInputRef}
                accept="image/*"
                multiple
                onChange={handleGalleryFilesUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="w-full px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors mb-3"
              >
                <Plus className="w-4 h-4 text-[#FF5500]" />
                <span>Cihazdan Mini Görsel Ekle (Çoklu Seçilebilir)</span>
              </button>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {galleryImages.map((imgUrl, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-300 shadow-xs group">
                      <img src={imgUrl} alt={`mini-${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(i)}
                        className="absolute top-0.5 right-0.5 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 shadow-sm"
                        title="Görseli kaldır"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 font-bold text-sm text-stone-700 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E64D00] text-white font-black text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              {cocktailToEdit ? 'Tarifi Güncelle' : 'Tarifi Kaydet'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
