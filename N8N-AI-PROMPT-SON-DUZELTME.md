# n8n AI için Son Düzeltme Promptu

Aşağıdaki metni kopyalayıp n8n AI'ye yapıştır:

---

Workflow'umda şu sorunları düzelt:

1. **R10 Cloudflare Sorunu:**
   - R10 sitesi Cloudflare koruması nedeniyle çalışmıyor
   - "Fetch R10" ve "Parse R10 Data" node'larını tamamen kaldır veya disable et
   - "Merge Both Sources" node'unu sadece DonanımArsivi verilerini alacak şekilde düzenle
   - R10 branch'ini workflow'dan çıkar

2. **Parse DonanımArsivi Data Code Node'unu düzelt:**
   - Fiyat formatını düzelt: `priceMatch[1] + ' TL'` şeklinde gönder (sadece sayı değil)
   - `if (!price) continue;` satırını kaldır - fiyat opsiyonel olmalı (bazı fırsatlar fiyat olmadan da olabilir)
   - URL'yi mutlaka `https://forum.donanimarsivi.com` ile birleştir

3. **Filter Node kontrolü:**
   - "İndirim Bitti" kontrolü var mı? ✅
   - "X İndirim" kontrolü var mı? ✅
   - URL boş kontrolü var mı? ✅
   - Hepsi varsa tamam, yoksa ekle

4. **Post to API node'unu kontrol et:**
   - JSON body formatı doğru mu: `{source, title, price, url}`
   - API URL doğru mu: `https://ffa-ngid1l05j-atackonben-9826s-projects.vercel.app/api/deals`

**Özet:**
- R10 node'larını kaldır/disable et
- Sadece DonanımArsivi çalışsın
- Parse DonanımArsivi'de fiyat formatını düzelt ve fiyat zorunluluğunu kaldır
- Filter ve API node'larını kontrol et

Lütfen bu düzeltmeleri yap ve workflow'u güncelle.

---

