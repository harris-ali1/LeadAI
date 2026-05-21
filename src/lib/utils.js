export function getPriorityClasses(priority) {
  switch (priority) {
    case "High":
      return "bg-white text-black";
    case "Medium":
      return "bg-zinc-700 text-white";
    case "Low":
      return "bg-zinc-900 text-zinc-300";
    default:
      return "bg-zinc-800 text-zinc-300";
  }
}

export function getActionClasses(tone) {
  switch (tone) {
    case "urgent":
      return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    case "high":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    case "medium":
      return "bg-sky-500/10 text-sky-300 border-sky-500/25";
    case "low":
      return "bg-zinc-800 text-zinc-400 border-zinc-700";
    default:
      return "bg-zinc-800 text-zinc-300 border-zinc-700";
  }
}

export function getScoreColor(score) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 65) return "text-amber-300";
  if (score >= 45) return "text-sky-300";
  return "text-zinc-400";
}

export function getScoreBarColor(score) {
  if (score >= 85) return "from-emerald-400 to-emerald-300";
  if (score >= 65) return "from-amber-400 to-amber-300";
  if (score >= 45) return "from-sky-400 to-sky-300";
  return "from-zinc-500 to-zinc-400";
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(dateString));
}