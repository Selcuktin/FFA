# n8n Workflow Kurulum Rehberi

Bu dokümantasyon, Donanım Arşivi ve R10 sitelerinden otomatik veri toplama için n8n workflow'unun nasıl kurulacağını açıklar.

## 📋 Gereksinimler

- n8n hesabı (cloud veya self-hosted)
- Backend API'nizin çalışıyor olması
- Neon PostgreSQL veritabanı bağlantısı

## 🔧 Workflow Yapısı

### 1. Cron Trigger Node

**Ayar:**
- **Trigger Interval:** Her 15 dakikada bir (veya istediğiniz aralık)
- **Timezone:** Europe/Istanbul

### 2. HTTP Request Node (Donanım Arşivi)

**Ayar:**
- **Method:** GET
- **URL:** `https://forum.donanimarsivi.com/konu/sicak-firsatlar/`
- **Response Format:** HTML

**Not:** Forum sayfasının gerçek URL'sini kontrol edin. Bazı forumlar RSS feed sağlar, o durumda RSS node kullanabilirsiniz.

### 3. HTML Extract Node

Bu node, HTML'den ürün bilgilerini çıkarır.

**Selector'lar:**
- **Title:** `.topic-title` veya benzeri CSS selector
- **URL:** `a.topic-link` href attribute
- **Price:** Title içinden regex ile çıkarılabilir

**Örnek Function Code (HTML Extract yerine):**

```javascript
// HTML'i parse et ve ürün bilgilerini çıkar
const cheerio = require('cheerio');
const $ = cheerio.load($input.all()[0].json.body);

const deals = [];

$('.topic-row').each((i, elem) => {
  const title = $(elem).find('.topic-title').text().trim();
  const url = $(elem).find('a').attr('href');
  const fullUrl = url.startsWith('http') ? url : `https://forum.donanimarsivi.com${url}`;
  
  // Fiyatı title'dan çıkar (örnek regex)
  const priceMatch = title.match(/(\d+[.,]\d+)\s*TL/);
  const price = priceMatch ? priceMatch[1] + ' TL' : null;
  
  // İndirim bitti kontrolü
  const isExpired = title.toLowerCase().includes('indirim bitti') || 
                    title.toLowerCase().includes('x indirim');
  
  if (!isExpired && title && url) {
    deals.push({
      source: 'DonanımArsivi',
      title: title,
      price: price,
      url: fullUrl
    });
  }
});

return deals.map(deal => ({ json: deal }));
```

### 4. HTTP Request Node (API'ye POST)

**Ayar:**
- **Method:** POST
- **URL:** `https://your-app.vercel.app/api/deals` (veya lokal: `http://localhost:3000/api/deals`)
- **Body Type:** JSON
- **Body:**
```json
{
  "source": "{{ $json.source }}",
  "title": "{{ $json.title }}",
  "price": "{{ $json.price }}",
  "url": "{{ $json.url }}"
}
```

### 5. R10 için Benzer Workflow

R10 için de aynı yapıyı kullanın, sadece:
- URL'yi R10'un sıcak fırsatlar sayfasına değiştirin
- `source` değerini `"R10"` olarak ayarlayın

## 🔄 Workflow Akışı

```
[Cron Trigger] 
    ↓
[HTTP Request - Donanım Arşivi]
    ↓
[HTML Extract / Function]
    ↓
[Split Items] (her ürün için ayrı)
    ↓
[HTTP Request - POST to API]
    ↓
[Error Handling]
```

## ⚙️ Önemli Notlar

1. **Rate Limiting:** Forum siteleri çok sık istek atarsanız IP'nizi engelleyebilir. 15 dakika veya daha uzun aralıklar kullanın.

2. **HTML Parse:** Forum yapısı değişebilir. CSS selector'ları düzenli kontrol edin.

3. **Duplicate Kontrolü:** Backend API zaten duplicate kontrolü yapıyor (URL UNIQUE constraint), ama n8n tarafında da kontrol ekleyebilirsiniz.

4. **Error Handling:** API'ye POST isteği başarısız olursa, n8n'de error handling node'u ekleyin.

## 🧪 Test Etme

1. Workflow'u manuel olarak çalıştırın (Cron yerine "Execute Workflow" butonuna basın)
2. Her node'un çıktısını kontrol edin
3. Backend API'nizin `/api/deals` endpoint'ine veri geldiğini kontrol edin
4. Web arayüzünde fırsatların göründüğünü kontrol edin

## 📝 Örnek n8n Workflow JSON

n8n'de workflow'u oluşturduktan sonra, "Export" butonuna basarak JSON dosyasını kaydedebilirsiniz. Bu dosyayı başkalarıyla paylaşabilir veya yedek olarak saklayabilirsiniz.

## 🔍 Debugging

Sorun yaşarsanız:

1. **n8n Execution Logs:** Her node'un çıktısını kontrol edin
2. **Backend Logs:** Server console'da hata mesajlarını kontrol edin
3. **Database:** Neon dashboard'unda verilerin gelip gelmediğini kontrol edin
4. **Network:** Forum sitelerine manuel olarak erişebildiğinizi kontrol edin

## ⚠️ Yasal Uyarı

Bu workflow yalnızca eğitim amaçlıdır. Forum sitelerinin kullanım şartlarına ve robots.txt dosyalarına uygun hareket edin. Çok sık istek atmayın ve site yöneticilerinin izni olmadan scraping yapmayın.

