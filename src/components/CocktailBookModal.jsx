import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Lightbulb, Sparkles, Bookmark, Download, Loader2 } from 'lucide-react';
import { ALCOHOL_CATEGORIES } from '../data/initialCocktails';
import { generateCocktailBookPdf } from '../utils/pdfGenerator';

export default function CocktailBookModal({ isOpen, onClose, cocktails }) {
  const [currentPage, setCurrentPage] = useState(0); // 0: Cover page, 1..N: Cocktail pages
  const [flipDirection, setFlipDirection] = useState(null); // 'next' or 'prev'
  const [isFlipping, setIsFlipping] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');
  const containerRef = useRef(null);

  // Total items: Cover (index 0) + all cocktails
  const totalPages = cocktails.length + 1;

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (!isOpen || isGeneratingPdf) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, isFlipping, isGeneratingPdf]);

  const handleNext = () => {
    if (currentPage >= totalPages - 1 || isFlipping) return;
    setIsFlipping(true);
    setFlipDirection('next');
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 450);
  };

  const handlePrev = () => {
    if (currentPage <= 0 || isFlipping) return;
    setIsFlipping(true);
    setFlipDirection('prev');
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 450);
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      await generateCocktailBookPdf(cocktails, (status) => {
        setPdfProgressText(status);
      });
    } catch (err) {
      console.error('PDF generation error', err);
      alert('PDF oluşturulurken bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgressText('');
    }
  };

  if (!isOpen) return null;

  const currentCocktail = currentPage > 0 ? cocktails[currentPage - 1] : null;
  const categoryInfo = currentCocktail ? ALCOHOL_CATEGORIES.find(c => c.id === currentCocktail.category) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-300">
      
      {/* Top Floating Controls Bar */}
      <div className="fixed top-4 left-4 right-4 z-60 flex items-center justify-between max-w-4xl mx-auto px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-lg border border-white/20 text-white shadow-2xl">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="font-black text-sm tracking-wide uppercase">Coctail Tarif Kitabı</span>
          <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
            {currentPage === 0 ? 'Kapak' : `Sayfa ${currentPage} / ${cocktails.length}`}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs shadow-md active:scale-95 transition-all"
            title="Kitabı PDF formatında indir"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                <span className="hidden sm:inline">İndiriliyor...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>PDF İndir</span>
              </>
            )}
          </button>

          <span className="text-xs text-stone-400 hidden md:inline">
            (Ok tuşlarıyla çevirin)
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Kitabı Kapat (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Generation Overlay indicator if running */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3 p-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-amber-400/50 flex items-center justify-center shadow-2xl">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black text-white">Tarif Kitabınız PDF Olarak Hazırlanıyor</h3>
            <p className="text-xs sm:text-sm text-amber-300 font-mono">
              {pdfProgressText || 'Sayfalar taranıyor ve yüksek kalitede mizanpajlanıyor...'}
            </p>
          </div>
        </div>
      )}

      {/* Main Book Display Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl sm:max-w-3xl mt-14 mb-8"
        style={{ perspective: '1600px' }}
      >
        {/* Book Spine 3D Effect Shadow */}
        <div className="absolute inset-0 bg-stone-900/60 rounded-3xl blur-2xl transform scale-95 translate-y-4" />

        {/* The Animated Page Container */}
        <div
          className={`relative w-full min-h-[640px] sm:min-h-[720px] bg-[#faf7f2] rounded-3xl shadow-2xl border-4 border-stone-800/20 overflow-hidden flex flex-col justify-between transition-all duration-500 transform ${
            flipDirection === 'next'
              ? '-rotate-y-12 -translate-x-4 scale-95 opacity-90'
              : flipDirection === 'prev'
              ? 'rotate-y-12 translate-x-4 scale-95 opacity-90'
              : 'rotate-y-0 translate-x-0 scale-100 opacity-100'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            backgroundImage: 'radial-gradient(#e5dfd3 0.75px, transparent 0.75px)',
            backgroundSize: '16px 16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 0 40px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Spine Binding Simulation (Sol Cilt Gölgesi) */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-stone-900/25 via-stone-900/10 to-transparent pointer-events-none z-20" />
          
          {/* Gold Bookmark Ribbon */}
          <div className="absolute top-0 right-10 z-30 flex flex-col items-center">
            <div className="w-6 h-12 bg-amber-500 shadow-md flex items-center justify-center text-stone-900 font-bold text-xs rounded-b-md">
              <Bookmark className="w-4 h-4 text-stone-950 fill-stone-950" />
            </div>
          </div>

          {/* PAGE CONTENT SWITCH: COVER PAGE OR RECIPE PAGE */}
          {currentPage === 0 ? (
            /* ================= COVER PAGE ================= */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-14 bg-gradient-to-br from-[#FF5500] via-[#E64400] to-[#B33000] text-white rounded-3xl relative overflow-hidden">
              
              {/* Background Ornamental Circles */}
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-white/20" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-white/10" />

              <div className="relative z-10 max-w-lg space-y-6">
                <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-amber-300 text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Özel Kokteyl Koleksiyonu</span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-black tracking-tight font-serif uppercase text-amber-300 drop-shadow-lg">
                  COCTAIL
                </h1>

                <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />

                <p className="text-white/90 text-base sm:text-lg font-light leading-relaxed">
                  Dünyanın en seçkin 7 alkol çeşidine adanmış, ölçüleri, hazırlanışı ve barmen püf noktalarıyla eksiksiz bir miksoloji el kitabı.
                </p>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {['🍸 Votka', '🍋 Cin', '🥃 Viski', '🍹 Rom', '🌵 Tekila', '🍊 Likör', '🍇 Konyak'].slice(0, 4).map((badge, idx) => (
                    <span key={idx} className="bg-black/20 text-white text-xs font-semibold py-1.5 px-2 rounded-xl backdrop-blur-sm border border-white/15">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions: Open Book & Download PDF */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Sayfaları Çevir</span>
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-sm border border-white/30 shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Kitabı PDF İndir</span>
                  </button>
                </div>
              </div>

              {/* Cover Bottom Signature */}
              <div className="relative z-10 pt-10 text-white/60 text-xs font-serif tracking-widest uppercase">
                Birinci Baskı • 2026 Miksoloji Rehberi
              </div>
            </div>
          ) : (
            /* ================= COCKTAIL RECIPE PAGE ================= */
            <div className="flex-1 flex flex-col p-6 sm:p-10 relative">
              
              {/* PAGE TOP: Sayfa başında ürün görseli */}
              <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-stone-300 mb-6 bg-stone-900 group">
                <img
                  src={currentCocktail.image}
                  alt={currentCocktail.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Visual gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl">{categoryInfo?.emoji || '🍸'}</span>
                    <span className="text-xs font-bold text-amber-300 tracking-wider uppercase bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {currentCocktail.alcoholType}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight drop-shadow-md">
                    {currentCocktail.name}
                  </h2>
                </div>
              </div>

              {/* RECIPE CONTENT: Malzemeler, Ölçüler, Yapılışı & Püf Noktaları */}
              <div className="flex-1 space-y-5">
                
                {/* Malzemeler ve Ölçüleri Bölümü */}
                <div className="bg-stone-100/90 rounded-2xl p-4 border border-stone-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#FF5500] mb-2.5 flex items-center space-x-1.5">
                    <span>🧪</span>
                    <span>Malzemeler & Ölçüler</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCocktail.ingredients?.map((ing, i) => (
                      <div key={i} className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-stone-200 last:border-none">
                        <span className="font-semibold text-stone-800">{ing.name}</span>
                        <span className="font-bold text-[#FF5500] font-mono">{ing.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yapılışı / Hazırlanış */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center space-x-1.5">
                    <span>🍸</span>
                    <span>Yapılışı</span>
                  </h4>
                  <p className="text-stone-800 text-sm sm:text-base leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-stone-200 font-sans">
                    {currentCocktail.instructions}
                  </p>
                </div>

                {/* Püf Noktaları */}
                {currentCocktail.tips && (
                  <div className="bg-amber-50/80 rounded-2xl p-3.5 border-l-4 border-amber-500 shadow-xs">
                    <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1 mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Barmen Püf Noktası</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-amber-950 italic leading-relaxed">
                      "{currentCocktail.tips}"
                    </p>
                  </div>
                )}

              </div>

              {/* PAGE BOTTOM: Sayfa Numarası & Kitap Mizanpajı */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-serif">
                <span className="italic">{currentCocktail.name}</span>
                <span className="font-bold text-stone-700 font-mono">
                  — {currentPage} —
                </span>
                <span className="uppercase text-[11px] tracking-wider text-stone-400">Coctail Kitaplığı</span>
              </div>

            </div>
          )}

          {/* FLIP PAGE BOTTOM CONTROLLER BAR */}
          <div className="bg-stone-900/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-t border-stone-800 flex items-center justify-between text-white z-30">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0 || isFlipping}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'bg-white/10 hover:bg-white/20 active:scale-95 text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
              <span>Önceki Sayfa</span>
            </button>

            {/* Quick Page Jump Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar max-w-[140px] sm:max-w-xs px-2">
              <button
                onClick={() => setCurrentPage(0)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentPage === 0 ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                title="Kapak"
              />
              {cocktails.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === idx + 1 ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  title={`Sayfa ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1 || isFlipping}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentPage >= totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-stone-500'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black active:scale-95'
              }`}
            >
              <span>Sonraki Sayfa</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
