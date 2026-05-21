import { useState, useEffect } from "react";
import { X, Send, Mail, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdwelok";
const INSTAGRAM_HANDLE = "techiqstack";
const EMAIL_ADDRESS = "techiq7619@gmail.com";

export default function ContactPanel({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape key — small UX nicety that makes modals feel native.
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Reset form state when modal closes so reopening is fresh.
  useEffect(() => {
    if (!open) {
      // Slight delay so we don't see fields wipe during the close animation.
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Email and message are required.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business: formData.business,
          message: formData.message,
          _subject: `LeadIQ contact from ${formData.name || formData.email}`
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || "Submission failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", business: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Try Instagram or email instead.");
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-line bg-[#0f0f0f] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line p-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Get in touch</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Send a message, DM, or email — whichever you prefer.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick contact links (Instagram + Email) */}
        <div className="grid grid-cols-2 gap-2 border-b border-line bg-black/30 p-4">
          <QuickContact
            icon={FaInstagram}
            label="Instagram"
            value={`@${INSTAGRAM_HANDLE}`}
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          />
          <QuickContact
            icon={Mail}
            label="Email"
            value={EMAIL_ADDRESS}
            href={`mailto:${EMAIL_ADDRESS}?subject=LeadIQ%20inquiry`}
          />
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-lg font-semibold text-white">Message sent</h4>
            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
              Thanks for reaching out. I'll reply within 24 hours, usually much sooner.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-2xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                value={formData.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Your name"
              />
              <Field
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(v) => updateField("email", v)}
                placeholder="you@example.com"
              />
            </div>

            <Field
              label="Business"
              value={formData.business}
              onChange={(v) => updateField("business", v)}
              placeholder="What kind of business do you run?"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                required
                rows={4}
                placeholder="Tell me a bit about what you're looking for…"
                className="w-full resize-none rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
              />
            </div>

            {status === "error" && (
              <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send message
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-zinc-600">
              Form delivered via Formspree. Your details are never shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function QuickContact({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.03] p-3 transition hover:bg-white/[0.08]"
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black">
        <Icon size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
        <p className="truncate text-xs font-medium text-white">{value}</p>
      </div>
      <ExternalLink size={12} className="shrink-0 text-zinc-600 transition group-hover:text-zinc-300" />
    </a>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
      />
    </div>
  );
}