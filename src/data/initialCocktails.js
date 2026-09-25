export const ALCOHOL_CATEGORIES = [
  { id: 'votka', name: 'Votka', emoji: '🍸', iconName: 'GlassWater', description: 'Nötr ve berrak, kokteyllerin en popüler temeli' },
  { id: 'cin', name: 'Cin (Gin)', emoji: '🍋', iconName: 'Citrus', description: 'Ardıç ve botanik aromaların eşsiz uyumu' },
  { id: 'viski', name: 'Viski', emoji: '🥃', iconName: 'Flame', description: 'Meşe, karamel ve derin gövdeli klasik lezzetler' },
  { id: 'rom', name: 'Rom', emoji: '🍹', iconName: 'Palmtree', description: 'Şeker kamışının tropik ve ferahlatıcı ruhu' },
  { id: 'tekila', name: 'Tekila', emoji: '🌵', iconName: 'Sparkles', description: 'Mavi agavenin enerjik ve karakteristik tadı' },
  { id: 'triple_sec', name: 'Triple Sec / Portakal Likörü', emoji: '🍊', iconName: 'Sun', description: 'Kurutulmuş portakal kabuklarının narenciye büyüsü' },
  { id: 'brendi', name: 'Brendi / Konyak', emoji: '🍇', iconName: 'Wine', description: 'Distile üzümün asil ve zengin aroması' },
];

export const SUGGESTED_INGREDIENTS = [
  'Lime suyu',
  'Limon suyu',
  'Şeker şurubu',
  'Soda',
  'Tonik',
  'Buz',
  'Ginger beer',
  'Cranberry suyu',
  'Portakal suyu',
  'Grenadine',
  'Nane yaprağı',
  'Yumurta akı',
  'Angostura bitters',
  'Muskat',
  'Crème de cacao',
  'Krema',
  'Tuz',
  'Portakal kabuğu',
  'Lime dilimi',
  'Limon dilimi',
  'Zeytin',
  'Kokteyl kirazı',
  'Agave şurubu',
  'Zencefil'
];

