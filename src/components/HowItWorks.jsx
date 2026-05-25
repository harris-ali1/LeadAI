import { MessageSquare, Sparkles, Send, ArrowRight } from "lucide-react";

// Three-step explainer. Goal: a prospect glances at this and understands
// the entire product flow without reading a single paragraph.
export default function HowItWorks() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <Sparkles size={14} />
          How it works
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          From lead to reply in under 30 seconds.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          No new apps for your team to learn. No workflow disruption. Just faster,
          better replies that capture leads you'd otherwise lose.
        </p>
      </div>

      {/* The three steps */}
      <div className="relative grid gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Decorative arrows between cards on desktop */}
        <Arrow position="left" />
        <Arrow position="right" />

        <Step
          number="1"
          icon={MessageSquare}
          title="Lead comes in"
          description="From SMS, Instagram DM, website form, WhatsApp, or your contact email — we pick it up the second it arrives."
          tags={["SMS", "Instagram", "Web forms", "WhatsApp"]}
        />

        <Step
          number="2"
          icon={Sparkles}
          title="AI reads + analyzes"
          description="Scores the lead, identifies what they want, and drafts the perfect reply in your business's voice — in seconds, not hours."
          tags={["Lead scoring", "Intent detection", "Smart drafting"]}
          highlight
        />

        <Step
          number="3"
          icon={Send}
          title="You hit send"
          description="Review the reply on your phone, tap to send. Or enable auto-reply for verified high-intent leads and let it run."
          tags={["1-tap send", "Auto-reply mode", "Multi-channel"]}
        />
      </div>

      {/* Bottom helper line */}
      <p className="mt-8 text-center text-xs text-zinc-500">
        Setup takes one afternoon. No code, no migration, no IT department needed.
      </p>
    </div>
  );
}

function Step({ number, icon: Icon, title, description, tags, highlight }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur ${
        highlight
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] to-transparent"
          : "border-line bg-black/30"
      }`}
    >
      {/* Step number — big and watermark-y in the corner */}
      <div
        className={`absolute -right-2 -top-2 text-7xl font-bold leading-none ${
          highlight ? "text-emerald-500/10" : "text-white/5"
        }`}
        aria-hidden="true"
      >
        {number}
      </div>

      <div className="relative">
        <div
          className={`mb-4 grid h-11 w-11 place-items-center rounded-2xl ${
            highlight
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white text-black"
          }`}
        >
          <Icon size={18} />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm leading-6 text-zinc-400">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-line bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Decorative arrows shown only on desktop (lg+) between the step cards.
function Arrow({ position }) {
  const posClass =
    position === "left"
      ? "left-[33.33%] -translate-x-1/2"
      : "left-[66.66%] -translate-x-1/2";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block ${posClass}`}
    >
      <div className="grid h-8 w-8 place-items-center rounded-full border border-line bg-black/60 text-zinc-500 backdrop-blur">
        <ArrowRight size={14} />
      </div>
    </div>
  );
}