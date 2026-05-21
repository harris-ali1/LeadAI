import { useState, useEffect, useMemo } from "react";
import {
  MessageSquareText,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  DollarSign,
  Copy,
  CheckCheck,
  AlertCircle,
  Info,
  ExternalLink,
  Zap
} from "lucide-react";
import EmptyState from "./EmptyState";
import { getScoreColor, getScoreBarColor, getActionClasses } from "../lib/utils";
import {
  buildEmailLink,
  buildSmsLink,
  buildWhatsAppLink,
  extractEmail,
  extractPhone,
  MISSING_INFO_LABELS,
  ACTION_DISPLAY
} from "../lib/channels";

// Normalize the two shapes (live analysis result vs. stored lead) into one.
function normalize(input) {
  if (!input) return null;
  return {
    score: input.leadScore ?? input.score ?? 0,
    recommendedAction: input.recommendedAction || deriveAction(input),
    summary: input.customerSummary || input.summary,
    suggestedReply: input.suggestedReply,
    followUpAction: input.followUpAction,
    reasoning: input.reasoning || [],
    missingInfo: input.missingInfo || [],
    revenueAtRisk: input.revenueAtRisk,
    revenueCalc: input.revenueCalc || [],
    customerName: input.customerName,
    contact: input.contact,
    serviceRequested: input.serviceRequested || input.service
  };
}

function deriveAction(input) {
  const score = input.leadScore ?? input.score ?? 0;
  const urgency = (input.urgency || "").toLowerCase();
  if (urgency.includes("immediate")) return "reply_now";
  if (urgency.includes("week") && score >= 75) return "reply_today";
  if (score >= 60) return "reply_this_week";
  return "reply_this_week";
}