export const INITIAL_COCKTAILS = [
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    category: 'votka',
    alcoholType: 'Votka',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Votka', amount: '50 ml' },
      { name: 'Lime suyu', amount: '15 ml' },
      { name: 'Ginger beer', amount: '100–120 ml' },
      { name: 'Buz', amount: 'Bol buz' },
      { name: 'Lime dilimi', amount: '1 adet' }
    ],
    instructions: 'Bardağı buzla doldur, votka ve lime suyunu ekle. Ginger beer ile tamamla ve hafifçe karıştır.',
    tips: 'Geleneksel olarak bakır kupada (copper mug) servis edilmesi içeceğin soğukluğunu ve lezzet dengesini maksimum seviyede tutar. Taze sıkılmış lime suyu fark yaratır.'
  },
  {
    id: 'cosmopolitan-vodka',
    name: 'Cosmopolitan (Votka)',
    category: 'votka',
    alcoholType: 'Votka',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Votka', amount: '40 ml' },
      { name: 'Triple Sec', amount: '20 ml' },
      { name: 'Cranberry suyu', amount: '30 ml' },
      { name: 'Lime suyu', amount: '15 ml' },
      { name: 'Buz', amount: 'Yeteri kadar' }
    ],
    instructions: 'Hepsini shaker\'da buzla çalkala ve soğutulmuş kokteyl bardağına süz.',
    tips: 'Kokteyl bardağınızı (Martini veya Coupe) yapmadan önce buzlukta soğutursanız içeceğiniz son damlasına kadar ideal sıcaklıkta kalır. Portakal kabuğunun esansını kadehin kenarına sıkarak servis yapabilirsiniz.'
  },
  {
    id: 'gin-tonic',
    name: 'Gin Tonic',
    category: 'cin',
    alcoholType: 'Cin (Gin)',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Cin', amount: '50 ml' },
      { name: 'Tonik', amount: '100–150 ml' },
      { name: 'Buz', amount: 'Bol buz' },
      { name: 'Limon veya lime', amount: '1-2 dilim' }
    ],
    instructions: 'Bardağı tamamen buzla doldur. Cini ekle, tonikle tamamla ve hafifçe karıştır.',
    tips: 'Buz küplerinin büyük ve kaliteli olması erimesini yavaşlatır ve içeceğin sulanmasını engeller. Tonik dökülürken bar kaşığı boyunca akıtılırsa gazı ve kabarcıkları kaybolmaz.'
  },
  {
    id: 'tom-collins',
    name: 'Tom Collins',
    category: 'cin',
    alcoholType: 'Cin (Gin)',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Cin', amount: '45 ml' },
      { name: 'Limon suyu', amount: '30 ml' },
      { name: 'Şeker şurubu', amount: '15 ml' },
      { name: 'Soda', amount: '60–90 ml' },
      { name: 'Buz', amount: 'Buz küpleri' }
    ],
    instructions: 'Cin, limon suyu ve şurubu buzla çalkala. Buzlu uzun bardağa süz, soda ekle.',
    tips: 'Sodayı ekledikten sonra çok fazla karıştırmayın, nazikçe alttan yukarı tek bir tur döndürmek yeterlidir. Uzun ve ince Collins bardağında servis edilir.'
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    category: 'viski',
    alcoholType: 'Viski',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Bourbon / Viski', amount: '50 ml' },
      { name: 'Limon suyu', amount: '25 ml' },
      { name: 'Şeker şurubu', amount: '20 ml' },
      { name: 'Yumurta akı (isteğe bağlı)', amount: '15 ml' },
      { name: 'Buz', amount: 'Bol buz' }
    ],
    instructions: 'Yumurta akı kullanıyorsan önce buzsuz çalkala (dry shake). Sonra buz ekleyip tekrar çalkala ve süz.',
    tips: 'Dry shake (buzsuz çalkalama) yumurta akının protein bağlarını açarak kremsi, ipeksi ve kalıcı bir köpük tabakası oluşturur. Üzerine 2 damla Angostura damlatmak kokuyu mükemmelleştirir.'
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    category: 'viski',
    alcoholType: 'Viski',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Bourbon veya Rye viski', amount: '60 ml' },
      { name: 'Şeker şurubu', amount: '7–10 ml' },
      { name: 'Angostura bitters', amount: '2–3 dash' },
      { name: 'Buz', amount: '1 büyük küp buz' },
      { name: 'Portakal kabuğu', amount: '1 şerit' }
    ],
    instructions: 'Bardağa şurup ve bitters koy. Viskiyi ve büyük bir buz küpünü ekleyip karıştır. Portakal kabuğuyla aromalandır.',
    tips: 'Portakal kabuğunu bardağın üzerine doğru hafifçe sıkarak uçucu yağlarını içeceğin yüzeyine bırakın, ardından kabuğu bardağın içine bırakın. Karıştırma işlemini yaklaşık 30-40 saniye yapın.'
  },
  {
    id: 'mojito',
    name: 'Mojito',
    category: 'rom',
    alcoholType: 'Rom',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Beyaz rom', amount: '50 ml' },
      { name: 'Lime suyu', amount: '25 ml' },
      { name: 'Şeker şurubu', amount: '15 ml' },
      { name: 'Nane yaprağı', amount: '8–10 yaprak' },
      { name: 'Soda', amount: '60–100 ml' },
      { name: 'Buz', amount: 'Kırık buz (crushed ice)' }
    ],
    instructions: 'Nane, lime ve şurubu bardağa koyup hafifçe ez. Buz ve rom ekle. Soda ile tamamla ve karıştır.',
    tips: 'Nane yapraklarını ezerken parçalamayın, hafifçe bastırıp yağlarının çıkmasını sağlayın; yoksa nane yaprakları acılaşır ve dişlere yapışır. Kırık buzla servis ferahlığı ikiye katlar.'
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    category: 'rom',
    alcoholType: 'Rom',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Beyaz rom', amount: '60 ml' },
      { name: 'Lime suyu', amount: '25 ml' },
      { name: 'Şeker şurubu', amount: '20 ml' },
      { name: 'Buz', amount: 'Buz küpleri' }
    ],
    instructions: 'Hepsini shaker\'da iyice çalkala ve soğutulmuş kokteyl bardağına süz.',
    tips: '3 malzemenin mükemmel altın oranı: 6:2.5:2. Basit görünen ama dengesi en kritik klasiklerden biridir. Çok soğuk ve hızlı servis edilmelidir.'
  },
  {
    id: 'margarita',
    name: 'Margarita',
    category: 'tekila',
    alcoholType: 'Tekila',
    image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Blanco tekila', amount: '50 ml' },
      { name: 'Triple Sec', amount: '25 ml' },
      { name: 'Lime suyu', amount: '25 ml' },
      { name: 'Tuz (isteğe bağlı)', amount: 'Bardağın kenarı için' },
      { name: 'Buz', amount: 'Buz küpleri' }
    ],
    instructions: 'Malzemeleri buzla shaker\'da çalkala. Bardağın kenarını tuzla kaplayıp kokteyli süz.',
    tips: 'Bardağın kenarını (rim) tuzlarken lime dilimini kenarda gezdirin, tuzu tabağa döküp bardağı sadece dış kenarından daldırın ki bardağın içine tuz dökülüp dengeyi bozmasın.'
  },
  {
    id: 'tequila-sunrise',
    name: 'Tequila Sunrise',
    category: 'tekila',
    alcoholType: 'Tekila',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Tekila', amount: '45 ml' },
      { name: 'Portakal suyu', amount: '90 ml' },
      { name: 'Grenadine', amount: '15 ml' },
      { name: 'Buz', amount: 'Bol buz' }
    ],
    instructions: 'Bardağı buzla doldur, tekila ve portakal suyunu ekle. Grenadine\'i en son yavaşça dök; dibe çökerek sunrise görünümü oluşturur.',
    tips: 'Grenadine şurubunu bardağın kenarından veya bir kaşığın tersinden yavaşça süzdürün ve ASLA karıştırmayın! Görsel katman güneşin doğuşunu temsil eder.'
  },
  {
    id: 'sidecar-triplesec',
    name: 'Sidecar (Triple Sec)',
    category: 'triple_sec',
    alcoholType: 'Triple Sec / Portakal Likörü',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Konyak / Brendi', amount: '50 ml' },
      { name: 'Triple Sec', amount: '25 ml' },
      { name: 'Limon suyu', amount: '25 ml' },
      { name: 'Buz', amount: 'Bol buz' },
      { name: 'Şeker (isteğe bağlı)', amount: 'Bardak kenarı için' }
    ],
    instructions: 'Hepsini shaker\'da buzla çalkala ve kokteyl bardağına süz. İstersen kenarına şeker ekleyebilirsin.',
    tips: 'Triple Sec bu tarifte konyak ile limonun asidini birbirine bağlayan kilit lezzet köprüsüdür. Bardak kenarındaki ince şeker kabuğu asiditeyi dengeler.'
  },
  {
    id: 'cosmopolitan-triplesec',
    name: 'Cosmopolitan (Triple Sec)',
    category: 'triple_sec',
    alcoholType: 'Triple Sec / Portakal Likörü',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Votka', amount: '40 ml' },
      { name: 'Triple Sec', amount: '20 ml' },
      { name: 'Cranberry suyu', amount: '30 ml' },
      { name: 'Lime suyu', amount: '15 ml' },
      { name: 'Buz', amount: 'Buz' }
    ],
    instructions: 'Shaker\'da iyice çalkala ve kokteyl bardağına süz.',
    tips: 'Triple Sec\'i ayrı bir kategori olarak ele alıyoruz çünkü tek başına temel distile içki olmaktan ziyade bir likördür ve çok sayıda kokteylde yardımcı alkol olarak kullanılır.'
  },
  {
    id: 'sidecar-brandy',
    name: 'Sidecar (Brendi)',
    category: 'brendi',
    alcoholType: 'Brendi / Konyak',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Konyak / Brendi', amount: '50 ml' },
      { name: 'Triple Sec', amount: '25 ml' },
      { name: 'Limon suyu', amount: '25 ml' },
      { name: 'Buz', amount: 'Buz' }
    ],
    instructions: 'Shaker\'da buzla çalkala ve süz.',
    tips: 'Brendinin meşe fıçılardan gelen vanilya ve kuru meyve notaları limonun ekşiliğiyle harika bir armoni yakalar.'
  },
  {
    id: 'brandy-alexander',
    name: 'Brandy Alexander',
    category: 'brendi',
    alcoholType: 'Brendi / Konyak',
    image: 'https://images.unsplash.com/photo-1574056067201-ac04b5093740?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'
    ],
    ingredients: [
      { name: 'Brendi / Konyak', amount: '30 ml' },
      { name: 'Crème de cacao', amount: '30 ml' },
      { name: 'Krema', amount: '30 ml' },
      { name: 'Buz', amount: 'Buz küpleri' },
      { name: 'Muskat rendesi (isteğe bağlı)', amount: 'Bir tutam' }
    ],
    instructions: 'Tüm malzemeleri shaker\'da buzla çalkala. Soğutulmuş kokteyl bardağına süz ve üzerine biraz muskat rendele.',
    tips: 'Krema kullandığınız için shaker\'ı enerjik ve kuvvetli çalkalayın. Taze rendelenmiş hint cevizi (muskat) kokteylin tatlı çikolata profilini mükemmel dengeler.'
  }
];
