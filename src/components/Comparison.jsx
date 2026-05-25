import { Check, X, AlertCircle, Sparkles } from "lucide-react";

// Comparing against ALTERNATIVES, not competitors. This is more powerful
// because it reframes the buying decision from "which AI tool" to
// "what's the smartest way to handle this problem at all."
const ROWS = [
  {
    label: "Response time",
    manual: { value: "Hours to days", status: "bad" },
    va: { value: "1-4 hours (when awake)", status: "warn" },
    taskiq: { value: "Under 30 seconds", status: "good" }
  },
  {
    label: "Available 24/7",
    manual: { value: "No — business hours only", status: "bad" },
    va: { value: "Limited hours", status: "warn" },
    taskiq: { value: "Yes — every minute of every day", status: "good" }
  },
  {
    label: "Cost per month",
    manual: { value: "Your time (priceless)", status: "warn" },
    va: { value: "$1,500–3,000+", status: "bad" },
    taskiq: { value: "$49–149", status: "good" }
  },
  {
    label: "Knows your business voice",
    manual: { value: "Yes — but inconsistent", status: "warn" },
    va: { value: "After training (weeks)", status: "warn" },
    taskiq: { value: "Tuned in your first session", status: "good" }
  },
  {
    label: "Captures every channel",
    manual: { value: "Whatever you remember to check", status: "bad" },
    va: { value: "Depends on what you forward", status: "warn" },
    taskiq: { value: "SMS, IG, web, WhatsApp, email", status: "good" }
  },
  {
    label: "Scales with lead volume",
    manual: { value: "No — you burn out", status: "bad" },
    va: { value: "Hire more = pay more", status: "warn" },
    taskiq: { value: "Yes — flat monthly cost", status: "good" }
  },
  {
    label: "Setup time",
    manual: { value: "Forever — never stops", status: "bad" },
    va: { value: "2–4 weeks hiring + training", status: "warn" },
    taskiq: { value: "One afternoon", status: "good" }
  }
];

const COLUMNS = [
  { key: "manual", label: "Doing it yourself", subtitle: "The default" },
  { key: "va", label: "Hiring a VA", subtitle: "The expensive fix" },
  { key: "taskiq", label: "TaskIQ", subtitle: "The smart fix", highlight: true }
];

export default function Comparison() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <Sparkles size={14} />
          The math
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          The three ways to handle leads. Only one scales.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Most business owners try to handle it themselves until they burn out, then hire a VA.
          Both have hard limits. TaskIQ doesn't.
        </p>
      </div>

      {/* Desktop: real table. Mobile: stacked cards. */}
      <div className="hidden lg:block">
        <DesktopTable />
      </div>
      <div className="space-y-4 lg:hidden">
        <MobileCards />
      </div>
    </div>
  );
}

function DesktopTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      {/* Header row */}
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-line bg-black/40">
        <div className="p-4 text-xs uppercase tracking-wider text-zinc-500">
          What matters
        </div>
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className={`border-l border-line p-4 ${
              col.highlight ? "bg-emerald-500/[0.06]" : ""
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                col.highlight ? "text-emerald-300" : "text-white"
              }`}
            >
              {col.label}
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-500">{col.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {ROWS.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-line last:border-b-0 ${
            i % 2 === 0 ? "bg-black/20" : "bg-transparent"
          }`}
        >
          <div className="p-4 text-sm font-medium text-zinc-300">
            {row.label}
          </div>
          {COLUMNS.map((col) => {
            const cell = row[col.key];
            return (
              <div
                key={col.key}
                className={`flex items-start gap-2 border-l border-line p-4 ${
                  col.highlight ? "bg-emerald-500/[0.04]" : ""
                }`}
              >
                <StatusIcon status={cell.status} />
                <span
                  className={`text-sm leading-5 ${
                    col.highlight ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {cell.value}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MobileCards() {
  // On mobile we flip the orientation — one card per COLUMN, with rows inside.
  return (
    <>
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          className={`rounded-2xl border p-5 ${
            col.highlight
              ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] to-transparent"
              : "border-line bg-black/30"
          }`}
        >
          <p
            className={`text-base font-semibold ${
              col.highlight ? "text-emerald-300" : "text-white"
            }`}
          >
            {col.label}
          </p>
          <p className="mb-4 text-xs text-zinc-500">{col.subtitle}</p>

          <ul className="space-y-2.5 border-t border-white/5 pt-4">
            {ROWS.map((row) => {
              const cell = row[col.key];
              return (
                <li key={row.label} className="flex items-start gap-2.5">
                  <StatusIcon status={cell.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {row.label}
                    </p>
                    <p
                      className={`text-sm leading-5 ${
                        col.highlight ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {cell.value}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

function StatusIcon({ status }) {
  if (status === "good") {
    return <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" />;
  }
  if (status === "warn") {
    return <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-400" />;
  }
  return <X size={14} className="mt-0.5 shrink-0 text-rose-400" />;
}
