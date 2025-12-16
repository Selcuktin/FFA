# XenForo Forum Regex Düzeltme

## 🔍 HTML Yapısı

Forum XenForo kullanıyor (`data-xf="2.3"`). Başlık linklerinin gerçek yapısını görmem gerekiyor.

## 📋 İhtiyacım Olan

Parse node'unun INPUT'undan HTML'in **başlık linklerinin olduğu kısmını** kopyala. Örneğin:

```html
<a href="/konu/urun-adi-12345/" class="...">Başlık Metni</a>
```

veya

```html
<div class="...">
  <a href="/konu/..." class="...">Başlık</a>
</div>
```

---

## 🛠️ Geçici Çözüm: Genel XenForo Pattern

XenForo forumlarında genellikle başlık linkleri şu şekilde olur:

### Pattern 1: /konu/ içeren linkler
```javascript
const topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
```

### Pattern 2: data-topic-id attribute'u varsa
```javascript
const topicRegex = /<a[^>]*data-topic-id="[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
```

### Pattern 3: js-topicList-title class'ı
```javascript
const topicRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
```

---

## 🔧 n8n AI'ye Verilecek Güncellenmiş Prompt

```
Parse DonanımArsivi Data node'um çalışmıyor. Forum XenForo kullanıyor (data-xf="2.3").

Lütfen şu regex pattern'lerini dene (sırayla):

1. /konu/ içeren linkler:
   const topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;

2. js-topicList-title class'ı:
   const topicRegex = /<a[^>]*class="[^"]*js-topicList-title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

3. data-topic-id attribute'u:
   const topicRegex = /<a[^>]*data-topic-id="[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

4. Genel forum link pattern:
   const topicRegex = /<a[^>]*href="(\/konu\/[^"]+)"[^>]*class="[^"]*"[^>]*>([^<]+)<\/a>/gi;

Her pattern'i sırayla dene, hangisi match bulursa onu kullan.

Debug için:
- Her pattern için match sayısını log'la
- İlk bulunan match'i log'la
- HTML sample'ı log'la (ilk 2000 karakter)

Eğer hiçbiri çalışmazsa, INPUT'taki HTML'in başlık linklerinin olduğu kısmını log'la.
```

---

## 📝 Sonraki Adım

1. Parse node'unun INPUT'undan HTML'in **başlık linklerinin olduğu kısmını** kopyala (örnek: birkaç başlık linkinin HTML'i)
2. Bu HTML'i n8n AI'ye veya bana gönder
3. Gerçek yapıya göre regex'i düzeltelim

**Örnek:** INPUT'tan şöyle bir kısım kopyala:
```html
<a href="/konu/urun-adi-12345/" class="js-topicList-title">Başlık Metni</a>
```

Bu HTML'i paylaş, regex'i buna göre düzelteyim.

