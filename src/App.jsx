import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import CocktailCard from './components/CocktailCard';
import CocktailDetailModal from './components/CocktailDetailModal';
import CocktailFormModal from './components/CocktailFormModal';
import CocktailBookModal from './components/CocktailBookModal';
import AddCategoryModal from './components/AddCategoryModal';
import Toast from './components/Toast';
import { INITIAL_COCKTAILS, ALCOHOL_CATEGORIES } from './data/initialCocktails';
import { BookOpen, Plus, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'coctail_recipes_v2';
const CATEGORIES_STORAGE_KEY = 'coctail_categories_v1';

export default function App() {
  // Dynamic categories state with localStorage fallback
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('LocalStorage categories error', e);
    }
    return ALCOHOL_CATEGORIES;
  });

  // Load recipes from localStorage or fallback to initial
  const [cocktails, setCocktails] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
    return INITIAL_COCKTAILS;
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [cocktailToEdit, setCocktailToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync recipes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cocktails));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }, [cocktails]);

  // Sync categories with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('LocalStorage categories save error', e);
    }
  }, [categories]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Category counts
  const cocktailCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat.id] = cocktails.filter(c => c.category === cat.id).length;
    });
    return counts;
  }, [cocktails, categories]);

  // Active category object
  const activeCategoryObj = useMemo(() => {
    if (activeCategory === 'all') return null;
    return categories.find(c => c.id === activeCategory);
  }, [categories, activeCategory]);

  // Filtered Cocktails
  const filteredCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => {
      const matchesCategory = activeCategory === 'all' || cocktail.category === activeCategory;

      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesName = cocktail.name.toLowerCase().includes(term);
      const matchesAlcohol = (cocktail.alcoholType || '').toLowerCase().includes(term);
      const matchesInstructions = (cocktail.instructions || '').toLowerCase().includes(term);
      const matchesIngredients = cocktail.ingredients?.some(ing =>
        ing.name.toLowerCase().includes(term) || (ing.amount && ing.amount.toLowerCase().includes(term))
      );

      return matchesCategory && (matchesName || matchesAlcohol || matchesInstructions || matchesIngredients);
    });
  }, [cocktails, activeCategory, searchTerm]);

  // Add Custom Category
  const handleAddCategory = (newCat) => {
    setCategories([...categories, newCat]);
    setActiveCategory(newCat.id);
    showToast(`"${newCat.name}" alkol kategorisi başarıyla eklendi!`);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  // Delete Custom Category
  const handleDeleteCategory = (catId) => {
    setCategories(categories.filter(c => c.id !== catId));
    if (activeCategory === catId) {
      setActiveCategory('all');
    }
    showToast('Alkol kategorisi silindi.', 'error');
  };

  // Save (Create or Update) Cocktail
  const handleSaveCocktail = (cocktailData) => {
    const existingIndex = cocktails.findIndex(c => c.id === cocktailData.id);
    if (existingIndex >= 0) {
      const updated = [...cocktails];
      updated[existingIndex] = cocktailData;
      setCocktails(updated);
      showToast(`"${cocktailData.name}" başarıyla güncellendi!`);
      if (selectedCocktail && selectedCocktail.id === cocktailData.id) {
        setSelectedCocktail(cocktailData);
      }
    } else {
      setCocktails([cocktailData, ...cocktails]);
      showToast(`Yeni tarif "${cocktailData.name}" başarıyla eklendi!`);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
    }
  };

  // Delete Cocktail
  const handleDeleteCocktail = (id) => {
    const target = cocktails.find(c => c.id === id);
    setCocktails(cocktails.filter(c => c.id !== id));
    showToast(`"${target?.name || 'Tarif'}" silindi.`, 'error');
  };

  // Reset to default initial recipes & categories
  const handleResetDefaults = () => {
    if (window.confirm('Tüm tarifleri ve kategorileri varsayılan ayarlara sıfırlamak istiyor musunuz?')) {
      setCocktails(INITIAL_COCKTAILS);
      setCategories(ALCOHOL_CATEGORIES);
      setActiveCategory('all');
      showToast('Varsayılan ayarlara dönüldü.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FF5500] text-stone-900 selection:bg-black selection:text-white flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        onOpenBook={() => setIsBookOpen(true)}
        onOpenAddModal={() => {
          setCocktailToEdit(null);
          setIsFormOpen(true);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalCount={cocktails.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Vibrant Hero Banner */}
        <section className="relative rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-6 sm:p-10 shadow-2xl border border-white/10 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#FF5500]/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-amber-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{categories.length} Alkol Çeşidi • Tam Ölçüler • Barmen Püf Noktaları</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Mükemmel Kokteyli <br className="hidden sm:inline" />
                <span className="text-[#FF7700] underline decoration-amber-400 decoration-wavy decoration-2">
                  Kendi Evinde
                </span> Yarat.
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Alkol kategorilerinizi genişletin, yeni alkol çeşitleri tanımlayın ve her alkolün altına kendi özel tariflerinizi fotoğraflarıyla kaydedin.
              </p>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => setIsBookOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2.5 group"
              >
                <BookOpen className="w-5 h-5 text-stone-950 group-hover:scale-110 transition-transform" />
                <span>📖 Tarif Kitabı Görüntüle</span>
              </button>

              <button
                onClick={() => {
                  setCocktailToEdit(null);
                  setIsFormOpen(true);
                }}
                className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Tarif Oluştur</span>
              </button>
            </div>
          </div>
        </section>

        {/* ALCOHOL CATEGORIES SECTION: RESPONSIVE WRAP & ADD CATEGORY */}
        <section className="space-y-3 bg-black/15 p-4 sm:p-5 rounded-3xl border border-white/20 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
            <div>
              <h3 className="text-white text-sm sm:text-base font-black uppercase tracking-wider flex items-center space-x-2">
                <span>🍸</span>
                <span>Alkol Kategorileri</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {categories.length} Çeşit
                </span>
              </h3>
              <p className="text-white/70 text-xs mt-0.5">
                Kategoriyi seçerek filtreleyin veya yanındaki butonla yeni alkol türü ekleyin
              </p>
            </div>

            {/* Quick Add Recipe to Current Category Shortcut */}
            {activeCategoryObj && (
              <button
                onClick={() => {
                  setCocktailToEdit(null);
                  setIsFormOpen(true);
                }}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-[#FF5500] font-black text-xs shadow-md hover:bg-stone-50 active:scale-95 transition-all flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ {activeCategoryObj.name} Altına Tarif Ekle</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips with Flex-Wrap (Never overflows) */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            cocktailCounts={cocktailCounts}
            onOpenAddCategory={() => setIsAddCategoryOpen(true)}
            onDeleteCategory={handleDeleteCategory}
          />
        </section>

        {/* Cocktail Recipes Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 text-white">
            <div className="flex items-center space-x-3">
              <h3 className="text-base sm:text-xl font-black tracking-tight flex items-center space-x-2">
                <span>{activeCategoryObj ? activeCategoryObj.emoji : '🍹'}</span>
                <span>
                  {activeCategoryObj
                    ? `${activeCategoryObj.name} Tarifleri`
                    : 'Tüm Kokteyller'}
                </span>
                <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-bold">
                  {filteredCocktails.length}
                </span>
              </h3>

              {searchTerm && (
                <span className="text-xs text-white/90 bg-black/20 px-3 py-1 rounded-lg">
                  "{searchTerm}" için sonuçlar
                </span>
              )}
            </div>

            {/* Direct Add Recipe Under this Alcohol Category Button */}
            <button
              onClick={() => {
                setCocktailToEdit(null);
                setIsFormOpen(true);
              }}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center space-x-1.5 border border-amber-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>
                {activeCategoryObj
                  ? `+ ${activeCategoryObj.name} İle Yeni Tarif Ekle`
                  : '+ Yeni Tarif Ekle'}
              </span>
            </button>
          </div>

          {filteredCocktails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCocktails.map((cocktail) => (
                <CocktailCard
                  key={cocktail.id}
                  cocktail={cocktail}
                  onClick={(c) => setSelectedCocktail(c)}
                  onEdit={(c) => {
                    setCocktailToEdit(c);
                    setIsFormOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 text-center space-y-4 shadow-lg border border-white/60 max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF5500] flex items-center justify-center mx-auto text-2xl">
                {activeCategoryObj ? activeCategoryObj.emoji : '🔍'}
              </div>
              <h4 className="text-xl font-black text-stone-800">
                {activeCategoryObj
                  ? `Henüz ${activeCategoryObj.name} kategorisinde tarif yok`
                  : 'Aradığınız kokteyl bulunamadı'}
              </h4>
              <p className="text-sm text-stone-600">
                {activeCategoryObj
                  ? `Bu alkol çeşidine ilk tarifi hemen ekleyerek listenizi genişletin!`
                  : `"${searchTerm}" araması için tarif eşleşmedi. Aramayı temizleyebilir veya hemen yeni bir tarif ekleyebilirsiniz.`}
              </p>
              <div className="flex items-center justify-center space-x-3 pt-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
                  >
                    Aramayı Temizle
                  </button>
                )}
                <button
                  onClick={() => {
                    setCocktailToEdit(null);
                    setIsFormOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-bold transition-colors shadow-md flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {activeCategoryObj ? `${activeCategoryObj.name} İçin Tarif Ekle` : 'Yeni Tarif Ekle'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-black/30 backdrop-blur-md border-t border-white/20 text-white/85 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <p className="text-sm sm:text-base font-medium tracking-wide">
            <span className="font-black text-white uppercase mr-2 tracking-wider">coctail</span>
            <span className="text-white/40 mr-2">•</span>
            <span className="italic text-amber-200">Kokteyl: Birkaç malzeme, sonsuz hikâye.</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
      {selectedCocktail && (
        <CocktailDetailModal
          cocktail={selectedCocktail}
          onClose={() => setSelectedCocktail(null)}
          onEdit={(c) => {
            setSelectedCocktail(null);
            setCocktailToEdit(c);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteCocktail}
        />
      )}

      {isFormOpen && (
        <CocktailFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setCocktailToEdit(null);
          }}
          onSave={handleSaveCocktail}
          cocktailToEdit={cocktailToEdit}
          categories={categories}
          defaultCategory={activeCategory}
        />
      )}

      {isAddCategoryOpen && (
        <AddCategoryModal
          isOpen={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}

      {isBookOpen && (
        <CocktailBookModal
          isOpen={isBookOpen}
          onClose={() => setIsBookOpen(false)}
          cocktails={cocktails}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
