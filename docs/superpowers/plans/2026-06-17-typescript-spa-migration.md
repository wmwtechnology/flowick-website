# TypeScript SPA Migrasyon Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flowick statik HTML sitesini Vite + TypeScript + Cloudflare Pages SPA'ya taşımak.

**Architecture:** Tek `index.html` shell (nav + footer + modals statik), `<main id="app">` router tarafından sayfalara göre doldurulur. History API tabanlı router, `data-link` ile link intercept yapar. Mevcut CSS dosyaları korunur, sadece import yöntemi değişir.

**Tech Stack:** Vite 6, TypeScript 5 (strict), Cloudflare Pages, Cloudflare Pages Functions, Resend (contact API), Vitest

---

## Dosya Haritası

**Oluşturulacak:**
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `vitest.config.ts`
- `wrangler.toml`
- `.gitignore` (güncelleme)
- `index.html` (yeni SPA shell)
- `src/main.ts`
- `src/styles.css`
- `src/router.ts`
- `src/header.ts`
- `src/forms.ts`
- `src/shared/accordion.ts`
- `src/shared/modals.ts`
- `src/content/blog-posts.ts`
- `src/pages/home.ts`
- `src/pages/blog.ts`
- `src/pages/blog-detail.ts`
- `src/pages/products.ts`
- `functions/api/contact.ts`
- `functions/tsconfig.json`
- `public/_redirects`

**Taşınacak:**
- `assets/` → `public/assets/`
- `css/*.css` → `public/css/*.css` (referanslar güncellenir)

**Silinecek:**
- `blog.html`, `blog-dijital-donusum.html`, `blog-dijitallesme-yonetim.html`, `blog-ik-departmani.html`, `urunler.html`
- Mevcut `index.html` (yeni shell ile değiştirilir)
- `js/script.js`

---

## Task 1: Proje Kurulumu

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `wrangler.toml`
- Modify: `.gitignore`

- [ ] **Step 1: package.json oluştur**

```json
{
  "name": "flowick-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "cf:dev": "npm run build && wrangler pages dev dist",
    "deploy": "wrangler pages deploy dist"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20260601.1",
    "@types/node": "^22.0.0",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.3",
    "vite": "^6.0.7",
    "vitest": "^2.1.9",
    "wrangler": "^4.101.0"
  }
}
```

- [ ] **Step 2: vite.config.ts oluştur**

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
});
```

- [ ] **Step 3: tsconfig.json oluştur**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "useDefineForClassFields": true,
    "resolveJsonModule": true,
    "noEmit": true
  },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 4: vitest.config.ts oluştur**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
```

- [ ] **Step 5: wrangler.toml oluştur**

```toml
name = "flowick-website"
pages_build_output_dir = "dist"
compatibility_date = "2026-06-01"
```

- [ ] **Step 6: .gitignore güncelle**

Dosyanın sonuna ekle:
```
dist/
node_modules/
.wrangler/
```

- [ ] **Step 7: Bağımlılıkları yükle**

```bash
cd ~/Desktop/flowick-website
npm install
```

Beklenen: `node_modules/` oluşur, hata yok.

- [ ] **Step 8: Commit**

```bash
git add package.json vite.config.ts tsconfig.json vitest.config.ts wrangler.toml .gitignore package-lock.json
git commit -m "feat: Vite + TypeScript + Cloudflare Pages proje kurulumu"
```

---

## Task 2: CSS ve Asset Migrasyonu

**Files:**
- Create: `public/css/` (css dosyaları taşınır)
- Create: `public/assets/` (assets taşınır)
- Create: `public/_redirects`
- Create: `src/styles.css`

- [ ] **Step 1: public/ klasörünü oluştur ve dosyaları taşı**

```bash
mkdir -p ~/Desktop/flowick-website/public/css
cp ~/Desktop/flowick-website/css/style.css ~/Desktop/flowick-website/public/css/
cp ~/Desktop/flowick-website/css/blog.css ~/Desktop/flowick-website/public/css/
cp ~/Desktop/flowick-website/css/blog-detail.css ~/Desktop/flowick-website/public/css/
cp ~/Desktop/flowick-website/css/blog.css ~/Desktop/flowick-website/public/css/
cp ~/Desktop/flowick-website/css/urunler.css ~/Desktop/flowick-website/public/css/
cp -r ~/Desktop/flowick-website/assets ~/Desktop/flowick-website/public/
```

- [ ] **Step 2: SPA _redirects dosyası oluştur**

`public/_redirects` içeriği:
```
/*  /index.html  200
```

- [ ] **Step 3: src/styles.css oluştur**

```css
@import '/css/style.css';
@import '/css/blog.css';
@import '/css/blog-detail.css';
@import '/css/urunler.css';
```

- [ ] **Step 4: Commit**

```bash
git add public/ src/styles.css
git commit -m "feat: CSS ve asset dosyaları public/ altına taşındı"
```

---

## Task 3: index.html SPA Shell

