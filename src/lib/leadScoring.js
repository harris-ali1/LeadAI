// Mock analysis used when no API key is provided.
// Mirrors the structure that callGemini returns so the UI is identical.

const urgentWords = ["today", "tomorrow", "this week", "friday", "asap", "urgent", "soon", "emergency", "tonight", "now"];
const immediateWords = ["today", "asap", "emergency", "now", "tonight", "right now"];
const bookingWords = ["book", "schedule", "appointment", "availability", "available", "slot"];
const pricingWords = ["price", "pricing", "cost", "how much", "quote", "estimate", "rate"];

// Same economics table the LLM uses — keep in sync.
const ECONOMICS = {
  "Med Spa": { avgTicket: 425, attachRate: 0.55 },
  "Dental Office": { avgTicket: 850, attachRate: 0.62 },
  "Tutoring Center": { avgTicket: 600, attachRate: 0.70 },
  "Home Services": { avgTicket: 480, attachRate: 0.68 },
  "Auto Repair": { avgTicket: 380, attachRate: 0.72 },
  "Fitness Studio": { avgTicket: 140, attachRate: 0.45 },
  "Law Office": { avgTicket: 2800, attachRate: 0.35 }
};

export function createMockLeadAnalysis({ businessType, name, message }) {
  const lower = (message || "").toLowerCase();
  const firstName = (name || "").split(" ")[0] || "there";

  const hasImmediate = immediateWords.some((w) => lower.includes(w)) || /[A-Z]{3,}/.test(message || "") || /\?{2,}/.test(message || "");
  const hasUrgency = hasImmediate || urgentWords.some((w) => lower.includes(w));
  const hasPricing = pricingWords.some((w) => lower.includes(w));
  const wantsBooking = bookingWords.some((w) => lower.includes(w));
  const hasFailure = /\b(broken|broke|leak|leaking|died|stopped working|not working|check engine|won't start|no heat|no ac|flood)\b/i.test(message || "");

  const leadScore = Math.min(
    98,
    50 +
      (hasImmediate ? 28 : hasUrgency ? 18 : 0) +
      (hasPricing ? 8 : 0) +
      (wantsBooking ? 14 : 0) +
      (hasFailure ? 12 : 0)
  );

  const recommendedAction = hasImmediate || hasFailure
    ? "reply_now"
    : hasUrgency || wantsBooking
    ? "reply_today"
    : leadScore >= 60
    ? "reply_this_week"
    : "reply_this_week";

  const service = detectService(message || "", businessType);
  const urgency = hasImmediate || hasFailure ? "Immediate" : hasUrgency ? "This week" : "Flexible";

  const reasoning = [];
  if (hasFailure) reasoning.push("Active problem detected — not research, customer needs help now");
  if (hasImmediate) reasoning.push("Time markers indicate same-day urgency");
  if (wantsBooking) reasoning.push("Booking language present — ready to schedule");
  if (hasPricing) reasoning.push("Asked about pricing — actively comparing options");
  if (service !== `${businessType} service`) reasoning.push(`Named specific service (${service}) — serious inquiry, not tire-kicker`);
  if (reasoning.length === 0) reasoning.push("Early-stage inquiry — limited urgency signal");

  // Identify missing info
  const missingInfo = [];
  if (!/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(message || "")) missingInfo.push("phone");
  if (!/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|morning|afternoon|evening|am|pm|\d{1,2}:\d{2})\b/i.test(message || "")) {
    missingInfo.push("preferred_time");
  }
  if (businessType === "Auto Repair" && !/\b(19|20)\d{2}\b/.test(message || "")) missingInfo.push("vehicle_year_make_model");
  if (businessType === "Home Services" && missingInfo.length < 2) missingInfo.push("service_address");

  // Transparent revenue math
  const econ = ECONOMICS[businessType] || { avgTicket: 400, attachRate: 0.5 };
  const confidence = leadScore / 100;
  const adjuster = 1 + econ.attachRate * 0.5;
  const revenueAtRisk = Math.round((econ.avgTicket * confidence * adjuster) / 10) * 10;

  const revenueCalc = [
    `Avg ticket for ${businessType}: $${econ.avgTicket}`,
    `Attach rate ${Math.round(econ.attachRate * 100)}% → adjuster ×${adjuster.toFixed(2)}`,
    `Lead confidence ${leadScore}% → ~$${revenueAtRisk}`
  ];

  // Specific follow-up action
  const followUpAction = buildSpecificFollowUp({
    firstName,
    service,
    businessType,
    missingInfo,
    recommendedAction
  });

  return {
    serviceRequested: service,
    leadPriority: recommendedAction === "reply_now" || recommendedAction === "reply_today" ? "High" : recommendedAction === "reply_this_week" ? "Medium" : "Low",
    recommendedAction,
    leadScore,
    intent: wantsBooking ? "Booking" : hasPricing ? "Pricing" : "General inquiry",
    urgency,
    customerSummary: buildSummary({ firstName, service, hasFailure, wantsBooking, hasPricing, businessType }),
    suggestedReply: buildReply({ firstName, service, wantsBooking, hasFailure, hasImmediate }),
    followUpAction,
    reasoning: reasoning.slice(0, 4),
    missingInfo,
    revenueAtRisk,
    revenueCalc
  };
}

