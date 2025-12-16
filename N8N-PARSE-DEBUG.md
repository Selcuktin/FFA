# Parse DonanımArsivi Debug Rehberi

## 🔴 Sorun

Parse node çalışıyor ama regex pattern HTML'den başlıkları bulamıyor. Bu yüzden "Test Item - No Deals Found" ekleniyor.

## ✅ Çözüm: Gerçek HTML Yapısını Kontrol Et

### Adım 1: Parse Node'unun INPUT'una Bak

1. n8n'de **"Parse DonanımArsivi Data"** node'una tıkla
2. **INPUT** panelinde HTML'i gör
3. HTML'in bir kısmını kopyala (örnek: başlık linklerinin olduğu kısım)

### Adım 2: Gerçek HTML Yapısını Bul

Forum sayfasında (tarayıcıda):
1. F12 → Elements
2. Bir başlık linkine sağ tık → **"Inspect"**
3. HTML yapısını gör
4. Link'in class'ını veya yapısını not et

### Adım 3: Regex Pattern'i Düzelt

Gerçek HTML yapısına göre regex'i güncelle.

---

## 🔍 Olası HTML Yapıları

### Senaryo 1: js-topicList-title class'ı var
```html
<a href="/konu/..." class="js-topicList-title">Başlık</a>
```
Regex:
```javascript
/<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi
```

### Senaryo 2: Farklı class yapısı
```html
<a href="/konu/..." class="topic-title">Başlık</a>
```
Regex:
```javascript
/<a[^>]*class="[^"]*topic-title[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi
```

### Senaryo 3: Sadece /konu/ içeren linkler
```html
<a href="/konu/urun-adi-12345/">Başlık</a>
```
Regex:
```javascript
/<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi
```

---

## 🛠️ n8n AI'ye Verilecek Prompt

```
Parse DonanımArsivi Data node'um çalışmıyor. Regex pattern HTML'den başlıkları bulamıyor.

Lütfen şunları yap:

1. INPUT'taki HTML'i kontrol et
2. Başlık linklerinin gerçek HTML yapısını bul
3. Regex pattern'i gerçek yapıya göre düzelt
4. Birden fazla pattern dene:
   - Önce js-topicList-title class'ını ara
   - Bulamazsa /konu/ içeren linkleri ara
   - Bulamazsa genel forum link pattern'i dene

5. Debug için console.log ekle:
   - HTML length
   - İlk 1000 karakter HTML sample
   - Bulunan match sayısı
   - İlk birkaç match örneği

6. Eğer hiç match bulunamazsa, test item döndürme - boş array döndür

Lütfen regex pattern'ini düzelt ve debug log'ları ekle.
```

---

## 📝 Alternatif: Manuel Regex Test

1. Parse node'unun INPUT'undan HTML'i kopyala
2. Regex101.com'a git
3. HTML'i yapıştır
4. Farklı regex pattern'lerini dene
5. Çalışan pattern'i bul
6. n8n'deki koda ekle

---

## ⚠️ Önemli

"Test Item - No Deals Found" kaydı, kodun hiç match bulamadığında döndürdüğü test item'ı. Bu, regex pattern'inin yanlış olduğunu gösteriyor.

Gerçek HTML yapısını görmeden kesin çözüm veremem. Parse node'unun INPUT'una bak ve HTML yapısını paylaş, birlikte regex'i düzeltelim.