**Files:**
- Create: `index.html` (mevcut index.html'in yerini alır)

- [ ] **Step 1: Mevcut index.html'i yedekle**

```bash
cp ~/Desktop/flowick-website/index.html ~/Desktop/flowick-website/index.html.bak
```

- [ ] **Step 2: Yeni index.html yaz**

`index.html` içeriği aşağıdaki yapıda olacak. Nav HTML, footer HTML ve tüm modal HTML'ler mevcut `index.html.bak`'tan kopyalanır. `<main>` ve `<script>` değiştirilir:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flowick — İş Süreçleri Yönetim Yazılımı</title>
  <meta name="description" content="Flowick BPM ile iş süreçlerinizi tek platformdan yönetin.">
  <link rel="icon" type="image/svg+xml" href="/assets/logos/flowick-logo-nav.svg">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700|Poppins:400,500,600,700" rel="stylesheet">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
  <div class="navbar-inner">
    <img src="/assets/logos/flowick-logo-nav.svg" alt="Flowick Logo" data-link="/" style="cursor:pointer;">
    <button class="nav-toggle" aria-label="Menü"><i class="fa fa-bars"></i></button>
    <div class="nav-links">
      <button data-scroll="anasayfa">Ana Sayfa</button>
      <button data-scroll="referanslar">Referanslar</button>
      <button data-scroll="hakkimizda">Hakkımızda</button>
      <button data-scroll="hizmetlerimiz">Hizmetlerimiz</button>
      <button data-scroll="sss">S.S.S</button>
      <button data-link="/urunler">Ürünler</button>
      <button data-link="/blog">Blog</button>
      <div class="phone-icon" data-scroll="iletisim"><i class="fa fa-phone"></i></div>
    </div>
  </div>
</nav>

<!-- SAYFA İÇERİĞİ (router tarafından doldurulur) -->
<main id="app"></main>

<!-- FOOTER (tüm sayfalarda aynı, buraya kopyala: index.html.bak'taki .bottom-footer div'i) -->
<!-- index.html.bak'tan <div class="bottom-footer">...</div> bloğunu buraya yapıştır -->

<!-- MODALLAR (tüm sayfalarda erişilebilir) -->
<!-- index.html.bak'tan şu modal div'lerini kopyala: -->
<!-- #kvkk-overlay, #gizlilik-overlay, #cerez-overlay, #belge-overlay -->

<script type="module" src="/src/main.ts"></script>
</body>
</html>
```

Kopyalama adımları:
1. `index.html.bak`'tan `<div class="bottom-footer">...</div>` bloğunu footer yerine yapıştır
2. `index.html.bak`'tan `id="kvkk-overlay"`, `id="gizlilik-overlay"`, `id="cerez-overlay"`, `id="belge-overlay"` div'lerini modaller yerine yapıştır

- [ ] **Step 3: Asset URL'lerini güncelle**

index.html içindeki tüm `assets/` referanslarını `/assets/` olarak değiştir (başına `/` ekle):
```bash
sed -i '' 's|src="assets/|src="/assets/|g' ~/Desktop/flowick-website/index.html
sed -i '' 's|href="assets/|href="/assets/|g' ~/Desktop/flowick-website/index.html
```

- [ ] **Step 4: Commit**

```bash
git add index.html index.html.bak
git commit -m "feat: SPA index.html shell oluşturuldu"
```

---

## Task 4: Blog İçerikleri TypeScript'e Taşı

**Files:**
- Create: `src/content/blog-posts.ts`
- Create: `src/content/blog-posts.test.ts`

- [ ] **Step 1: Failing test yaz**

`src/content/blog-posts.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { findPostBySlug, blogPosts } from './blog-posts.ts';

describe('blog-posts', () => {
  it('findPostBySlug returns post for valid slug', () => {
    const post = findPostBySlug('dijital-donusum');
    expect(post).toBeDefined();
    expect(post?.slug).toBe('dijital-donusum');
  });

  it('findPostBySlug returns undefined for unknown slug', () => {
    const post = findPostBySlug('bilinmeyen-yazi');
    expect(post).toBeUndefined();
  });

  it('all posts have required fields', () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.image).toBeTruthy();
      expect(post.htmlBody).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Test'in fail ettiğini doğrula**

```bash
cd ~/Desktop/flowick-website && npm test
```

Beklenen: FAIL — `Cannot find module './blog-posts.ts'`

- [ ] **Step 3: src/content/blog-posts.ts oluştur**

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  likes: number;
  views: number;
  image: string;
  heroImage: string;
  searchText: string;
  htmlBody: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'dijital-donusum',
    title: 'Dijital dönüşüm sürecinde dikkat edilmesi gerekenler nelerdir?',
    subtitle: 'Dijital dönüşümün şirketin genel iş stratejisiyle uyumlu ve başarılı bir şekilde uygulanması sağlanabilir ve rekabetin çok yoğun yaşandığı pazarınızda ön plana çıkabilirsiniz.',
    date: '23/09/2024',
    author: 'Soner DURSUN',
    likes: 14,
    views: 23,
    image: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=768,h=602,f=auto,dpr=2,fit=cover/f1729760404572x883864780729843200/11.png',
    heroImage: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=1536,h=504,f=auto,dpr=2,fit=cover/f1729760404572x883864780729843200/11.png',
    searchText: 'Dijital dönüşüm sürecinde dikkat edilmesi gerekenler nelerdir? Dijital dönüşümün şirketin genel iş stratejisiyle uyumlu ve başarılı bir şekilde uygulanması sağlanabilir ve rekabetin çok yoğun yaşandığı pazarınızda ön plana çıkabilirsiniz.',
    htmlBody: `
      <h3>1- Net ve Stratejik Hedefler Belirlemek</h3>
      <p><strong>Dijital Dönüşümün Amacını Belirlemek:</strong> Şirketin dijital dönüşümden ne elde etmek istediği (örneğin, operasyonel verimlilik, müşteri deneyiminin iyileştirilmesi, yeni gelir kaynakları) net bir şekilde tanımlanmalıdır.</p>
      <p><strong>Stratejik Yol Haritası Oluşturmak:</strong> Bu hedeflere ulaşmak için kapsamlı bir stratejik plan oluşturulmalıdır. Bu plan, kısa ve uzun vadeli hedefleri kapsamalı ve esnek olmalıdır.</p>
      <h3>2- Üst Yönetimin Katılımı ve Desteği</h3>
      <p><strong>Liderlik Taahhüdü:</strong> Dijital dönüşüm projeleri, sadece IT bölümüyle sınırlı kalmamalı, şirketin üst yönetimi tarafından sahiplenilmelidir.</p>
      <p><strong>Kültürel Değişim:</strong> Dijital dönüşüm, teknolojik bir değişimden ziyade kültürel bir dönüşümü de gerektirir. Bu nedenle liderlerin, çalışanları yeni çalışma şekillerine adapte etmeye yönelik güçlü bir değişim yönetimi stratejisi geliştirmesi gerekir.</p>
      <h3>3- Çalışanların Eğitimi ve Katılımı</h3>
      <p><strong>Yetenek Geliştirme:</strong> Dijital dönüşüm için gerekli yeteneklerin şirkette bulunması kritik öneme sahiptir. Çalışanların bu yeni süreçlere adapte olabilmesi için gerekli eğitimler verilmelidir.</p>
      <p><strong>Katılım Teşviki:</strong> Çalışanların bu sürece katılımını sağlamak, onların fikirlerini ve geri bildirimlerini almak önemlidir. Bu, dönüşümün başarılı olması için kritik bir adımdır.</p>
      <h3>4- Doğru Teknolojilerin Seçimi</h3>
      <p><strong>Uygun Teknoloji Altyapısı:</strong> Şirketin mevcut ve gelecekteki ihtiyaçlarına uygun teknolojilerin seçilmesi gerekir. Yeni teknolojilere yatırım yapılmadan önce bunların şirkete sağlayacağı faydalar dikkatlice analiz edilmelidir.</p>
      <p><strong>Uyum ve Entegrasyon:</strong> Seçilen teknolojilerin mevcut sistemlerle uyumlu olması ve kolayca entegre edilebilmesi önemlidir.</p>
      <h3>5- Veri Güvenliği ve Gizliliği</h3>
      <p><strong>Siber Güvenlik:</strong> Dijital dönüşüm, beraberinde yeni güvenlik risklerini getirir. Bu nedenle, veri güvenliği ve siber saldırılara karşı önlemler alınmalıdır.</p>
      <p><strong>Yasal Uyumluluk:</strong> Veri yönetimi ve gizliliği konusunda yerel ve uluslararası düzenlemelere uygun hareket edilmelidir.</p>
      <h3>6- Müşteri Deneyimine Odaklanmak</h3>
      <p><strong>Müşteri Odaklı Yaklaşım:</strong> Dijital dönüşüm süreçlerinin merkezine müşteri deneyimi yerleştirilmelidir. Müşterilerin beklentilerini karşılamak ve onları aşmak, dönüşümün başarılı olmasının anahtarıdır.</p>
      <p><strong>Veri Analitiği:</strong> Müşteri davranışlarını ve ihtiyaçlarını daha iyi anlamak için veri analitiğinden yararlanılmalıdır.</p>
      <h3>7- Sürekli Değerlendirme ve İyileştirme</h3>
      <p><strong>KPI ve Metrikler Belirlemek:</strong> Dijital dönüşümün başarısını ölçmek için performans göstergeleri ve metrikler oluşturulmalı, süreç boyunca bu göstergeler yakından izlenmelidir.</p>
      <p><strong>Esneklik:</strong> Dijital dönüşüm süreci dinamik bir süreçtir. Bu nedenle, sürekli olarak değerlendirilip gerekli durumlarda stratejik planlar ve teknolojik yatırımlar güncellenmelidir.</p>
      <p>Bu unsurlar dikkate alındığında, dijital dönüşümün şirketin genel iş stratejisiyle uyumlu ve başarılı bir şekilde uygulanması sağlanabilir ve rekabetin çok yoğun yaşandığı pazarınızda ön plana çıkabilirsiniz.</p>
    `,
  },
  {
    slug: 'ik-departmani',
    title: 'Küçük İşletmelerin İnsan Kaynakları Departmanına İhtiyacı Var Mı?',
    subtitle: 'İnsan kaynakları (İK) departmanı genellikle büyük ölçekli şirketlerle ilişkilendirilir. Başlangıç aşamasındaki birçok startup için ise İK departmanı genellikle gereksiz bir lüks olarak değerlendirilebilir.',
    date: '24/09/2024',
    author: 'Soner DURSUN',
    likes: 20,
    views: 29,
    image: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=768,h=602,f=auto,dpr=2,fit=cover/f1729760354395x784114729721329200/4.png',
    heroImage: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=1536,h=504,f=auto,dpr=2,fit=cover/f1729760354395x784114729721329200/4.png',
    searchText: 'Küçük İşletmelerin İnsan Kaynakları Departmanına İhtiyacı Var Mı? İnsan kaynakları İK departmanı genellikle büyük ölçekli şirketlerle ilişkilendirilir. Başlangıç aşamasındaki birçok startup için ise İK departmanı genellikle gereksiz bir lüks olarak değerlendirilebilir.',
    htmlBody: `
      <p>İnsan kaynakları (İK) departmanı genellikle büyük ölçekli şirketlerle ilişkilendirilir. Başlangıç aşamasındaki birçok startup için ise İK departmanı genellikle gereksiz bir lüks olarak değerlendirilebilir. Gerçekten de, startupların %35'i İK departmanını tamamen göz ardı etmekte ve bu süreçleri ya mevcut çalışanlara ya da dış kaynaklara devretmektedir.</p>
      <p>Ancak, küçük işletmelerde İK'nın rolü, genellikle düşündüğümüzden çok daha önemlidir. İK departmanı işletme sahiplerinin yönetimsel yükünü hafifletmek ve stratejik büyümeye odaklanmalarını sağlamak açısından kritik bir rol oynar. Özellikle doğru bir teknolojiyle birleştiğinde İnsan Kaynakları ekibi, startupların zamanlarını koruyarak verimliliklerini en üst düzeye çıkarmalarına yardımcı olur. Aksi takdirde, işletmeler düşük çalışan memnuniyeti ve yüksek işten ayrılma oranları gibi olumsuz durumlarla karşılaşabilirler.</p>
      <p>Bu yazıda, İK'nın neden bu kadar önemli olduğunu, ne zaman bir İK yönetimine ihtiyaç duyacağınızı ve İK işlevlerini nasıl etkili bir şekilde yönetebileceğinizi keşfedeceksiniz.</p>
      <h3>İnsan Kaynakları Nedir?</h3>
      <p>İnsan kaynakları, bir organizasyonun en değerli varlıklarından biri olan çalışanların yönetimiyle ilgilenen bir işlevdir. İK'nın kapsamı geniş olup, işe alım ve bordro yönetimi gibi temel işlevlerin ötesinde, çalışan memnuniyeti, performans yönetimi, yasal uyumluluk ve stratejik büyüme gibi alanlarda da önemli rol oynar. Bu nedenle, etkili bir İK yönetimi, hem günlük operasyonları düzenler hem de işletmenin genel başarısına katkıda bulunur.</p>
      <h3>Ne Zaman İK Yönetimine İhtiyacınız Var?</h3>
      <p>Küçük bir işletmede, ilk başlarda İK işlevlerini doğrudan işletme sahibi veya yöneticiler üstlenebilir. Ancak, işletme büyüdükçe ve çalışan sayısı arttıkça, İK'nın profesyonel olarak yönetilmesi önem kazanmaya başlar. Peki bir İK yönetimine ihtiyacınız olduğunu anlayacağınız durumlar nelerdir?</p>
      <p><strong>Çalışan Sayısının Artışı:</strong> Çalışan sayısının belirli bir eşiği geçmesi, İK süreçlerinin daha sistematik ve organize bir şekilde yönetilmesini gerektirir. Daha büyük bir ekip, daha karmaşık İK görevlerini ve daha fazla yönetimsel gereksinimleri beraberinde getirir.</p>
      <p><strong>Stratejik Büyüme:</strong> Büyüme planınıza profesyonel İK desteğini dahil etmek, büyüme sürecini yönetmek, yeni pozisyonları oluşturmak ve şirketinizin dinamiğini optimize etmek için kritik önem taşır.</p>
      <h3>İK Yönetim Sistemlerinin Faydaları</h3>
      <p>Küçük işletmeler ve startuplar için, İK departmanının çoğu zaman bir öncelik olarak görülmediğinden bahsetmiştik. Ancak, İK yönetiminin tamamen göz ardı edilmesi, işletmenin başarısını sınırlayabilir. Bu durumda, etkili bir İK yönetimi sağlamak için alternatif çözümler mevcuttur. İK yönetim sistemleri yazılımları, bu ihtiyacı karşılamak için mükemmel bir seçenek sunar.</p>
      <p>Modern İK yazılımları, işe alım, bordro yönetimi, performans değerlendirmeleri ve çalışan bilgilerini merkezi bir şekilde yönetme gibi işlevleri dijitalleştirerek kolaylaştırır. Bu tür yazılımlar, işletmelere zaman tasarrufu sağlarken aynı zamanda verimliliklerini artırmalarına yardımcı olur. Ayrıca, İK verilerini analiz ederek stratejik kararlar alınmasına olanak tanır. Bu şekilde, İK yönetim sistemleri sayesinde şirketinizin başarısını artırabilir ve büyüme hedeflerinize ulaşabilirsiniz.</p>
    `,
  },
  {
    slug: 'dijitallesme-yonetim',
    title: '"İşinizi Teknolojiyle Hızlandırın" Dijitalleşmenin Yönetimdeki Kullanımları Nelerdir?',
    subtitle: 'Bir zamanlar ofiste dosyalar taşınırken, şimdi bulutta veriler uçuşuyor! Teknoloji hızla gelişirken, iş dünyası da bu hıza ayak uydurmakta. Peki, siz şirketinizi hala eski usullerle mi yönetiyorsunuz, yoksa dijital dünyanın avantajlarını işinize entegre ettiniz mi?',
    date: '01/11/2024',
    author: 'Soner DURSUN',
    likes: 0,
    views: 0,
    image: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=768,h=602,f=auto,dpr=2,fit=cover/f1730444440215x370076720890034900/7.png',
    heroImage: 'https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=1536,h=504,f=auto,dpr=2,fit=cover/f1730444440215x370076720890034900/7.png',
    searchText: 'İşinizi Teknolojiyle Hızlandırın Dijitalleşmenin Yönetimdeki Kullanımları Nelerdir? Bir zamanlar ofiste dosyalar taşınırken şimdi bulutta veriler uçuşuyor. Teknoloji hızla gelişirken iş dünyası da bu hıza ayak uydurmakta.',
    htmlBody: `
      <h3>Yönetim Yazılımları ile Dijitalleşmenin Temeli</h3>
      <p>İş dünyasında dijitalleşmenin ilk adımı, yönetim yazılımlarını devreye almak olabilir. Bu yazılımlar, iş süreçlerini daha kolay, hızlı ve verimli hale getiren dijital araçlardır. Finansal işlemlerden insan kaynaklarına, proje yönetiminden müşteri ilişkilerine kadar her alanda şirketlere büyük kolaylıklar sağlar. Yani, işinizin dijitalleşmesiyle sadece hız kazanmakla kalmazsınız; aynı zamanda karar alma süreçlerini optimize eder ve hata payını en aza indirirsiniz. Kısacası şirketinizi tek bir ekrandan rahatça yönetebilirsiniz.</p>
      <p>Peki bu yazılımlar size nasıl yardımcı olabilir?</p>
      <h3>1. Veri Analitiği</h3>
      <p>Eskiden iş kararları büyük ölçüde içgüdüyle alınırdı. Tabii ki tecrübeler değerlidir ama elimizde artık veri varken neden sadece hislere güvenelim? Yönetim yazılımları, işinizle ilgili tüm verileri toplar ve analiz eder. Bu sayede müşteri davranışlarından finansal performansa kadar her konuda somut verilere dayanarak stratejik kararlar alabilirsiniz.</p>
      <p>Örneğin, bir CRM yazılımı ile müşteri ilişkilerinizi daha iyi yönetebilir, müşteri davranışlarını izleyebilir ve ihtiyaçlarına göre kampanyalarınızı düzenleyip geliştirebilirsiniz. Veri analitiği sayesinde sadece neyin çalıştığını değil, neyin daha iyi çalışabileceğini de fark edersiniz.</p>
      <h3>2. Otomasyon</h3>
      <p>Otomasyon, sürekli tekrar eden, zaman tüketen işlerinizi devralır ve siz de daha yaratıcı işlere odaklanırsınız. Örneğin ERP sistemleri, otomasyonun en iyi örneklerinden biridir. Finansal işlemler, stok takibi, bordro gibi tekrar eden süreçleri otomatikleştirerek hem zaman kazandırır hem de hata oranını minimize eder. Bu yazılımlar, işin en zor kısımlarını hallederken size stratejik düşünme fırsatı verir. Zamanınızı daha verimli kullanarak şirketinizi yönetebilirsiniz.</p>
      <h3>3. Uzaktan Çalışma ve Esneklik</h3>
      <p>Son yıllarda uzaktan çalışmanın iş dünyasında ne kadar önem kazandığını hepimiz gördük. İş süreçlerinizi uzaktan da verimli bir şekilde yönetmenin sırrı, bu yazılımları kullanmaktan geçiyor. Proje yönetim araçları ve işbirliği platformları, ekiplerinizin dünyanın dört bir tarafından iş birliği yapabilmesini sağlar.</p>
      <p>Örneğin, proje yönetim yazılımları, ekip üyelerinizin iş takibini, görev dağılımını ve teslim tarihlerini kolayca yönetmenizi sağlar. Bu sayede ekipler nerede olursa olsun, verimli bir şekilde çalışabilirler. Üstelik tüm bu süreçleri tek bir dijital platform üzerinden yönetebilir, karmaşık iş akışlarını çok daha düzenli hale getirebilirsiniz.</p>
      <h3>4. Dijitalleşirken Güvende Kalmak</h3>
      <p>Dijitalleşmenin avantajları saymakla bitmez, ancak beraberinde getirdiği en büyük riski de unutmamak gerekiyor: Siber güvenlik. Özellikle bulut tabanlı yazılımlar ve uzaktan çalışma gibi dijital çözümler kullanıyorsanız, verilerinizin korunması büyük önem taşıyor. Siber saldırılar, sadece büyük şirketlerin değil, her ölçekten işletmenin başına gelebilecek tehditlerdir.</p>
      <p>Ancak, siber güvenlik yazılımları ve güvenlik yönetim sistemleri ile işletmenizi koruma altına almak oldukça kolay. Bu yazılımlar, verilerinizi şifreleyerek, tehditleri tespit ederek ve veri ihlallerine karşı savunma sağlayarak güvenliğinizi artırır. İş süreçleriniz ne kadar dijitalleşirse dijitalleşsin, güvenlik çözümleri sayesinde her şey kontrol altında kalır.</p>
      <h3>Sonuç</h3>
      <p>Dijitalleşme ve teknoloji, iş dünyasında eski usulleri geride bırakmanın vaktinin geldiğini gösteriyor. Yönetim yazılımları ile iş süreçlerinizi dijitalleştirerek hız kazanabilir, verimliliğinizi artırabilir ve daha güvenli bir işletme yönetimi sağlayabilirsiniz. Eskiden 3 kişilik bir ekibin yaptığı işi, artık bir yazılım ve tek bir çalışanla halledebilirsiniz. Böylece maliyetlerinizi düşürürken, şirketinizin büyüme potansiyelini maksimize edebilirsiniz. Yazılımlar sayesinde yalnızca daha hızlı kararlar almakla kalmaz, aynı zamanda daha az hatayla, daha etkili stratejiler geliştirirsiniz.</p>
      <p>Geleceğe hazır olmak, bugünden dijitalleşmekle başlar! Siz de dijital dönüşümle işinizi büyütmeye hazır mısınız?</p>
    `,
  },
];

export function findPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Test'lerin geçtiğini doğrula**

```bash
npm test
```

Beklenen: 3 test PASS

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: blog yazıları TypeScript içerik dosyasına taşındı"
```

---

## Task 5: Router

**Files:**
- Create: `src/router.ts`
- Create: `src/router.test.ts`

- [ ] **Step 1: Failing test yaz**

`src/router.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { matchRoute } from './router.ts';

describe('matchRoute', () => {
  it('matches root path', () => {
    const result = matchRoute('/', '/');
    expect(result).toEqual({});
  });

  it('matches blog listing', () => {
    const result = matchRoute('/blog', '/blog');
    expect(result).toEqual({});
  });

  it('matches blog detail with slug', () => {
    const result = matchRoute('/blog/:slug', '/blog/dijital-donusum');
    expect(result).toEqual({ slug: 'dijital-donusum' });
  });

  it('returns null for non-matching route', () => {
    const result = matchRoute('/blog/:slug', '/urunler');
    expect(result).toBeNull();
  });

  it('matches urunler', () => {
    const result = matchRoute('/urunler', '/urunler');
    expect(result).toEqual({});
  });
});
```

- [ ] **Step 2: Test'in fail ettiğini doğrula**

```bash
npm test
```

Beklenen: FAIL — `Cannot find module './router.ts'`

- [ ] **Step 3: src/router.ts oluştur**

```typescript
type PageRenderer = (params: Record<string, string>) => void;

interface Route {
  pattern: string;
  render: PageRenderer;
}

const routes: Route[] = [];
let appContainer: HTMLElement;

export function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const v = pathParts[i];
    if (p !== undefined && p.startsWith(':')) {
      params[p.slice(1)] = v ?? '';
    } else if (p !== v) {
      return null;
    }
  }
  return params;
}

