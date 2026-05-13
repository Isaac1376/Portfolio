/** Public profile identifiers (safe to bundle). */
export const GITHUB_USERNAME = 'Isaac1376';
/** GitHub serves avatar at this URL (redirects to avatars CDN). */
export const GITHUB_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png?size=400`;
export const WHATSAPP_PHONE_E164 = '917358404880'; // India, no +
/** Inbox for the contact form (FormSubmit posts here). */
export const CONTACT_EMAIL = 'dhivagar1376@gmail.com';
export function getWhatsAppChatUrl(prefillMessage = '') {
  const base = `https://wa.me/${WHATSAPP_PHONE_E164}`;
  if (!prefillMessage.trim()) return base;
  return `${base}?text=${encodeURIComponent(prefillMessage)}`;
}
