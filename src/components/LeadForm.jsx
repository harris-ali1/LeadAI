import { useState } from "react";
import { Loader2, Send, Wand2 } from "lucide-react";

// Each sample is designed to stress-test the analyzer:
// real product/vehicle details, real urgency signals, real deadlines.
const SAMPLES = [
  {
    businessType: "Auto Repair",
    name: "Sarah Johnson",
    contact: "sarah@example.com, 832-555-0117",
    message:
      "Hi! My 2019 Toyota Camry has had a check engine light on for 3 days. I drive to work daily and I'm worried. Can you do diagnostics this week?"
  },
  {
    businessType: "Med Spa",
    name: "Maya Patel",
    contact: "maya@example.com",
    message:
      "Do you have Botox availability this Friday? It's my birthday weekend and I'd love to look fresh. Also — what does it usually run?"
  },
  {
    businessType: "Home Services",
    name: "Marcus Lee",
    contact: "415-555-0199",
    message:
      "My AC just died and it's 98 degrees in the house. Wife and 2 kids home. Can someone come TODAY??"
  },
  {
    businessType: "Tutoring Center",
    name: "Jennifer Adams",
    contact: "jen.adams@example.com",
    message:
      "My daughter Sophie has her Algebra 2 final next Thursday and she's really struggling with quadratics. Do you have evening sessions?"
  },
  {
    businessType: "Dental Office",
    name: "Daniel Kim",
    contact: "daniel@example.com",
    message:
      "I need teeth whitening before a wedding in 3 weeks. Can you send me prices and what's available evenings?"
  }
];

export default function LeadForm({ onAnalyze, isAnalyzing }) {
  const [formData, setFormData] = useState(SAMPLES[0]);

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.message.trim()) return;

    onAnalyze(formData);
  }

  function useSampleMessage() {
    // Pick a different sample than the current one.
    const others = SAMPLES.filter((s) => s.message !== formData.message);
    const pool = others.length ? others : SAMPLES;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setFormData(next);
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Analyze a new lead</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Paste a customer inquiry and let AI turn it into a structured lead.
          </p>
        </div>

        <button
          type="button"
          onClick={useSampleMessage}
          className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]"
        >
          <Wand2 size={16} />
          Sample
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Business type
          </label>
          <select
            value={formData.businessType}
            onChange={(event) => updateField("businessType", event.target.value)}
            className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          >
            <option>Med Spa</option>
            <option>Dental Office</option>
            <option>Tutoring Center</option>
            <option>Home Services</option>
            <option>Auto Repair</option>
            <option>Fitness Studio</option>
            <option>Law Office</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Customer name
            </label>
            <input
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Sarah Johnson"
              className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Contact
            </label>
            <input
              value={formData.contact}
              onChange={(event) => updateField("contact", event.target.value)}
              placeholder="email and/or phone"
              className="w-full rounded-2xl border border-line bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
            />
            <p className="mt-1 text-[11px] text-zinc-600">
              Include both for working Email + SMS + WhatsApp buttons
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Customer message
          </label>
          <textarea
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={6}
            placeholder="Paste customer message here..."
            className="w-full resize-none rounded-2xl border border-line bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Analyzing lead...
            </>
          ) : (
            <>
              <Send size={18} />
              Analyze Lead
            </>
          )}
        </button>
      </form>
    </div>
  );
}