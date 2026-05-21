import { useEffect, useState, useRef } from "react";
import { Sparkles, Zap, Clock, Target, MessageSquareText, ArrowRight } from "lucide-react";

// Three hand-crafted scenarios. The reply text matches what real Gemini would
// produce for each — we keep it scripted in the hero so it's always perfect,
// loads instantly, and never costs an API call. The real demo is below.
const SCENARIOS = [
  {
    vertical: "Med Spa",
    customer: "Maya",
    message:
      "Hi! Do you have Botox availability this Friday? It's my birthday weekend and I'd love to look fresh. Also — what does it usually run?",
    analysis: {
      score: 94,
      priority: "High",
      intent: "Booking",
      urgency: "This week",
      summary:
        "Maya wants Botox before her birthday weekend. Specific date, clear intent, and price-aware — likely ready to book on first reply.",
      reply:
        "Hi Maya! Happy early birthday 🎂 We've got Botox openings Friday at 11am and 2pm — which works better? Pricing depends on units, so we'll confirm at your quick consult when you arrive.",
      reasoning: [
        "Mentioned specific date — Friday",
        "Personal event tied to deadline — birthday",
        "Asked about pricing — buying signal"
      ],
      revenueAtRisk: 425
    }
  },
  {
    vertical: "Home Services",
    customer: "Marcus",
    message:
      "My AC just died and it's 98 degrees in the house. Wife and 2 kids home. Can someone come TODAY??",
    analysis: {
      score: 98,
      priority: "High",
      intent: "Booking",
      urgency: "Immediate",
      summary:
        "Marcus has a complete AC failure with kids in a hot house. Emergency-level urgency — every minute of delay risks losing this lead to a competitor.",
      reply:
        "Marcus — got you. I'm dispatching a tech now, ETA 60-90 min. I'll text you the tech's name and arrival window in the next 5 minutes. Diagnostic is $89 and gets waived if we do the repair.",
      reasoning: [
        "Emergency situation — no AC + kids",
        "Used 'TODAY' in caps — extreme urgency",
        "Specific temperature mentioned — real distress"
      ],
      revenueAtRisk: 680
    }
  },
  {
    vertical: "Tutoring Center",
    customer: "Jennifer",
    message:
      "My daughter Sophie has her Algebra 2 final next Thursday and she's really struggling. Do you have evening sessions?",
    analysis: {
      score: 89,
      priority: "High",
      intent: "Booking",
      urgency: "This week",
      summary:
        "Parent (Jennifer) seeking urgent algebra help for daughter Sophie before Thursday's final. Clear deadline, named student, asking about specifics — high conversion likelihood.",
      reply:
        "Hi Jennifer! Sophie's timing is actually perfect for a focused review. We have evening sessions Mon/Tue/Wed this week at 5pm and 7pm. Want to start with a free 30-minute assessment tonight or tomorrow?",
      reasoning: [
        "Hard deadline — Thursday final",
        "Named the student — Sophie",
        "Asked about specific availability — evenings"
      ],
      revenueAtRisk: 480
    }
  }
];

// Tweak these to change the pace of the animation.
const TYPING_SPEED_MS = 18;       // per character of customer message
const REPLY_SPEED_MS = 14;        // per character of streamed AI reply
const ANALYSIS_REVEAL_MS = 280;   // gap between analysis fields appearing
const PAUSE_BEFORE_NEXT_MS = 4200; // hold the finished state before cycling

