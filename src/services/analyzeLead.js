import { createMockLeadAnalysis } from "../lib/leadScoring";
import { callGemini } from "./geminiClient";

export async function analyzeLead(formData, { apiKey } = {}) {
  // If we have a key, use real Gemini. Otherwise, demo-mode fallback so
  // the page never feels broken for a curious visitor without a key.
  if (apiKey) {
    try {
      return await callGemini({ apiKey, formData });
    } catch (err) {
      console.warn("Gemini call failed, falling back to mock:", err.message);
      // Re-throw auth errors so the UI can prompt for a new key.
      if (String(err.message).includes("401") || String(err.message).includes("403")) {
        throw err;
      }
      // For other errors, degrade gracefully.
      await wait(600);
      return createMockLeadAnalysis(formData);
    }
  }

  await wait(900);
  return createMockLeadAnalysis(formData);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}