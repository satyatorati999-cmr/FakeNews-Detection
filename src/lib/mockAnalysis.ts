// ═══════════════════════════════════════════════════════════════════
// Claim-Level Credibility Analysis Engine v3.0
// Multi-dimensional scoring with 200+ signal patterns
// In production, this would use a fine-tuned BERT/RoBERTa model
// ═══════════════════════════════════════════════════════════════════

import {
  emotionalPatterns,
  clickbaitPatterns,
  absolutePatterns,
  medicalMisinfo,
  propagandaPatterns,
  credibilityPatterns,
  balancePatterns,
  satirePatterns,
  type PatternEntry,
} from "./patterns";

import { extractClaims, type Claim } from "./claimExtractor";

export type { Claim };

export interface AnalysisResult {
  prediction: "Likely Reliable" | "Questionable" | "Likely Fake";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
  claims: Claim[];
  needsVerification: string[];
  dimensions: {
    emotionalScore: number;
    clickbaitScore: number;
    conspiracyScore: number;
    medicalMisinfoScore: number;
    propagandaScore: number;
    credibilityScore: number;
    balanceScore: number;
    structuralScore: number;
  };
}

// ── Pattern scanner ───────────────────────────────────────────────

function scanPatterns(
  text: string,
  patterns: PatternEntry[],
  suspicious: boolean,
  foundWords: { word: string; weight: number; suspicious: boolean }[]
): number {
  let score = 0;
  const lower = text.toLowerCase();
  for (const { pattern, weight } of patterns) {
    if (lower.includes(pattern)) {
      score += weight;
      foundWords.push({ word: pattern, weight, suspicious });
    }
  }
  return score;
}

// ── Structural analysis ───────────────────────────────────────────

function analyzeStructure(text: string): {
  score: number;
  signals: { word: string; weight: number; suspicious: boolean }[];
  details: {
    capsRatio: number;
    punctuationAbuse: number;
    hasQuotes: boolean;
    hasSpecificData: boolean;
    hasDates: boolean;
    hasURLs: boolean;
    avgSentenceLength: number;
    sentenceCount: number;
    wordCount: number;
    paragraphCount: number;
    readabilityScore: number;
  };
} {
  const signals: { word: string; weight: number; suspicious: boolean }[] = [];
  let positiveScore = 0;
  let negativeScore = 0;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const avgSentenceLength = wordCount / Math.max(sentenceCount, 1);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  // CAPS abuse
  const capsWords = text.match(/\b[A-Z]{4,}\b/g) || [];
  const capsRatio = capsWords.length / Math.max(wordCount, 1);
  if (capsRatio > 0.03) {
    const w = Math.min(capsRatio * 10, 1);
    negativeScore += w;
    signals.push({ word: "EXCESSIVE CAPS", weight: w, suspicious: true });
  }

  // Punctuation abuse
  const excessivePunct = text.match(/[!?]{2,}/g) || [];
  const punctAbuse = excessivePunct.length;
  if (punctAbuse > 0) {
    const w = Math.min(punctAbuse * 0.25, 1);
    negativeScore += w;
    signals.push({ word: "excessive punctuation (!!/?!)", weight: w, suspicious: true });
  }

  // All-caps sentences
  const allCapsSentences = sentences.filter(
    (s) => s.trim().length > 15 && s.trim() === s.trim().toUpperCase()
  );
  if (allCapsSentences.length > 0) {
    const w = Math.min(allCapsSentences.length * 0.4, 1);
    negativeScore += w;
    signals.push({ word: "all-caps sentences", weight: w, suspicious: true });
  }

  // Quoted sources (positive)
  const hasQuotes = /[""\u201C].*?[""\u201D]/.test(text) || /"[^"]{5,}"/.test(text);
  if (hasQuotes) {
    positiveScore += 0.6;
    signals.push({ word: "quoted sources", weight: 0.6, suspicious: false });
  }

  // Specific numbers / statistics
  const numberMatches = text.match(/\b\d+(\.\d+)?%/g) || [];
  const hasSpecificData = numberMatches.length > 0;
  if (hasSpecificData) {
    const w = Math.min(0.3 + numberMatches.length * 0.15, 0.8);
    positiveScore += w;
    signals.push({ word: `specific statistics (${numberMatches.length} found)`, weight: w, suspicious: false });
  }

  // Dates
  const datePattern = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s*\d{0,4}/gi;
  const datePattern2 = /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g;
  const datePattern3 = /\b(20[0-2]\d|19\d\d)\b/g;
  const dates1 = text.match(datePattern) || [];
  const dates2 = text.match(datePattern2) || [];
  const dates3 = text.match(datePattern3) || [];
  const hasDates = dates1.length + dates2.length > 0;
  const totalDates = dates1.length + dates2.length + dates3.length;
  if (totalDates > 0) {
    const w = Math.min(totalDates * 0.15, 0.6);
    positiveScore += w;
    signals.push({ word: `date references (${totalDates})`, weight: w, suspicious: false });
  }

  // URLs / links
  const hasURLs = /https?:\/\/\S+/.test(text) || /www\.\S+/.test(text);
  if (hasURLs) {
    positiveScore += 0.4;
    signals.push({ word: "external links/URLs", weight: 0.4, suspicious: false });
  }

  // Sentence quality — professional writing has moderate sentence lengths
  if (avgSentenceLength >= 12 && avgSentenceLength <= 30 && sentenceCount >= 3) {
    positiveScore += 0.3;
  } else if (avgSentenceLength < 8 && sentenceCount < 3) {
    negativeScore += 0.2;
    signals.push({ word: "very short/fragmented text", weight: 0.2, suspicious: true });
  }

  // Multi-paragraph (more structured)
  if (paragraphs.length >= 3) {
    positiveScore += 0.2;
    signals.push({ word: "multi-paragraph structure", weight: 0.2, suspicious: false });
  }

  // Readability score (Flesch-like simplified)
  const syllableEstimate = text.split(/\s+/).reduce((acc, word) => {
    const vowelGroups = word.toLowerCase().match(/[aeiouy]+/g) || [];
    return acc + Math.max(vowelGroups.length, 1);
  }, 0);
  const readabilityScore = 206.835 - 1.015 * avgSentenceLength - 84.6 * (syllableEstimate / Math.max(wordCount, 1));

  const score = positiveScore - negativeScore;

  return {
    score,
    signals,
    details: {
      capsRatio,
      punctuationAbuse: punctAbuse,
      hasQuotes,
      hasSpecificData,
      hasDates,
      hasURLs,
      avgSentenceLength,
      sentenceCount,
      wordCount,
      paragraphCount: paragraphs.length,
      readabilityScore,
    },
  };
}

