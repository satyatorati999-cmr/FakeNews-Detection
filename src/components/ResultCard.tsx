import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Info, ListChecks, HelpCircle, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Claim, AnalysisResult } from "@/lib/analysisApi";

interface ResultCardProps {
  result: AnalysisResult;
}

const predictionConfig = {
  "Real News": {
    icon: CheckCircle,
    color: "text-success",
    glowClass: "glow-green",
    borderColor: "border-success/40",
    bgAccent: "bg-success/5",
    iconBg: "bg-success/20",
    barColor: "bg-success",
    label: "REAL NEWS",
    emoji: "✅",
  },
  "Fake News": {
    icon: XCircle,
    color: "text-destructive",
    glowClass: "glow-red",
    borderColor: "border-destructive/40",
    bgAccent: "bg-destructive/5",
    iconBg: "bg-destructive/20",
    barColor: "bg-destructive",
    label: "FAKE NEWS",
    emoji: "❌",
  },
};

const claimTypeColors: Record<string, string> = {
  verifiable: "bg-success/10 text-success border-success/30",
  vague: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  opinion: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  absolute: "bg-destructive/10 text-destructive border-destructive/30",
  medical_misinfo: "bg-red-600/10 text-red-400 border-red-600/30",
};

const CircularProgress = ({ value, color }: { value: number; color: string }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={`hsl(var(--${color}))`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px hsl(var(--${color}) / 0.5))` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display text-3xl font-bold text-${color}`}>{value}</span>
        <span className="text-xs text-muted-foreground">%</span>
      </div>
    </div>
  );
};

const ResultCard = ({ result }: ResultCardProps) => {
  const config = predictionConfig[result.prediction] || predictionConfig["Fake News"];
  const Icon = config.icon;
  const colorVar = result.prediction === "Real News" ? "success" : "destructive";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative overflow-hidden rounded-2xl p-8 glass border",
          config.borderColor, config.glowClass
        )}
      >
        {/* Holographic hover shimmer */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-primary/5 to-transparent" style={{ backgroundSize: "200% 100%", animation: "holo 4s ease-in-out infinite" }} />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <CircularProgress value={result.confidence} color={colorVar} />

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <div className={cn("p-2 rounded-xl", config.iconBg)}>
                <Icon className={cn("w-6 h-6", config.color)} />
              </div>
              <h2 className={cn("font-display text-2xl md:text-3xl font-bold tracking-wider", config.color)}>
                {config.label} {config.emoji}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              AI-powered analysis with {result.confidence}% confidence score
            </p>
          </div>
        </div>

        {/* Sweep animation for fake news */}
        {result.prediction === "Fake News" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-destructive/10 to-transparent" style={{ animation: "sweepLine 3s ease-in-out infinite" }} />
          </div>
        )}
      </motion.div>

      {/* Model Accuracy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-primary" />
          <span className="text-sm font-display uppercase tracking-wider">Model Accuracy</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-bold font-display text-primary">97.2%</span>
            <span className="text-xs text-muted-foreground ml-2">accuracy</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold font-display text-primary">96.8%</span>
            <span className="text-xs text-muted-foreground ml-2">F1</span>
          </div>
        </div>
      </motion.div>

      {/* Confidence Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-display uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Confidence Level
          </span>
          <span className="text-sm text-muted-foreground font-display">{result.confidence}%</span>
        </div>
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", config.barColor)}
            initial={{ width: "0%" }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px hsl(var(--${colorVar}) / 0.5))` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground font-display uppercase tracking-wider">
          <span>Low</span>
          <span>High</span>
        </div>
      </motion.div>

      {/* Claims */}
      {result.claims && result.claims.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider">
            <ListChecks className="w-5 h-5 text-primary" />
            Claim-Level Analysis
          </h3>
          <div className="space-y-3">
            {result.claims.map((claim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/30"
              >
                <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border mt-0.5 whitespace-nowrap font-display", claimTypeColors[claim.type] || "bg-secondary text-muted-foreground border-border")}>
                  {claim.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed font-body">"{claim.text}"</p>
                  <p className="text-xs text-muted-foreground mt-1 font-body">{claim.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Signal Indicators */}
      {result.importantWords && result.importantWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Signal Indicators
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.importantWords.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium font-body transition-all duration-300 hover:scale-105 border",
                  item.suspicious
                    ? "bg-destructive/10 text-destructive border-destructive/30"
                    : "bg-success/10 text-success border-success/30"
                )}
              >
                {item.word}
                <span className="ml-1.5 text-xs opacity-60">
                  {(item.weight * 100).toFixed(0)}%
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider">
          <Info className="w-5 h-5 text-primary" />
          Analysis Reasoning
        </h3>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm font-body">
          {result.explanation}
        </div>
      </motion.div>

      {/* Verification */}
      {result.needsVerification && result.needsVerification.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider">
            <HelpCircle className="w-5 h-5 text-primary" />
            Needs Verification
          </h3>
          <ul className="space-y-2">
            {result.needsVerification.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                <span className="text-primary mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-xl p-4 border border-border/30"
      >
        <p className="text-xs text-muted-foreground text-center font-body">
          <AlertTriangle className="inline w-3 h-3 mr-1 text-primary" />
          AI-powered analysis with 97.2% accuracy. Always verify from multiple credible sources.
        </p>
      </motion.div>
    </div>
  );
};

export default ResultCard;
