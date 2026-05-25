import { ArrowRight, Sparkles } from "lucide-react";

// Drop your image files at:
//   /public/before.png   (the chaotic DM pile)
//   /public/after.png    (the structured lead card)
// Vite serves /public/* at the site root, so the src below just works.
const BEFORE_IMAGE = "/Before.png";
const AFTER_IMAGE = "/After.png";

export default function BeforeAfter() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <Sparkles size={14} />
          The transformation
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          From chaos to clarity, automatically.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          This is what your inbox looks like with TaskIQ — every message read,
          analyzed, and structured before you ever see it.
        </p>
      </div>

      {/* Before / Arrow / After */}
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* BEFORE */}
        <figure className="relative overflow-hidden rounded-2xl border border-rose-500/15 bg-gradient-to-br from-rose-500/[0.04] to-transparent p-2">
          <img
            src={BEFORE_IMAGE}
            alt="Chaotic pile of unanswered customer messages — six tabs open, nothing booked"
            className="block w-full rounded-xl"
            loading="lazy"
          />
        </figure>

        {/* Arrow connector — visible on desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-2">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <ArrowRight size={22} />
          </div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">TaskIQ</p>
        </div>

        {/* Mobile arrow — vertical, between the two images */}
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />
          <div className="grid h-12 w-12 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
            <ArrowRight size={18} className="rotate-90" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/30" />
        </div>

        {/* AFTER */}
        <figure className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.04] to-transparent p-2">
          <img
            src={AFTER_IMAGE}
            alt="Structured lead card — service, appointment, contact, budget, urgency all auto-captured"
            className="block w-full rounded-xl"
            loading="lazy"
          />
        </figure>
      </div>

      {/* Bottom emphasis line */}
      <p className="mt-8 text-center text-xs text-zinc-500">
        No more searching, sorting, or starting from scratch. <span className="text-zinc-300">Every lead, ready to act on.</span>
      </p>
    </div>
  );
}