export default function HeroDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing -> analyzing -> revealing -> done
  const [typedMessage, setTypedMessage] = useState("");
  const [streamedReply, setStreamedReply] = useState("");
  const [revealedFields, setRevealedFields] = useState(0);
  const timersRef = useRef([]);

  const scenario = SCENARIOS[scenarioIdx];

  // Helper to track timeouts so we can clean up on unmount/scenario change.
  function schedule(fn, ms) {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }

  useEffect(() => {
    // Reset everything when scenario changes.
    setTypedMessage("");
    setStreamedReply("");
    setRevealedFields(0);
    setPhase("typing");

    // 1. Type out the customer message character by character.
    const msg = scenario.message;
    for (let i = 1; i <= msg.length; i++) {
      schedule(() => setTypedMessage(msg.slice(0, i)), i * TYPING_SPEED_MS);
    }

    const typingDoneAt = msg.length * TYPING_SPEED_MS + 350;

    // 2. Brief "analyzing" beat.
    schedule(() => setPhase("analyzing"), typingDoneAt);

    // 3. Start revealing analysis fields one at a time.
    const revealStartAt = typingDoneAt + 700;
    schedule(() => setPhase("revealing"), revealStartAt);

    // We reveal: score, intent, urgency, summary, reply (5 fields)
    for (let i = 1; i <= 5; i++) {
      schedule(() => setRevealedFields(i), revealStartAt + i * ANALYSIS_REVEAL_MS);
    }

    // 4. Once the reply field appears, stream the reply text.
    const replyStartAt = revealStartAt + 5 * ANALYSIS_REVEAL_MS + 200;
    const reply = scenario.analysis.reply;
    for (let i = 1; i <= reply.length; i++) {
      schedule(() => setStreamedReply(reply.slice(0, i)), replyStartAt + i * REPLY_SPEED_MS);
    }

    const replyDoneAt = replyStartAt + reply.length * REPLY_SPEED_MS + 200;
    schedule(() => setPhase("done"), replyDoneAt);

    // 5. Hold, then cycle to the next scenario.
    schedule(() => {
      setScenarioIdx((idx) => (idx + 1) % SCENARIOS.length);
    }, replyDoneAt + PAUSE_BEFORE_NEXT_MS);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioIdx]);

  return (
    <div className="rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur sm:p-8">
      {/* Header strip with vertical pills */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live demo — watch a real lead get processed
        </div>

        <div className="flex gap-1.5">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.vertical}
              onClick={() => setScenarioIdx(i)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                i === scenarioIdx
                  ? "bg-white text-black"
                  : "border border-line bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]"
              }`}
            >
              {s.vertical}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* LEFT: incoming customer message */}
        <div className="rounded-2xl border border-line bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">
              Incoming message
            </span>
            <span className="text-[11px] text-zinc-500">{scenario.vertical}</span>
          </div>

          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 text-sm font-semibold text-black">
              {scenario.customer[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{scenario.customer}</p>
              <p className="text-[11px] text-zinc-500">just now</p>
            </div>
          </div>

          <p className="min-h-[6rem] text-[15px] leading-7 text-zinc-200">
            {typedMessage}
            {phase === "typing" && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white align-middle" />}
          </p>
        </div>

        {/* RIGHT: AI analysis appearing */}
        <div className="rounded-2xl border border-line bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">
              AI analysis
            </span>
            {phase === "analyzing" && (
              <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <Sparkles size={11} className="animate-spin" />
                Thinking…
              </span>
            )}
          </div>

          {/* Score + Priority bar */}
          <div className={`mb-4 transition-all duration-500 ${revealedFields >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <div className="mb-1.5 flex items-end justify-between">
              <span className="text-[11px] text-zinc-500">Lead score</span>
              <span className="text-xs font-medium text-white">
                {revealedFields >= 1 ? `${scenario.analysis.score}/100` : "—"}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  scenario.analysis.priority === "High" ? "bg-white text-black" : "bg-zinc-700 text-white"
                }`}>
                  {scenario.analysis.priority}
                </span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-white transition-all duration-700 ease-out"
                style={{ width: revealedFields >= 1 ? `${scenario.analysis.score}%` : "0%" }}
              />
            </div>
          </div>

          {/* Intent + Urgency chips */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            <Chip
              icon={Target}
              label="Intent"
              value={scenario.analysis.intent}
              visible={revealedFields >= 2}
            />
            <Chip
              icon={Clock}
              label="Urgency"
              value={scenario.analysis.urgency}
              visible={revealedFields >= 3}
            />
          </div>

          {/* Summary */}
          <div className={`mb-4 transition-all duration-500 ${revealedFields >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">Summary</p>
            <p className="text-sm leading-6 text-zinc-300">
              {revealedFields >= 4 ? scenario.analysis.summary : ""}
            </p>
          </div>

          {/* Streamed reply */}
          <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-500 ${revealedFields >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500">
              <MessageSquareText size={11} />
              Suggested reply
            </p>
            <p className="min-h-[4.5rem] text-sm leading-6 text-white">
              {streamedReply}
              {phase !== "done" && revealedFields >= 5 && (
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white align-middle" />
              )}
            </p>

            {phase === "done" && (
              <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="text-[11px] text-zinc-500">
                  💰 ~${scenario.analysis.revenueAtRisk} at risk if ignored
                </span>
                <ArrowRight size={12} className="ml-auto text-zinc-600" />
                <span className="text-[11px] font-medium text-emerald-400">Ready to send</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ icon: Icon, label, value, visible }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border border-line bg-black/30 px-3 py-2 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <Icon size={13} className="text-zinc-500" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p>
        <p className="truncate text-xs font-medium text-white">{visible ? value : "—"}</p>
      </div>
    </div>
  );
}