export function addRoute(pattern: string, render: PageRenderer): void {
  routes.push({ pattern, render });
}

export function navigate(path: string): void {
  history.pushState(null, '', path);
  dispatch();
}

export function initRouter(container: HTMLElement): void {
  appContainer = container;
  window.addEventListener('popstate', dispatch);
  document.addEventListener('click', interceptLinks);
  dispatch();
}

function dispatch(): void {
  const path = window.location.pathname;
  for (const route of routes) {
    const params = matchRoute(route.pattern, path);
    if (params !== null) {
      route.render(params);
      window.scrollTo(0, 0);
      return;
    }
  }
  navigate('/');
}

function interceptLinks(e: MouseEvent): void {
  const el = (e.target as Element).closest('[data-link]');
  if (!el) return;
  e.preventDefault();
  const href = el.getAttribute('data-link') ?? '/';
  navigate(href);
}

export function getContainer(): HTMLElement {
  return appContainer;
}
```

- [ ] **Step 4: Testlerin geçtiğini doğrula**

```bash
npm test
```

Beklenen: 8 test PASS (5 router + 3 blog-posts)

- [ ] **Step 5: Commit**

```bash
git add src/router.ts src/router.test.ts
git commit -m "feat: SPA router eklendi, testler geçiyor"
```

---

## Task 6: Header Modülü

**Files:**
- Create: `src/header.ts`

- [ ] **Step 1: src/header.ts oluştur**

```typescript
import { navigate } from './router.ts';

