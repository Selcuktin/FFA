# n8n AI için Kısa Prompt

Aşağıdaki metni kopyalayıp n8n AI'ye yapıştır:

---

Mevcut workflow'umda şu sorunları düzelt:

1. **HTML Extract node'larını kaldır** - "Extract DonanımArsivi Deals" ve "Extract R10 Deals" node'larını sil, Fetch node'ları direkt Code node'larına bağla.

2. **Parse DonanımArsivi Data Code Node'unu düzelt:**
   - HTML'i direkt regex ile parse et (HTML Extract kullanma)
   - URL'yi `https://forum.donanimarsivi.com` ile birleştir (www.donanimarsivi.com değil!)
   - Regex pattern: `js-topicList-title` class'ını ara
   - İndirim bitti kontrolü yap
   - Fiyatı regex ile çıkar: `(\d+[.,]\d+)\s*TL`

3. **Parse R10 Data Code Node'unu düzelt:**
   - HTML'i direkt regex ile parse et
   - Regex pattern: `topic` class'ını ara
   - İndirim bitti kontrolü yap
   - Fiyatı regex ile çıkar

4. **Filter Node'a ekle:**
   - "X İndirim" kontrolü
   - URL boş kontrolü

5. **HTTP Request node'larında:**
   - Response format: "Text" olarak ayarla

**Önemli:** HTML Extract node'larını tamamen kaldır, Code node'larında direkt HTML'den regex ile parse et. DonanımArsivi URL'i mutlaka `forum.donanimarsivi.com` olsun.

---

