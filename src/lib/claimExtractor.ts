// ═══════════════════════════════════════════════════════════════════
// Claim-level extraction and classification
// ═══════════════════════════════════════════════════════════════════

import {
  absolutePatterns,
  credibilityPatterns,
  medicalMisinfo,
  opinionMarkers,
} from "./patterns";

export interface Claim {
  text: string;
  type: "verifiable" | "vague" | "opinion" | "absolute" | "medical_misinfo";
  credible: boolean;
  reason: string;
  severity: number; // 0-1 how problematic
}

// Known false claims database (common misinformation)
const knownFalseClaims: { pattern: string; category: string }[] = [
  { pattern: "lemon water cures cancer", category: "medical_falsehood" },
  { pattern: "drinking bleach", category: "dangerous_medical" },
  { pattern: "vaccine causes autism", category: "debunked_claim" },
  { pattern: "vaccines cause autism", category: "debunked_claim" },
  { pattern: "earth is flat", category: "debunked_claim" },
  { pattern: "5g causes covid", category: "debunked_claim" },
  { pattern: "5g causes coronavirus", category: "debunked_claim" },
  { pattern: "microchip in vaccine", category: "conspiracy" },
  { pattern: "bill gates microchip", category: "conspiracy" },
  { pattern: "moon landing was faked", category: "debunked_claim" },
  { pattern: "moon landing was fake", category: "debunked_claim" },
  { pattern: "climate change is a hoax", category: "debunked_claim" },
  { pattern: "global warming is fake", category: "debunked_claim" },
  { pattern: "evolution is a lie", category: "debunked_claim" },
  { pattern: "covid is fake", category: "debunked_claim" },
  { pattern: "covid was created in a lab", category: "unverified" },
  { pattern: "hydroxychloroquine cures", category: "debunked_claim" },
  { pattern: "ivermectin cures covid", category: "debunked_claim" },
  { pattern: "birds aren't real", category: "satire_conspiracy" },
  { pattern: "reptilian", category: "conspiracy" },
  { pattern: "adrenochrome", category: "conspiracy" },
  { pattern: "pizzagate", category: "debunked_conspiracy" },
  { pattern: "qanon", category: "conspiracy" },
  { pattern: "stolen election", category: "disputed_political" },
  { pattern: "jfk is alive", category: "conspiracy" },
  { pattern: "tupac is alive", category: "conspiracy" },
  { pattern: "elvis is alive", category: "conspiracy" },
];

export function extractClaims(text: string): Claim[] {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
  const claims: Claim[] = [];

  for (const sentence of sentences.slice(0, 10)) {
    const lower = sentence.toLowerCase();

    // 1. Check known false claims first (highest priority)
    const knownFalse = knownFalseClaims.find((kf) => lower.includes(kf.pattern));
    if (knownFalse) {
      claims.push({
        text: sentence,
        type: "medical_misinfo",
        credible: false,
        reason: `Matches known ${knownFalse.category.replace(/_/g, " ")} — contradicts established evidence and scientific consensus`,
        severity: 1.0,
      });
      continue;
    }

    // 2. Check for medical misinformation patterns
    const medMatch = medicalMisinfo.find((p) => lower.includes(p.pattern));
    if (medMatch && medMatch.weight > 0.7) {
      claims.push({
        text: sentence,
        type: "medical_misinfo",
        credible: false,
        reason: "Contains unverified medical claim without peer-reviewed evidence",
        severity: medMatch.weight,
      });
      continue;
    }

    // 3. Check for absolute/conspiracy claims
    const absMatch = absolutePatterns.find((p) => lower.includes(p.pattern));
    if (absMatch) {
      claims.push({
        text: sentence,
        type: "absolute",
        credible: false,
        reason: "Contains absolute or conspiracy language without verifiable evidence",
        severity: absMatch.weight,
      });
      continue;
    }

    // 4. Check for opinion markers
    const isOpinion = opinionMarkers.some((w) => lower.includes(w));
    if (isOpinion) {
      claims.push({
        text: sentence,
        type: "opinion",
        credible: false,
        reason: "Opinion or subjective assertion stated as fact — not independently verifiable",
        severity: 0.4,
      });
      continue;
    }

    // 5. Check for verifiable content
    const hasCredibleSource = credibilityPatterns.some(
      (p) => p.weight >= 0.5 && lower.includes(p.pattern)
    );
    const hasSpecificData =
      /\b\d+(\.\d+)?%/.test(sentence) ||
      /\b\d{4}\b/.test(sentence) ||
      /\b\d+\s*(million|billion|thousand|trillion)\b/i.test(sentence);
    const hasNamedEntity = /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(sentence);
    const hasURL = /https?:\/\/|www\./.test(sentence);
    const hasQuote = /[""\u201C].*?[""\u201D]/.test(sentence) || /".*?"/.test(sentence);
    const hasDate = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}/i.test(sentence) ||
      /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(sentence);

    const verifiableSignals =
      (hasCredibleSource ? 2 : 0) +
      (hasSpecificData ? 1.5 : 0) +
      (hasNamedEntity ? 1 : 0) +
      (hasURL ? 1 : 0) +
      (hasQuote ? 1.5 : 0) +
      (hasDate ? 1 : 0);

    if (verifiableSignals >= 2) {
      const reasons: string[] = [];
      if (hasCredibleSource) reasons.push("cites a credible source");
      if (hasSpecificData) reasons.push("includes specific data");
      if (hasNamedEntity) reasons.push("names identifiable entities");
      if (hasQuote) reasons.push("contains attributed quotes");
      if (hasDate) reasons.push("references specific dates");
      if (hasURL) reasons.push("links to external source");

      claims.push({
        text: sentence,
        type: "verifiable",
        credible: true,
        reason: `Verifiable claim — ${reasons.join(", ")}`,
        severity: 0,
      });
    } else {
      claims.push({
        text: sentence,
        type: "vague",
        credible: false,
        reason: "Vague assertion without named sources, specific data, dates, or traceable evidence",
        severity: 0.3,
      });
    }
  }

  return claims;
}
