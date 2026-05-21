import { CalendarDays, Mail } from "lucide-react";
import { formatDate, getPriorityClasses } from "../lib/utils";

export default function LeadCard({ lead, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-white/40 bg-white/[0.10]"
          : "border-line bg-black/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-white">{lead.customerName}</h4>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <Mail size={13} />
            {lead.contact}
          </p>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityClasses(lead.priority)}`}>
          {lead.priority}
        </span>
      </div>

      <p className="mb-3 line-clamp-2 text-sm leading-6 text-zinc-400">
        {lead.summary}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{lead.service}</span>
        <span className="flex items-center gap-1">
          <CalendarDays size={13} />
          {formatDate(lead.createdAt)}
        </span>
      </div>
    </button>
  );
}