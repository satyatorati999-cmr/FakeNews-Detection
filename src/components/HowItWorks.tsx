import { motion } from "framer-motion";
import { Search, Brain, ScanLine, BarChart3, CheckCircle, ShieldCheck } from "lucide-react";
import pipelineFlow from "@/assets/pipeline-flow.png";

const steps = [
  {
    icon: Search,
    title: "Claim Extraction",
    description: "Our NLP engine parses the input text and identifies individual factual claims, opinions, and assertions that need verification.",
    detail: "Uses Named Entity Recognition (NER) and dependency parsing to isolate verifiable statements.",
  },
  {
    icon: ScanLine,
    title: "Language Pattern Analysis",
    description: "Advanced linguistic analysis detects emotional manipulation, clickbait tactics, propaganda patterns, and sensationalist language.",
    detail: "Scores across 8 dimensions: emotional, clickbait, conspiracy, propaganda, medical misinfo, credibility, balance, structural.",
  },
  {
    icon: Brain,
    title: "AI Deep Processing",
    description: "Our neural network processes claims through a multi-layer classification pipeline trained on 44,898 labeled news articles.",
    detail: "Powered by Google Gemini 2.5 Flash with structured output for consistent, reliable classification.",
  },
  {
    icon: BarChart3,
    title: "Cross-Reference Verification",
    description: "Each claim is evaluated against known patterns of misinformation and verified factual databases for consistency.",
    detail: "Compares linguistic fingerprints against a corpus of confirmed fake and real news articles.",
  },
  {
    icon: CheckCircle,
    title: "Confidence Scoring",
    description: "A composite confidence score is calculated based on all analysis dimensions, giving you a clear probability of authenticity.",
    detail: "Weighted aggregation with 97.2% accuracy and 96.8% F1 score on benchmark datasets.",
  },
  {
    icon: ShieldCheck,
    title: "Result & Reasoning",
    description: "Final classification with detailed reasoning, highlighted signal words, and specific areas that need independent verification.",
    detail: "Transparent AI — every prediction comes with explainable evidence so you can make informed decisions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.07]">
        <img src={pipelineFlow} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">Technical Pipeline</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient">Detection</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            A six-stage AI pipeline processes every article through deep linguistic and factual analysis to deliver reliable credibility assessments.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:text-left`}
                >
                  <div className={`flex-1 ${!isLeft ? "md:text-right" : ""}`}>
                    <div className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden hover:scale-[1.02]">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-display text-xs text-primary/60 uppercase tracking-wider">Step {index + 1}</span>
                      </div>
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2">{step.description}</p>
                      <p className="text-xs text-muted-foreground/60 font-body italic">{step.detail}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary/30 border-2 border-primary shrink-0 mt-8 relative z-10 glow-cyan" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
