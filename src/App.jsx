import { useMemo, useState } from "react";
import { Sparkles, DollarSign, Clock, TrendingUp, LayoutDashboard } from "lucide-react";
import Header from "./components/Header";
import HeroDemo from "./components/HeroDemo";
import LeadForm from "./components/LeadForm";
import AnalysisPanel from "./components/AnalysisPanel";
import LeadInbox from "./components/LeadInbox";
import MetricCard from "./components/MetricCard";
import Pipeline from "./components/Pipeline";
import ApiKeyBar, { useApiKey } from "./components/ApiKeyBar";
import ContactPanel from "./components/ContactPanel";
import DemoCTA from "./components/DemoCTA";
import RoiCalculator from "./components/RoiCalculator";
import Footer from "./components/Footer";
import { analyzeLead } from "./services/analyzeLead";
import { demoLeads } from "./data/demoLeads";

const TICKET = {
  "Med Spa": 425,
  "Dental Office": 850,
  "Tutoring Center": 600,
  "Home Services": 480,
  "Auto Repair": 380,
  "Fitness Studio": 140,
  "Law Office": 2800
};

export default function App() {
  const [apiKey, setApiKey] = useApiKey();
  const [leads, setLeads] = useState(demoLeads);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(demoLeads[0]?.id ?? null);
  // View modes: "landing" = marketing pitch + live demo (for first-time visitors / prospects)
  //             "workspace" = the actual product (for owners using it daily)
  const [view, setView] = useState("landing");
  // Contact modal is lifted to App level so multiple places can trigger it
  // (header button, in-workspace "send a quick message" CTA, etc.)
  const [contactOpen, setContactOpen] = useState(false);
  // Track whether the visitor has personally analyzed a lead. We use this to
  // gate the in-workspace Demo CTA — only show it after they've experienced
  // the "wow" moment so the CTA feels earned, not pushy.
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId),
    [leads, selectedLeadId]
  );

  // Money & time metrics — these are what business owners actually care about.
  const metrics = useMemo(() => {
    const highPriority = leads.filter(
      (lead) =>
        lead.recommendedAction === "reply_now" ||
        lead.recommendedAction === "reply_today" ||
        lead.priority === "High"
    ).length;

    const revenueAtRisk = leads
      .filter((lead) => lead.status !== "Booked")
      .reduce((sum, lead) => sum + (lead.revenueAtRisk || estimateRevenue(lead)), 0);

    const newLeads = leads.filter((lead) => lead.status === "New").length;
    // Industry benchmark: businesses that reply in <5 min are 21x more likely to qualify a lead.
    // We claim ~93% time-to-reply reduction (6hr avg -> 25s avg with auto-draft).
    const timeSavedMin = leads.length * 12; // 12 min per lead on triage + drafting

    return { highPriority, revenueAtRisk, newLeads, timeSavedMin };
  }, [leads]);

  async function handleAnalyze(formData) {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await analyzeLead(formData, { apiKey });

      const newLead = {
        id: crypto.randomUUID(),
        customerName: formData.name || "New Lead",
        contact: formData.contact || "",
        message: formData.message,
        businessType: formData.businessType,
        service: result.serviceRequested,
        serviceRequested: result.serviceRequested,
        priority: result.leadPriority,
        recommendedAction: result.recommendedAction,
        status: "New",
        score: result.leadScore,
        summary: result.customerSummary,
        suggestedReply: result.suggestedReply,
        followUpAction: result.followUpAction,
        urgency: result.urgency,
        intent: result.intent,
        reasoning: result.reasoning || [],
        missingInfo: result.missingInfo || [],
        revenueAtRisk: result.revenueAtRisk,
        revenueCalc: result.revenueCalc || [],
        createdAt: new Date().toISOString()
      };

      setAnalysis(result);
      setLeads((current) => [newLead, ...current]);
      setSelectedLeadId(newLead.id);
      setHasAnalyzed(true);
    } catch (error) {
      console.error(error);
      const msg = String(error.message || "");
      if (msg.includes("401") || msg.includes("403") || msg.includes("API_KEY")) {
        alert("API key looks invalid or unauthorized. Update it in the bar at the top.");
      } else {
        alert("Lead analysis failed. Check your connection and try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        view={view}
        onViewChange={setView}
        onContactClick={() => setContactOpen(true)}
      />
      <ApiKeyBar apiKey={apiKey} onChange={setApiKey} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {view === "landing" ? (
          <LandingView onEnterApp={() => setView("workspace")} />
        ) : (
          <WorkspaceView
            metrics={metrics}
            leads={leads}
            analysis={analysis}
            selectedLead={selectedLead}
            selectedLeadId={selectedLeadId}
            setSelectedLeadId={setSelectedLeadId}
            isAnalyzing={isAnalyzing}
            handleAnalyze={handleAnalyze}
            hasAnalyzed={hasAnalyzed}
            onContactClick={() => setContactOpen(true)}
          />
        )}
      </main>

      <Footer />

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

function LandingView({ onEnterApp }) {
  return (
    <>
      <section className="mb-10">
        <div className="mb-6 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.06] px-3 py-1 text-sm text-zinc-300">
            <Sparkles size={16} />
            AI lead automation for local businesses
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Every unanswered message is money walking out the door.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            LeadIQ reads every inquiry the second it arrives, scores it,
            drafts the perfect reply in your business's voice, and tells your
            team exactly what to do next. Average response time drops from
            hours to seconds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <LayoutDashboard size={16} />
              Open the workspace
            </button>
            <span className="text-xs text-zinc-500">No signup — try it instantly with your own messages</span>
          </div>
        </div>

        <HeroDemo />
      </section>

      {/* ROI calculator — converts abstract "money walking out" claim into
          a personal number for the visitor's business. Lives here so it
          comes AFTER they see the product in action, building the emotional
          arc: see how it works → see what it'd save you → book a demo. */}
      <section className="mb-10">
        <RoiCalculator />
      </section>
    </>
  );
}

function WorkspaceView({
  metrics,
  leads,
  analysis,
  selectedLead,
  selectedLeadId,
  setSelectedLeadId,
  isAnalyzing,
  handleAnalyze,
  hasAnalyzed,
  onContactClick
}) {
  return (
    <>
      {/* Revenue + time metrics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={DollarSign}
          label="Revenue at risk"
          value={`$${metrics.revenueAtRisk.toLocaleString()}`}
          helper="From unbooked leads in your inbox"
        />
        <MetricCard
          icon={Clock}
          label="Time saved this week"
          value={`${Math.round((metrics.timeSavedMin / 60) * 10) / 10}h`}
          helper="vs. manual triage + drafting"
        />
        <MetricCard
          icon={TrendingUp}
          label="Needs reply soon"
          value={metrics.highPriority}
          helper="Reply now or today"
        />
        <MetricCard
          icon={Sparkles}
          label="New leads"
          value={metrics.newLeads}
          helper="Awaiting first response"
        />
      </section>

      {/* Workspace */}
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <LeadForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          <Pipeline leads={leads} />
        </div>

        <div className="space-y-6">
          <AnalysisPanel
            analysis={analysis}
            selectedLead={selectedLead}
            isAnalyzing={isAnalyzing}
          />
          <LeadInbox
            leads={leads}
            selectedLeadId={selectedLeadId}
            onSelectLead={setSelectedLeadId}
          />
        </div>
      </section>

      {/* In-workspace conversion CTA — only after the visitor has had
          their "wow" moment by analyzing at least one lead themselves. */}
      {hasAnalyzed && (
        <section className="mt-8">
          <DemoCTA onContactClick={onContactClick} />
        </section>
      )}
    </>
  );
}

// Used for the seeded demo leads that don't have a revenueAtRisk field yet.
function estimateRevenue(lead) {
  const ticket = TICKET[lead.businessType] || 400;
  return Math.round(ticket * ((lead.score || 70) / 100));
}