export function initHeader(): void {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((el) => {
    el.addEventListener('click', () => {
      const sectionId = el.dataset.scroll ?? '';
      navLinks?.classList.remove('open');

      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    });
  });
}

export function updateActiveNav(path: string): void {
  document.querySelectorAll('.nav-links [data-link]').forEach((el) => {
    const href = el.getAttribute('data-link') ?? '';
    el.classList.toggle('active', href === path);
  });
}

function scrollToSection(sectionId: string): void {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const navbar = document.querySelector<HTMLElement>('.navbar');
  const offset = navbar?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/header.ts
git commit -m "feat: header modülü eklendi"
```

---

## Task 7: Shared Modüller (Accordion + Modals)

**Files:**
- Create: `src/shared/accordion.ts`
- Create: `src/shared/modals.ts`

- [ ] **Step 1: src/shared/accordion.ts oluştur**

```typescript
export function initAccordion(): void {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const head = item.querySelector('.faq-item-head');
    head?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
```

- [ ] **Step 2: src/shared/modals.ts oluştur**

```typescript
function initModal(overlayId: string, closeId: string, triggerClass: string): void {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  const closeBtn = document.getElementById(closeId);

  document.querySelectorAll(`.${triggerClass}`).forEach((el) => {
    el.addEventListener('click', () => overlay.classList.add('active'));
  });

  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

export function initPolicyModals(): void {
  initModal('kvkk-overlay', 'kvkk-close', 'kvkk-link');
  initModal('gizlilik-overlay', 'gizlilik-close', 'gizlilik-link');
  initModal('cerez-overlay', 'cerez-close', 'cerez-link');
}

export function initCertModal(): void {
  const overlay = document.getElementById('belge-overlay');
  if (!overlay) return;
  const img = document.getElementById('belge-modal-img') as HTMLImageElement | null;

  document.querySelectorAll<HTMLElement>('.cert-img').forEach((el) => {
    el.addEventListener('click', () => {
      if (img) img.src = el.dataset.full ?? '';
      overlay.classList.add('active');
    });
  });

  document.getElementById('belge-close')?.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/
git commit -m "feat: accordion ve modal shared modülleri eklendi"
```

---

## Task 8: Ana Sayfa (Home)

**Files:**
- Create: `src/pages/home.ts`

- [ ] **Step 1: src/pages/home.ts oluştur**

`index.html.bak`'tan `<section class="hero"` ile başlayıp `<div class="contact-section"` ve içeriğiyle biten bloğu `homeHTML()` fonksiyonundaki template literal'e kopyala. `src` ve `href` içindeki `assets/` referanslarını `/assets/` olarak güncelle.

```typescript
import { initAccordion } from '../shared/accordion.ts';
import { initCertModal } from '../shared/modals.ts';
import { initContactForm } from '../forms.ts';
import { getContainer } from '../router.ts';

export function renderHome(_params: Record<string, string>): void {
  const container = getContainer();
  container.innerHTML = homeHTML();
  initAccordion();
  initCertModal();
  initContactForm();
}

function homeHTML(): string {
  return `
    <!-- index.html.bak'tan <section class="hero"...> ile başlayan ve
         contact-section'ın kapanış </div>'ına kadar olan tüm HTML buraya gelir.
         assets/ → /assets/ olarak değiştir. -->
  `;
}
```

**Kopyalama adımı:** `index.html.bak` içindeki satır 34'ten (`<section class="hero"`) satır 292'ye (`</div>` - contact-section kapanışı) kadar olan HTML'i `homeHTML()` return değerine yapıştır. Tüm `assets/` → `/assets/` olarak değiştir.

- [ ] **Step 2: Commit**

```bash
git add src/pages/home.ts
git commit -m "feat: ana sayfa modülü eklendi"
```

---

## Task 9: Blog Listesi Sayfası

**Files:**
- Create: `src/pages/blog.ts`

- [ ] **Step 1: src/pages/blog.ts oluştur**

```typescript
import { blogPosts } from '../content/blog-posts.ts';
import { navigate } from '../router.ts';
import { getContainer } from '../router.ts';

export function renderBlog(_params: Record<string, string>): void {
  const container = getContainer();
  container.innerHTML = blogHTML();
  initBlogSearch();
  initBlogCardClicks();
}

function blogHTML(): string {
  const cards = blogPosts
    .map(
      (post) => `
    <div class="blog-card" data-slug="${post.slug}" data-search="${post.searchText}" style="background-image:url('${post.image}')">
      <div class="blog-card-overlay"></div>
      <div class="blog-card-body">
        <h2 class="blog-card-title">${post.title}</h2>
        <p class="blog-card-desc">${post.subtitle}</p>
      </div>
      <div class="blog-card-footer">
        <div class="blog-stat"><i class="fa fa-heart-o"></i><span>${post.likes}</span></div>
        <div class="blog-stat"><i class="fa fa-eye"></i><span>${post.views}</span></div>
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="blog-page">
      <div class="blog-header">
        <h1>Blog</h1>
        <div class="blog-search-wrap">
          <i class="fa fa-search"></i>
          <input type="text" id="blog-search" placeholder="Blog yazılarında ara...">
        </div>
      </div>
      <div class="blog-grid">
        ${cards}
        <p class="blog-no-results" id="blog-no-results" style="display:none;">Aramanızla eşleşen yazı bulunamadı.</p>
      </div>
    </div>
  `;
}

function initBlogSearch(): void {
  const input = document.getElementById('blog-search') as HTMLInputElement | null;
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll<HTMLElement>('.blog-card');
    const noResults = document.getElementById('blog-no-results');
    let visible = 0;

    cards.forEach((card) => {
      const text = (card.dataset.search ?? '').toLowerCase();
      const match = !q || text.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  });
}

function initBlogCardClicks(): void {
  document.querySelectorAll<HTMLElement>('.blog-card[data-slug]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      if (slug) navigate(`/blog/${slug}`);
    });
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog.ts
git commit -m "feat: blog listesi sayfası eklendi"
```

---

## Task 10: Blog Detay Sayfası

**Files:**
- Create: `src/pages/blog-detail.ts`

- [ ] **Step 1: src/pages/blog-detail.ts oluştur**

```typescript
import { findPostBySlug } from '../content/blog-posts.ts';
import { navigate } from '../router.ts';
import { getContainer } from '../router.ts';

export function renderBlogDetail(params: Record<string, string>): void {
  const container = getContainer();
  const slug = params['slug'] ?? '';
  const post = findPostBySlug(slug);

  if (!post) {
    navigate('/blog');
    return;
  }

  container.innerHTML = `
    <div class="blog-detail-page">
      <div class="blog-detail-hero">
        <img src="${post.heroImage}" alt="${post.title}">
      </div>

      <div class="blog-detail-meta-bar">
        <div class="blog-detail-stats">
          <div class="blog-detail-stat"><i class="fa fa-heart"></i><span>${post.likes}</span></div>
          <div class="blog-detail-stat"><i class="fa fa-eye"></i><span>${post.views}</span></div>
        </div>
        <div class="blog-detail-info">
          <span>Yayınlanma Tarihi: ${post.date}</span>
          <span>Yazar: ${post.author}</span>
        </div>
      </div>

      <div class="blog-detail-wrap">
        <a class="blog-detail-back" data-link="/blog" style="cursor:pointer;">
          <i class="fa fa-chevron-left"></i> Blog'a Dön
        </a>
        <h1 class="blog-detail-title">${post.title}</h1>
        <h2 class="blog-detail-subtitle">${post.subtitle}</h2>
        <div class="blog-detail-body">${post.htmlBody}</div>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog-detail.ts
git commit -m "feat: blog detay sayfası eklendi"
```

---

## Task 11: Ürünler Sayfası

**Files:**
- Create: `src/pages/products.ts`

- [ ] **Step 1: src/pages/products.ts oluştur**

```typescript
import { getContainer } from '../router.ts';

export function renderProducts(_params: Record<string, string>): void {
  const container = getContainer();
  container.innerHTML = productsHTML();
}

function productsHTML(): string {
  return `
    <main class="urunler-main">
      <div class="urunler-grid">
        <div class="urun-card" style="--card-color:rgb(117,81,204)"><span class="urun-title">İnsan Kaynakları</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726842181525x160716340913672260/I%CC%87k.png" alt="İnsan Kaynakları"></div></div>
        <div class="urun-card" style="--card-color:rgb(53,90,130)"><span class="urun-title">İntranet</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726842305288x254459779780866530/intranet.png" alt="İntranet"></div></div>
        <div class="urun-card" style="--card-color:rgb(0,155,87)"><span class="urun-title">Organizasyon Yönetimi</span><div class="urun-img-area"></div></div>
        <div class="urun-card" style="--card-color:rgb(17,142,147)"><span class="urun-title">Avans Masraf Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726842426368x913354909867041500/avans.png" alt="Avans Masraf Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(254,1,100)"><span class="urun-title">Görev Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726842928415x428400179107342850/go%CC%88rev.png" alt="Görev Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(255,164,0)"><span class="urun-title">Ürün Envanter Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726843557727x184695161413056960/123.png" alt="Ürün Envanter Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(40,44,59)"><span class="urun-title">Stok Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726843608699x612525448963883200/stok.png" alt="Stok Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(53,90,130)"><span class="urun-title">Müşteri İlişkileri Modülü</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726847288540x132834987848240430/mu%CC%88steri%20ilis%CC%A7kileri.png" alt="Müşteri İlişkileri Modülü"></div></div>
        <div class="urun-card" style="--card-color:rgb(0,155,87)"><span class="urun-title">PDKS</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726847378671x585922964073878500/pdks.png" alt="PDKS"></div></div>
        <div class="urun-card" style="--card-color:rgb(117,81,204)"><span class="urun-title">Puantaj ve Hakedişler</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726847438106x731217862828900600/puantaj.png" alt="Puantaj ve Hakedişler"></div></div>
        <div class="urun-card" style="--card-color:rgb(17,142,147)"><span class="urun-title">Proje Yönetimi</span><div class="urun-img-area"></div></div>
        <div class="urun-card" style="--card-color:rgb(254,1,100)"><span class="urun-title">Hedef Yönetimi</span><div class="urun-img-area"></div></div>
        <div class="urun-card" style="--card-color:rgb(255,164,0)"><span class="urun-title">Satın Alma Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726847894361x678469571100974300/sat%C4%B1n%20alma.png" alt="Satın Alma Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(40,44,59)"><span class="urun-title">Üretim Yönetimi</span><div class="urun-img-area"></div></div>
        <div class="urun-card" style="--card-color:rgb(53,90,130)"><span class="urun-title">Kalite ve Kontrol Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848157734x840823358687591600/kky.png" alt="Kalite ve Kontrol Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(0,155,87)"><span class="urun-title">Doküman Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848203049x704470532565305600/dokuman.png" alt="Doküman Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(117,81,204)"><span class="urun-title">Malzeme ve Tedarik Planlama</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848256101x634920448258216200/malzeme.png" alt="Malzeme ve Tedarik Planlama"></div></div>
        <div class="urun-card" style="--card-color:rgb(17,142,147)"><span class="urun-title">Finans Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848295482x525205914215798100/finans.png" alt="Finans Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(254,1,100)"><span class="urun-title">Değerlendirme Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848342196x417694136248973700/deg%CC%86erlendirme.png" alt="Değerlendirme Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(255,164,0)"><span class="urun-title">Hatırlatma Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848386926x727532213056162800/hat%C4%B1rlatma.png" alt="Hatırlatma Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(40,44,59)"><span class="urun-title">Eğitim Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1726848432821x317068176833665860/eg%CC%86itim.png" alt="Eğitim Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(17,142,147)"><span class="urun-title">QR Menü</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1727074029947x512364608791415760/qr.png" alt="QR Menü"></div></div>
        <div class="urun-card" style="--card-color:rgb(40,44,59)"><span class="urun-title">Lojistik Yönetimi</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1727074094399x313917318927121150/lojis.png" alt="Lojistik Yönetimi"></div></div>
        <div class="urun-card" style="--card-color:rgb(0,155,87)"><span class="urun-title">Ayarlar</span><div class="urun-img-area"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=260,h=260,f=auto,dpr=1.5,fit=contain/f1727074254935x387041898680735600/intranet.png" alt="Ayarlar"></div></div>
      </div>
    </main>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/products.ts
git commit -m "feat: ürünler sayfası eklendi"
```

---

## Task 12: İletişim Formu Modülü

**Files:**
- Create: `src/forms.ts`

- [ ] **Step 1: src/forms.ts oluştur**

```typescript
export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector<HTMLElement>('.form-status');
    const btn = form.querySelector<HTMLButtonElement>('.contact-submit');
    if (!status || !btn) return;

    const data = Object.fromEntries(new FormData(form).entries());

    btn.disabled = true;
    status.textContent = 'Gönderiliyor...';
    status.style.color = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && json.success) {
        status.textContent = 'Mesajınız alındı, en kısa sürede size dönüş yapacağız.';
        status.style.color = '#2ecc71';
        form.reset();
      } else {
        status.textContent = json.error ?? 'Bir hata oluştu, lütfen tekrar deneyin.';
        status.style.color = '#e74c3c';
      }
    } catch {
      status.textContent = 'Bağlantı hatası, lütfen tekrar deneyin.';
      status.style.color = '#e74c3c';
    } finally {
      btn.disabled = false;
    }
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/forms.ts
git commit -m "feat: iletişim formu /api/contact endpoint'ine bağlandı"
```

---

## Task 13: Main Entry Point

**Files:**
- Create: `src/main.ts`

- [ ] **Step 1: src/main.ts oluştur**

```typescript
import './styles.css';
import { initRouter, addRoute } from './router.ts';
import { initHeader, updateActiveNav } from './header.ts';
import { initPolicyModals } from './shared/modals.ts';
import { renderHome } from './pages/home.ts';
import { renderBlog } from './pages/blog.ts';
import { renderBlogDetail } from './pages/blog-detail.ts';
import { renderProducts } from './pages/products.ts';

function wrapWithNav(renderer: (params: Record<string, string>) => void, path: string) {
  return (params: Record<string, string>) => {
    renderer(params);
    updateActiveNav(path);
  };
}

const app = document.getElementById('app');
if (!app) throw new Error('#app elementi bulunamadı');

addRoute('/', wrapWithNav(renderHome, '/'));
addRoute('/urunler', wrapWithNav(renderProducts, '/urunler'));
addRoute('/blog', wrapWithNav(renderBlog, '/blog'));
addRoute('/blog/:slug', wrapWithNav(renderBlogDetail, '/blog'));

initHeader();
initPolicyModals();
initRouter(app);
```

- [ ] **Step 2: Tüm testlerin geçtiğini doğrula**

```bash
npm test
```

Beklenen: 8 test PASS

- [ ] **Step 3: Commit**

```bash
git add src/main.ts
git commit -m "feat: main.ts entry point, router ve tüm sayfalar bağlandı"
```

---

## Task 14: Cloudflare Pages Function (Contact API)

**Files:**
- Create: `functions/api/contact.ts`
- Create: `functions/tsconfig.json`

- [ ] **Step 1: functions/tsconfig.json oluştur**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020"],
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "noEmit": true
  },
  "include": ["**/*.ts"]
}
```

- [ ] **Step 2: functions/api/contact.ts oluştur**

Mevcut `~/Desktop/flowick-contact-worker/src/index.js` içindeki mantığı TypeScript'e dönüştür:

```typescript
interface Env {
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
}

interface ContactBody {
  ad?: string;
  soyad?: string;
  telefon?: string;
  eposta?: string;
  urun?: string;
  konu?: string;
  mesaj?: string;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  let body: ContactBody;
  try {
    body = await ctx.request.json<ContactBody>();
  } catch {
    return Response.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  const { ad, soyad, telefon, eposta, urun, konu, mesaj } = body;

  if (!ad || !eposta) {
    return Response.json({ error: 'Ad ve e-posta zorunludur.' }, { status: 400 });
  }

  const emailHtml = `
    <h2>Flowick.com İletişim Formu</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;width:140px;">Ad Soyad</td><td style="padding:8px;">${ad} ${soyad ?? ''}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold;">E-Posta</td><td style="padding:8px;"><a href="mailto:${eposta}">${eposta}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Telefon</td><td style="padding:8px;">${telefon ?? '-'}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold;">İlgilenilen Ürün</td><td style="padding:8px;">${urun ?? '-'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Konu</td><td style="padding:8px;">${konu ?? '-'}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold;">Mesaj</td><td style="padding:8px;">${mesaj ?? '-'}</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ctx.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: ctx.env.FROM_EMAIL,
      to: [ctx.env.TO_EMAIL],
      reply_to: eposta,
      subject: `Flowick İletişim: ${konu ?? `${ad} ${soyad ?? ''}`}`,
      html: emailHtml,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: 'Mail gönderilemedi, lütfen tekrar deneyin.' }, { status: 500 });
  }

  return Response.json({ success: true });
};
```

- [ ] **Step 3: tsconfig.json'a functions'ı ekle (type check için)**

`tsconfig.json`'daki `"include"` dizisine `"functions"` ekleme (opsiyonel — functions kendi tsconfig'ini kullanıyor).

- [ ] **Step 4: Commit**

```bash
git add functions/
git commit -m "feat: Cloudflare Pages Function olarak contact API eklendi"
```

---

## Task 15: Build Doğrulama

**Files:** Mevcut dosyalar test edilir

- [ ] **Step 1: TypeScript tip kontrolü**

```bash
cd ~/Desktop/flowick-website && npm run build
```

Beklenen: Hata yok, `dist/` klasörü oluştu.

Hata varsa: Tip hatalarını düzelt, tekrar çalıştır.

- [ ] **Step 2: Local preview**

```bash
npm run preview
```

Tarayıcıda `http://localhost:4173` aç ve şunları test et:
- Ana sayfa yükleniyor mu?
- Ürünler sayfası (`/urunler`) açılıyor mu?
- Blog listesi (`/blog`) açılıyor mu?
- Blog detayı (`/blog/dijital-donusum`) açılıyor mu?
- Sayfa yenilendiğinde (`F5`) 404 almıyor mu? (`_redirects` çalışıyor mu?)
- Navbar scroll linkleri ana sayfada çalışıyor mu?

