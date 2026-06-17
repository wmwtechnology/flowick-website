import { initAccordion } from '../shared/accordion';
import { initCertModal } from '../shared/modals';
import { initContactForm } from '../forms';
import { getContainer } from '../router';

export function renderHome(_params: Record<string, string>): void {
  const container = getContainer();
  container.innerHTML = homeHTML();
  initAccordion();
  initCertModal();
  initContactForm();
}

function homeHTML(): string {
  return `
    <section class="hero" id="anasayfa">
  <div class="hero-inner">
    <div class="hero-text">
      <h1>İş Akışlarınızı Dönüştürün</h1>
      <h2>Geleceği Şimdi Yaşayın!</h2>
      <p>Yazılımımız, iş süreçlerinin stratejik hedeflere uygunluğunu izlemek ve değerlendirmek için güçlü analitik ve raporlama araçları sunar. Bu, yöneticilere iş süreçlerini daha etkin bir şekilde yönetme ve stratejik kararlar alma yeteneği sağlar.</p>
      <div class="hero-cta">
        <button class="plus-btn"><i class="fa fa-plus"></i></button>
        <span class="label">Bize Ulaşın</span>
      </div>
    </div>
    <img class="hero-image" src="/assets/images/hero.png" alt="">
  </div>

  <!-- LOGOS CAROUSEL -->
  <div class="logos-section" id="referanslar">
    <div class="logos-track">
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438456469x381837753681226300/ateco-industries-logo.png" alt="Ateco Industries"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/f1725438466147x408420037730634000/Bubble_Logo_no_code.svg.png" alt="Bubble"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438473778x496879454284380600/kentmeydani-logo.png" alt="Kent Meydanı"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438483672x707866493375712800/logo.png" alt="Evona"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438493849x446773333381409900/logo_black%402x.png" alt="Zapier"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438504853x255537479629709400/METROPOL%20SHIPPING%20LOGO-1.png" alt="Metropol Shipping"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438513553x111451249811334020/yavrupatilerlogo-1.png" alt="Yavru Patiler"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438551899x918359054952491600/https___e0c771e7ae3bd68159a239fb345fe0e3.cdn.bubble.io_f1722426808612x933120373654326300_akerosgb-logo-kopya.png" alt="Aker OSGB"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1727102337473x813747243679567600/paytr-removebg-preview.png" alt="PayTR"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1727102351558x757180717231174000/paratika-removebg.png" alt="Paratika"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1734046302263x402341241169523760/ARENA-BILGISAYAR-A.S.png" alt="Arena Bilgisayar A.Ş."></div>
      <!-- duplicate set for seamless loop -->
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438456469x381837753681226300/ateco-industries-logo.png" alt="Ateco Industries"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/f1725438466147x408420037730634000/Bubble_Logo_no_code.svg.png" alt="Bubble"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438473778x496879454284380600/kentmeydani-logo.png" alt="Kent Meydanı"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438483672x707866493375712800/logo.png" alt="Evona"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438493849x446773333381409900/logo_black%402x.png" alt="Zapier"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438504853x255537479629709400/METROPOL%20SHIPPING%20LOGO-1.png" alt="Metropol Shipping"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438513553x111451249811334020/yavrupatilerlogo-1.png" alt="Yavru Patiler"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1725438551899x918359054952491600/https___e0c771e7ae3bd68159a239fb345fe0e3.cdn.bubble.io_f1722426808612x933120373654326300_akerosgb-logo-kopya.png" alt="Aker OSGB"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1727102337473x813747243679567600/paytr-removebg-preview.png" alt="PayTR"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1727102351558x757180717231174000/paratika-removebg.png" alt="Paratika"></div>
      <div class="logo-card"><img src="https://26727d055105d42392958b58441c0398.cdn.bubble.io/cdn-cgi/image/w=256,h=179,f=auto,dpr=2,fit=contain/f1734046302263x402341241169523760/ARENA-BILGISAYAR-A.S.png" alt="Arena Bilgisayar A.Ş."></div>
    </div>
  </div>

  <!-- APP PROMO -->
  <div class="app-promo">
    <div class="app-promo-text">
      <p class="title-orange">Flowick BPM Sen Neredeysen,</p>
      <p class="title-dark">Hemen Yanı Başında!</p>
      <div class="app-promo-sub">
        <p>Uygulamayı kullanmaya başlamak için hemen indir!</p>
        <div class="down-icon"><i class="fa fa-angle-double-down"></i></div>
      </div>
      <div class="store-buttons">
        <a class="store-btn" href="https://play.google.com/store/apps/details?id=com.mycompany.flowickbpm" target="_blank" rel="noopener">
          <img src="/assets/images/google-play.png" alt="">
          <span>GOOGLE PLAY</span>
        </a>
        <a class="store-btn" href="https://apps.apple.com/us/app/flowick-bpm/id6736679156" target="_blank" rel="noopener">
          <i class="fa fa-apple"></i>
          <span>APP STORE</span>
        </a>
      </div>
    </div>
    <img class="app-promo-image" src="/assets/images/app-promo.png" alt="">
  </div>

  <!-- ABOUT -->
  <div class="about-section" id="hakkimizda">
    <img class="about-logo" src="/assets/logos/flowick-logo-about.svg" alt="Flowick Logo">
    <div class="about-text">
      <h2>Biz Kimiz?</h2>
      <p>Biz, iş dünyasının zorluklarına çözüm sunan bir teknoloji şirketiyiz. Süreçlerinizi optimize ederek işinizi dönüştürmek için en yeni teknolojileri ve yenilikçi çözümleri bir araya getiriyoruz. Çalışanlarımızın farklı bakış açıları ve uzmanlıklarıyla bir araya gelerek, yaratıcı çözümler üretiyoruz. Müşteri odaklı yaklaşımımızla, iş akışlarınızı etkin bir şekilde yönetmenize ve rekabet avantajı elde etmenize yardımcı oluyoruz. İşinizi bir adım öteye taşımak, verimliliği artırmak ve başarıyı garantilemek için bizimle birlikte ileriye yol alın.</p>
    </div>
  </div>

  <!-- FEATURE CARDS -->
  <div class="feature-cards">
    <div class="feature-card"><i class="fa fa-check"></i><span>Müşteri Memnuniyeti</span></div>
    <div class="feature-card"><i class="fa fa-lock"></i><span>Maksimum Güvenlik</span></div>
    <div class="feature-card"><i class="fa fa-group"></i><span>24 Farklı Sektör</span></div>
    <div class="feature-card"><i class="fa fa-puzzle-piece"></i><span>Esneklik ve Uyum</span></div>
  </div>

  <!-- WHY TECH -->
  <div class="why-tech">
    <img class="why-tech-bg" src="/assets/images/why-tech-bg.png" alt="">
    <div class="why-tech-inner">
      <div class="why-tech-heading">
        <h2>Daha Çok Teknoloji İçin Sıra Sizde !</h2>
        <p>Sektörün öncü firmaları, kurumlarının ihtiyaçlarına göre özelleştirilen Flowick BPM'i kullanarak insan kaynağını teknolojiyle güçlendiriyor.</p>
      </div>
      <div class="why-tech-cards">
        <div class="why-tech-card card-security">
          <h3>Güvenlik</h3>
          <p>Şirketimiz, endüstri standartlarına uygun güvenlik protokollerini benimser ve çeşitli yöntemler kullanarak verilerin güvenliğini sağlar. Ayrıca, yetkilendirme seviyeleri ve erişim kontrolleri, sadece yetkili kullanıcıların belirli süreçlere erişebilmesini sağlayarak veri güvenliğini artırır.</p>
        </div>
        <div class="why-tech-card card-efficiency">
          <h3>Verimliliği Artırma</h3>
          <p>FlowickBPM, iş süreçlerini analiz, optimize ve otomatize ederek verimliliği artırır. Gelişmiş iş akışları ve süreç otomasyonu, tekrarlayan görevleri azaltır ve insan hatalarını en aza indirir.</p>
        </div>
        <div class="why-tech-card card-flexibility">
          <h3>Hızlı Uyum ve Esneklik</h3>
          <p>İş dünyası sürekli değişiyor ve FlowickBPM, şirketlerin hızlı bir şekilde değişen koşullara uyum sağlamasını kolaylaştırır. Esnek iş süreçleri ve otomatizasyon, şirketlerin pazar değişikliklerine ve müşteri taleplerine daha hızlı yanıt vermesine olanak tanır.</p>
        </div>
        <div class="why-tech-card card-strategy">
          <h3>Stratejik Yönetim</h3>
          <p>Yazılımımız, iş süreçlerinin stratejik hedeflere uygunluğunu izlemek ve değerlendirmek için güçlü analitik ve raporlama araçları sunar. Bu, yöneticilere iş süreçlerini daha etkin bir şekilde yönetme ve stratejik kararlar alma yeteneği sağlar.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- TRACK SECTION -->
  <div class="track-section" id="hizmetlerimiz">
    <div class="track-inner">
      <img class="track-image" src="/assets/images/track.svg" alt="">
      <div class="track-text">
        <h2>İşlerinizi, Flowick BPM ile Tek Ekrandan Takip Edin!</h2>
        <p>Yenilikçi yazılım ürünümüz, iş süreçlerinizi maksimum verimlilikle yönetmenizi sağlayan kapsamlı bir çözüm sunuyor. Tüm görevleri ve süreçleri tek bir kullanıcı dostu ekran üzerinden takip edebilme özelliği, iş akışlarınızı kolaylıkla yönetmenize olanak tanır. Hem mobil hem web platformları üzerinden erişilebilir olması, ekiplerinizin her an her yerden etkileşimde bulunmasını sağlar.. Bu yenilikçi çözüm, iş akışlarınızı yönetirken zamandan ve kaynaklardan tasarruf etmenize yardımcı olacak, iş süreçlerinizi daha etkili ve yönetilebilir hale getirecek bir araçtır.</p>
      </div>
    </div>
  </div>

  <!-- STATS -->
  <div class="stats-section">
    <div class="stat-card">
      <p class="stat-number" style="color:rgb(255,127,63);">%64</p>
      <p class="stat-title">Verimlilik Artışı</p>
      <hr>
      <p class="stat-desc">Harita bazlı rut planlama ile %64 verimlilik artışı</p>
    </div>
    <div class="stat-card">
      <p class="stat-number" style="color:rgb(37,85,249);">%97</p>
      <p class="stat-title">Zaman Tasarrufu</p>
      <hr>
      <p class="stat-desc">Web tabanlı dijital arşiv ile verilere erişimde lokasyon özgürlüğü ve %97 zaman kazancı.</p>
    </div>
    <div class="stat-card">
      <p class="stat-number" style="color:rgb(255,90,242);">%82</p>
      <p class="stat-title">Hata Azalışı</p>
      <hr>
      <p class="stat-desc">QR kodlu iş yönetimi sayesinde %82 hata azalışı</p>
    </div>
    <div class="stat-card">
      <p class="stat-number" style="color:rgb(99,234,238);">%32</p>
      <p class="stat-title">İş Yükünde Azalma</p>
      <hr>
      <p class="stat-desc">Tüm işlemlerin mobil uygulamada da yürütülebilmesi ile operasyonel iş yükünde %32 azalış.</p>
    </div>
    <div class="stat-card">
      <p class="stat-number" style="color:rgb(250,38,51);">%35</p>
      <p class="stat-title">Stratejik Karar</p>
      <hr>
      <p class="stat-desc">İndeks yönetimi yapısı sayesinde stratejik karar alış hızında %35 artış</p>
    </div>
  </div>

  <!-- FAQ -->
  <div class="faq-section" id="sss">
    <div class="faq-heading"><h2>Sıkça Sorulan Sorular</h2></div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-item-head">
          <span>FlowickBPM Nedir ve Nasıl Çalışır?</span>
          <button><i class="fa fa-plus-circle"></i></button>
        </div>
        <p class="faq-answer">FlowickBPM, iş süreçlerinizi planlama, takip ve raporlama adımlarıyla uçtan uca yönetmenizi sağlayan bulut tabanlı bir iş akışı (BPM) yazılımıdır. Web ve mobil üzerinden erişilebilir.</p>
      </div>
      <div class="faq-item">
        <div class="faq-item-head">
          <span>Neden FlowickBPM Yazılımına İhtiyaç Duyarım?</span>
          <button><i class="fa fa-plus-circle"></i></button>
        </div>
        <p class="faq-answer">Manuel ve dağınık süreçleri tek bir platformda toplayarak verimliliği artırır, hata oranını azaltır ve yönetime gerçek zamanlı görünürlük sağlar.</p>
      </div>
      <div class="faq-item">
        <div class="faq-item-head">
          <span>Hangi İş Süreçleri FlowickBPM ile Yönetilebilir?</span>
          <button><i class="fa fa-plus-circle"></i></button>
        </div>
        <p class="faq-answer">İnsan kaynakları, satın alma, stok ve envanter, proje, görev, müşteri ilişkileri, üretim, kalite kontrol, doküman, finans ve lojistik gibi birçok süreç FlowickBPM modülleriyle yönetilebilir.</p>
      </div>
      <div class="faq-item">
        <div class="faq-item-head">
          <span>FlowickBPM Yazılımı Nasıl Kurulur ve Entegre Edilir?</span>
          <button><i class="fa fa-plus-circle"></i></button>
        </div>
        <p class="faq-answer">Kurulum gerektirmeyen bulut tabanlı bir çözümdür; ekibimiz ihtiyaçlarınıza göre kurulum ve entegrasyon sürecinde size eşlik eder.</p>
      </div>
      <div class="faq-item">
        <div class="faq-item-head">
          <span>Ne Tür Güvenlik Özelliklerine Sahiptir?</span>
          <button><i class="fa fa-plus-circle"></i></button>
        </div>
        <p class="faq-answer">Yetkilendirme seviyeleri, erişim kontrolleri ve endüstri standartlarına uygun güvenlik protokolleri ile verileriniz korunur.</p>
      </div>
    </div>
  </div>

  <!-- CONTACT (orange) -->
  <div class="contact-section" id="iletisim">
    <div class="floating-wpp">
      <a class="floating-wpp-button" href="https://wa.me/905494357255" target="_blank" rel="noopener" aria-label="WhatsApp">
        <i class="fa fa-whatsapp"></i>
      </a>
    </div>
    <svg class="wave wave-top" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
      <path opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
      <path opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"></path>
      <path d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
    </svg>
    <div class="contact-inner">
      <img class="contact-image" src="/assets/images/contact.png" alt="">
      <form class="contact-form-wrap contact-form">
        <h2>İletişim</h2>
        <div class="contact-row">
          <input type="text" name="ad" placeholder="Ad" required>
          <input type="text" name="soyad" placeholder="Soyad" required>
          <input type="tel" name="telefon" placeholder="Telefon">
          <input type="email" name="eposta" placeholder="E-Posta" required>
          <select name="urun">
            <option selected disabled>Ürün Seçiniz</option>
            <option>Organizasyon Yönetimi</option>
            <option>İnsan Kaynakları Yönetimi</option>
            <option>Avans Masraf Yönetimi</option>
            <option>Görev Yönetimi</option>
            <option>Ürün ve Envanter Yönetimi</option>
            <option>Stok Yönetimi</option>
            <option>Müşteri İlişkileri Yönetimi</option>
            <option>PDKS</option>
            <option>Puantaj ve Hakedişler</option>
            <option>Proje Yönetimi</option>
            <option>Hedef Yönetimi</option>
            <option>Satın Alma Yönetimi</option>
            <option>Üretim Yönetimi</option>
            <option>Kalite Kontrol Yönetimi</option>
            <option>Malzeme Tedarik Planlama</option>
            <option>Finans Yönetimi</option>
            <option>Değerlendirme Yönetimi</option>
            <option>Hatırlatma Yönetimi</option>
            <option>Eğitim Yönetimi</option>
            <option>Lojistik Yönetimi</option>
            <option>İntranet</option>
          </select>
        </div>
        <input class="contact-konu" type="text" name="konu" placeholder="Konu Başlığı">
        <textarea name="mesaj" placeholder="Mesaj"></textarea>
        <label class="contact-checkbox">
          <input type="checkbox" required>
          <span>Aydınlatma Metni kapsamında kimlik ve iletişim verilerimin Flowick Teknoloji Hizmetleri Anonim Şirketi tarafından hizmetlerinin tanıtımı, etkinlik ve haberlere ilişkin bilgilendirmelerin yapılması amacıyla işlenmesini ve bununla sınırlı olarak hizmet alınan üçüncü taraflar ile paylaşılmasını ve e-posta adresime reklam, tanıtım ve bilgilendirme vb. ticari elektronik ileti gönderilmesini kabul ediyorum.</span>
        </label>
        <div class="contact-submit-row">
          <button type="submit" class="contact-submit">Gönder</button>
        </div>
        <div class="form-status"></div>
      </form>
    </div>
  </div>


</section>

  `;
}
