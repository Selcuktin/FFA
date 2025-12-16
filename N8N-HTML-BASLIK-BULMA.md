# HTML'de Başlık Linklerini Bulma

## 🔍 INPUT'tan Başlık Linklerini Nasıl Bulursun?

### Yöntem 1: HTML'de "konu" Kelimesini Ara

1. **Parse node'unun INPUT'una git**
2. **HTML'in tamamını gör** (scroll yap)
3. **Ctrl+F** ile **"konu"** kelimesini ara
4. **"konu"** kelimesinin geçtiği yerleri bul
5. **Başlık linklerinin olduğu kısmı kopyala**

Örnek bulacağın yapı:
```html
<a href="/konu/urun-adi-12345/" class="...">Başlık Metni</a>
```

---

### Yöntem 2: HTML'in Ortasından Bir Kısım Al

1. **Parse node'unun INPUT'una git**
2. **HTML'in ortasına scroll yap** (başlık linkleri genelde `<body>` içinde)
3. **Birkaç satır HTML kopyala** (örnek: 500-1000 karakter)
4. **Bu kısmı paylaş**

---

### Yöntem 3: Tarayıcıdan Kontrol Et

1. **Forum sayfasını tarayıcıda aç:** https://forum.donanimarsivi.com/forumlar/Sicakfirsatlar/
2. **F12 → Elements**
3. **Bir başlık linkine sağ tık → "Copy" → "Copy outerHTML"**
4. **Bu HTML'i paylaş**

Örnek:
```html
<a href="/konu/urun-adi-12345/" class="js-topicList-title" data-xf-init="tooltip" title="Başlık">Başlık Metni</a>
```

---

## 🛠️ Geçici Çözüm: Genel Regex Pattern

Eğer HTML'i bulamıyorsan, şu genel pattern'i dene:

```javascript
// Parse DonanımArsivi HTML
const items = $input.all();
const parsedItems = [];

for (const item of items) {
  const html = item.json.data || item.json.body || item.json || '';
  
  // /konu/ içeren tüm linkleri bul
  const topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
  
  let match;
  while ((match = topicRegex.exec(html)) !== null) {
    const url = match[1];
    let title = match[2].trim();
    
    // HTML decode
    title = title.replace(/&#039;/g, "'")
                 .replace(/&amp;/g, "&")
                 .replace(/&quot;/g, '"')
                 .replace(/&lt;/g, "<")
                 .replace(/&gt;/g, ">")
                 .replace(/&nbsp;/g, " ");
    
    // Filtreleme
    if (!title || title.length < 10) continue;
    if (/^\d+$/.test(title.trim())) continue;
    
    const titleLower = title.toLowerCase();
    if (titleLower.includes('indirim bitti') || 
        titleLower.includes('x indirim') ||
        titleLower.includes('değişiklikler') ||
        titleLower.includes('güncellemeler')) {
      continue;
    }
    
    // Fiyat çıkarma
    const priceMatch = title.match(/(\d+[.,]\d+)\s*TL/i) || title.match(/(\d+[.,]\d+)\s*₺/i);
    const price = priceMatch ? priceMatch[1] + ' TL' : null;
    
    // URL
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

---

## 📝 Sonraki Adım

1. **Parse node'unun INPUT'undan HTML'in ortasından bir kısım kopyala** (500-1000 karakter)
2. **Veya tarayıcıdan bir başlık linkinin HTML'ini kopyala**
3. **Bu HTML'i paylaş**
4. **Gerçek yapıya göre regex'i düzeltelim**

**Önemli:** HTML'in başlık linklerinin olduğu kısmını görmem gerekiyor. Sadece `<head>` kısmı değil, `<body>` içindeki başlık linklerini görmem lazım.

