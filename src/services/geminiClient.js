// Direct Gemini 2.5 Flash call from the browser.
// The API key is entered by the visitor at the top of the page and held in memory only.
// This keeps cost on the visitor for the demo and avoids a backend.

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Per-vertical voice + reply patterns. Real businesses talk differently.
// This is the single biggest quality lever in the whole product.
const VERTICAL_VOICE = {
  "Med Spa":
    "Warm, polished, confidence-building. Use first names. Reference 'consultations' not 'appointments' for new clients. Never quote firm prices over message — invite them in for a quick consult instead. Subtle, never pushy.",
  "Dental Office":
    "Calm, professional, reassuring. Many leads are anxious. Acknowledge timelines (weddings, photos, events) when mentioned. Mention insurance is welcome when relevant. Offer 2 concrete time slots.",
  "Tutoring Center":
    "Encouraging, parent-friendly. Reference the student by name when given. Acknowledge the exam/deadline pressure. Mention a free assessment session. Use the parent's name in the reply.",
  "Home Services":
    "Direct, action-oriented, time-aware. If urgent (no AC, no heat, leak), promise a callback window in minutes, not hours. Mention the service area and ETA. Skip pleasantries when the customer is stressed.",
  "Auto Repair":
    "Honest, no-jargon, transparent. Acknowledge the inconvenience of a car being down. Offer a diagnostic time and a ride/loaner if relevant. Never quote a final price sight-unseen.",
  "Fitness Studio":
    "Energetic but not cringe. Invite to a free intro class. Reference their goal if stated (weight loss, strength, prep). Mention the next available class time.",
  "Law Office":
    "Measured, precise, confidentiality-aware. Never give legal advice in the reply. Offer a free 15-minute case review. Acknowledge the seriousness of their situation without dramatizing."
};

// Typical economics per vertical. Used by the LLM to compute revenue at risk
// transparently — it must show the math, not just a number.
const VERTICAL_ECONOMICS = {
  "Med Spa": { avgTicket: 425, attachRate: 0.55, repeatValue: 1.8, notes: "Single treatment $200-800. Strong repeat-visit value." },
  "Dental Office": { avgTicket: 850, attachRate: 0.62, repeatValue: 2.4, notes: "Cleanings $150, crowns $1500+. Insurance covers most." },
  "Tutoring Center": { avgTicket: 600, attachRate: 0.70, repeatValue: 4.0, notes: "Monthly packages $400-1500. High LTV — students stay months." },
  "Home Services": { avgTicket: 480, attachRate: 0.68, repeatValue: 1.3, notes: "Diagnostic $89-150, repair $200-3000. Urgent jobs convert fast." },
  "Auto Repair": { avgTicket: 380, attachRate: 0.72, repeatValue: 1.5, notes: "Diagnostic $120, repair attach $200 avg. Trust drives repeats." },
  "Fitness Studio": { avgTicket: 140, attachRate: 0.45, repeatValue: 6.0, notes: "Intro class $0-30, membership $80-200/mo. Long LTV." },
  "Law Office": { avgTicket: 2800, attachRate: 0.35, repeatValue: 1.1, notes: "Consult free, retainer $1500-10000+. Few leads, big value." }
};