export default function AnalysisPanel({ analysis, selectedLead, isAnalyzing }) {
  const data = normalize(analysis || selectedLead);
  const [sentChannel, setSentChannel] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showRevenueMath, setShowRevenueMath] = useState(false);

  // Reset send state when data changes.
  useEffect(() => {
    setSentChannel(null);
    setCopied(false);
    setShowRevenueMath(false);
  }, [analysis, selectedLead]);

  // Pre-compute deep links so we know which channels are usable.
  const channels = useMemo(() => {
    if (!data) return {};
    const contact = data.contact || "";
    const subject = `Re: your inquiry${data.serviceRequested ? ` about ${data.serviceRequested}` : ""}`;
    const body = data.suggestedReply || "";
    return {
      email: { href: buildEmailLink({ contact, subject, body }), value: extractEmail(contact) },
      sms: { href: buildSmsLink({ contact, body }), value: extractPhone(contact) },
      whatsapp: { href: buildWhatsAppLink({ contact, body }), value: extractPhone(contact) }
    };
  }, [data]);

  if (isAnalyzing) return <AnalysisSkeleton />;

  if (!data) {
    return (
      <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6">
        <EmptyState />
      </div>
    );
  }

  function handleSend(channel, href) {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
    setSentChannel(channel);
    setTimeout(() => setSentChannel(null), 2400);
  }

  function handleCopy() {
    navigator.clipboard?.writeText(data.suggestedReply || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const action = ACTION_DISPLAY[data.recommendedAction] || ACTION_DISPLAY.reply_this_week;

  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur">
      {/* Header: title + recommended action badge */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">AI lead analysis</h3>
          <p className="mt-1 text-sm text-zinc-500">
            What to do with this lead and why.
          </p>
        </div>

        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${getActionClasses(action.tone)}`}>
          <Zap size={12} />
          {action.label}
        </span>
      </div>

      {/* TOP STRIP: lead score (big, primary) + recommended action helper */}
      <div className="mb-5 rounded-2xl border border-line bg-black/30 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Lead score</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-4xl font-semibold ${getScoreColor(data.score)}`}>
                {data.score}
              </span>
              <span className="text-sm text-zinc-500">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-zinc-500">When to reply</p>
            <p className="mt-1 text-sm font-medium text-white">{action.helper}</p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${getScoreBarColor(data.score)}`}
            style={{ width: `${data.score}%` }}
          />
        </div>

        {data.serviceRequested && (
          <p className="mt-3 text-sm text-zinc-300">
            <span className="text-zinc-500">Service: </span>
            <span className="font-medium text-white">{data.serviceRequested}</span>
          </p>
        )}
      </div>

      {/* Revenue at risk — with transparent math */}
      {data.revenueAtRisk != null && (
        <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <DollarSign size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400/80">Revenue at risk if ignored</p>
              <p className="text-lg font-semibold text-white">~${data.revenueAtRisk.toLocaleString()}</p>
            </div>
            {data.revenueCalc.length > 0 && (
              <button
                onClick={() => setShowRevenueMath((v) => !v)}
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300 hover:bg-emerald-500/20"
                title="Show calculation"
              >
                <Info size={11} />
                {showRevenueMath ? "Hide math" : "Show math"}
              </button>
            )}
          </div>

          {showRevenueMath && data.revenueCalc.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-emerald-500/15 pt-3">
              {data.revenueCalc.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-emerald-200/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />
                  <span className="leading-5">{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* Customer summary */}
        <Section title="Customer summary">
          <p className="text-sm leading-6 text-zinc-200">{data.summary}</p>
        </Section>

        {/* Reasoning trail — the "why" that builds trust */}
        {data.reasoning.length > 0 && (
          <Section title="Why this score" icon={Sparkles}>
            <ul className="space-y-1.5">
              {data.reasoning.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                  <span className="leading-6">{reason}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Missing info — flags so the owner knows what to ask for */}
        {data.missingInfo.length > 0 && (
          <Section title="Missing info — ask in first reply" icon={AlertCircle}>
            <div className="flex flex-wrap gap-1.5">
              {data.missingInfo.map((field) => (
                <span
                  key={field}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-xs text-amber-200"
                >
                  <AlertCircle size={11} />
                  {MISSING_INFO_LABELS[field] || field}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Suggested reply + functional channel buttons */}
        <Section title="Suggested staff reply" icon={MessageSquareText}>
          <p className="mb-3 text-sm leading-6 text-zinc-100">{data.suggestedReply}</p>

          {/* Real send action bar — deep links opened in new tab */}
          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
            <SendButton
              icon={Mail}
              label="Email"
              channel="email"
              sent={sentChannel === "email"}
              href={channels.email?.href}
              hoverLabel={channels.email?.value}
              onClick={() => handleSend("email", channels.email?.href)}
            />
            <SendButton
              icon={MessageCircle}
              label="SMS"
              channel="sms"
              sent={sentChannel === "sms"}
              href={channels.sms?.href}
              hoverLabel={channels.sms?.value}
              onClick={() => handleSend("sms", channels.sms?.href)}
            />
            <SendButton
              icon={Phone}
              label="WhatsApp"
              channel="whatsapp"
              sent={sentChannel === "whatsapp"}
              href={channels.whatsapp?.href}
              hoverLabel={channels.whatsapp?.value}
              onClick={() => handleSend("whatsapp", channels.whatsapp?.href)}
            />
            <button
              onClick={handleCopy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.08]"
            >
              {copied ? <CheckCheck size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Section>

        {/* Specific follow-up */}
        <Section title="Recommended follow-up">
          <p className="text-sm leading-6 text-zinc-300">{data.followUpAction}</p>
        </Section>
      </div>
    </div>
  );
}

function SendButton({ icon: Icon, label, sent, href, hoverLabel, onClick }) {
  const disabled = !href;
  return (
    <button
      onClick={onClick}
      disabled={disabled || sent}
      title={
        disabled
          ? `No ${label === "Email" ? "email" : "phone"} on file`
          : hoverLabel
          ? `Open in ${label}: ${hoverLabel}`
          : `Open in ${label}`
      }
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
        sent
          ? "bg-emerald-500/15 text-emerald-400"
          : disabled
          ? "cursor-not-allowed border border-line bg-white/[0.02] text-zinc-600"
          : "bg-white text-black hover:bg-zinc-200"
      }`}
    >
      {sent ? <CheckCheck size={13} /> : <Icon size={13} />}
      {sent ? `Opened ${label}` : label}
      {!sent && !disabled && <ExternalLink size={10} className="opacity-60" />}
    </button>
  );
}

function Section({ title, children, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-line bg-black/20 p-4">
      <div className="mb-2 flex items-center gap-2">
        {Icon && <Icon size={16} className="text-zinc-400" />}
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-3 w-64" />
        </div>
        <Shimmer className="h-7 w-24 rounded-full" />
      </div>

      <Shimmer className="mb-5 h-28 rounded-2xl" />
      <Shimmer className="mb-5 h-16 rounded-2xl" />

      <div className="space-y-3">
        <Shimmer className="h-20 rounded-2xl" />
        <Shimmer className="h-24 rounded-2xl" />
        <Shimmer className="h-32 rounded-2xl" />
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500">
        <Sparkles size={12} className="animate-pulse" />
        Gemini is analyzing the lead…
      </p>
    </div>
  );
}

function Shimmer({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white/[0.05] via-white/[0.10] to-white/[0.05] ${className}`}
      style={{ backgroundSize: "200% 100%", animation: "shimmer 1.6s ease-in-out infinite" }}
    />
  );
}