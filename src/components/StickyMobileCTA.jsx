import { useEffect, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const CAL_LINK = "https://cal.com/taskiq";

// Sticky mobile CTA — only shows on mobile (< md breakpoint), and only after
// the user has scrolled past the hero. Lets them convert from any scroll
// position without scrolling back up to find a button.
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after the user scrolls past ~600px (roughly past the hero).
    // We don't want it appearing immediately or it feels desperate.
    function handleScroll() {
      const scrolled = window.scrollY;
      setVisible(scrolled > 600);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position too

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Once dismissed, stay dismissed for the rest of the session.
  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // safe-area-inset-bottom respects iPhone notch / home indicator.
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      <div className="border-t border-line bg-ink/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition active:scale-[0.98]"
          >
            <Mail size={15} />
            Book a 15-min demo
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-zinc-400 transition active:scale-[0.95]"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}