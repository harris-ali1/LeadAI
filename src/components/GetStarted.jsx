import { MessageSquare, Wrench, TrendingUp, ArrowRight, Mail, Sparkles } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Book a free 15-min demo",
    description:
      "We walk through your current setup, show you how TaskIQ handles your specific leads, and answer every question you have. No pitch, no pressure."
  },
  {
    number: "02",
    icon: Wrench,
    title: "We set everything up for you",
    description:
      "One afternoon. We connect your channels — SMS, Instagram, web form, WhatsApp — and tune the AI to sound like your business. You don't touch any code."
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Stop losing leads the same day",
    description:
      "Every incoming inquiry gets read, scored, and replied to in under 30 seconds. You'll notice it working on the first day — usually the first hour."
  }
];

export default function GetStarted({ onContactClick }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur sm:p-10">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
            <Sparkles size={14} />
            Get started
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Up and running in one afternoon.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            No technical setup. No new software for your team to learn.
            No disruption to how you already work.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
          />

          {STEPS.map((step, i) => (
            <StepCard key={step.number} {...step} last={i === STEPS.length - 1} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Mail size={15} />
            Book your free demo
            <ArrowRight
              size={14}
              className="transition group-hover:translate-x-0.5"
            />
          </a>

          {onContactClick && (
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-6 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
            >
              <MessageSquare size={15} />
              Ask a question first
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Pricing is simple, cheap and affordable and discussed on your demo call.{" "}
          <span className="text-zinc-400">
          </span>
        </p>
      </div>
    </div>
  );
}

function StepCard({ number, icon: Icon, title, description }) {
  return (
    <div className="relative rounded-2xl border border-line bg-black/30 p-6 backdrop-blur">
      {/* Step number watermark */}
      <div
        aria-hidden="true"
        className="absolute -right-1 -top-1 text-7xl font-bold leading-none text-white/[0.04]"
      >
        {number}
      </div>

      <div className="relative">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white text-black">
          <Icon size={18} />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{description}</p>
      </div>
    </div>
  );
}