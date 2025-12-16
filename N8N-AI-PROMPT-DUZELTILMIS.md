# n8n AI için Düzeltilmiş Prompt

Aşağıdaki prompt'u n8n AI'ye ver:

---

## PROMPT:

Mevcut workflow'umda birkaç sorun var, lütfen şu düzeltmeleri yap:

**Mevcut Sorunlar:**

1. **HTML Extract Node'ları Çalışmıyor:**
   - CSS selector'lar (`.title`, `.deal-title`) gerçek HTML yapısına uygun değil
   - HTML Extract node'larını kaldır ve Code node'larında direkt regex ile parse et

2. **Parse DonanımArsivi URL Hatası:**
   - Şu anki kod: `https://www.donanimarsivi.com${url}`
   - Doğrusu: `https://forum.donanimarsivi.com${url}` olmalı

3. **R10 Parse Kodu Hatalı:**
   - `deal.text` kullanılmış ama HTML extract'ten gelen data farklı format
   - Direkt HTML'den regex ile parse et

**İstenen Düzeltmeler:**

1. **HTML Extract node'larını kaldır:**
   - "Extract DonanımArsivi Deals" node'unu kaldır
   - "Extract R10 Deals" node'unu kaldır
   - Fetch node'ları direkt Code node'larına bağla

2. **Parse DonanımArsivi Data Code Node'unu Düzelt:**
   ```javascript
   // Parse DonanımArsivi HTML
   const html = $input.first().json.data || $input.first().json.body || $input.first().json;
   const items = [];

   // Forum yapısına göre regex - js-topicList-title class'ını ara
   const titleRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

   let match;
   while ((match = titleRegex.exec(html)) !== null) {
     const url = match[1];
     const title = match[2].trim();
     
     // İndirim bitti kontrolü
     if (title.toLowerCase().includes('indirim bitti') || 
         title.toLowerCase().includes('x indirim')) {
       continue;
     }
     
     // Fiyat çıkarma
     const priceMatch = title.match(/(\d+[.,]\d+)\s*TL/i) || title.match(/(\d+[.,]\d+)\s*₺/i);
     const price = priceMatch ? priceMatch[1] + ' TL' : null;
     
     // Tam URL oluştur - ÖNEMLİ: forum.donanimarsivi.com kullan
     const fullUrl = url.startsWith('http') 
       ? url 
       : `https://forum.donanimarsivi.com${url}`;
     
     items.push({
       json: {
         source: 'DonanımArsivi',
         title: title,
         price: price,
         url: fullUrl
       }
     });
   }

   return items.slice(0, 20); // İlk 20 kayıt
   ```

3. **Parse R10 Data Code Node'unu Düzelt:**
   ```javascript
   // Parse R10 HTML
   const html = $input.first().json.data || $input.first().json.body || $input.first().json;
   const items = [];

   // R10 için regex - topic class'ını ara
   const titleRegex = /<a[^>]*class="[^"]*topic[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

   let match;
   while ((match = titleRegex.exec(html)) !== null) {
     const url = match[1];
     const title = match[2].trim();
     
     // İndirim bitti kontrolü
     if (title.toLowerCase().includes('indirim bitti') || 
         title.toLowerCase().includes('x indirim')) {
       continue;
     }
     
     // Fiyat çıkarma
     const priceMatch = title.match(/(\d+[.,]\d+)\s*TL/i) || title.match(/(\d+[.,]\d+)\s*₺/i);
     const price = priceMatch ? priceMatch[1] + ' TL' : null;
     
     // Tam URL oluştur
     const fullUrl = url.startsWith('http') 
       ? url 
       : `https://www.r10.net${url}`;
     
     items.push({
       json: {
         source: 'R10',
         title: title,
         price: price,
         url: fullUrl
       }
     });
   }

   return items.slice(0, 20); // İlk 20 kayıt
   ```

4. **Filter Node'u İyileştir:**
   - "X İndirim" kontrolü ekle
   - URL boş kontrolü ekle
   - Şu koşulları ekle:
     - title "İndirim Bitti" içermemeli
     - title "X İndirim" içermemeli  
     - url boş olmamalı

5. **HTTP Request Node'larını Güncelle:**
   - Response format: "Text" olarak ayarla (HTML almak için)

**Önemli:**
- HTML Extract node'larını tamamen kaldır
- Fetch node'ları direkt Code node'larına bağla
- Code node'larında HTML'i direkt regex ile parse et
- DonanımArsivi URL'i mutlaka `forum.donanimarsivi.com` olsun

Lütfen bu düzeltmeleri yap ve workflow'u güncelle.

---

## Kullanım:

1. Bu prompt'u kopyala
2. n8n AI'ye yapıştır
3. AI workflow'u düzeltecek
4. Import et ve test et

