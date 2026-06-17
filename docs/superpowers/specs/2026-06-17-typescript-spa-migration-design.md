# Flowick Website — TypeScript SPA Migrasyonu

**Tarih:** 2026-06-17  
**Durum:** Onaylandı

## Özet

Mevcut statik HTML/CSS/JS sitesi, WMW website ile aynı stack'e taşınıyor:
- Vite + TypeScript (strict)
- Cloudflare Pages (GitHub Pages'den geçiş)
- SPA mimarisi (history API router)
- Cloudflare Pages Functions (contact form, ayrı Worker kaldırılır)
- Mevcut CSS dosyaları korunur (Tailwind yok)

---

## Proje Yapısı

```
flowick-website/
├── src/
│   ├── main.ts
│   ├── router.ts
│   ├── header.ts
│   ├── forms.ts
│   ├── pages/
│   │   ├── home.ts
│   │   ├── blog.ts
│   │   ├── blog-detail.ts
│   │   └── products.ts
│   ├── shared/
│   │   ├── modals.ts
│   │   └── accordion.ts
│   ├── content/
│   │   └── blog-posts.ts
│   └── styles.css
├── functions/
│   ├── api/
│   │   └── contact.ts
│   └── tsconfig.json
├── public/
│   ├── assets/         — görseller buraya taşınır
│   └── _redirects      — SPA routing için
├── index.html
├── vite.config.ts
├── tsconfig.json
├── wrangler.toml
└── package.json
```

---

## Router & Sayfalar

History API tabanlı, hash yok.

| Route | Modül |
|-------|-------|
| `/` | `pages/home.ts` |
| `/urunler` | `pages/products.ts` |
| `/blog` | `pages/blog.ts` |
| `/blog/dijital-donusum` | `pages/blog-detail.ts` |
| `/blog/dijitallesme-yonetim` | `pages/blog-detail.ts` |
| `/blog/ik-departmani` | `pages/blog-detail.ts` |

- Navbar linkleri `history.pushState` ile yönlendirir
- Router URL'e göre `<main>` elementini render eder
- `popstate` event ile geri/ileri buton desteği
- Blog içerikleri `src/content/blog-posts.ts` içinde TypeScript objeleri olarak tutulur

---

## TypeScript Modülleri

| Modül | Sorumluluk |
|-------|------------|
| `main.ts` | Router ve header'ı başlatır |
| `router.ts` | URL → page eşlemesi, link intercept |
| `header.ts` | Navbar toggle, smooth scroll, aktif link |
| `forms.ts` | Form verisi, fetch → `/api/contact`, UI feedback |
| `shared/modals.ts` | KVKK, gizlilik, çerez modalleri |
| `shared/accordion.ts` | FAQ accordion |
| `pages/home.ts` | Ana sayfa init |
| `pages/blog.ts` | Blog listesi, arama filtresi |
| `pages/blog-detail.ts` | Slug → içerik render |
| `pages/products.ts` | Ürünler sayfası init |
| `functions/api/contact.ts` | Resend ile mail gönderimi (Pages Function) |

TypeScript ayarları WMW ile aynı: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`.

---

## Deployment

**GitHub Pages → Cloudflare Pages geçişi:**

```toml
# wrangler.toml
name = "flowick-website"
pages_build_output_dir = "dist"
compatibility_date = "2026-06-01"
```

- Cloudflare Pages, GitHub repo'ya bağlanır
- Her `master` push'unda otomatik build + deploy
- Build komutu: `npm run build`, output: `dist/`
- `RESEND_API_KEY` Cloudflare Pages environment variables paneline girilir
- Ayrı `flowick-contact-worker` projesi artık kullanılmaz

**SPA Routing:**
```
# public/_redirects
/*  /index.html  200
```

---

## Kaldırılanlar

- `blog-dijital-donusum.html`, `blog-dijitallesme-yonetim.html`, `blog-ik-departmani.html` — içerik `content/blog-posts.ts`'e taşınır
- `blog.html`, `urunler.html` — router ile yönetilir
- Ayrı `flowick-contact-worker/` projesi — `functions/api/contact.ts` olarak bu repoya taşınır
