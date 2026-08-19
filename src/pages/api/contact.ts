import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const safeName = escapeHtml(String(name).trim().slice(0, 100));
    const safeEmail = escapeHtml(String(email).trim().slice(0, 200));
    const safeMessage = escapeHtml(String(message).trim().slice(0, 5000));

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@bryanfung.tech>',
      to: ['bryanfung61@gmail.com'],
      replyTo: safeEmail,
      subject: `New Portfolio Message from ${safeName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>New Message from ${safeName}</h2>
          <p><strong>Sender Email:</strong> ${safeEmail}</p>
          <hr style="border: 1px solid #e2e8f0; margin: 15px 0;" />
          <p style="white-space: pre-wrap; font-size: 15px;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
};