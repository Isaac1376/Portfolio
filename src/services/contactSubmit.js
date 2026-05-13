import { CONTACT_EMAIL } from '../constants/profile';

/**
 * Sends mail straight to CONTACT_EMAIL via FormSubmit (no API keys).
 * @see https://formsubmit.co/ajax — first submission triggers a one-time activation email.
 */
export async function submitPortfolioMessage({ name, email, message }) {
  const address = encodeURIComponent(CONTACT_EMAIL.trim());
  const endpoint = `https://formsubmit.co/ajax/${address}`;

  const payload = {
    _subject: `Portfolio enquiry from ${name}`,
    _template: 'table',
    _captcha: false,
    _replyto: email.trim(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    return {
      ok: false,
      message:
        'Unexpected reply from mail service. If this keeps happening, use WhatsApp or email me directly.',
    };
  }

  const success =
    data &&
    (data.success === true ||
      data.success === 'true' ||
      (typeof data.message === 'string' && /thank you/i.test(data.message)));

  if (!res.ok || !success) {
    const msg =
      typeof data?.message === 'string'
        ? data.message
        : 'Could not send this message. Try WhatsApp or email.';
    return { ok: false, message: msg };
  }

  return { ok: true };
}
