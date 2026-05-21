export const demoLeads = [
  {
    id: "lead-001",
    customerName: "Maya Patel",
    contact: "maya@example.com, +1 415 555 0142",
    businessType: "Med Spa",
    service: "Laser hair removal — underarms + legs",
    serviceRequested: "Laser hair removal — underarms + legs",
    priority: "High",
    recommendedAction: "reply_today",
    status: "New",
    score: 91,
    intent: "Booking",
    urgency: "This week",
    message:
      "Hi, do you have laser hair removal appointments this week? I want pricing for underarms and legs.",
    summary:
      "Maya wants laser hair removal (underarms + legs) this week. Specific treatment areas + pricing question = strong booking intent.",
    suggestedReply:
      "Hi Maya! Yes, we have laser hair removal openings this week for both underarms and legs. Pricing depends on the package — easiest to confirm at a quick free consult. Does Wednesday at 2pm or Friday at 11am work better?",
    followUpAction:
      "Reply today — ideally within 2 hours. Collect: preferred time and phone number.",
    reasoning: [
      "Named specific treatment areas (underarms + legs) — not browsing",
      "Asked about pricing AND availability — buying signal",
      "Used 'this week' — short timeline"
    ],
    missingInfo: ["preferred_time"],
    revenueAtRisk: 540,
    revenueCalc: [
      "Avg ticket for Med Spa: $425",
      "Attach rate 55% → adjuster ×1.28",
      "Lead confidence 91% → ~$540"
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 23).toISOString()
  },
  {
    id: "lead-002",
    customerName: "Daniel Kim",
    contact: "daniel@example.com",
    businessType: "Dental Office",
    service: "Teeth whitening (pre-wedding)",
    serviceRequested: "Teeth whitening (pre-wedding)",
    priority: "Medium",
    recommendedAction: "reply_today",
    status: "Contacted",
    score: 76,
    intent: "Pricing",
    urgency: "This week",
    message: "I need teeth whitening before a wedding. Can you send me prices?",
    summary:
      "Daniel wants whitening before a wedding (hard deadline). Price-shopping — likely comparing 2-3 offices. Speed of reply matters.",
    suggestedReply:
      "Hi Daniel! Congrats on the upcoming wedding 🥂 We offer professional whitening with same-week appointments. Pricing ranges depending on the option you choose. When's the wedding, and would you like a slot this week or next?",
    followUpAction:
      "Reply today — ideally within 2 hours. Collect: wedding date and phone number.",
    reasoning: [
      "Hard deadline (wedding) — fixed timeline",
      "Asked about pricing — actively comparing",
      "Missing wedding date — must ask to scope urgency"
    ],
    missingInfo: ["phone", "preferred_time"],
    revenueAtRisk: 870,
    revenueCalc: [
      "Avg ticket for Dental Office: $850",
      "Attach rate 62% → adjuster ×1.31",
      "Lead confidence 76% → ~$870"
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: "lead-003",
    customerName: "Marcus Lee",
    contact: "marcus@example.com, 415-555-0199",
    businessType: "Home Services",
    service: "Emergency AC repair",
    serviceRequested: "Emergency AC repair",
    priority: "High",
    recommendedAction: "reply_now",
    status: "New",
    score: 98,
    intent: "Booking",
    urgency: "Immediate",
    message:
      "My AC just died and it's 98 degrees in the house. Wife and 2 kids home. Can someone come TODAY??",
    summary:
      "Marcus has complete AC failure with kids in a 98°F house. Emergency — every minute risks losing this lead to a competitor.",
    suggestedReply:
      "Marcus — got you. I'm dispatching a tech now, ETA 60-90 min. I'll text you the tech's name and arrival window in the next 5 minutes. Diagnostic is $89 and gets waived if we do the repair.",
    followUpAction:
      "Reply within 15 minutes — every minute risks losing this lead. Collect: service address.",
    reasoning: [
      "Active emergency — AC failure with kids at home",
      "Used 'TODAY' in caps + double question mark — extreme urgency",
      "Specific temperature mentioned (98°) — real distress"
    ],
    missingInfo: ["service_address"],
    revenueAtRisk: 680,
    revenueCalc: [
      "Avg ticket for Home Services: $480",
      "Attach rate 68% → adjuster ×1.34",
      "Lead confidence 98% → ~$680"
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString()
  }
];