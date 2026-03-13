import { supabase } from "@/integrations/supabase/client";

export interface Claim {
  text: string;
  type: "verifiable" | "vague" | "opinion" | "absolute" | "medical_misinfo";
  credible: boolean;
  reason: string;
  severity: number;
}

export interface AnalysisResult {
  prediction: "Real News" | "Fake News";
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

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  const { data, error } = await supabase.functions.invoke("analyze-news", {
    body: { text },
  });

  if (error) {
    throw new Error(error.message || "Analysis failed");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as AnalysisResult;
};
