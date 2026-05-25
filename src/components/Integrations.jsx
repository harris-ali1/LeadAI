import { FaInstagram, FaWhatsapp, FaFacebookMessenger, FaGoogle } from "react-icons/fa";
import { MessageSquare, Mail, Globe, Phone, Sparkles } from "lucide-react";

// Channels TaskIQ plugs into. Order matters — most-used first.
// "Coming soon" honestly flagged so we don't promise what we don't have.
const CHANNELS = [
  { name: "SMS", icon: MessageSquare, status: "live" },
  { name: "Website forms", icon: Globe, status: "live" },
  { name: "Instagram DMs", icon: FaInstagram, status: "live" },
  { name: "WhatsApp", icon: FaWhatsapp, status: "live" },
  { name: "Email", icon: Mail, status: "live" },
  { name: "Phone calls", icon: Phone, status: "soon" },
  { name: "Google Business", icon: FaGoogle, status: "soon" },
  { name: "Messenger", icon: FaFacebookMessenger, status: "soon" }
];

export default function Integrations() {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur sm:p-8">
      <div className="mb-6 text-center">
        <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500">
          <Sparkles size={11} />
          Works with what you already use
        </p>
        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          Every channel your customers reach out on.
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CHANNELS.map((channel) => (
          <ChannelBadge key={channel.name} {...channel} />
        ))}
      </div>
    </div>
  );
}

function ChannelBadge({ name, icon: Icon, status }) {
  const isLive = status === "live";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 transition ${
        isLive
          ? "border-line bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]"
          : "border-line bg-black/30 text-zinc-500"
      }`}
    >
      <Icon size={14} className={isLive ? "text-white" : "text-zinc-600"} />
      <span className="text-xs font-medium">{name}</span>
      {!isLive && (
        <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300">
          Soon
        </span>
      )}
    </div>
  );
}
