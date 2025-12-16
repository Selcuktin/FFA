# n8n Filter Düzeltme - Alakasız İçerik Filtreleme

## 🔴 Sorun

"Valorant 8.900 Vp hk." gibi oyun içi para birimi içeren başlıklar geliyor. Bu sıcak fırsatlarla alakalı değil.

## ✅ Çözüm: Parse Node'una Ek Filtreleme Ekle

Parse DonanımArsivi Data node'una şu filtrelemeyi ekle:

### Alakasız Kelimeler Listesi:

```javascript
// Alakasız kelimeler (genişletilmiş liste)
const irrelevantKeywords = [
  'değişiklikler', 
  'güncellemeler', 
  'forum', 
  'yenilikler',
  'valorant',      // Oyun içi para birimi
  'vp',            // Valorant Points
  'hk',            // Hakkında (genelde alakasız)
  'csgo',          // Counter-Strike
  'steam',         // Steam wallet
  'riot',          // Riot Games
  'oyun',          // Genel oyun içeriği (opsiyonel)
  'hesap',         // Oyun hesabı
  'satış',         // Hesap satışı
  'takas'          // Takas
];
```

### Filtreleme Kodu:

Parse node'unda, başlık kontrolü kısmına şunu ekle:

```javascript
// Alakasız kelime kontrolü (genişletilmiş)
const titleLower = title.toLowerCase();

// Oyun içi para birimi kontrolü
if (titleLower.includes('vp') || 
    titleLower.includes('valorant') ||
    titleLower.includes('csgo') ||
    titleLower.includes('steam wallet') ||
    titleLower.includes('riot points')) {
  continue;
}

// Alakasız kelime kontrolü
if (irrelevantKeywords.some(keyword => titleLower.includes(keyword))) {
  continue;
}

// "hk" (hakkında) kontrolü - sadece "hk" ise atla
if (titleLower.trim() === 'hk' || titleLower.endsWith(' hk.')) {
  continue;
}
```

---

## 🛠️ n8n AI'ye Verilecek Prompt

```
Parse DonanımArsivi Data node'una ek filtreleme ekle:

1. Oyun içi para birimi içeren başlıkları filtrele:
   - "valorant", "vp", "csgo", "steam", "riot" gibi kelimeleri içeren başlıkları atla

2. "hk" (hakkında) kontrolü:
   - Sadece "hk" veya "... hk." ile biten başlıkları atla

3. Alakasız kelime listesini genişlet:
   - "valorant", "vp", "csgo", "steam", "riot", "oyun", "hesap", "satış", "takas" ekle

4. Filtreleme kodunu güncelle:
   - Oyun içi para birimi kontrolü ekle
   - "hk" kontrolü ekle
   - Alakasız kelime listesini genişlet

Lütfen bu filtrelemeleri ekle ve kodu güncelle.
```

---

## 📝 Güncellenmiş Filtreleme Kodu

Parse node'unda, başlık işleme kısmına şunu ekle:

```javascript
// Alakasız kelimeler (genişletilmiş)
const irrelevantKeywords = [
  'değişiklikler', 'güncellemeler', 'forum', 'yenilikler',
  'valorant', 'vp', 'csgo', 'steam', 'riot', 'oyun', 'hesap', 'satış', 'takas'
];

// ... (diğer kodlar)

// Filtreleme
const titleLower = title.toLowerCase();

// Oyun içi para birimi kontrolü
if (titleLower.includes('vp') || 
    titleLower.includes('valorant') ||
    titleLower.includes('csgo') ||
    titleLower.includes('steam') ||
    titleLower.includes('riot points')) {
  continue;
}

// "hk" kontrolü
if (titleLower.trim() === 'hk' || titleLower.endsWith(' hk.')) {
  continue;
}

// Alakasız kelime kontrolü
if (irrelevantKeywords.some(keyword => titleLower.includes(keyword))) {
  continue;
}
```

---

## ✅ Sonuç

Bu filtrelemeleri ekledikten sonra "Valorant 8.900 Vp hk." gibi başlıklar filtrelenecek ve sadece gerçek ürün fırsatları gelecek.

