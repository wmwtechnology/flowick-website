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

// Contact form (static site - no backend, shows confirmation message)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = contactForm.querySelector('.form-status');
    status.textContent = 'Mesajınız alındı, en kısa sürede size dönüş yapacağız.';
    contactForm.reset();
  });
}
