// Build real deep links so channel buttons actually do something useful.
// Each function returns null when it can't produce a usable link, so the
// UI can disable the button gracefully (e.g. WhatsApp without a phone).

const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

export function extractPhone(contact) {
  if (!contact) return null;
  const match = String(contact).match(PHONE_RE);
  if (!match) return null;
  // Strip everything but digits and a leading +.
  const raw = match[1];
  const digits = raw.replace(/[^\d+]/g, "");
  return digits.length >= 10 ? digits : null;
}

export function extractEmail(contact) {
  if (!contact) return null;
  const match = String(contact).match(EMAIL_RE);
  return match ? match[0] : null;
}

export function buildEmailLink({ contact, subject, body }) {
  const email = extractEmail(contact);
  if (!email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // mailto: uses + for space in some clients, but URLSearchParams uses %20 — both work.
  return `mailto:${email}?${params.toString()}`;
}

export function buildSmsLink({ contact, body }) {
  const phone = extractPhone(contact);
  if (!phone) return null;
  // iOS uses &body=, Android uses ?body=. The ?body= form works on both.
  const encoded = encodeURIComponent(body || "");
  return `sms:${phone}?body=${encoded}`;
}

export function buildWhatsAppLink({ contact, body }) {
  const phone = extractPhone(contact);
  if (!phone) return null;
  // wa.me requires the number with no + and no spaces.
  const digits = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(body || "");
  return `https://wa.me/${digits}?text=${encoded}`;
}

// Friendly human label for a missing-info field.
export const MISSING_INFO_LABELS = {
  phone: "Phone number",
  preferred_time: "Preferred time",
  vehicle_year_make_model: "Vehicle (year/make/model)",
  service_address: "Service address",
  insurance: "Insurance info",
  budget: "Budget",
  specific_concern: "Specific concern",
  preferred_contact_method: "Preferred contact method"
};

// Map recommendedAction to display copy.
export const ACTION_DISPLAY = {
  reply_now: { label: "Reply now", helper: "Within 15 minutes", tone: "urgent" },
  reply_today: { label: "Reply today", helper: "Within 2 hours", tone: "high" },
  reply_this_week: { label: "Reply this week", helper: "Within 24-48 hours", tone: "medium" },
  archive: { label: "Archive", helper: "Spam or irrelevant", tone: "low" }
};