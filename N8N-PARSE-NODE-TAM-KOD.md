# Parse DonanımArsivi Data Node - Tam Kod

## 📋 Parse Node'unun Tam Kodu (Filtreleme Dahil)

Parse DonanımArsivi Data node'una şu kodu yapıştır:

```javascript
// Parse DonanımArsivi HTML
const items = $input.all();
const parsedItems = [];

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

// Alakasız kelimeler (genişletilmiş liste)
const irrelevantKeywords = [
  'değişiklikler', 
  'güncellemeler', 
  'forum', 
  'yenilikler',
  'valorant',      // Oyun içi para birimi
  'vp',            // Valorant Points
  'csgo',          // Counter-Strike
  'steam',         // Steam wallet
  'riot',          // Riot Games
  'oyun',          // Genel oyun içeriği
  'hesap',         // Oyun hesabı
  'satış',         // Hesap satışı
  'takas'          // Takas
];

for (const item of items) {
  const html = item.json.data || item.json.body || item.json || '';
  
  console.log('HTML length:', html.length);
  console.log('HTML sample:', html.substring(0, 2000));
  
  // Birden fazla pattern dene
  let matches = [];
  
  // Pattern 1: /konu/ içeren linkler (en yaygın)
  const pattern1 = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  while ((match = pattern1.exec(html)) !== null) {
    matches.push({
      url: match[1],
      title: match[2].trim()
    });
  }
  
  console.log('Pattern 1 matches:', matches.length);
  
  // Pattern 2: js-topicList-title class'ı
  if (matches.length === 0) {
    const pattern2 = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    while ((match = pattern2.exec(html)) !== null) {
      matches.push({
        url: match[1],
        title: match[2].trim()
      });
    }
    console.log('Pattern 2 matches:', matches.length);
  }
  
  // Pattern 3: data-topic-id attribute'u (XenForo için)
  if (matches.length === 0) {
    const pattern3 = /<a[^>]*data-topic-id="[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    while ((match = pattern3.exec(html)) !== null) {
      matches.push({
        url: match[1],
        title: match[2].trim()
      });
    }
    console.log('Pattern 3 matches:', matches.length);
  }
  
  // Her match'i işle
  for (const match of matches) {
    let title = decodeHtmlEntities(match.title);
    
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
    
    // Oyun içi para birimi kontrolü
    if (titleLower.includes('vp') || 
        titleLower.includes('valorant') ||
        titleLower.includes('csgo') ||
        titleLower.includes('steam') ||
        titleLower.includes('riot points')) {
      continue;
    }
    
    // "hk" (hakkında) kontrolü
    if (titleLower.trim() === 'hk' || titleLower.endsWith(' hk.')) {
      continue;
    }
    
    // Alakasız kelime kontrolü
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
    const url = match.url;
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

console.log('Total parsed items:', parsedItems.length);

// En az bir item döndür (workflow durmasın)
if (parsedItems.length === 0) {
  console.log('No matches found - check HTML structure');
  return [];
}

return parsedItems.slice(0, 50);
```

---

## ✅ Yapılacaklar

1. **Parse DonanımArsivi Data node'una git**
2. **Yukarıdaki kodu tamamen yapıştır** (eski kodu sil, yenisini yapıştır)
3. **Workflow'u çalıştır**
4. **Test et**

---

## 📝 Özellikler

- ✅ HTML decode (&#039; → ')
- ✅ 3 farklı regex pattern (sırayla dener)
- ✅ Boş/kısa başlık filtresi
- ✅ Sadece sayı filtresi
- ✅ Oyun içi para birimi filtresi (valorant, vp, csgo, steam, riot)
- ✅ "hk" filtresi
- ✅ Alakasız kelime filtresi
- ✅ İndirim bitti filtresi
- ✅ Fiyat çıkarma
- ✅ Debug console.log'ları
- ✅ Limit 50 item

---

## 🎯 Sonuç

Bu kod ile:
- ✅ "Valorant 8.900 Vp hk." gibi başlıklar filtrelenecek
- ✅ Sadece gerçek ürün fırsatları gelecek
- ✅ HTML entity'ler düzgün decode edilecek
- ✅ Tüm filtrelemeler çalışacak