// ── Main analysis ─────────────────────────────────────────────────

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const foundWords: { word: string; weight: number; suspicious: boolean }[] = [];

  // 1. Scan all pattern categories
  const emotionalScore = scanPatterns(text, emotionalPatterns, true, foundWords);
  const clickbaitScore = scanPatterns(text, clickbaitPatterns, true, foundWords);
  const conspiracyScore = scanPatterns(text, absolutePatterns, true, foundWords);
  const medicalMisinfoScore = scanPatterns(text, medicalMisinfo, true, foundWords);
  const propagandaScore = scanPatterns(text, propagandaPatterns, true, foundWords);
  const credibilityScore = scanPatterns(text, credibilityPatterns, false, foundWords);
  const balanceScore = scanPatterns(text, balancePatterns, false, foundWords);

  // Check for satire
  const satireScore = scanPatterns(text, satirePatterns, false, []);

  // 2. Structural analysis
  const structure = analyzeStructure(text);
  foundWords.push(...structure.signals);

  // 3. Extract & analyze claims
  const claims = extractClaims(text);
  const credibleClaims = claims.filter((c) => c.credible).length;
  const totalClaims = Math.max(claims.length, 1);
  const claimCredibilityRatio = credibleClaims / totalClaims;

  // Claim severity — average severity of non-credible claims
  const nonCredibleClaims = claims.filter((c) => !c.credible);
  const avgClaimSeverity =
    nonCredibleClaims.length > 0
      ? nonCredibleClaims.reduce((sum, c) => sum + c.severity, 0) / nonCredibleClaims.length
      : 0;

  // Medical misinfo in claims is critical
  const hasMedicalMisinfoClaims = claims.some((c) => c.type === "medical_misinfo");

  // 4. Weighted composite scoring
  // Negative signals (weighted by danger)
  const suspiciousWeighted =
    emotionalScore * 1.0 +
    clickbaitScore * 1.2 +
    conspiracyScore * 2.0 +
    medicalMisinfoScore * 2.5 +
    propagandaScore * 1.3;

  // Positive signals
  const credibleWeighted =
    credibilityScore * 1.5 +
    balanceScore * 1.2 +
    structure.score * 1.0;

  // 5. Calculate credibility percentage
  let credibilityPercent: number;
  const totalSignalWeight = suspiciousWeighted + Math.max(credibleWeighted, 0);

  if (satireScore > 0.5) {
    // Satire detected — not fake news, just humor
    credibilityPercent = 45;
  } else if (hasMedicalMisinfoClaims && medicalMisinfoScore > 1) {
    // Strong medical misinformation — very low score
    credibilityPercent = Math.max(2, 15 - medicalMisinfoScore * 3);
  } else if (conspiracyScore > 2) {
    // Heavy conspiracy language
    credibilityPercent = Math.max(2, 20 - conspiracyScore * 2);
  } else if (totalSignalWeight === 0) {
    // No signals at all — use claim analysis + structure
    credibilityPercent = 35 + claimCredibilityRatio * 35 + Math.max(structure.score * 10, 0);
  } else {
    // Standard weighted calculation
    const baseRatio = Math.max(credibleWeighted, 0) / Math.max(totalSignalWeight, 0.01);
    
    // Base from signal ratio (0-60)
    const signalComponent = baseRatio * 60;
    
    // Claim quality component (0-25)
    const claimComponent = claimCredibilityRatio * 25;
    
    // Structure component (0-15)
    const structureComponent = Math.max(Math.min(structure.score * 10, 15), -10);
    
    // Penalty for high severity claims
    const severityPenalty = avgClaimSeverity * 15;
    
    credibilityPercent = signalComponent + claimComponent + structureComponent - severityPenalty;
  }

  // Short text has lower confidence ceiling
  if (structure.details.wordCount < 15) {
    credibilityPercent = Math.min(credibilityPercent, 45);
  } else if (structure.details.wordCount < 30) {
    credibilityPercent = Math.min(credibilityPercent, 55);
  }

  // Clamp
  credibilityPercent = Math.round(Math.max(2, Math.min(98, credibilityPercent)));

  // 6. Three-tier classification
  let prediction: "Likely Reliable" | "Questionable" | "Likely Fake";
  if (credibilityPercent >= 65) {
    prediction = "Likely Reliable";
  } else if (credibilityPercent >= 35) {
    prediction = "Questionable";
  } else {
    prediction = "Likely Fake";
  }

  // 7. What needs verification
  const needsVerification: string[] = [];
  if (!structure.details.hasQuotes) needsVerification.push("No direct quotes or attributed sources found — verify original statements");
  if (!structure.details.hasSpecificData) needsVerification.push("No specific statistics or data points — look for quantifiable evidence");
  if (!structure.details.hasDates) needsVerification.push("No specific dates — verify temporal claims with dated sources");
  if (!structure.details.hasURLs) needsVerification.push("No external links — check for primary source references");
  if (claims.some((c) => c.type === "vague")) needsVerification.push("Contains vague assertions — search for primary sources with named authors");
  if (conspiracyScore > 0) needsVerification.push("Contains extraordinary claims — extraordinary claims require extraordinary evidence");
  if (emotionalScore > 0.8) needsVerification.push("High emotional language detected — re-evaluate claims with emotion removed");
  if (hasMedicalMisinfoClaims) needsVerification.push("Contains medical claims — verify with peer-reviewed medical literature (PubMed, Cochrane)");
  if (propagandaScore > 0.5) needsVerification.push("Contains politically loaded language — seek coverage from multiple political perspectives");
  if (needsVerification.length === 0) needsVerification.push("Cross-reference key facts with at least 3 independent reliable sources");

  // 8. Sort and deduplicate found words
  const seen = new Set<string>();
  const uniqueWords = foundWords.filter((w) => {
    if (seen.has(w.word)) return false;
    seen.add(w.word);
    return true;
  });
  uniqueWords.sort((a, b) => b.weight - a.weight);

  if (uniqueWords.length === 0) {
    uniqueWords.push(
      { word: "neutral content", weight: 0.5, suspicious: false },
      { word: "standard language", weight: 0.45, suspicious: false }
    );
  }

  // 9. Generate explanation
  const explanation = generateExplanation(prediction, credibilityPercent, uniqueWords, claims, {
    emotionalScore,
    clickbaitScore,
    conspiracyScore,
    medicalMisinfoScore,
    propagandaScore,
  });

  return {
    prediction,
    confidence: credibilityPercent,
    importantWords: uniqueWords.slice(0, 12),
    explanation,
    claims,
    needsVerification,
    dimensions: {
      emotionalScore: Math.min(emotionalScore, 10),
      clickbaitScore: Math.min(clickbaitScore, 10),
      conspiracyScore: Math.min(conspiracyScore, 10),
      medicalMisinfoScore: Math.min(medicalMisinfoScore, 10),
      propagandaScore: Math.min(propagandaScore, 10),
      credibilityScore: Math.min(credibilityScore, 10),
      balanceScore: Math.min(balanceScore, 10),
      structuralScore: Math.max(Math.min(structure.score, 5), -5),
    },
  };
};