const SYSTEM_PROMPT = `You are LeadIQ, an AI assistant for small business owners. You read inbound customer messages and produce a single JSON object that helps the owner respond fast and well.

You will be given:
- The type of business
- The customer's name and contact (may be missing)
- The raw customer message
- Typical economics for that business type (use for revenue math)

CRITICAL EXTRACTION RULES — these are what separate you from a generic chatbot:

1. EXTRACT THE SPECIFIC PRODUCT/SERVICE, not the category.
   - "2019 Toyota Camry check engine light" → service is "Engine diagnostics on 2019 Toyota Camry", NOT "Auto repair service"
   - "Botox for forehead lines" → service is "Botox — forehead", NOT "Med spa service"
   - If they name a vehicle/product/treatment, that detail goes in the service field.

2. DETECT REAL URGENCY SIGNALS, don't default to "Flexible".
   - Mechanical failures (check engine light, AC out, leak) → ALWAYS at least "This week", usually "Immediate"
   - Hard deadlines (wedding, exam, trip, event date) → "This week" or "Immediate"
   - All-caps words, multiple question marks, "TODAY", "ASAP" → "Immediate"
   - Only use "Flexible" when the customer explicitly has no timeline.

3. RECOMMEND A SPECIFIC ACTION TIER, not generic advice.
   - "reply_now" — within 15 minutes (emergencies, immediate urgency)
   - "reply_today" — within a few hours (active buyer, hard deadline this week)
   - "reply_this_week" — within 1-2 days (researching, no urgency)
   - "archive" — spam, bots, or clearly irrelevant

YOUR JOB — produce these fields:

1. leadScore (0-100): buying intent + urgency + specificity + fit
2. recommendedAction: "reply_now" | "reply_today" | "reply_this_week" | "archive"
3. intent: "Booking" | "Pricing" | "General inquiry" | "Support" | "Complaint" | "Spam"
4. urgency: "Immediate" | "This week" | "This month" | "Flexible"
5. serviceRequested: the SPECIFIC service with product/vehicle/treatment details when mentioned
6. customerSummary: 1-2 sentences the owner can scan in 3 seconds. Lead with the concrete situation, not generic phrasing. BAD: "Sarah is asking about auto repair service. Early interest." GOOD: "Sarah's 2019 Toyota Camry has a check engine light on — she needs diagnostics. Active problem, not research."
7. suggestedReply: in the business's voice. Must:
   - Address customer by first name if given
   - Reference at least one specific detail from their message (date, vehicle, treatment, situation)
   - End with ONE clear next step
   - 2-4 sentences. Never longer.
   - Sound like a human professional wrote it.
8. followUpAction: SPECIFIC to this lead, not generic.
   - BAD: "Send a short reply with one clear question."
   - GOOD: "Ask Sarah for her phone number and preferred drop-off time. Mention same-day diagnostics."
9. reasoning: 3-5 short structured items. Each must be SPECIFIC to this message, with a sourced phrase from the customer when possible.
   - GOOD: "Named specific vehicle (2019 Toyota Camry) — serious, not tire-kicker"
   - GOOD: "Check engine light = active problem, not research phase"
   - BAD: "Identified contact: Sarah" (that's just extraction, not reasoning)
10. missingInfo: array of fields the owner should collect on first reply. Choose from:
    "phone", "preferred_time", "vehicle_year_make_model", "service_address", "insurance", "budget", "specific_concern", "preferred_contact_method"
11. revenueAtRisk: a single dollar number AND a calculation breakdown.
    Use the economics provided. Formula:
      revenueAtRisk = avgTicket × (leadScore / 100) × (1 + attachRate × 0.5)
    Round to nearest $10. Then explain the math in revenueCalc as 2-3 short fragments.
    Example revenueCalc: ["Avg diagnostic ticket: $120", "68% chance of repair attach (~$200)", "Adjusted by 85% lead confidence = ~$260"]

OUTPUT FORMAT — return ONLY valid JSON, no markdown fences, no prose:
{
  "leadScore": number,
  "recommendedAction": "reply_now" | "reply_today" | "reply_this_week" | "archive",
  "intent": string,
  "urgency": string,
  "serviceRequested": string,
  "customerSummary": string,
  "suggestedReply": string,
  "followUpAction": string,
  "reasoning": [string, string, string],
  "missingInfo": [string],
  "revenueAtRisk": number,
  "revenueCalc": [string, string, string]
}

Do not include any explanation outside the JSON.`;

function buildPrompt({ businessType, name, contact, message }) {
  const voice = VERTICAL_VOICE[businessType] || "Professional and warm.";
  const econ = VERTICAL_ECONOMICS[businessType] || { avgTicket: 400, attachRate: 0.5, repeatValue: 1.5, notes: "" };

  return `BUSINESS TYPE: ${businessType}
VOICE GUIDE FOR THIS BUSINESS: ${voice}

ECONOMICS FOR THIS VERTICAL (use for revenue math):
- Average ticket: $${econ.avgTicket}
- Attach rate (chance of upsell/repair after initial): ${Math.round(econ.attachRate * 100)}%
- Notes: ${econ.notes}

CUSTOMER NAME: ${name || "(not provided)"}
CUSTOMER CONTACT: ${contact || "(not provided)"}

CUSTOMER MESSAGE:
"""
${message}
"""

Return the JSON now.`;
}

export async function callGemini({ apiKey, formData }) {
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt(formData) }]
      }
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini.");

  // responseMimeType: application/json should give us clean JSON, but be defensive.
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned);

  // Backward-compat: older callers may look for leadPriority. Derive it.
  parsed.leadPriority = actionToPriority(parsed.recommendedAction, parsed.leadScore);

  return parsed;
}

function actionToPriority(action, score) {
  if (action === "reply_now") return "High";
  if (action === "reply_today") return "High";
  if (action === "reply_this_week") return "Medium";
  if (action === "archive") return "Low";
  // Fallback from score if action missing
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}