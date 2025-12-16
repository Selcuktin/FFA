# 🚀 Kurulum Adımları - Detaylı Rehber

Bu dokümantasyon, projeyi sıfırdan kurmak için gereken tüm adımları içerir.

## ✅ Tamamlanan Adımlar
- ✅ npm install yapıldı
- ✅ Neon'a giriş yapıldı

---

## 📋 ADIM 1: Neon'da Veritabanı Şemasını Oluşturma

### 1.1 Neon Dashboard'a Giriş
1. [Neon Dashboard](https://console.neon.tech) adresine gidin
2. Giriş yapın (zaten yaptınız ✅)

### 1.2 SQL Editor'e Gitme
1. Sol menüden **"SQL Editor"** sekmesine tıklayın
2. SQL Editor sayfası açılacak

### 1.3 Şema SQL'ini Çalıştırma
1. Aşağıdaki SQL kodunu kopyalayın:

```sql
CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    price TEXT,
    url TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deals_source ON deals(source);
CREATE INDEX IF NOT EXISTS idx_deals_url ON deals(url);
```

2. SQL Editor'deki büyük metin alanına yapıştırın
3. Sağ alttaki **"Run"** butonuna tıklayın
4. Başarılı mesajını görmelisiniz: "Success" veya benzeri

### 1.4 Tabloyu Kontrol Etme
1. Sol menüden **"Tables"** sekmesine tıklayın
2. `deals` tablosunun oluşturulduğunu görmelisiniz
3. Tabloda şu kolonlar olmalı:
   - id (integer, primary key)
   - source (varchar)
   - title (text)
   - price (text)
   - url (text, unique)
   - created_at (timestamp)

---

## 📋 ADIM 2: Connection String'i Alma

### 2.1 Connection Details Sayfasına Gitme
1. Neon Dashboard'da sol menüden **"Dashboard"** veya ana sayfaya gidin
2. Projenizin üzerine tıklayın (eğer birden fazla proje varsa)
3. **"Connection Details"** veya **"Connect"** butonuna tıklayın

### 2.2 Connection String'i Kopyalama
1. Açılan pencerede **"Connection string"** bölümünü bulun
2. Genellikle şu formatta olur:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
3. **"Copy"** butonuna tıklayarak kopyalayın
4. Bu string'i bir yere kaydedin (notepad'e yapıştırın)

**ÖNEMLİ:** Connection string şu şekilde olmalı:
- `postgresql://` ile başlamalı
- `?sslmode=require` ile bitmeli
- İçinde şifre olmalı (güvenli tutun!)

---

## 📋 ADIM 3: .env Dosyası Oluşturma

### 3.1 Proje Klasörüne Gitme
1. Windows Explorer'da proje klasörünüze gidin:
   ```
   C:\Users\mtn2\Desktop\fırsat
   ```

### 3.2 .env Dosyası Oluşturma
1. Klasörde sağ tıklayın → **"Yeni"** → **"Metin Belgesi"**
2. Dosya adını şu şekilde değiştirin: `.env` (nokta ile başlamalı!)
   - **Not:** Windows'ta dosya adı `.env.` olarak kaydedilebilir, bu normaldir
3. Dosyayı açın (Notepad ile)

### 3.3 .env Dosyasına İçerik Ekleme
Aşağıdaki içeriği yapıştırın ve kendi connection string'inizi ekleyin:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
PORT=3000
```

**Örnek:**
```env
DATABASE_URL=postgresql://neondb_owner:AbCdEf123456@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
PORT=3000
```

4. Dosyayı kaydedin (Ctrl+S)

### 3.4 Dosya Adını Kontrol Etme
- Dosya adı `.env` veya `.env.` olmalı
- Eğer `.env.txt` gibi bir uzantı varsa, Windows'ta "Dosya adı uzantılarını göster" seçeneğini açıp `.txt` kısmını silin

---

## 📋 ADIM 4: Sunucuyu Başlatma ve Test Etme

### 4.1 Terminal'i Açma
1. Proje klasöründe sağ tıklayın → **"Terminal'de aç"** veya **"PowerShell'de aç"**
   - Veya VS Code kullanıyorsanız, terminal'i açın (Ctrl+`)

