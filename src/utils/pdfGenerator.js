import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateCocktailBookPdf(cocktails, onProgress) {
  // A4 Standard Dimensions at 96 DPI: 794px x 1123px (Aspect Ratio: 1:1.414)
  const A4_WIDTH_PX = 794;
  const A4_HEIGHT_PX = 1123;

  // Create an off-screen container for rendering pages
  const exportContainer = document.createElement('div');
  exportContainer.style.position = 'fixed';
  exportContainer.style.left = '-9999px';
  exportContainer.style.top = '0';
  exportContainer.style.width = `${A4_WIDTH_PX}px`;
  exportContainer.style.zIndex = '-1000';
  exportContainer.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  document.body.appendChild(exportContainer);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  try {
    // ----------------------------------------------------
    // 1. RENDER & CAPTURE COVER PAGE
    // ----------------------------------------------------
    if (onProgress) onProgress('Kapak sayfası hazırlanıyor...');

    exportContainer.innerHTML = `
      <div style="width: ${A4_WIDTH_PX}px; height: ${A4_HEIGHT_PX}px; background: linear-gradient(135deg, #FF5500 0%, #E64000 50%, #B82E00 100%); color: white; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 50px; box-sizing: border-box; position: relative;">
        <!-- Gold outer border -->
        <div style="position: absolute; inset: 24px; border: 3px solid rgba(255, 215, 0, 0.85); border-radius: 20px; pointer-events: none;"></div>
        <div style="position: absolute; inset: 32px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 14px; pointer-events: none;"></div>

        <!-- Top Header Ribbon -->
        <div style="text-align: center; margin-top: 40px; position: relative; z-index: 10;">
          <div style="display: inline-block; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 30px; border: 1px solid rgba(255, 215, 0, 0.5); color: #FCD34D; font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
            ✨ Özel Miksoloji Koleksiyonu
          </div>
        </div>

        <!-- Main Center Hero -->
        <div style="text-align: center; margin: 40px 0; position: relative; z-index: 10;">
          <h1 style="font-size: 72px; font-weight: 900; margin: 0; letter-spacing: 4px; text-transform: uppercase; color: #FFF; text-shadow: 0 4px 15px rgba(0,0,0,0.3); font-family: 'Playfair Display', serif, system-ui;">
            COCTAIL
          </h1>
          <div style="width: 120px; height: 4px; background: #FBBF24; margin: 20px auto; border-radius: 2px;"></div>
          <h2 style="font-size: 22px; font-weight: 700; margin: 0; color: #FEF08A; letter-spacing: 1px;">
            ÖZEL KOKTEYL REÇETELERİ KİTABI
          </h2>
          <p style="font-size: 15px; color: rgba(255, 255, 255, 0.9); margin-top: 18px; line-height: 1.6; max-width: 540px; margin-left: auto; margin-right: auto;">
            Dünyanın en seçkin 7 alkol çeşidine adanmış, tam ölçüleri, hazırlanış adımları ve barmen püf noktalarıyla eksiksiz miksoloji el kitabı.
          </p>

          <!-- Alcohol Categories Badges Grid -->
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 36px; max-width: 580px; margin-left: auto; margin-right: auto;">
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🍸 Votka</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🍋 Cin (Gin)</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🥃 Viski</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🍹 Rom</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🌵 Tekila</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🍊 Portakal Likörü</span>
            <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;">🍇 Brendi / Konyak</span>
          </div>

          <!-- Total Count Badge -->
          <div style="margin-top: 36px;">
            <span style="background: white; color: #FF5500; font-size: 14px; font-weight: 900; padding: 10px 26px; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
              TOPLAM ${cocktails.length} SEÇKİN TARİF
            </span>
          </div>
        </div>

        <!-- Cover Footer -->
        <div style="text-align: center; margin-bottom: 24px; position: relative; z-index: 10; color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
          coctail rehberi • birinci baskı 2026
        </div>
      </div>
    `;

    // Wait a tick for styles to settle
    await new Promise(r => setTimeout(r, 60));

    const coverCanvas = await html2canvas(exportContainer.firstElementChild, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      allowTaint: true
    });

    const coverImgData = coverCanvas.toDataURL('image/jpeg', 0.95);
    doc.addImage(coverImgData, 'JPEG', 0, 0, 210, 297);

    // ----------------------------------------------------
    // 2. RENDER & CAPTURE EACH RECIPE PAGE
    // ----------------------------------------------------
    for (let i = 0; i < cocktails.length; i++) {
      const c = cocktails[i];
      if (onProgress) onProgress(`Sayfa ${i + 1}/${cocktails.length}: ${c.name} hazırlanıyor...`);

      // Prepare ingredients HTML
      const ingHtml = (c.ingredients || []).map(ing => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 7px 12px; border-radius: 10px; border: 1px solid #E5E7EB; margin-bottom: 6px; box-sizing: border-box;">
          <span style="font-weight: 700; color: #1F2937; font-size: 12px;">${ing.name}</span>
          <span style="font-weight: 800; color: #FF5500; font-size: 12px; background: #FFF7ED; padding: 3px 8px; border-radius: 6px; border: 1px solid #FFEDD5;">${ing.amount}</span>
        </div>
      `).join('');

      // Build recipe page HTML
      exportContainer.innerHTML = `
        <div style="width: ${A4_WIDTH_PX}px; height: ${A4_HEIGHT_PX}px; background: #FAFAF9; color: #1C1917; display: flex; flex-direction: column; justify-content: space-between; padding: 36px 44px; box-sizing: border-box; position: relative;">
          
          <div>
            <!-- Top Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E7E5E4; padding-bottom: 12px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px; font-weight: 900; letter-spacing: 1px; color: #FF5500;">COCTAIL</span>
                <span style="color: #A8A29E; font-size: 12px;">•</span>
                <span style="font-size: 12px; font-weight: 700; color: #78716C; text-transform: uppercase;">Tarif Kitabı</span>
              </div>
              <div style="background: #1C1917; color: #FCD34D; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
                ${c.alcoholType || 'Kokteyl'}
              </div>
            </div>

            <!-- Cocktail Photo Banner -->
            <div style="width: 100%; height: 260px; border-radius: 18px; overflow: hidden; background: #1C1917; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative;">
              <img src="${c.image}" crossOrigin="anonymous" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'" />
            </div>

            <!-- Title Header -->
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 32px; font-weight: 900; color: #1C1917; margin: 0 0 4px 0; letter-spacing: -0.5px;">
                ${c.name}
              </h2>
              <div style="font-size: 13px; font-weight: 600; color: #FF5500;">
                Kategori: <span style="color: #78716C;">${c.alcoholType}</span>
              </div>
            </div>

            <!-- Ingredients Box -->
            <div style="background: #F5F5F4; border-radius: 16px; padding: 16px; border: 1px solid #E7E5E4; margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 12px; font-weight: 800; color: #FF5500; text-transform: uppercase; letter-spacing: 1px;">
                  🧪 MALZEMELER & ÖLÇÜLER
                </div>
                <div style="font-size: 11px; font-weight: 700; color: #78716C;">
                  ${c.ingredients?.length || 0} Malzeme
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${ingHtml}
              </div>
            </div>

            <!-- Instructions Section -->
            <div style="margin-bottom: 18px;">
              <div style="font-size: 12px; font-weight: 800; color: #1C1917; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                🍸 HAZIRLANIŞI / YAPILIŞI
              </div>
              <div style="background: white; border-radius: 14px; padding: 16px; border: 1px solid #E7E5E4; font-size: 14px; line-height: 1.6; color: #292524; font-weight: 500;">
                ${c.instructions}
              </div>
            </div>

            <!-- Tips Section -->
            ${c.tips ? `
              <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; border-radius: 14px; padding: 14px 18px; border-top: 1px solid #FEF3C7; border-right: 1px solid #FEF3C7; border-bottom: 1px solid #FEF3C7;">
                <div style="font-size: 11px; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                  💡 BARMEN PÜF NOKTASI & SUNUM SIRRI
                </div>
                <div style="font-size: 13px; color: #78350F; line-height: 1.5; font-style: italic;">
                  "${c.tips}"
                </div>
              </div>
            ` : ''}

          </div>

          <!-- Bottom Footer & Page Number -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E7E5E4; padding-top: 12px; font-size: 11px; color: #A8A29E;">
            <span>${c.name} • ${c.alcoholType}</span>
            <span style="font-weight: 800; color: #1C1917; font-size: 13px;">— Sayfa ${i + 1} —</span>
            <span>coctail</span>
          </div>

        </div>
      `;

      // Wait a small moment for image / rendering
      await new Promise(r => setTimeout(r, 60));

      const pageCanvas = await html2canvas(exportContainer.firstElementChild, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        allowTaint: true
      });

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      doc.addPage();
      doc.addImage(pageImgData, 'JPEG', 0, 0, 210, 297);
    }

    // Save final document
    doc.save('Coctail-Tarif-Kitabi.pdf');

  } finally {
    // Clean up temporary DOM element
    if (exportContainer && exportContainer.parentNode) {
      exportContainer.parentNode.removeChild(exportContainer);
    }
  }
}
