import { navigate } from './router';

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
