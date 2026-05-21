import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Update these in one place if handles ever change.
const INSTAGRAM_URL = "https://instagram.com/techiqstack";
const LINKEDIN_URL = "https://www.linkedin.com/in/harris-ali1/";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        {/* Copyright + privacy link */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-xs text-zinc-500">
            © {year} TaskIQ · Built in Texas
          </p>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <Link
            to="/privacy"
            className="text-xs text-zinc-500 transition hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          <SocialIcon
            href={INSTAGRAM_URL}
            label="Instagram — @techiqstack"
            icon={FaInstagram}
          />
          <SocialIcon
            href={LINKEDIN_URL}
            label="LinkedIn — Harris Ali"
            icon={FaLinkedinIn}
          />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.10] hover:text-white"
    >
      <Icon size={15} />
    </a>
  );
}