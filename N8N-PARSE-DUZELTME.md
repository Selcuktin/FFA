# Parse DonanımArsivi Data Node Düzeltme

## 🔴 Sorun

Parse node çalışıyor ama OUTPUT'ta "No output" görünüyor. Bu, regex pattern'in HTML yapısına uymadığı anlamına geliyor.

## ✅ Çözüm

Parse DonanımArsivi Data Code Node'unu şu şekilde düzelt:

```javascript
// Parse DonanımArsivi HTML directly
const items = $input.all();
const parsedItems = [];

for (const item of items) {
  const html = item.json.data || item.json.body || item.json || '';
  
  // Daha esnek regex - farklı class pattern'lerini dene
  // Önce js-topicList-title, sonra diğer olası pattern'ler
  let topicRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
  
  // Eğer eşleşme bulamazsa, daha genel pattern dene
  let matches = [];
  let match;
  
  while ((match = topicRegex.exec(html)) !== null) {
    matches.push(match);
  }
  
  // Eğer js-topicList-title bulunamazsa, genel topic link pattern'i dene
  if (matches.length === 0) {
    topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
    while ((match = topicRegex.exec(html)) !== null) {
      matches.push(match);
    }
  }
  
  // Eğer hala bulunamazsa, herhangi bir forum link pattern'i dene
  if (matches.length === 0) {
    topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*class="[^"]*"[^>]*>([^<]+)<\/a>/gi;
    while ((match = topicRegex.exec(html)) !== null) {
      matches.push(match);
    }
  }
  
  for (const match of matches) {
    const url = match[1];
    const title = match[2].trim();
    
    // Boş title kontrolü
    if (!title || title.length < 5) {
      continue;
    }
    
    // İndirim bitti kontrolü
    if (title.toLowerCase().includes('indirim bitti') || 
        title.toLowerCase().includes('x indirim')) {
      continue;
    }
    
    // Fiyat çıkarma - opsiyonel
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

// En az bir item döndür (boş array workflow'u durdurur)
if (parsedItems.length === 0) {
  // Debug için: HTML'in bir kısmını log'la
  console.log('HTML length:', html.length);
  console.log('HTML sample:', html.substring(0, 500));
  
  // En azından bir test item döndür
  parsedItems.push({
    json: {
      source: 'DonanımArsivi',
      title: 'Test - Regex çalışmıyor, HTML yapısını kontrol et',
      price: null,
      url: 'https://forum.donanimarsivi.com'
    }
  });
}

return parsedItems.slice(0, 50); // İlk 50 kayıt
```

## 🔍 Debug Adımları

1. **Parse node'unu çalıştır**
2. **Browser console'u aç** (F12)
3. **Console.log çıktılarını kontrol et:**
   - HTML length ne kadar?
   - HTML sample'da ne görünüyor?
4. **Gerçek HTML yapısını kontrol et:**
   - Forum sayfasını tarayıcıda aç
   - F12 → Elements → Başlıklara sağ tık → "Copy selector"
   - Selector'ı regex'e çevir

## 📝 Alternatif: HTML'i Kontrol Et

Eğer hala çalışmazsa:

1. Parse node'unun INPUT'una bak
2. HTML'in gerçek yapısını gör
3. Başlık linklerinin class'ını veya yapısını bul
4. Regex'i ona göre düzenle

