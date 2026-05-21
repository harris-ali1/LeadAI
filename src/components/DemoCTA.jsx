import { Mail, ArrowRight, MessageCircle, Sparkles } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

/**
 * Shown in the workspace once the visitor has seen value (analyzed at least
 * one lead). This is the conversion moment — they've experienced the product,
 * now give them the easiest path to a real conversation.
 */
export default function DemoCTA({ onContactClick }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.10] via-white/[0.05] to-white/[0.02] p-6 backdrop-blur sm:p-8">
      {/* Decorative glow blob in the corner */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        {/* Left: pitch */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Sparkles size={12} />
            Like what you see?
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            This is just the analyzer. Let's plug it into your business.
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            The full product connects to your real channels — SMS, Instagram DMs,
            website forms, WhatsApp — and pings you the moment a hot lead lands.
            Setup takes a single afternoon.
          </p>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Mail size={16} />
            Book a 15-min demo
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={onContactClick}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
          >
            <MessageCircle size={16} />
            Or send a quick message
          </button>

          <p className="mt-1 text-center text-[11px] text-zinc-500">
            No pressure — just a chat about your setup
          </p>
        </div>
      </div>
    </div>
  );
}