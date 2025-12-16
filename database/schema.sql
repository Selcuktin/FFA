-- Neon PostgreSQL Veritabanı Şeması
-- Bu dosyayı Neon dashboard'unda SQL Editor'de çalıştırın

CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,          -- "DonanımArsivi" veya "R10"
    title TEXT NOT NULL,                   -- Ürün başlığı/fiyat bilgisi
    price TEXT,                            -- Fiyat bilgisi (opsiyonel, title'da da olabilir)
    url TEXT NOT NULL UNIQUE,             -- Ürün linki (tekrar kontrolü için UNIQUE)
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- İndeksler (performans için)
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deals_source ON deals(source);
CREATE INDEX IF NOT EXISTS idx_deals_url ON deals(url);

-- Örnek veri ekleme (test için)
-- INSERT INTO deals (source, title, price, url) 
-- VALUES 
-- ('DonanımArsivi', 'Örnek Ürün 134,36 TL', '134,36 TL', 'https://example.com/product1'),
-- ('R10', 'Test Ürün 500 TL', '500 TL', 'https://example.com/product2');

