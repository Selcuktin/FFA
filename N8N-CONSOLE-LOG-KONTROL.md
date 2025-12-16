# n8n Console Log Kontrol Rehberi

## 🔍 Console Log'larını Nasıl Görürsün?

### Adım 1: Workflow'u Çalıştır

1. n8n'de workflow'unu aç
2. Sağ üstteki **"Execute workflow"** butonuna tıkla
3. Workflow çalışacak

### Adım 2: Parse Node'unun Log'larını Kontrol Et

1. **"Parse DonanımArsivi Data"** node'una tıkla
2. Node'un altında veya yanında **"Execution"** veya **"Logs"** sekmesine bak
3. Console log'larını gör:
   - `console.log('HTML length:', ...)`
   - `console.log('HTML sample:', ...)`
   - `console.log('Matches found:', ...)`

### Adım 3: Browser Console'u Kontrol Et (Alternatif)

1. n8n sayfasında **F12** tuşuna bas
2. **Console** sekmesine git
3. Workflow çalıştığında console.log çıktılarını gör

---

## 📋 Ne Arayacaksın?

Console log'larında şunları görmelisin:

1. **HTML length:** HTML'in toplam uzunluğu
2. **HTML sample:** İlk 1000 karakter HTML örneği
3. **Match counts:** Her pattern için bulunan match sayısı
4. **Sample links:** Bulunan link örnekleri

---

## 🔍 Eğer Console Log Göremiyorsan

### Yöntem 1: Node'un Execution Details'ine Bak

1. Workflow çalıştıktan sonra **"Executions"** sekmesine git
2. Son execution'a tıkla
3. **"Parse DonanımArsivi Data"** node'una tıkla
4. **"Output"** veya **"Logs"** sekmesine bak

### Yöntem 2: Node'un INPUT'una Bak

1. **"Parse DonanımArsivi Data"** node'una tıkla
2. Sol panelde **"INPUT"** sekmesine bak
3. HTML'in gerçek yapısını gör
4. HTML'in bir kısmını kopyala (başlık linklerinin olduğu kısım)

---

## 📝 Paylaşılacak Bilgiler

n8n AI'ye veya bana şunları paylaş:

1. **HTML length:** Kaç karakter?
2. **HTML sample:** İlk 500-1000 karakter (başlık linklerinin olduğu kısım)
3. **Match counts:** Her pattern için kaç match bulundu?
4. **Sample links:** Bulunan link örnekleri (varsa)

---

## 🛠️ Alternatif: INPUT'tan HTML'i Kopyala

Eğer console log göremiyorsan:

1. **"Parse DonanımArsivi Data"** node'una tıkla
2. Sol panelde **"INPUT"** sekmesine bak
3. HTML'in bir kısmını kopyala (başlık linklerinin olduğu kısım)
4. Bu HTML'i n8n AI'ye veya bana gönder
5. Gerçek HTML yapısına göre regex'i düzeltelim

---

## ✅ Sonraki Adım

Console log'larını veya INPUT'taki HTML'i paylaş, regex pattern'ini birlikte düzeltelim!

