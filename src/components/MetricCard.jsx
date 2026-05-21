export default function MetricCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-white/[0.04] p-5 backdrop-blur">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
        <Icon size={18} />
      </div>

      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-zinc-500">{helper}</p>
    </div>
  );
}