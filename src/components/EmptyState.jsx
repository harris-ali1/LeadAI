import { Sparkles } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-3xl bg-white text-black">
        <Sparkles size={24} />
      </div>

      <h3 className="text-lg font-semibold text-white">No lead analyzed yet</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        Enter a customer message and the assistant will generate a summary,
        lead score, suggested reply, and follow-up action.
      </p>
    </div>
  );
}