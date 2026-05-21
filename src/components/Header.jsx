import { useState, useEffect } from "react";
import { Bot, Mail, LayoutDashboard, Globe, MessageCircle, Menu, X } from "lucide-react";

// Your Cal.com booking link — taskiq.
// If you change usernames or event types later, just update CAL_LINK here.
const CAL_LINK = "https://cal.com/taskiq";

export default function Header({ view, onViewChange, onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to close the mobile menu after the user picks something.
  function handleMobileAction(action) {
    setMobileMenuOpen(false);
    action?.();
  }

  // Close the mobile menu when the viewport grows past mobile breakpoint.
  // Otherwise opening on mobile then rotating/resizing leaves it stuck open.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
<header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
    {/* Logo + name */}
    <div className="flex min-w-0 items-center gap-3">
      {/* Your custom image logo wrapper */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-line bg-white">
        <img 
          src="/TIQlogo.png" 
          alt="TaskIQ Logo" 
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold text-white sm:text-lg">
          TaskIQ Assistant
        </h2>
        <p className="hidden text-xs text-zinc-500 sm:block">
          AI lead intake and reply automation
        </p>
      </div>
    </div>

        {/* DESKTOP: view toggle in the middle (md+) */}
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

        {/* DESKTOP: action buttons (md+) */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]"
          >
            <MessageCircle size={16} />
            Contact
          </button>

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

        {/* MOBILE: hamburger button (< md) */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-white transition hover:bg-white/[0.08] md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* MOBILE: dropdown panel */}
      {mobileMenuOpen && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6">
            {/* View toggle as full-width pills */}
            {view && onViewChange && (
              <div className="grid grid-cols-2 gap-2">
                <MobileNavItem
                  active={view === "landing"}
                  onClick={() => handleMobileAction(() => onViewChange("landing"))}
                  icon={Globe}
                  label="Landing"
                />
                <MobileNavItem
                  active={view === "workspace"}
                  onClick={() => handleMobileAction(() => onViewChange("workspace"))}
                  icon={LayoutDashboard}
                  label="Workspace"
                />
              </div>
            )}

            {/* Contact + Book a Demo */}
            <div className="space-y-2 border-t border-line pt-3">
              <button
                onClick={() => handleMobileAction(onContactClick)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08]"
              >
                <MessageCircle size={16} />
                Contact
              </button>

              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                <Mail size={16} />
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
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

function MobileNavItem({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-white text-black"
          : "border border-line bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}