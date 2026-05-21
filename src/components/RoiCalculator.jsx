import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  ArrowRight,
  Info,
  ChevronDown,
  AlertCircle,
  Mail,
  Sparkles
} from "lucide-react";
import {
  VERTICAL_ECONOMICS,
  RESPONSE_TIME_TIERS,
  calculateRoi
} from "../data/roiAssumptions";

const CAL_LINK = "https://cal.com/taskiq";

export default function RoiCalculator() {
  // Defaults intentionally show a believable Texas SMB scenario right out of
  // the gate so the visitor sees a real number without typing anything.
  const [businessType, setBusinessType] = useState("Auto Repair");
  const [weeklyInquiries, setWeeklyInquiries] = useState(
    VERTICAL_ECONOMICS["Auto Repair"].weeklyInquiries
  );
  const [currentTierId, setCurrentTierId] = useState("few_hours");
  const [showAssumptions, setShowAssumptions] = useState(false);

  // When the business type changes, snap the inquiry slider to that vertical's
  // typical volume. Saves the visitor from having to know their own number.
  function handleBusinessTypeChange(type) {
    setBusinessType(type);
    setWeeklyInquiries(VERTICAL_ECONOMICS[type].weeklyInquiries);
  }

  const result = useMemo(
    () =>
      calculateRoi({
        businessType,
        // While the user is mid-typing the input can briefly be "" — treat
        // that as 0 so the math returns zeros instead of NaN flickering.
        weeklyInquiries: Number(weeklyInquiries) || 0,
        currentTierId
      }),
    [businessType, weeklyInquiries, currentTierId]
  );

  const econ = VERTICAL_ECONOMICS[businessType];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur sm:p-8">
      {/* Decorative emerald glow — money vibes */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl" />

      <div className="relative">
        {/* Heading */}
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Calculator size={12} />
            ROI calculator
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How much are missed leads costing you?
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            Drag the sliders to match your business. We'll show what slow reply
            times cost you each month — using real industry capture-rate data.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT — inputs */}
          <div className="space-y-5 rounded-2xl border border-line bg-black/30 p-5 sm:p-6">
            {/* Business type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Business type
              </label>
              <div className="relative">
                <select
                  value={businessType}
                  onChange={(e) => handleBusinessTypeChange(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-line bg-black/40 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-white/40"
                >
                  {Object.keys(VERTICAL_ECONOMICS).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-500">
                {econ.description} • avg ticket ~${econ.avgTicket}
              </p>
            </div>

            {/* Weekly inquiries — typed input primary, slider secondary */}
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <label
                  htmlFor="roi-inquiries"
                  className="text-sm font-medium text-zinc-200"
                >
                  Inquiries per week
                </label>
                <span className="text-[11px] text-zinc-500">
                  Calls, DMs, forms, texts — all channels
                </span>
              </div>

              <div className="flex items-stretch gap-2">
                <input
                  id="roi-inquiries"
                  type="number"
                  min={1}
                  max={9999}
                  value={weeklyInquiries}
                  onChange={(e) => {
                    const v = e.target.value;
                    // Allow empty while typing so the user can clear and retype
                    if (v === "") {
                      setWeeklyInquiries("");
                      return;
                    }
                    const n = Math.max(1, Math.min(9999, Number(v)));
                    if (!Number.isNaN(n)) setWeeklyInquiries(n);
                  }}
                  onBlur={(e) => {
                    // Snap empty input back to a sane default
                    if (e.target.value === "" || Number(e.target.value) < 1) {
                      setWeeklyInquiries(1);
                    }
                  }}
                  className="w-24 rounded-2xl border border-line bg-black/40 px-3 py-2.5 text-center text-base font-semibold text-white outline-none transition focus:border-white/40"
                />
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={1}
                  value={Math.min(200, Number(weeklyInquiries) || 0)}
                  onChange={(e) => setWeeklyInquiries(Number(e.target.value))}
                  className="roi-slider min-w-0 flex-1"
                  aria-label="Inquiries per week slider"
                />
              </div>

              <div className="mt-1.5 flex justify-between text-[10px] text-zinc-600">
                <span>5</span>
                <span>50</span>
                <span>100</span>
                <span>200+</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">
                Don't know your exact number? A good rule of thumb is{" "}
                <span className="text-zinc-400">{econ.weeklyInquiries}</span> for {businessType.toLowerCase()}.
              </p>
            </div>

            {/* Current response time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                Your current response time
              </label>
              <div className="space-y-1.5">
                {RESPONSE_TIME_TIERS.filter((t) => t.id !== "under_5min").map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setCurrentTierId(tier.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                      currentTierId === tier.id
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-line bg-black/40 text-zinc-400 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="font-medium">{tier.label}</span>
                    <span
                      className={`text-xs ${
                        currentTierId === tier.id ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      ~{Math.round(tier.captureRate * 100)}% capture
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — output */}
          <div className="flex flex-col rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-5 sm:p-6">
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-300/80">
              <TrendingUp size={13} />
              Estimated additional revenue
            </div>

            {/* Big monthly number */}
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-white sm:text-6xl">
                ${Math.round(result.monthly).toLocaleString()}
              </span>
              <span className="text-sm text-zinc-400">/month</span>
            </div>
            <p className="text-xs text-zinc-500">
              with LeadIQ vs. your current setup
            </p>

            {/* Breakdown */}
            <div className="mt-5 space-y-2.5 border-t border-emerald-500/15 pt-4">
              <BreakdownRow
                label="Inquiries × avg ticket"
                value={`$${Math.round(result.totalWeeklyPotential).toLocaleString()}/wk`}
                helper="potential weekly revenue"
              />
              <BreakdownRow
                label={`Today (~${Math.round(result.currentCaptureRate * 100)}% capture)`}
                value={`$${Math.round(result.currentlyCaptured).toLocaleString()}/wk`}
                helper="what you're capturing now"
              />
              <BreakdownRow
                label={`With LeadIQ (~${Math.round(result.projectedCaptureRate * 100)}% capture)`}
                value={`$${Math.round(result.projectedCaptured).toLocaleString()}/wk`}
                helper="sub-5-min replies = top tier"
                highlight
              />
              <BreakdownRow
                label="Weekly gain"
                value={`+$${Math.round(result.additionalRevenue).toLocaleString()}/wk`}
                helper={`= $${Math.round(result.annual).toLocaleString()}/yr at this rate`}
                strong
              />
            </div>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-2 pt-1">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                <Mail size={15} />
                Book a 15-min demo to recover this
                <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
              </a>
              <p className="text-center text-[11px] text-zinc-500">
                Setup takes a single afternoon
              </p>
            </div>
          </div>
        </div>

        {/* Assumptions expander — credibility move */}
        <div className="mt-6">
          <button
            onClick={() => setShowAssumptions((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
          >
            <Info size={12} />
            {showAssumptions ? "Hide assumptions" : "How we calculate this"}
          </button>

          {showAssumptions && (
            <div className="mt-3 rounded-2xl border border-line bg-black/30 p-4 text-xs leading-6 text-zinc-400">
              <div className="mb-3 flex items-start gap-2">
                <AlertCircle size={13} className="mt-0.5 shrink-0 text-amber-400" />
                <p>
                  These are <span className="font-medium text-zinc-200">estimates</span> based on
                  industry-average data, not promises. Actual results vary by business, market,
                  and message quality.
                </p>
              </div>

              <ul className="space-y-1.5 pl-1">
                <Bullet>
                  <span className="text-zinc-200">Capture rates by response time</span> come from
                  the InsideSales Lead Response Management study, HBR's 2011 research on response
                  speed, and Drift's State of Conversational Marketing reports. We use conservative
                  midpoints: sub-5-min ≈ 55%, 1-hour ≈ 32%, few-hours ≈ 22%, same-day ≈ 15%, next-day+ ≈ 7%.
                </Bullet>
                <Bullet>
                  <span className="text-zinc-200">Avg ticket sizes</span> are weighted toward Texas
                  SMB markets and reflect realistic single-job revenue, not annual customer LTV.
                </Bullet>
                <Bullet>
                  <span className="text-zinc-200">Weekly gain</span> assumes LeadIQ moves you into
                  the top tier (sub-5-min auto-drafted replies, owner just taps Send). We don't
                  claim 100% capture — top performers cap around 55-60%.
                </Bullet>
                <Bullet>
                  <span className="text-zinc-200">Annual figures</span> are simple weekly × 52
                  projections. Most businesses see seasonality, so treat the annual number as a
                  ceiling, not a guarantee.
                </Bullet>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Slider + number-input styling — kept inline so this component is self-contained */}
      <style>{`
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .roi-slider::-webkit-slider-runnable-track {
          background: linear-gradient(to right, rgb(52 211 153 / 0.6), rgb(255 255 255 / 0.15));
          height: 6px;
          border-radius: 999px;
        }
        .roi-slider::-moz-range-track {
          background: linear-gradient(to right, rgb(52 211 153 / 0.6), rgb(255 255 255 / 0.15));
          height: 6px;
          border-radius: 999px;
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          margin-top: -6px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.4);
          transition: transform 0.15s;
        }
        .roi-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .roi-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: none;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.4);
          transition: transform 0.15s;
        }
        .roi-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }

        /* Kill the spinner arrows on the inquiries number input — they look
           awful in dark UIs and people don't use them when typing anyway. */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

function BreakdownRow({ label, value, helper, highlight, strong }) {
  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2 ${
        highlight
          ? "bg-emerald-500/[0.07]"
          : strong
          ? "bg-white/[0.06]"
          : ""
      }`}
    >
      <div className="min-w-0">
        <p className={`text-xs ${strong ? "font-medium text-white" : "text-zinc-400"}`}>
          {label}
        </p>
        {helper && <p className="text-[10px] text-zinc-600">{helper}</p>}
      </div>
      <p
        className={`shrink-0 text-sm font-semibold ${
          strong
            ? "text-emerald-300"
            : highlight
            ? "text-emerald-300/90"
            : "text-zinc-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
      <span>{children}</span>
    </li>
  );
}