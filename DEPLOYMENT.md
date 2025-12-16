# Deployment Rehberi

Bu dokümantasyon, projeyi Vercel'e deploy etme adımlarını açıklar.

## 🚀 Vercel'e Deploy Adımları

### 1. GitHub'a Push Edin

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel Hesabı Oluşturun

1. [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile giriş yapabilirsiniz)
2. Dashboard'a gidin

### 3. Yeni Proje Oluşturun

1. "Add New..." → "Project" tıklayın
2. GitHub repository'nizi seçin
3. "Import" butonuna tıklayın

### 4. Proje Ayarlarını Yapın

**Framework Preset:** Other (veya Vercel otomatik algılar)

**Root Directory:** `./` (boş bırakın)

**Build Command:** Boş bırakın (gerekmiyor)

**Output Directory:** Boş bırakın

**Install Command:** `npm install`

### 5. Environment Variables Ekleyin

"Environment Variables" bölümüne gidin ve ekleyin:

- **Key:** `DATABASE_URL`
- **Value:** Neon PostgreSQL connection string'iniz
- **Environment:** Production, Preview, Development (hepsini seçin)

Örnek:
```
postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### 6. Deploy Edin

"Deploy" butonuna tıklayın. Vercel otomatik olarak:
- Bağımlılıkları yükler
- Projeyi build eder
- Deploy eder

### 7. Domain'i Kontrol Edin

Deploy tamamlandıktan sonra, Vercel size bir URL verir:
`https://your-project-name.vercel.app`

Bu URL'yi tarayıcıda açarak sitenizin çalıştığını kontrol edin.

## 🔧 Vercel Konfigürasyonu

`vercel.json` dosyası zaten hazır. Bu dosya:
- API route'larını `/api/*` altında yönlendirir
- Static dosyaları (`public/`) serve eder
- Node.js runtime kullanır

## 📝 Neon Veritabanı Kurulumu

### 1. Neon Hesabı Oluşturun

1. [Neon](https://neon.tech) hesabı oluşturun
2. Yeni bir proje oluşturun

### 2. Veritabanı Şemasını Oluşturun

1. Neon Dashboard → SQL Editor'e gidin
2. `database/schema.sql` dosyasındaki SQL komutlarını çalıştırın:

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

### 3. Connection String'i Kopyalayın

1. Neon Dashboard → Connection Details
2. Connection string'i kopyalayın
3. Vercel Environment Variables'a ekleyin

## 🧪 Test Etme

### 1. API Testi

Deploy sonrası API'yi test edin:

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Fırsat ekleme (test)
curl -X POST https://your-app.vercel.app/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Test",
    "title": "Test Ürün 100 TL",
    "price": "100 TL",
    "url": "https://example.com/test"
  }'

# Fırsatları listeleme
curl https://your-app.vercel.app/api/deals
```

### 2. Web Arayüzü Testi

Tarayıcıda `https://your-app.vercel.app` adresine gidin ve:
- Sayfanın yüklendiğini kontrol edin
- API'den veri geldiğini kontrol edin (Developer Tools → Network)

## 🔄 n8n Workflow'u Güncelleme

n8n workflow'unuzdaki API URL'ini Vercel URL'inize göre güncelleyin:

```
https://your-app.vercel.app/api/deals
```

## ⚠️ Önemli Notlar

1. **Free Tier Limits:** Vercel free tier'da:
   - 100GB bandwidth/ay
   - Serverless function execution time limitleri var
   - Yeterli olmalı ama kontrol edin

2. **Database Connection:** Neon free tier'da:
   - 0.5 GB storage
   - Yeterli olmalı

3. **Environment Variables:** Production'da mutlaka environment variables kullanın, hardcode etmeyin.

4. **CORS:** API CORS ayarları zaten yapılmış (`cors` middleware), ama gerekirse güncelleyin.

## 🐛 Sorun Giderme

### API çalışmıyor
- Vercel logs'u kontrol edin (Dashboard → Deployments → Logs)
- Environment variables'ın doğru eklendiğini kontrol edin
- Database connection string'in doğru olduğunu kontrol edin

### Database bağlantı hatası
- Neon connection string'in doğru olduğunu kontrol edin
- SSL mode'un `require` olduğunu kontrol edin
- Neon dashboard'da database'in aktif olduğunu kontrol edin

### Frontend veri göstermiyor
- Browser console'da hata var mı kontrol edin
- Network tab'da API isteklerinin başarılı olduğunu kontrol edin
- CORS hatası var mı kontrol edin

## 📞 Destek

Sorun yaşarsanız:
1. Vercel logs'u kontrol edin
2. Neon database logs'unu kontrol edin
3. Browser console'u kontrol edin
4. n8n execution logs'unu kontrol edin

