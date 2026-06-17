// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth scroll for nav buttons and phone icon
document.querySelectorAll('[data-scroll]').forEach((el) => {
  el.addEventListener('click', () => {
    const target = document.getElementById(el.dataset.scroll);
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (navLinks) navLinks.classList.remove('open');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const head = item.querySelector('.faq-item-head');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Blog search
const blogSearch = document.getElementById('blog-search');
if (blogSearch) {
  blogSearch.addEventListener('input', () => {
    const q = blogSearch.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.blog-card');
    const noResults = document.getElementById('blog-no-results');
    let visible = 0;
    cards.forEach((card) => {
      const text = (card.dataset.search || '').toLowerCase();
      const match = !q || text.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  });
}

// Policy modals helper
function initModal(overlayId, closeId, triggerClass) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  document.querySelectorAll('.' + triggerClass).forEach((el) => {
    el.addEventListener('click', () => overlay.classList.add('active'));
  });
  document.getElementById(closeId).addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}
initModal('kvkk-overlay', 'kvkk-close', 'kvkk-link');
initModal('gizlilik-overlay', 'gizlilik-close', 'gizlilik-link');
initModal('cerez-overlay', 'cerez-close', 'cerez-link');

// Belge (sertifika) modal
const belgeOverlay = document.getElementById('belge-overlay');
if (belgeOverlay) {
  const belgeImg = document.getElementById('belge-modal-img');
  document.querySelectorAll('.cert-img').forEach((el) => {
    el.addEventListener('click', () => {
      belgeImg.src = el.dataset.full;
      belgeOverlay.classList.add('active');
    });
  });
  document.getElementById('belge-close').addEventListener('click', () => belgeOverlay.classList.remove('active'));
  belgeOverlay.addEventListener('click', (e) => {
    if (e.target === belgeOverlay) belgeOverlay.classList.remove('active');
  });
}

const WORKER_URL = 'https://flowick-contact.developer-70b.workers.dev';

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = contactForm.querySelector('.form-status');
    const btn = contactForm.querySelector('.contact-submit');

    const data = Object.fromEntries(new FormData(contactForm).entries());

    btn.disabled = true;
    status.textContent = 'Gönderiliyor...';
    status.style.color = '';

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        status.textContent = 'Mesajınız alındı, en kısa sürede size dönüş yapacağız.';
        status.style.color = '#2ecc71';
        contactForm.reset();
      } else {
        status.textContent = json.error || 'Bir hata oluştu, lütfen tekrar deneyin.';
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
