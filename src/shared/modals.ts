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