function detectService(message, businessType) {
  const lower = message.toLowerCase();

  // Auto repair — try to extract vehicle
  if (businessType === "Auto Repair") {
    const vehicleMatch = message.match(/\b((?:19|20)\d{2})\s+([A-Z][a-z]+)\s+([A-Z][a-z]+)\b/);
    const vehicle = vehicleMatch ? `${vehicleMatch[1]} ${vehicleMatch[2]} ${vehicleMatch[3]}` : null;
    if (lower.includes("check engine")) return vehicle ? `Engine diagnostics on ${vehicle}` : "Engine diagnostics";
    if (lower.includes("brake")) return vehicle ? `Brake service on ${vehicle}` : "Brake service";
    if (lower.includes("oil")) return vehicle ? `Oil change on ${vehicle}` : "Oil change";
    if (lower.includes("tire")) return vehicle ? `Tire service on ${vehicle}` : "Tire service";
    if (vehicle) return `General diagnostics on ${vehicle}`;
  }

  if (lower.includes("botox")) return "Botox treatment";
  if (lower.includes("filler")) return "Dermal fillers";
  if (lower.includes("laser")) return "Laser hair removal";
  if (lower.includes("hydrafacial")) return "HydraFacial";
  if (lower.includes("whitening") || lower.includes("teeth")) return "Teeth whitening";
  if (lower.includes("crown")) return "Dental crown";
  if (lower.includes("algebra") || lower.includes("math")) return "Math tutoring";
  if (lower.includes("sat") || lower.includes("act")) return "Test prep tutoring";
  if (lower.includes("ac") || lower.includes("air conditioning")) return "AC repair";
  if (lower.includes("heat") || lower.includes("furnace")) return "Heating repair";
  if (lower.includes("leak") || lower.includes("plumb")) return "Plumbing — leak repair";

  return `${businessType} service`;
}

function buildSummary({ firstName, service, hasFailure, wantsBooking, hasPricing, businessType }) {
  if (hasFailure) {
    return `${firstName} has an active problem (${service.toLowerCase()}) and needs help now — not researching, has a real issue.`;
  }
  if (wantsBooking) {
    return `${firstName} is ready to book ${service.toLowerCase()}. Strong intent — reply fast with concrete time slots.`;
  }
  if (hasPricing) {
    return `${firstName} is price-shopping for ${service.toLowerCase()}. Likely comparing 2-3 providers — speed of reply matters.`;
  }
  return `${firstName} is asking about ${service.toLowerCase()}. Early-stage inquiry — a fast helpful reply moves them toward booking.`;
}

function buildReply({ firstName, service, wantsBooking, hasFailure, hasImmediate }) {
  if (hasImmediate && hasFailure) {
    return `${firstName} — got you. We can prioritize this today. I'll have someone reach out within the hour to confirm a window. What's the best number to text you on?`;
  }
  if (hasFailure) {
    return `Hi ${firstName}, sorry you're dealing with this. We can definitely help with ${service.toLowerCase()}. Want me to get you on the schedule for tomorrow or the next available slot — which works better?`;
  }
  if (wantsBooking) {
    return `Hi ${firstName}! Happy to get you scheduled for ${service.toLowerCase()}. We have openings this week — does morning or afternoon work better for you?`;
  }
  return `Hi ${firstName}! Thanks for reaching out about ${service.toLowerCase()}. Happy to walk you through details. What's the best number to reach you on?`;
}

function buildSpecificFollowUp({ firstName, service, businessType, missingInfo, recommendedAction }) {
  const asks = [];
  if (missingInfo.includes("phone")) asks.push("phone number");
  if (missingInfo.includes("preferred_time")) asks.push("preferred time");
  if (missingInfo.includes("vehicle_year_make_model")) asks.push("vehicle year/make/model");
  if (missingInfo.includes("service_address")) asks.push("service address");

  const askStr = asks.length
    ? `Collect: ${asks.slice(0, 2).join(" and ")}.`
    : "Confirm appointment details and send calendar invite.";

  const timing = recommendedAction === "reply_now"
    ? "Reply within 15 minutes — every minute risks losing this lead."
    : recommendedAction === "reply_today"
    ? "Reply today — ideally within 2 hours."
    : "Reply within 24 hours.";

  return `${timing} ${askStr}`;
}