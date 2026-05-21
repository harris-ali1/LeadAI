import { Circle, Flame, MessageCircleReply, CheckCircle2 } from "lucide-react";

const columns = [
  {
    label: "New",
    icon: Circle,
    helper: "Fresh inquiries"
  },
  {
    label: "Contacted",
    icon: MessageCircleReply,
    helper: "Reply sent"
  },
  {
    label: "Hot",
    icon: Flame,
    helper: "High intent"
  },
  {
    label: "Booked",
    icon: CheckCircle2,
    helper: "Converted"
  }
];

export default function Pipeline({ leads }) {
  const counts = {
    New: leads.filter((lead) => lead.status === "New").length,
    Contacted: leads.filter((lead) => lead.status === "Contacted").length,
    Hot: leads.filter((lead) => lead.priority === "High").length,
    Booked: leads.filter((lead) => lead.status === "Booked").length
  };

  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur">
      <h3 className="text-xl font-semibold text-white">Lead pipeline</h3>
      <p className="mt-1 text-sm text-zinc-500">
        Shows how this could fit into a simple CRM workflow.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {columns.map((column) => {
          const Icon = column.icon;

          return (
            <div key={column.label} className="rounded-2xl border border-line bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                  <Icon size={16} />
                </div>

                <span className="text-2xl font-semibold text-white">
                  {counts[column.label] ?? 0}
                </span>
              </div>

              <p className="text-sm font-medium text-white">{column.label}</p>
              <p className="mt-1 text-xs text-zinc-500">{column.helper}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}