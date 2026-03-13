import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide at least 10 characters of text to analyze." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are VerityAI, an expert fact-checking and news credibility analysis engine with 97.2% accuracy. You combine deep knowledge of misinformation patterns, logical fallacies, propaganda techniques, and scientific consensus to evaluate news articles.

Your task: Analyze the provided text and return a JSON object with your assessment. Be rigorous, fair, and evidence-based.

CLASSIFICATION: BINARY ONLY
- "Real News" — The content is factually accurate, well-sourced, and consistent with established knowledge
- "Fake News" — The content contains false claims, misinformation, manipulation, or lacks credible evidence

ANALYSIS METHODOLOGY:
1. Extract every factual claim from the text
2. Classify each claim (verifiable, vague, opinion, absolute, medical_misinfo)
3. Cross-reference claims against your extensive knowledge of established facts, scientific consensus, and known misinformation patterns
4. Analyze language for manipulation techniques (emotional appeals, clickbait, fear-mongering, conspiracy language)
5. Evaluate structural quality (sources cited, data referenced, balanced perspectives)
6. Make a definitive Real/Fake classification with confidence percentage

CLASSIFICATION RULES:
- If the text contains demonstrably false claims, known misinformation, conspiracy theories, dangerous medical misinformation, or manipulative language without evidence → "Fake News"
- If the text contains verifiable facts, cited sources, balanced reporting, factual accuracy consistent with established knowledge → "Real News"
- When in doubt, lean toward the classification that best protects the reader

CONFIDENCE SCORING:
- 90-100%: Very clear case, strong evidence for classification
- 70-89%: Clear case with some ambiguity
- 50-69%: Borderline case, limited signals

IMPORTANT: You must respond ONLY with a valid JSON object. No markdown, no code blocks, no explanation outside the JSON.

JSON SCHEMA:
{
  "prediction": "Real News" | "Fake News",
  "confidence": <number 50-100>,
  "claims": [
    {
      "text": "<extracted claim text>",
      "type": "verifiable" | "vague" | "opinion" | "absolute" | "medical_misinfo",
      "credible": <boolean>,
      "reason": "<why this claim is credible or not, with specific evidence>",
      "severity": <number 0-1, how dangerous if false>
    }
  ],
  "importantWords": [
    {
      "word": "<signal word or phrase detected>",
      "weight": <number 0-1>,
      "suspicious": <boolean>
    }
  ],
  "explanation": "<detailed multi-paragraph analysis explaining the classification, what evidence supports it, and key findings>",
  "needsVerification": ["<specific action items for the user to independently verify>"],
  "dimensions": {
    "emotionalScore": <0-10>,
    "clickbaitScore": <0-10>,
    "conspiracyScore": <0-10>,
    "medicalMisinfoScore": <0-10>,
    "propagandaScore": <0-10>,
    "credibilityScore": <0-10>,
    "balanceScore": <0-10>,
    "structuralScore": <-5 to 5>
  }
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Analyze the following text and classify it as either "Real News" or "Fake News". Return ONLY a valid JSON object.\n\nTEXT TO ANALYZE:\n"""${text.trim()}"""`,
          },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway returned ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    let analysisResult;
    try {
      const jsonStr = content.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
      analysisResult = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse analysis result");
    }

    if (!analysisResult.prediction || typeof analysisResult.confidence !== "number") {
      throw new Error("Invalid analysis result structure");
    }

    // Ensure binary classification
    if (analysisResult.prediction !== "Real News" && analysisResult.prediction !== "Fake News") {
      analysisResult.prediction = analysisResult.confidence >= 50 ? "Real News" : "Fake News";
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-news error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