- [ ] **Step 3: Eski HTML dosyalarını sil**

```bash
rm ~/Desktop/flowick-website/blog.html
rm ~/Desktop/flowick-website/blog-dijital-donusum.html
rm ~/Desktop/flowick-website/blog-dijitallesme-yonetim.html
rm ~/Desktop/flowick-website/blog-ik-departmani.html
rm ~/Desktop/flowick-website/urunler.html
rm ~/Desktop/flowick-website/index.html.bak
rm -rf ~/Desktop/flowick-website/js/
rm -rf ~/Desktop/flowick-website/css/
rm -rf ~/Desktop/flowick-website/assets/
```

- [ ] **Step 4: Son build**

```bash
npm run build
```

Beklenen: `dist/` temiz çıktı, hata yok.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: eski HTML/CSS/JS dosyaları kaldırıldı, SPA migrasyonu tamamlandı"
```

---

## Task 16: Cloudflare Pages Deployment

**Ön koşul:** Cloudflare hesabınızda Pages açık olmalı.

- [ ] **Step 1: GitHub repo'ya push et**

```bash
git push origin master
```

- [ ] **Step 2: Cloudflare Pages'de yeni proje oluştur**

1. dash.cloudflare.com → Workers & Pages → Pages → Create a project
2. "Connect to Git" → GitHub hesabını bağla
3. `flowick-website` repo'sunu seç
4. Build settings:
   - Framework: None
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: `20`
5. "Save and Deploy"

- [ ] **Step 3: Environment variable ekle**

Pages projesinde → Settings → Environment variables:
- `RESEND_API_KEY` = Resend API key (Production)
- `TO_EMAIL` = `developer@flowick.com` (Production)
- `FROM_EMAIL` = `noreply@flowick.com` (Production)

- [ ] **Step 4: Custom domain ekle**

Pages projesinde → Custom domains → `flowick.com` ekle.
Cloudflare DNS zaten ayarlı olduğu için otomatik CNAME oluşturulur.

- [ ] **Step 5: Deployment'ı doğrula**

`https://flowick.com`'u aç ve şunları test et:
- Ana sayfa görünüyor
- `/blog` çalışıyor
- `/urunler` çalışıyor
- Blog detay açılıyor
- İletişim formu mail gönderiyor (`developer@flowick.com` kontrol et)

- [ ] **Step 6: Eski Worker'ı devre dışı bırak (opsiyonel)**

Contact formu artık Pages Function üzerinden çalıştığı için ayrı Worker artık gerekmez:
```bash
cd ~/Desktop/flowick-contact-worker
wrangler delete flowick-contact
```

---

## Notlar

- Task 8 (Home sayfası) en kritik adımdır: `index.html.bak`'tan HTML kopyalanırken tüm `assets/` → `/assets/` değişikliğinin yapıldığından emin ol.
- `wrapWithNav` fonksiyonu router tarafından çağrılan her render sonrası aktif navbar linkini günceller.
- Blog detay sayfasında `data-link="/blog"` ile geri butonu router intercept'i kullanır, `<a href>` yerine.
- Cloudflare Pages Functions, `functions/api/contact.ts` dosyasını otomatik olarak `/api/contact` endpoint'i olarak expose eder.
