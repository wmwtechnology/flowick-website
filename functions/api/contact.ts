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
