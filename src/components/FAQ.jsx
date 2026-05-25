import { useState } from "react";
import { ChevronDown, HelpCircle, Mail, ArrowRight } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

// Questions ordered by what would block a sale first. Setup time is the #1
// objection ("I don't have time to learn another tool"). Cancellation is
// #2 because monthly SaaS feels like commitment.
const FAQS = [
  {
    q: "How long does setup take?",
    a: "About one afternoon. We onboard you personally — you don't have to configure anything technical. We connect your channels (phone, Instagram, web form), tune the AI to your business's voice, and you're live the same day. No code, no IT department, no migration."
  },
  {
    q: "Do I need to change my phone number or website?",
    a: "No. TaskIQ plugs into what you already have. We use a forwarding number for SMS so customers still text the same number you've always used, and our website form is a snippet you paste — no rebuild required."
  },
  {
    q: "What if the AI writes a weird reply?",
    a: "In Assisted mode (the default), every reply needs your tap to send. You see the draft, tweak it if you want, and send. Auto-reply mode is opt-in and only kicks in for verified high-confidence leads where the AI is sure. You stay in control."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no minimums. Cancel anytime, your data exports automatically. Founding clients keep their locked-in rate for life as long as they stay."
  },
  {
    q: "What channels does it work with?",
    a: "Today: SMS, website contact forms, Instagram DMs, WhatsApp Business, and email. Google Business Messages and Facebook Messenger are coming next. If you have a channel we don't support yet, tell us — we add fast."
  },
  {
    q: "How is this different from ChatGPT or just hiring a VA?",
    a: "ChatGPT doesn't know your business, your prices, your availability, or your voice — and it doesn't connect to your channels. A VA is $1,500+/month and asleep at night when leads come in. TaskIQ replies in under 30 seconds, 24/7, for a fraction of the cost."
  },
  {
    q: "What does it cost?",
    a: "Founding clients pay $49/month for the first 3 months, then $149/month. No setup fee. We're limiting the founding rate to the first 5 businesses per vertical — after that, regular pricing applies."
  },
  {
    q: "Is my customer data safe?",
    a: "Yes. We don't sell or share data with anyone. Customer messages are processed by Google's Gemini API (the same security tier as enterprise Google Workspace) and stored only as long as needed to deliver the service. Full privacy policy on the site."
  }
];

export default function FAQ({ onContactClick }) {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  function toggle(index) {
    setOpenIndex(openIndex === index ? -1 : index);
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 py-1.5 text-base font-semibold text-zinc-300">
          <HelpCircle size={14} />
          Frequently asked
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Questions, answered honestly.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          The things every business owner asks before signing up.
        </p>
      </div>

      {/* Accordion */}
      <div className="mx-auto max-w-3xl space-y-2">
        {FAQS.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Bottom CTA — for prospects who STILL have questions */}
      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line bg-black/30 p-5 sm:p-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white">
              Still have questions?
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Hop on a 15-min call or send us a message — happy to walk through anything.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Mail size={14} />
              Book a demo
              <ArrowRight size={13} />
            </a>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
              >
                Send a message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition ${
        isOpen
          ? "border-white/20 bg-white/[0.04]"
          : "border-line bg-black/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm font-medium ${
            isOpen ? "text-white" : "text-zinc-200"
          } sm:text-base`}
        >
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-zinc-400 transition ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Answer panel — animated height via grid-rows trick. Plays nice with
          variable-length content without measuring heights in JS. */}
      <div
        className={`grid transition-all ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-6 text-zinc-400">{answer}</p>
        </div>
      </div>
    </div>
  );
}