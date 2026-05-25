import { Home, Car, Sparkles, Wrench, Dumbbell, Stethoscope, Scale, ArrowRight } from "lucide-react";

// Vertical-specific pain points. Each card needs to make a prospect from
// that vertical say "yes, that's literally my problem."
const VERTICALS = [
  {
    name: "Real Estate",
    icon: Home,
    accent: "from-rose-500/10 to-transparent border-rose-500/20",
    iconBg: "bg-rose-500/15 text-rose-400",
    headline: "Texas realtors lose $8k+ per missed lead",
    pain: "Zillow leads go to whichever agent replies first. Slow response = lost commission.",
    feature: "AI drafts personalized property replies in your voice — referencing the listing they asked about.",
    badge: "Most popular in TX"
  },
  {
    name: "Auto Repair",
    icon: Car,
    accent: "from-blue-500/10 to-transparent border-blue-500/20",
    iconBg: "bg-blue-500/15 text-blue-400",
    headline: "Booked vs. lost = phone answered in 5 min",
    pain: "Customers call multiple shops with check engine lights. First callback wins.",
    feature: "Extracts vehicle year/make/model from messages, drafts a diagnostic-offering reply with availability."
  },
  {
    name: "Med Spa",
    icon: Sparkles,
    accent: "from-purple-500/10 to-transparent border-purple-500/20",
    iconBg: "bg-purple-500/15 text-purple-400",
    headline: "Instagram DMs that convert to bookings",
    pain: "Botox, fillers, laser inquiries pile up on weekends — leads cool by Monday.",
    feature: "Recognizes treatment requests, drafts consult invitations in your spa's tone, never quotes firm prices over message."
  },
  {
    name: "Home Services",
    icon: Wrench,
    accent: "from-amber-500/10 to-transparent border-amber-500/20",
    iconBg: "bg-amber-500/15 text-amber-400",
    headline: "Emergencies don't wait until Monday",
    pain: "AC dies at 9pm. Customer texts 4 companies. Whoever responds first books the job.",
    feature: "Detects urgency signals (AC out, leak, no heat), recommends instant reply, sends you a push notification."
  },
  {
    name: "Fitness Studio",
    icon: Dumbbell,
    accent: "from-emerald-500/10 to-transparent border-emerald-500/20",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    headline: "Trial conversions need momentum",
    pain: "Someone asks about classes on Sunday night. By Wednesday, they've forgotten you exist.",
    feature: "Instant reply offering a free intro class for the next available slot — books before motivation fades."
  },
  {
    name: "Dental Office",
    icon: Stethoscope,
    accent: "from-cyan-500/10 to-transparent border-cyan-500/20",
    iconBg: "bg-cyan-500/15 text-cyan-400",
    headline: "Pre-wedding, pre-photo, pre-event urgency",
    pain: "Whitening, crowns, veneers — patients have deadlines. Slow responses lose them to a competitor.",
    feature: "Catches deadline mentions, offers two concrete time slots, references insurance acceptance."
  },
  {
    name: "Law Office",
    icon: Scale,
    accent: "from-indigo-500/10 to-transparent border-indigo-500/20",
    iconBg: "bg-indigo-500/15 text-indigo-400",
    headline: "First contact = retainer signed",
    pain: "Potential clients call 3 firms about their case. Whoever calls back first usually wins.",
    feature: "Drafts measured, confidentiality-aware replies offering a free 15-min case review."
  }
];

export default function BuiltForYourBusiness() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <Sparkles size={14} />
          Built for your business
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          One tool. Tuned for every kind of local business.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          The AI knows the difference between a Botox inquiry and a brake job.
          It writes like your business, not like a chatbot.
        </p>
      </div>

      {/* Grid of vertical cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {VERTICALS.map((vertical) => (
          <VerticalCard key={vertical.name} {...vertical} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-8 text-center text-xs text-zinc-500">
        Don't see your business type? <span className="text-zinc-300">Custom-tuned setups available.</span>
      </p>
    </div>
  );
}

function VerticalCard({ name, icon: Icon, accent, iconBg, headline, pain, feature, badge }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition hover:bg-white/[0.02] ${accent}`}
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          {badge}
        </span>
      )}

      <div className={`mb-4 grid h-10 w-10 place-items-center rounded-xl ${iconBg}`}>
        <Icon size={17} />
      </div>

      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {name}
      </p>
      <h3 className="mb-3 text-base font-semibold leading-tight text-white">
        {headline}
      </h3>

      <p className="mb-3 text-xs leading-5 text-zinc-400">{pain}</p>

      <div className="border-t border-white/5 pt-3">
        <p className="text-[11px] uppercase tracking-wider text-zinc-500">
          What TaskIQ does
        </p>
        <p className="mt-1 text-xs leading-5 text-zinc-300">{feature}</p>
      </div>
    </div>
  );
}