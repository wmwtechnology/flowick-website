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
