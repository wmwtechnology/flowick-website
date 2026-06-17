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
