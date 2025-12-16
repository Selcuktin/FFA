# Vercel Deployment Protection Sorunu ve Çözüm

## 🔴 Sorun

Vercel API endpoint'i authentication gerektiriyor. n8n'den POST isteği gönderilirken "Authorization failed" hatası alınıyor.

## ✅ Çözüm: Deployment Protection'ı Kapat

### Adımlar:

1. **Vercel Dashboard'a Git:**
   - https://vercel.com → Projeni seç (ffa-app12)

2. **Settings'e Git:**
   - Proje sayfasında üstteki **"Settings"** sekmesine tıkla

3. **Deployment Protection'ı Bul:**
   - Sol menüden **"Deployment Protection"** seçeneğine tıkla
   - Veya **"Security"** altında olabilir

4. **Protection'ı Kapat:**
   - **"Password Protection"** veya **"Deployment Protection"** seçeneğini bul
   - **"Disable"** veya **"Off"** yap
   - **"Save"** tıkla

5. **Test Et:**
   - n8n workflow'unu tekrar çalıştır
   - API'ye POST başarılı olmalı

---

## 🔍 Alternatif: Bypass Token Kullan (Karmaşık)

Eğer protection'ı kapatmak istemiyorsan:

1. Vercel Dashboard → Settings → Deployment Protection
2. Bypass token oluştur
3. n8n'de API URL'ine token ekle:
   ```
   https://ffa-ngid1l05j-atackonben-9826s-projects.vercel.app/api/deals?x-vercel-protection-bypass=TOKEN
   ```

**Not:** Bu yöntem daha karmaşık, önerilen çözüm protection'ı kapatmak.

---

## 📝 Not

- Deployment Protection genelde production için kullanılır
- Eğitim projesi için gerekli değil
- Kapatmak en kolay çözüm

