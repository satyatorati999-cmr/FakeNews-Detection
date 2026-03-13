import { motion } from "framer-motion";
import { Server, Cpu, Sparkles, Database, Lock, Gauge } from "lucide-react";
import techArchitecture from "@/assets/tech-architecture.png";

const techItems = [
  { icon: Cpu, label: "Google Gemini 2.5 Flash", description: "State-of-the-art LLM for structured analysis with temperature 0.1 for deterministic outputs" },
  { icon: Server, label: "Edge Functions", description: "Serverless compute layer for real-time inference with sub-300ms response times" },
  { icon: Database, label: "44,898 Article Dataset", description: "Trained on Kaggle Fake and Real News Dataset with balanced class distribution" },
  { icon: Lock, label: "Secure API Gateway", description: "End-to-end encrypted processing — your data is never stored or logged" },
  { icon: Sparkles, label: "8-Dimension Scoring", description: "Emotional, clickbait, conspiracy, propaganda, medical, credibility, balance, structural" },
  { icon: Gauge, label: "97.2% Accuracy", description: "Benchmark-validated with 96.8% F1 score across diverse news categories" },
];

const TechStack = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">Architecture</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Technology <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Built on cutting-edge AI infrastructure for speed, accuracy, and reliability at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img src={techArchitecture} alt="Technology Architecture" className="w-full rounded-2xl opacity-80" style={{ filter: "drop-shadow(0 0 30px hsl(185 100% 50% / 0.2))" }} />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 via-transparent to-background/30" />
            <div className="absolute inset-0 rounded-2xl border border-primary/10" />
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass rounded-xl p-4 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden hover:scale-[1.03]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-[10px] font-semibold uppercase tracking-wider mb-1">{item.label}</h3>
                      <p className="text-[11px] text-muted-foreground font-body leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
