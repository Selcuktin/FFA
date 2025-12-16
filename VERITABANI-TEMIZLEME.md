# Veritabanı Temizleme Rehberi

## 🗑️ Yöntem 1: Neon SQL Editor (Önerilen)

### Adımlar:

1. **Neon Dashboard'a Git:**
   - https://console.neon.tech → Projeni seç

2. **SQL Editor'e Git:**
   - Sol menüden **"SQL Editor"** sekmesine tıkla

3. **Tüm Verileri Sil:**
   ```sql
   DELETE FROM deals;
   ```
   Bu komutu çalıştır → Tüm kayıtlar silinir

4. **Veya Belirli Kayıtları Sil:**
   ```sql
   -- Sadece test kayıtlarını sil
   DELETE FROM deals WHERE title LIKE '%Test%';
   
   -- Veya sadece DonanımArsivi kayıtlarını sil
   DELETE FROM deals WHERE source = 'DonanımArsivi';
   ```

5. **ID'yi Sıfırla (Opsiyonel):**
   ```sql
   -- ID'yi 1'den başlatmak için
   ALTER SEQUENCE deals_id_seq RESTART WITH 1;
   ```

---

## 🔄 Yöntem 2: API Endpoint Ekle (Gelecek İçin)

Eğer gelecekte programatik olarak temizlemek istersen, `server.js`'ye endpoint ekleyebiliriz:

```javascript
// API: Tüm verileri temizle (DİKKAT: Tehlikeli!)
app.delete('/api/deals', async (req, res) => {
  try {
    await pool.query('DELETE FROM deals');
    res.json({ message: 'Tüm veriler silindi' });
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
  }
});
```

**Not:** Bu endpoint'i sadece test için kullan, production'da güvenlik ekle!

---

## ✅ Sonraki Adımlar

1. Veritabanını temizle (Yöntem 1)
2. n8n workflow'unu tekrar çalıştır
3. Yeni veriler eklenecek

---

## 📝 Not

- `DELETE FROM deals;` komutu tüm kayıtları siler
- ID sequence'i sıfırlamak istersen `ALTER SEQUENCE` komutunu çalıştır
- Temizledikten sonra n8n workflow'unu çalıştır, yeni veriler eklenecek

