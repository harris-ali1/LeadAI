import { useState } from "react";
import { Bot, Mail, LayoutDashboard, Globe, MessageCircle } from "lucide-react";
import ContactPanel from "./ContactPanel";

// Your Cal.com booking link — taskiq.
// If you change usernames or event types later, just update CAL_LINK here.
const CAL_LINK = "https://cal.com/taskiq";

export default function Header({ view, onViewChange }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-black">
              <Bot size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                LeadIQ Assistant
              </h2>
              <p className="text-xs text-zinc-500">
                AI lead intake and reply automation
              </p>
            </div>
          </div>

          {/* View toggle — separates the marketing pitch from the actual app */}
          {view && onViewChange && (
            <div className="hidden items-center rounded-2xl border border-line bg-white/[0.04] p-1 md:flex">
              <ToggleButton
                active={view === "landing"}
                onClick={() => onViewChange("landing")}
                icon={Globe}
                label="Landing"
              />
              <ToggleButton
                active={view === "workspace"}
                onClick={() => onViewChange("workspace")}
                icon={LayoutDashboard}
                label="Workspace"
              />
            </div>
          )}

          <div className="hidden items-center gap-2 sm:flex">
            {/* Contact — opens modal with Formspree form + Instagram + email */}
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]"
            >
              <MessageCircle size={16} />
              Contact
            </button>

            {/* Book a Demo — opens Cal.com in new tab. Anchor (not button) so middle-click/right-click work. */}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Mail size={16} />
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function ToggleButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-white text-black"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}