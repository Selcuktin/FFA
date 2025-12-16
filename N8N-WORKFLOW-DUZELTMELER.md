# n8n Workflow Düzeltmeleri ve Kontrol Listesi

## 🔍 Tespit Edilen Sorunlar

### 1. ❌ HTML Extract Node'ları Yanlış
**Sorun:** CSS selector'lar (`.title`, `.deal-title`) gerçek HTML yapısına uygun değil.

**Çözüm:** HTML Extract node'larını kaldırıp, direkt Code node'larında regex ile parse ettik.

---

### 2. ❌ Parse DonanımArsivi URL Hatası
**Sorun:** 
```javascript
const fullUrl = url.startsWith('http') ? url : `https://www.donanimarsivi.com${url}`;
```
Yanlış domain: `www.donanimarsivi.com` yerine `forum.donanimarsivi.com` olmalı.

**Çözüm:** Düzeltildi:
```javascript
const fullUrl = url.startsWith('http') ? url : `https://forum.donanimarsivi.com${url}`;
```

---

### 3. ❌ R10 Parse Kodu Hatalı
**Sorun:** `deal.text` kullanılmış ama HTML extract'ten gelen data farklı format.

**Çözüm:** Direkt HTML'den regex ile parse ediyoruz.

---

### 4. ✅ Filter Node İyileştirildi
**Eklenen:** 
- "X İndirim" kontrolü eklendi
- URL boş kontrolü eklendi

---

## 📋 Düzeltilmiş Workflow Yapısı

```
1. Every 30 Minutes (Cron Trigger)
   ↓
2. Workflow Configuration (URL'ler)
   ↓
3. Fetch DonanımArsivi + Fetch R10 (Paralel)
   ↓
4. Parse DonanımArsivi Data (Code Node - Regex)
   ↓
5. Parse R10 Data (Code Node - Regex)
   ↓
6. Merge Both Sources
   ↓
7. Filter Out Expired Deals (İndirim Bitti kontrolü)
   ↓
8. Post to API
```

---

## ⚠️ Önemli Notlar

### Regex Pattern'ler Gerçek HTML'e Göre Düzenlenmeli

Workflow'daki regex pattern'ler genel amaçlı. Gerçek HTML yapısına göre düzenlenmesi gerekebilir:

**DonanımArsivi için:**
- Şu anki pattern: `js-topicList-title` class'ını arıyor
- Eğer çalışmazsa, gerçek HTML'i kontrol edip pattern'i güncelle

**R10 için:**
- Şu anki pattern: `topic` class'ını arıyor
- Eğer çalışmazsa, gerçek HTML'i kontrol edip pattern'i güncelle

---

## 🧪 Test Adımları

1. **Workflow'u Import Et:**
   - n8n'de "Import from File" → `n8n-workflow-fixed.json`

2. **Manuel Test:**
   - "Execute Workflow" butonuna bas
   - Her node'un çıktısını kontrol et

3. **Parse Node'larını Kontrol Et:**
   - "Parse DonanımArsivi Data" node'unun çıktısında `source`, `title`, `price`, `url` olmalı
   - "Parse R10 Data" node'unun çıktısında aynı şekilde

4. **API Test:**
   - "Post to API" node'unun çıktısında `success: true` veya `duplicate: true` görmeli
   - Vercel sitesinde verilerin geldiğini kontrol et

5. **Gerçek HTML Kontrolü:**
   - Eğer parse çalışmazsa:
     - Forum sayfasının HTML'ini incele
     - Regex pattern'leri gerçek yapıya göre güncelle

---

## 🔧 Regex Pattern'leri Güncelleme

Eğer parse çalışmazsa, şu adımları izle:

1. Forum sayfasını tarayıcıda aç
2. F12 → Elements → İlgili başlığa sağ tık → "Copy" → "Copy selector"
3. Selector'ı regex'e çevir
4. Code node'daki regex'i güncelle

**Örnek:**
```javascript
// Eski (genel)
const titleRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

// Yeni (gerçek HTML'e göre)
const titleRegex = /<a[^>]*class="[^"]*topic-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
```

---

## ✅ Kontrol Listesi

- [x] URL'ler doğru (DonanımArsivi: forum.donanimarsivi.com)
- [x] API URL doğru (Vercel URL'i)
- [x] Filter node "İndirim Bitti" kontrolü yapıyor
- [x] Parse node'ları regex kullanıyor
- [ ] Regex pattern'ler gerçek HTML'e göre test edildi
- [ ] API'ye POST başarılı
- [ ] Vercel sitesinde veriler görünüyor

---

## 🚀 Sonraki Adımlar

1. Workflow'u import et
2. Manuel test yap
3. Eğer parse çalışmazsa, HTML'i kontrol et ve regex'i güncelle
4. Başarılı olunca workflow'u aktif et
5. 30 dakika sonra Vercel sitesinde verileri kontrol et