### 4.2 Sunucuyu Başlatma
Terminal'de şu komutu çalıştırın:

```bash
npm start
```

**Beklenen Çıktı:**
```
🚀 Server çalışıyor: http://localhost:3000
📊 API endpoint: http://localhost:3000/api/deals
```

Eğer hata alırsanız, hata mesajını not edin ve bana bildirin.

### 4.3 Tarayıcıda Test Etme
1. Tarayıcınızı açın (Chrome, Firefox, Edge)
2. Adres çubuğuna yazın: `http://localhost:3000`
3. Sayfa açılmalı ve "Sıcak Fırsatlar" başlığını görmelisiniz
4. Henüz veri olmadığı için "Henüz fırsat bulunmamaktadır" mesajını görebilirsiniz

---

## 📋 ADIM 5: API'yi Test Etme

### 5.1 Health Check
Yeni bir terminal penceresi açın (veya PowerShell) ve şu komutu çalıştırın:

```powershell
curl http://localhost:3000/api/health
```

**Beklenen Çıktı:**
```json
{"status":"ok","database":"connected"}
```

Eğer `curl` komutu çalışmıyorsa, tarayıcıda şu adresi açın:
```
http://localhost:3000/api/health
```

### 5.2 Test Verisi Ekleme
Terminal'de şu komutu çalıştırın (PowerShell için):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/deals" -Method POST -ContentType "application/json" -Body '{"source":"Test","title":"Test Ürün 134,36 TL","price":"134,36 TL","url":"https://example.com/test-product"}'
```

Veya tarayıcıda Developer Tools (F12) → Console'da:

```javascript
fetch('http://localhost:3000/api/deals', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    source: 'Test',
    title: 'Test Ürün 134,36 TL',
    price: '134,36 TL',
    url: 'https://example.com/test-product'
  })
}).then(r => r.json()).then(console.log)
```

### 5.3 Verileri Listeleme
Tarayıcıda şu adresi açın:
```
http://localhost:3000/api/deals
```

Veya terminal'de:
```powershell
curl http://localhost:3000/api/deals
```

Eklediğiniz test verisini görmelisiniz.

### 5.4 Web Arayüzünde Kontrol
1. Ana sayfaya gidin: `http://localhost:3000`
2. Eklediğiniz test ürününü listede görmelisiniz

---

## 📋 ADIM 6: Sorun Giderme

### Hata: "Cannot find module"
**Çözüm:** `npm install` komutunu tekrar çalıştırın

### Hata: "Database connection error"
**Kontrol Listesi:**
1. `.env` dosyası doğru konumda mı? (proje klasörünün kökünde)
2. Connection string doğru mu? (kopyalarken tamamını aldınız mı?)
3. Neon'da database aktif mi? (Dashboard'da kontrol edin)
4. Connection string'de `?sslmode=require` var mı?

### Hata: "Port 3000 already in use"
**Çözüm:** 
- Başka bir port kullanın: `.env` dosyasında `PORT=3001` yapın
- Veya 3000 portunu kullanan programı kapatın

### Sayfa açılmıyor
**Kontrol:**
1. Sunucu çalışıyor mu? (Terminal'de `npm start` çıktısını kontrol edin)
2. Doğru adresi mi açıyorsunuz? (`http://localhost:3000`)
3. Firewall engelliyor mu?

---

## ✅ Sonraki Adımlar

Kurulum tamamlandıktan sonra:
1. ✅ Veritabanı hazır
2. ✅ Backend API çalışıyor
3. ✅ Frontend çalışıyor
4. 🔜 n8n workflow kurulumu (sonraki adım)
5. 🔜 Vercel'e deploy (sonraki adım)

---

## 📞 Yardım

Herhangi bir adımda takılırsanız:
1. Hata mesajını tam olarak kopyalayın
2. Hangi adımda olduğunuzu belirtin
3. Bana bildirin, yardımcı olayım!

