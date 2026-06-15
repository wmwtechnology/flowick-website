# Flowick BPM - Web Sitesi

Bu klasör, Flowick BPM ana sayfasının statik HTML/CSS/JS kopyasını içerir ve GitHub Pages üzerinden yayınlanmaya hazırdır.

## Klasör Yapısı

```
flowick-website/
├── index.html      # Ana sayfa
├── css/
│   └── style.css   # Tüm stiller
├── js/
│   └── script.js   # Mobil menü, FAQ akordeon, iletişim formu
└── assets/
    ├── certificates/  # ISO/sertifika görselleri
    ├── logos/         # Flowick logo (SVG, nav/about/footer)
    └── images/        # Hero, kart, haber, partner ve uygulama görselleri
```

Tüm görseller Bubble.io CDN'den indirilip `assets/` klasörüne yerleştirildi ve sıkıştırıldı (toplam ~10.9MB → ~3.9MB); site artık Bubble'a bağımlı değil.

## GitHub Pages ile Yayınlama

1. Bu klasörün içeriğini bir GitHub deposuna yükleyin (örn. `flowick-website` reposu).
2. Repo ayarlarında **Settings > Pages** sekmesine gidin.
3. **Source** olarak `main` branch ve `/ (root)` klasörünü seçin, kaydedin.
4. Birkaç dakika içinde site `https://<kullanici-adi>.github.io/<repo-adi>/` adresinde yayında olacaktır.

## Yerel Önizleme

`index.html` dosyasını doğrudan tarayıcıda açarak önizleyebilirsiniz, ya da basit bir sunucu ile çalıştırabilirsiniz:

```
npx serve .
```

## Düzenlenebilir Alanlar

- İletişim formu (`.contact-form`) şu an statik — gönderildiğinde sadece bir onay mesajı gösterir (`js/script.js`). Gerçek e-posta gönderimi için bir form servisi (Formspree, Getform vb.) veya kendi backend'inizi entegre etmeniz gerekir.
- S.S.S. (FAQ) bölümündeki cevaplar genel içerik olarak eklenmiştir, isteğe göre güncellenebilir.
- Sosyal medya ve mağaza linkleri (`#`) gerçek adreslerle değiştirilmelidir.
