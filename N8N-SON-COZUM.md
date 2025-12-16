# Son Çözüm: Parse Node Kodu

## 🎯 Doğrudan Çözüm

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

// Alakasız kelimeler
const irrelevantKeywords = ['değişiklikler', 'güncellemeler', 'forum', 'yenilikler'];

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
  
  // Pattern 2: js-topicList-title class'ı (eğer varsa)
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
  // Boş array döndür (Always Output Data açıksa workflow devam eder)
  return [];
}

return parsedItems.slice(0, 50);
```

---

## ✅ Yapılacaklar

1. **Parse DonanımArsivi Data node'una git**
2. **Yukarıdaki kodu yapıştır**
3. **Workflow'u çalıştır**
4. **Console log'larını kontrol et:**
   - HTML length
   - HTML sample
   - Pattern matches
   - Total parsed items

---

## 🔍 Eğer Hala Çalışmazsa

Console log'larındaki "HTML sample" çıktısını paylaş. Gerçek HTML yapısını görüp regex'i ona göre düzeltebilirim.

---

## 📝 Not

Bu kod 3 farklı pattern dener:
1. `/konu/` içeren linkler (en yaygın)
2. `js-topicList-title` class'ı
3. `data-topic-id` attribute'u

Hangisi match bulursa onu kullanır. Console log'ları hangi pattern'in çalıştığını gösterir.