// ── Explanation generator ─────────────────────────────────────────

function generateExplanation(
  prediction: string,
  confidence: number,
  words: { word: string; weight: number; suspicious: boolean }[],
  claims: Claim[],
  scores: {
    emotionalScore: number;
    clickbaitScore: number;
    conspiracyScore: number;
    medicalMisinfoScore: number;
    propagandaScore: number;
  }
): string {
  const suspicious = words.filter((w) => w.suspicious).map((w) => w.word);
  const credible = words.filter((w) => !w.suspicious).map((w) => w.word);
  const vagueClaims = claims.filter((c) => c.type === "vague" || c.type === "absolute").length;
  const verifiableClaims = claims.filter((c) => c.type === "verifiable").length;
  const medicalClaims = claims.filter((c) => c.type === "medical_misinfo").length;

  let explanation = `Credibility Score: ${confidence}/100 — Classification: ${prediction}.\n\n`;

  if (prediction === "Likely Fake") {
    explanation += "⚠️ HIGH RISK — This text exhibits strong indicators of unreliable content.\n\n";

    if (medicalClaims > 0) {
      explanation += `🏥 MEDICAL MISINFORMATION: Found ${medicalClaims} claim(s) that contradict established medical/scientific consensus. These claims are potentially dangerous if acted upon.\n\n`;
    }
    if (scores.conspiracyScore > 1) {
      explanation += `🔍 CONSPIRACY LANGUAGE: Detected conspiracy theory patterns that rely on unfalsifiable claims and distrust of institutions rather than evidence.\n\n`;
    }
    if (suspicious.length > 0) {
      explanation += `🚩 Flagged language: "${suspicious.slice(0, 4).join('", "')}"\n\n`;
    }
    if (vagueClaims > 0) {
      explanation += `Found ${vagueClaims} claim(s) that are vague or use absolute language without supporting evidence.\n\n`;
    }
    explanation += "⛔ Do NOT share this content without thorough independent verification from multiple credible sources.";
  } else if (prediction === "Questionable") {
    explanation += "⚡ MIXED SIGNALS — This text contains both credible and concerning elements.\n\n";

    if (suspicious.length > 0) {
      explanation += `🚩 Concerning: "${suspicious.slice(0, 3).join('", "')}"\n`;
    }
    if (credible.length > 0) {
      explanation += `✅ Positive: "${credible.slice(0, 3).join('", "')}"\n\n`;
    }
    if (scores.emotionalScore > 0.5) {
      explanation += "The emotional tone may be influencing perception of the facts. ";
    }
    if (scores.propagandaScore > 0.3) {
      explanation += "Some politically loaded framing was detected. ";
    }
    explanation += "\n\nAdditional verification from independent sources is strongly recommended before drawing conclusions or sharing.";
  } else {
    explanation += "✅ This text follows patterns consistent with credible, professional reporting.\n\n";

    if (credible.length > 0) {
      explanation += `Credibility signals: "${credible.slice(0, 4).join('", "')}"\n`;
    }
    if (verifiableClaims > 0) {
      explanation += `Found ${verifiableClaims} verifiable claim(s) with attributable sources, data, or named entities.\n\n`;
    }
    explanation += "ℹ️ No automated analysis can guarantee truth — always cross-reference important claims with multiple reliable sources.";
  }

  return explanation;
}
