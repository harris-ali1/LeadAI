import { Check, Sparkles, ArrowRight, Mail } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

const TIERS = [
  {
    name: "Founding",
    price: 49,
    period: "/month",
    originalPrice: 149,
    description: "For the first 5 businesses per vertical. Locked-in rate forever.",
    features: [
      "AI lead analysis on every message",
      "Suggested replies in your voice",
      "1 channel (SMS, web form, or DM)",
      "Email + SMS notifications",
      "Personal onboarding (1 afternoon)",
      "Cancel anytime"
    ],
    cta: "Claim a founding spot",
    highlight: true,
    badge: "Limited — 5 spots per vertical"
  },
  {
    name: "Growth",
    price: 149,
    period: "/month",
    description: "For busy businesses with leads across multiple channels.",
    features: [
      "Everything in Founding",
      "Up to 3 channels (SMS, Instagram, web form, WhatsApp)",
      "Priority support",
      "Auto-reply mode for verified leads",
      "Custom voice tuning",
      "Multi-team-member access"
    ],
    cta: "Book a 15-min demo",
    highlight: false
  },
  {
    name: "Custom",
    price: null,
    description: "For high-volume businesses or multi-location operators.",
    features: [
      "Everything in Growth",
      "Unlimited channels",
      "Custom integrations (CRM, calendar, etc.)",
      "Dedicated onboarding + training",
      "SLA + priority response",
      "Volume pricing available"
    ],
    cta: "Talk to us",
    highlight: false
  }
];

export default function Pricing({ onContactClick }) {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <Sparkles size={14} />
          Pricing
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Honest pricing. No setup fees.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Founding clients pay $49/month for life — capped at 5 per vertical.
          After that, regular pricing applies.
        </p>
      </div>

      {/* Pricing grid */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {TIERS.map((tier) => (
          <PricingTier
            key={tier.name}
            tier={tier}
            onContactClick={onContactClick}
          />
        ))}
      </div>

      {/* Fine-print row */}
      <p className="mt-8 text-center text-xs text-zinc-500">
        All tiers include a 30-day money-back guarantee. <span className="text-zinc-300">Built and supported by Harris in Houston, TX.</span>
      </p>
    </div>
  );
}

function PricingTier({ tier, onContactClick }) {
  const isCustom = tier.price === null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 transition ${
        tier.highlight
          ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/[0.08] to-transparent shadow-lg shadow-emerald-500/5"
          : "border-line bg-black/30 hover:bg-white/[0.02]"
      }`}
    >
      {/* Badge — for highlight tier only */}
      {tier.badge && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          <Sparkles size={10} />
          {tier.badge}
        </div>
      )}

      {/* Tier name */}
      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-2">
        {isCustom ? (
          <span className="text-3xl font-semibold text-white">Let's talk</span>
        ) : (
          <>
            <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              ${tier.price}
            </span>
            <span className="text-sm text-zinc-400">{tier.period}</span>
            {tier.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">
                ${tier.originalPrice}
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 min-h-[2.5rem] text-sm leading-5 text-zinc-400">
        {tier.description}
      </p>

      {/* CTA */}
      <CtaButton tier={tier} onContactClick={onContactClick} />

      {/* Features list */}
      <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
        {tier.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm leading-5 text-zinc-300"
          >
            <Check
              size={14}
              className={`mt-0.5 shrink-0 ${
                tier.highlight ? "text-emerald-400" : "text-zinc-500"
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CtaButton({ tier, onContactClick }) {
  // Custom tier opens the contact modal; others go to Cal.com.
  const baseClasses =
    "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition";

  const styleClasses = tier.highlight
    ? "bg-white text-black hover:bg-zinc-200"
    : "border border-line bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]";

  if (tier.price === null) {
    return (
      <button
        onClick={onContactClick}
        className={`${baseClasses} ${styleClasses}`}
      >
        <Mail size={14} />
        {tier.cta}
        <ArrowRight size={13} />
      </button>
    );
  }

  return (
    <a
      href={CAL_LINK}
      target="_blank"
      rel="noreferrer"
      className={`${baseClasses} ${styleClasses}`}
    >
      <Mail size={14} />
      {tier.cta}
      <ArrowRight size={13} />
    </a>
  );
}
