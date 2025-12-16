# n8n AI için Final Düzeltme Promptu

Aşağıdaki metni kopyalayıp n8n AI'ye yapıştır:

---

Parse DonanımArsivi Data node'unda şu sorunları düzelt:

1. **HTML Entity Decode Sorunu:**
   - Başlıklarda `&#039;` gibi HTML entity'ler görünüyor
   - HTML decode yap: `&#039;` → `'`, `&amp;` → `&`, `&quot;` → `"` vb.
   - JavaScript'te decode için: `title.replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")`

2. **Yanlış Başlık Filtreleme:**
   - Sadece sayı olan başlıkları filtrele: "2", "5", "120" gibi
   - Alakasız konuları filtrele: "Değişiklikler", "Güncellemeler" gibi
   - Minimum başlık uzunluğu: En az 10 karakter olmalı
   - Sadece sayı kontrolü: `if (/^\d+$/.test(title.trim())) continue;`

3. **Alakasız Kelime Filtreleme:**
   - Şu kelimeleri içeren başlıkları filtrele:
     - "Değişiklikler"
     - "Güncellemeler"
     - "Forum"
     - "Yenilikler"
   - Bu kelimeleri içeren başlıkları atla

4. **Fiyat Çıkarma İyileştirme:**
   - Fiyat regex'i daha iyi çalışsın
   - Sadece sayı olan başlıklarda fiyat arama

5. **Limit:**
   - Şu an 32 item çekiyor, bu iyi
   - Limit'i 50'de tut (slice(0, 50))

**Düzeltilmiş Kod Örneği:**

```javascript
// HTML decode fonksiyonu
function decodeHtmlEntities(text) {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

// Parse DonanımArsivi HTML
const items = $input.all();
const parsedItems = [];

// Alakasız kelimeler
const irrelevantKeywords = ['değişiklikler', 'güncellemeler', 'forum', 'yenilikler'];

for (const item of items) {
  const html = item.json.data || item.json.body || item.json || '';
  
  // Regex pattern
  const topicRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
  
  let match;
  while ((match = topicRegex.exec(html)) !== null) {
    const url = match[1];
    let title = match[2].trim();
    
    // HTML decode
    title = decodeHtmlEntities(title);
    
    // Boş veya çok kısa başlık kontrolü
    if (!title || title.length < 10) {
      continue;
    }
    
    // Sadece sayı kontrolü
    if (/^\d+$/.test(title.trim())) {
      continue;
    }
    
    // Alakasız kelime kontrolü
    const titleLower = title.toLowerCase();
    if (irrelevantKeywords.some(keyword => titleLower.includes(keyword))) {
      continue;
    }
    
    // İndirim bitti kontrolü
    if (titleLower.includes('indirim bitti') || 
        titleLower.includes('x indirim')) {
      continue;
    }
    
    // Fiyat çıkarma
    const priceMatch = title.match(/(\d+[.,]\d+)\s*TL/i) || title.match(/(\d+[.,]\d+)\s*₺/i);
    const price = priceMatch ? priceMatch[1] + ' TL' : null;
    
    // Tam URL oluştur
    const fullUrl = url.startsWith('http') 
      ? url 
      : `https://forum.donanimarsivi.com${url}`;
    
    parsedItems.push({
      json: {
        source: 'DonanımArsivi',
        title: title,
        price: price,
        url: fullUrl
      }
    });
  }
}

return parsedItems.slice(0, 50);
```

**Özet:**
- HTML decode ekle
- Sadece sayı olan başlıkları filtrele
- Minimum 10 karakter kontrolü
- Alakasız kelimeleri filtrele
- Limit 50'de tut

Lütfen bu düzeltmeleri yap ve kodu güncelle.

---

## Kaç Veri Çekiliyor?

Workflow'da görünen: **32 item** çekiliyor. Bu iyi bir sayı. Limit 50'de tutuluyor, yani maksimum 50 fırsat çekilecek.

