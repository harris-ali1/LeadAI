import { useEffect, useState } from "react";
import { Key, Check, X, ExternalLink } from "lucide-react";

const STORAGE_KEY = "leadiq_gemini_key";

export function useApiKey() {
  const [apiKey, setApiKey] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      if (apiKey) sessionStorage.setItem(STORAGE_KEY, apiKey);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [apiKey]);

  return [apiKey, setApiKey];
}

export default function ApiKeyBar({ apiKey, onChange }) {
  const [draft, setDraft] = useState(apiKey || "");
  const [expanded, setExpanded] = useState(!apiKey);
  const hasKey = Boolean(apiKey);

  function save() {
    onChange(draft.trim());
    setExpanded(false);
  }

  function clear() {
    setDraft("");
    onChange("");
    setExpanded(true);
  }

  return (
    <div className="border-b border-line bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        {!expanded ? (
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              {hasKey ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Gemini API key connected — real AI responses active</span>
                </>
              ) : (
                <>
                  <Key size={14} className="text-zinc-500" />
                  <span>Demo mode (using mock AI) — add a Gemini key for real responses</span>
                </>
              )}
            </div>
            <button
              onClick={() => setExpanded(true)}
              className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
            >
              {hasKey ? "Change" : "Add key"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Key size={14} />
              <span>Gemini API key:</span>
            </div>
            <input
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="AIza…"
              className="flex-1 rounded-xl border border-line bg-black/30 px-3 py-1.5 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-white/40"
            />
            <div className="flex items-center gap-2">
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-line bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.08]"
              >
                Get one <ExternalLink size={11} />
              </a>
              <button
                onClick={save}
                className="rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
              >
                Save
              </button>
              {hasKey && (
                <button
                  onClick={clear}
                  className="rounded-xl border border-line bg-white/[0.04] p-1.5 text-zinc-400 hover:bg-white/[0.08]"
                  title="Clear key"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}