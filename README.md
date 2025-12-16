# Güncel Donanım Fırsatları Takip Sistemi

Topluma Hizmet Uygulamaları dersi kapsamında geliştirilmiş bir web tabanlı fırsat takip sistemi.

## 📋 Proje Hakkında

Bu proje, Donanım Arşivi ve R10 gibi platformlarda "Sıcak Fırsatlar" başlığı altında paylaşılan ürün bilgilerini otomatik olarak toplayarak, kullanıcıların tek bir noktadan hızlıca görüntüleyebilmesini sağlar.

**Önemli:** Bu site yalnızca bilgilendirme ve yönlendirme amacıyla hazırlanmış bir eğitim projesidir. Herhangi bir ticari veya kâr amacı gütmemektedir.

## 🛠️ Teknolojiler

- **Backend:** Node.js + Express
- **Veritabanı:** PostgreSQL (Neon)
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Otomasyon:** n8n
- **Deployment:** Vercel

## 📦 Kurulum

### 1. Projeyi İndirin

```bash
git clone <repo-url>
cd fırsat
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Veritabanını Hazırlayın

1. [Neon](https://neon.tech) üzerinde yeni bir PostgreSQL veritabanı oluşturun
2. `database/schema.sql` dosyasındaki SQL komutlarını Neon SQL Editor'de çalıştırın
3. Connection string'i kopyalayın

### 4. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın ve connection string'inizi ekleyin:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

### 5. Sunucuyu Başlatın

```bash
npm start
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

## 🔄 n8n Workflow Kurulumu

n8n kullanarak otomatik veri toplama için:

1. n8n'i kurun veya cloud versiyonunu kullanın
2. `n8n-workflow.json` dosyasını n8n'e import edin
3. Workflow'u düzenleyin:
   - API endpoint'ini kendi sunucu adresinize göre ayarlayın
   - Cron zamanlamasını istediğiniz gibi ayarlayın (örn: her 15 dakikada bir)
4. Workflow'u aktif hale getirin

### n8n Workflow Yapısı

1. **Cron Trigger:** Belirli aralıklarla çalışır
2. **HTTP Request:** Forum sayfasını çeker
3. **HTML Extract:** Ürün bilgilerini parse eder
4. **Function Node:** Verileri formatlar
5. **HTTP Request:** Backend API'ye POST isteği gönderir

Detaylı kurulum için `n8n-workflow.md` dosyasına bakın.

## 🚀 Vercel'e Deploy

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. "New Project" ile projeyi import edin
4. Environment Variables'a `DATABASE_URL` ekleyin
5. Deploy edin

Vercel otomatik olarak Node.js projesini algılar ve deploy eder.

## 📁 Proje Yapısı

```
fırsat/
├── server.js              # Express backend server
├── package.json           # Node.js bağımlılıkları
├── vercel.json            # Vercel konfigürasyonu
├── .env.example           # Ortam değişkenleri örneği
├── database/
│   └── schema.sql         # PostgreSQL şema dosyası
├── public/
│   ├── index.html         # Ana sayfa
│   ├── style.css          # Stil dosyası
│   └── app.js             # Frontend JavaScript
├── n8n-workflow.json      # n8n workflow dosyası
└── README.md              # Bu dosya
```

## 🔌 API Endpoints

### `POST /api/deals`
Yeni fırsat ekle (n8n'den kullanılır)

**Request Body:**
```json
{
  "source": "DonanımArsivi",
  "title": "Ürün Adı 134,36 TL",
  "price": "134,36 TL",
  "url": "https://example.com/product"
}
```

### `GET /api/deals`
Tüm fırsatları getir

**Query Parameters:**
- `limit`: Maksimum kayıt sayısı (varsayılan: 100)

### `GET /api/deals/active`
Aktif fırsatları getir (İndirim Bitti olmayanlar)

### `GET /api/health`
Sağlık kontrolü

## 📝 Lisans

Bu proje eğitim amaçlıdır ve MIT lisansı altında lisanslanmıştır.

## ⚠️ Yasal Uyarı

Bu sistem yalnızca bilgilendirme amaçlıdır. Tüm ürün bilgileri ve fiyatlar ilgili kaynak sitelerden alınmaktadır. Herhangi bir satış, reklam veya ticari kazanç amacı gütmemektedir.

