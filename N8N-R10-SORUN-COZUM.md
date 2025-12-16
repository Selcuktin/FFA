# R10 Cloudflare Sorunu ve Çözüm

## 🔴 Sorun

R10 sitesi Cloudflare koruması kullanıyor. Basit HTTP request'ler engelleniyor ve şu hata alınıyor:

```
Enable JavaScript and cookies to continue
```

## ✅ Çözüm: R10'u Şimdilik Devre Dışı Bırak

Hocaya gösterim için sadece DonanımArsivi yeterli olacaktır.

### Workflow'u Düzenle:

1. **"Fetch R10" node'unu sil** veya bağlantılarını kes
2. **"Parse R10 Data" node'unu sil** veya bağlantılarını kes
3. **"Merge Both Sources" node'unu güncelle:**
   - Sadece "Parse DonanımArsivi Data" node'undan gelen verileri al
   - R10 bağlantısını kaldır

### Alternatif: R10 Branch'ini Pasif Yap

"Workflow Configuration" node'unda R10 URL'ini kaldır veya boş bırak, böylece R10 branch'i çalışmaz.

---

## 🚀 Hızlı Düzeltme

n8n'de şunları yap:

1. **"Fetch R10" node'una sağ tık → "Disable"** (veya sil)
2. **"Parse R10 Data" node'una sağ tık → "Disable"** (veya sil)
3. **"Merge Both Sources" node'unu düzenle:**
   - Sadece "Parse DonanımArsivi Data" input'unu bırak
   - R10 input'unu kaldır

---

## 📝 Not

- DonanımArsivi çalışıyor ✅
- R10 Cloudflare nedeniyle çalışmıyor ❌
- Hocaya gösterim için DonanımArsivi yeterli ✅

---

## 🔮 Gelecekte R10 İçin

Eğer R10'u da eklemek istersen:
- Puppeteer kullan (tarayıcı otomasyonu)
- Veya R10'un RSS feed'i varsa onu kullan
- Veya manuel olarak R10'dan veri ekle

