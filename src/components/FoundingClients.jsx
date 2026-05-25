import { Users, Sparkles, MapPin, ArrowRight, Mail } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

// Per-vertical founding spots. Honest framing: 5 per vertical, all open today.
// As you close clients, decrement the available count manually — that creates
// real urgency and is the opposite of fake social proof.
const VERTICALS = [
  { name: "Real Estate", spotsTotal: 5, spotsTaken: 0 },
  { name: "Auto Repair", spotsTotal: 5, spotsTaken: 0 },
  { name: "Med Spa", spotsTotal: 5, spotsTaken: 0 },
  { name: "Home Services", spotsTotal: 5, spotsTaken: 0 },
  { name: "Dental", spotsTotal: 5, spotsTaken: 0 },
  { name: "Fitness", spotsTotal: 5, spotsTaken: 0 },
  { name: "Law", spotsTotal: 5, spotsTaken: 0 }
];

export default function FoundingClients({ onContactClick }) {
  const totalAvailable = VERTICALS.reduce(
    (sum, v) => sum + (v.spotsTotal - v.spotsTaken),
    0
  );

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-6 backdrop-blur sm:p-10">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        {/* LEFT — pitch */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-base font-semibold text-emerald-300">
            <Sparkles size={14} />
            Founding clients welcome
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Be one of the first {totalAvailable} businesses on TaskIQ.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
            We're onboarding our founding clients now — capped at 5 per vertical.
            You get a permanent $49/month rate (vs. $149 regular), direct access to
            the founder, and a say in what we build next.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
            <MapPin size={13} />
            <span>Based in Houston, TX — prioritizing local TX businesses first.</span>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Mail size={15} />
              Claim a founding spot
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-0.5"
              />
            </a>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
              >
                Ask a question first
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — availability board */}
        <div className="rounded-2xl border border-line bg-black/30 p-5">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
            <Users size={12} />
            Founding spots available
          </div>

          <ul className="space-y-2">
            {VERTICALS.map((v) => (
              <VerticalRow key={v.name} {...v} />
            ))}
          </ul>

          <p className="mt-4 border-t border-white/5 pt-3 text-[11px] leading-5 text-zinc-500">
            Updated as we onboard clients. Rates lock in at signup — once a vertical fills,
            it's regular pricing only.
          </p>
        </div>
      </div>
    </div>
  );
}

function VerticalRow({ name, spotsTotal, spotsTaken }) {
  const available = spotsTotal - spotsTaken;
  const isFull = available === 0;
  const isLow = available <= 2 && !isFull;

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-black/40 px-3 py-2.5">
      <span className="text-sm font-medium text-white">{name}</span>

      <div className="flex items-center gap-2">
        {/* Dots showing taken vs available */}
        <div className="flex gap-1">
          {Array.from({ length: spotsTotal }).map((_, i) => {
            const taken = i < spotsTaken;
            return (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  taken ? "bg-zinc-700" : "bg-emerald-400"
                }`}
              />
            );
          })}
        </div>

        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            isFull
              ? "bg-zinc-800 text-zinc-500"
              : isLow
              ? "bg-amber-500/15 text-amber-300"
              : "bg-emerald-500/15 text-emerald-300"
          }`}
        >
          {isFull ? "Full" : `${available} open`}
        </span>
      </div>
    </li>
  );
}
