export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Initialize Upstash Redis client using strictly import.meta.env
const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

// Configure Rate Limiter: Max 3 submissions per IP address every 1 hour
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'ratelimit:contact',
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // 1. Identify client IP for rate limiting
  const ip =
    clientAddress ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // 2. Perform rate limit check before processing the request body
  const { success, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Too many contact form submissions. Please try again later.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Reset': reset.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  }

  // 3. Process email submission
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, data, remaining }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};