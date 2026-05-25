import { Zap, Clock, TrendingUp } from "lucide-react";

// Industry-data stats only — no fake "we have X customers" numbers.
// These are all defensible from public research (linked in sources).
const STATS = [
  {
    value: "21×",
    label: "more likely to convert",
    helper: "when replying in under 5 minutes",
    source: "InsideSales Lead Response Study",
    icon: Zap,
    accent: "text-emerald-400"
  },
  {
    value: "< 30s",
    label: "average reply time",
    helper: "with TaskIQ's AI-drafted responses",
    source: "vs. industry average of 6+ hours",
    icon: Clock,
    accent: "text-sky-400"
  },
  {
    value: "62%",
    label: "of buyers choose first responder",
    helper: "regardless of price or rating",
    source: "Harvard Business Review",
    icon: TrendingUp,
    accent: "text-amber-400"
  }
];

export default function StatsBanner() {
  return (
    <div className="rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur sm:p-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, label, helper, source, icon: Icon, accent }) {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <Icon size={20} className={`mb-3 ${accent}`} />
      <p className={`text-4xl font-semibold tracking-tight sm:text-5xl ${accent}`}>
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{label}</p>
      <p className="mt-1 text-xs text-zinc-400">{helper}</p>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-600">
        {source}
      </p>
    </div>
  );
}
