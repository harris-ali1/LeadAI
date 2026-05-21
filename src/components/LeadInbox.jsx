import LeadCard from "./LeadCard";

export default function LeadInbox({ leads, selectedLeadId, onSelectLead }) {
  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Lead inbox</h3>
          <p className="mt-1 text-sm text-zinc-500">
            CRM-style view of captured customer inquiries.
          </p>
        </div>

        <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
          {leads.length} leads
        </span>
      </div>

      <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-1">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            isSelected={lead.id === selectedLeadId}
            onClick={() => onSelectLead(lead.id)}
          />
        ))}
      </div>
    </div>
  );
}