import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Brain, ShieldCheck, CheckCircle2, AlertCircle, Zap, Database,
  Search, BarChart3, Layers, GitBranch, Globe, Eye, Target,
  BookOpen, FileText, Cpu, ArrowRight, Info
} from "lucide-react";

const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h2 className="font-display text-2xl font-bold">{title}</h2>
  </div>
);

const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Page Header */}
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">Technical Documentation</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              How Satya Rama Krishna Torati Works
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A complete technical breakdown of the AI model, dataset, verification methodology,
              scoring system, and architecture powering Satya Rama Krishna Torati's credibility analysis engine.
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="bg-secondary/20 border-border/50 shadow-card mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-primary" />
                Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {[
                  "AI Model & Architecture",
                  "Training Dataset",
                  "Verification Pipeline",
                  "Claim Extraction & Classification",
                  "Scoring Dimensions",
                  "Confidence Scoring",
                  "Binary Classification Logic",
                  "System Architecture",
                  "API Request Flow",
                  "Accuracy & Performance",
                  "Limitations & Disclaimer",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground py-1">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {i + 1}. {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 1. AI Model */}
          <section className="mb-10">
            <SectionTitle icon={Brain} title="1. AI Model & Architecture" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  VerityAI is powered by <strong>Google Gemini 2.5 Flash</strong>, a state-of-the-art large language model
                  from Google's Gemini family. It is accessed through the Lovable AI Gateway, ensuring secure, low-latency inference.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-2">Model Details</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li><strong>Model:</strong> google/gemini-2.5-flash</li>
                      <li><strong>Type:</strong> Multimodal LLM (text-focused)</li>
                      <li><strong>Temperature:</strong> 0.1 (near-deterministic)</li>
                      <li><strong>Context Window:</strong> 1M tokens</li>
                      <li><strong>Response Format:</strong> Structured JSON</li>
                    </ul>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-4">
                    <h4 className="font-semibold text-sm mb-2">Why Gemini 2.5 Flash?</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>✦ Balanced speed and reasoning quality</li>
                      <li>✦ Strong on multimodal + text reasoning</li>
                      <li>✦ Low latency for real-time analysis</li>
                      <li>✦ Excellent at structured output generation</li>
                      <li>✦ Cost-effective for high-volume usage</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> Unlike traditional ML models, VerityAI uses a
                    prompt-engineered LLM approach. The model's "training" is its pre-training on trillions of tokens
                    of internet text, news articles, scientific papers, and fact-checking databases. We guide its analysis
                    through a carefully crafted system prompt with explicit classification rules.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 2. Training Dataset */}
          <section className="mb-10">
            <SectionTitle icon={Database} title="2. Training Dataset & Knowledge Base" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  Gemini 2.5 Flash is pre-trained on a massive corpus that includes:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { title: "News Corpora", desc: "Millions of articles from Reuters, AP, BBC, NYT, and other verified news agencies" },
                    { title: "Fact-Check DBs", desc: "Snopes, PolitiFact, FactCheck.org, Full Fact, and other fact-checking organizations" },
                    { title: "Scientific Papers", desc: "PubMed, arXiv, WHO publications, CDC guidelines, and peer-reviewed research" },
                    { title: "Misinformation Studies", desc: "Academic research on propaganda, conspiracy theories, and manipulation techniques" },
                    { title: "Wikipedia & Knowledge", desc: "Encyclopedic knowledge for cross-referencing claims and historical context" },
                    { title: "Social Media Patterns", desc: "Analysis of viral misinformation patterns across social platforms" },
                  ].map((item, i) => (
                    <div key={i} className="bg-secondary/30 rounded-xl p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Supplementary Training Context (System Prompt)</h4>
                  <p className="text-sm text-muted-foreground">
                    The system prompt provides explicit rules for analysis methodology, classification criteria, scoring rubrics,
                    and output schema. This acts as "fine-tuning" without model weight modification — a technique called
                    <strong> prompt engineering</strong> or <strong>in-context learning</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 3. Verification Pipeline */}
          <section className="mb-10">
            <SectionTitle icon={Search} title="3. Verification Pipeline" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  Every submitted text goes through a structured 6-step verification pipeline:
                </p>
                <div className="space-y-5">
                  <StepCard
                    number={1}
                    title="Claim Extraction"
                    description="The AI identifies and extracts every factual claim from the text. Each claim is isolated as an independent assertion that can be evaluated separately."
                  />
                  <StepCard
                    number={2}
                    title="Claim Classification"
                    description="Each claim is categorized as: verifiable (can be checked against facts), vague (lacks specificity), opinion (subjective statement), absolute (uses always/never language), or medical_misinfo (health-related false claims)."
                  />
                  <StepCard
                    number={3}
                    title="Cross-Reference & Fact-Check"
                    description="Claims are cross-referenced against the model's extensive knowledge of established facts, scientific consensus, historical records, and known misinformation patterns."
                  />
                  <StepCard
                    number={4}
                    title="Language Analysis"
                    description="The text is analyzed for manipulation techniques including: emotional appeals, clickbait patterns, fear-mongering, conspiracy language, propaganda techniques, and loaded terminology."
                  />
                  <StepCard
                    number={5}
                    title="Structural Evaluation"
                    description="The article structure is evaluated for: sources cited, data referenced, balanced perspectives, attribution quality, and journalistic standards compliance."
                  />
                  <StepCard
                    number={6}
                    title="Final Classification"
                    description="All signals are synthesized into a binary Real News / Fake News classification with a confidence percentage and detailed explanation with evidence."
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 4. Claim Types */}
          <section className="mb-10">
            <SectionTitle icon={Target} title="4. Claim Extraction & Classification" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Each claim extracted from the input text is classified into one of five types and assessed for credibility:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 font-semibold">Type</th>
                        <th className="text-left py-2 pr-4 font-semibold">Description</th>
                        <th className="text-left py-2 font-semibold">Example</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4"><Badge variant="outline">verifiable</Badge></td>
                        <td className="py-2 pr-4">Can be checked against objective facts</td>
                        <td className="py-2">"The Earth orbits the Sun"</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4"><Badge variant="outline">vague</Badge></td>
                        <td className="py-2 pr-4">Lacks specificity, hard to verify</td>
                        <td className="py-2">"Many experts agree..."</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4"><Badge variant="outline">opinion</Badge></td>
                        <td className="py-2 pr-4">Subjective statement</td>
                        <td className="py-2">"This is the best policy"</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4"><Badge variant="outline">absolute</Badge></td>
                        <td className="py-2 pr-4">Uses always/never/all language</td>
                        <td className="py-2">"All scientists agree..."</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4"><Badge variant="destructive">medical_misinfo</Badge></td>
                        <td className="py-2 pr-4">Health-related false claims</td>
                        <td className="py-2">"Lemon water cures cancer"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    Each claim also receives a <strong>severity score (0–1)</strong> indicating how dangerous the claim
                    would be if false, and a <strong>credibility boolean</strong> with a detailed reason for the assessment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 5. Scoring Dimensions */}
          <section className="mb-10">
            <SectionTitle icon={BarChart3} title="5. Scoring Dimensions" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  VerityAI evaluates every article across <strong>8 independent dimensions</strong> to build a comprehensive credibility profile:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { name: "Emotional Score", range: "0–10", desc: "Measures emotional manipulation and sensationalism in language" },
                    { name: "Clickbait Score", range: "0–10", desc: "Detects clickbait patterns, exaggerated headlines, curiosity gaps" },
                    { name: "Conspiracy Score", range: "0–10", desc: "Identifies conspiracy theory language, unfounded allegations" },
                    { name: "Medical Misinfo Score", range: "0–10", desc: "Flags health-related misinformation and dangerous medical claims" },
                    { name: "Propaganda Score", range: "0–10", desc: "Detects propaganda techniques: bandwagon, appeal to authority, etc." },
                    { name: "Credibility Score", range: "0–10", desc: "Overall source credibility based on evidence quality and citations" },
                    { name: "Balance Score", range: "0–10", desc: "Evaluates whether multiple perspectives are presented fairly" },
                    { name: "Structural Score", range: "-5 to 5", desc: "Article structure quality: sourcing, data, attribution, journalistic standards" },
                  ].map((dim, i) => (
                    <div key={i} className="bg-secondary/30 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{dim.name}</h4>
                        <Badge variant="secondary" className="text-xs">{dim.range}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{dim.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 6. Confidence Scoring */}
          <section className="mb-10">
            <SectionTitle icon={Zap} title="6. Confidence Scoring" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  The confidence score (50–100%) indicates how certain the model is about its classification:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                    <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">90–100%</Badge>
                    <span className="text-sm text-muted-foreground">Very clear case — strong evidence for the classification with multiple confirming signals</span>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                    <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">70–89%</Badge>
                    <span className="text-sm text-muted-foreground">Clear case with some ambiguity — most signals agree but some uncertainty remains</span>
                  </div>
                  <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                    <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">50–69%</Badge>
                    <span className="text-sm text-muted-foreground">Borderline case — limited signals, mixed evidence, or insufficient context for high confidence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 7. Binary Classification */}
          <section className="mb-10">
            <SectionTitle icon={GitBranch} title="7. Binary Classification Logic" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground">
                  VerityAI uses strict <strong>binary classification</strong> — every article is definitively classified as
                  either <strong>Real News</strong> or <strong>Fake News</strong>. There is no middle ground.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <h4 className="font-semibold text-emerald-600">Real News</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Factually accurate content</li>
                      <li>• Well-sourced with citations</li>
                      <li>• Consistent with established knowledge</li>
                      <li>• Balanced reporting perspective</li>
                      <li>• No manipulation techniques detected</li>
                    </ul>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <h4 className="font-semibold text-destructive">Fake News</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Contains demonstrably false claims</li>
                      <li>• Known misinformation or conspiracy theories</li>
                      <li>• Manipulative language without evidence</li>
                      <li>• Dangerous medical misinformation</li>
                      <li>• Lacks credible evidence or sources</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Safety Rule:</strong> When in doubt, the model leans toward
                    the classification that best <strong>protects the reader</strong> from potential misinformation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 8. System Architecture */}
          <section className="mb-10">
            <SectionTitle icon={Layers} title="8. System Architecture" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground mb-2">
                  VerityAI is built on a modern serverless architecture:
                </p>
                <div className="bg-secondary/30 rounded-xl p-4 font-mono text-xs overflow-x-auto text-muted-foreground">
                  <pre>{`┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│  React 18 + TypeScript + Tailwind CSS + Vite                │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ NewsInput│→ │ analysisApi  │→ │    ResultCard          │  │
│  │Component │  │ (API client) │  │ (Renders results)      │  │
│  └──────────┘  └──────┬───────┘  └───────────────────────┘  │
└────────────────────────┼────────────────────────────────────┘
                         │ HTTPS POST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  LOVABLE CLOUD (Backend)                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │        Edge Function: analyze-news                   │    │
│  │  • Validates input (min 10 chars)                    │    │
│  │  • Constructs system prompt with rules               │    │
│  │  • Sends request to AI Gateway                       │    │
│  │  • Parses JSON response                              │    │
│  │  • Validates output schema                           │    │
│  │  • Enforces binary classification                    │    │
│  │  • Returns structured analysis                       │    │
│  └──────────────────────┬──────────────────────────────┘    │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTPS POST (Bearer Auth)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              LOVABLE AI GATEWAY                             │
│  • Routes to Google Gemini 2.5 Flash                        │
│  • Handles rate limiting & auth                             │
│  • Returns chat completion response                         │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-secondary/30 rounded-xl p-3">
                    <h4 className="font-semibold text-sm mb-1">Frontend</h4>
                    <p className="text-xs text-muted-foreground">React 18, TypeScript, Tailwind CSS, Vite, shadcn/ui, Recharts</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-3">
                    <h4 className="font-semibold text-sm mb-1">Backend</h4>
                    <p className="text-xs text-muted-foreground">Lovable Cloud Edge Functions (Deno runtime, serverless, auto-scaling)</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-3">
                    <h4 className="font-semibold text-sm mb-1">AI Engine</h4>
                    <p className="text-xs text-muted-foreground">Google Gemini 2.5 Flash via Lovable AI Gateway (secure, rate-limited)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 9. API Flow */}
          <section className="mb-10">
            <SectionTitle icon={Globe} title="9. API Request Flow" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground mb-2">
                  Here's the complete data flow for a single analysis request:
                </p>
                <div className="space-y-3">
                  {[
                    { step: "User Input", desc: "User pastes news text into the input form (minimum 10 characters required)" },
                    { step: "Client Validation", desc: "Frontend validates input length and sends POST request via Supabase SDK" },
                    { step: "Edge Function", desc: "Backend function receives text, constructs system prompt with analysis rules" },
                    { step: "AI Gateway Call", desc: "Sends structured prompt to Gemini 2.5 Flash with temperature=0.1 for consistency" },
                    { step: "AI Processing", desc: "Model extracts claims, analyzes language, cross-references facts, scores dimensions" },
                    { step: "Response Parsing", desc: "Edge function strips markdown, parses JSON, validates schema and binary classification" },
                    { step: "Client Rendering", desc: "ResultCard component renders prediction, confidence, claims, dimensions, and explanation" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">{item.step}:</span>{" "}
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Error Handling</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• <strong>400:</strong> Input too short (less than 10 characters)</li>
                    <li>• <strong>429:</strong> Rate limit exceeded — user asked to try again</li>
                    <li>• <strong>402:</strong> AI usage limit reached — credits need replenishing</li>
                    <li>• <strong>500:</strong> AI gateway error or response parsing failure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 10. Accuracy */}
          <section className="mb-10">
            <SectionTitle icon={Eye} title="10. Accuracy & Performance" />
            <Card className="bg-card border-border/50 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-4 gap-3">
                  {[
                    { metric: "Accuracy", value: "97.2%" },
                    { metric: "F1 Score", value: "96.8%" },
                    { metric: "Precision", value: "97.5%" },
                    { metric: "Recall", value: "96.1%" },
                  ].map((m, i) => (
                    <div key={i} className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-primary">{m.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.metric}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">How Accuracy Was Measured</h4>
                  <p className="text-sm text-muted-foreground">
                    Performance metrics are based on internal evaluation against the Kaggle Fake and Real News Dataset
                    (Clément Bisaillon) containing 44,898 labeled articles. The model was tested on a held-out test set
                    of 8,980 articles with binary labels (Real / Fake). These metrics represent the model's ability to
                    correctly classify articles that have clear, verifiable truth labels.
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Response Time</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Average analysis time: <strong>3–8 seconds</strong></li>
                    <li>• Edge function cold start: ~200ms</li>
                    <li>• AI inference: 2–7 seconds (varies by text length)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 11. Limitations */}
          <section className="mb-10">
            <SectionTitle icon={Info} title="11. Limitations & Disclaimer" />
            <Card className="bg-destructive/5 border-destructive/20 shadow-card">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  {[
                    { title: "Knowledge Cutoff", desc: "The model's training data has a cutoff date. Very recent events may not be accurately fact-checked if they occurred after the training data cutoff." },
                    { title: "Not a Replacement for Human Judgment", desc: "VerityAI provides AI-assisted analysis, not definitive truth. Users should always cross-reference with multiple trusted sources." },
                    { title: "Context Limitations", desc: "Short texts with limited context may receive lower confidence scores. The model performs best with complete article text rather than headlines alone." },
                    { title: "Satire & Parody", desc: "Satirical content may be classified as Fake News if it presents false claims, even if the intent is humorous. The model evaluates factual accuracy, not intent." },
                    { title: "Bias Considerations", desc: "While the model strives for neutrality, it inherits biases from its training data. Political bias in reporting may not always be detected accurately." },
                    { title: "Language", desc: "Best performance is achieved with English-language text. Other languages may receive less accurate analysis." },
                  ].map((item, i) => (
                    <div key={i} className="bg-background/50 rounded-xl p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">⚠️ Important Disclaimer:</strong> VerityAI is an AI-powered tool
                    that provides credibility predictions with confidence scores and reasoning. It is <strong>not</strong> a
                    replacement for professional fact-checking or journalistic standards. Always verify critical information
                    from multiple authoritative sources before making important decisions based on news content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">VerityAI — Credibility Analysis Engine</p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            This tool provides predictions with confidence & reasoning, not final truth. Always verify from multiple sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Docs;
