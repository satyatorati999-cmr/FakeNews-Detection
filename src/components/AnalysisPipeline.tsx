import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, CheckCircle } from "lucide-react";

const steps = [
  { icon: Search, label: "Claim Extraction", description: "Scanning and extracting key claims..." },
  { icon: Brain, label: "AI Deep Analysis", description: "Neural network processing patterns..." },
  { icon: CheckCircle, label: "Result Classification", description: "Computing confidence score..." },
];

interface AnalysisPipelineProps {
  isActive: boolean;
}

const AnalysisPipeline = ({ isActive }: AnalysisPipelineProps) => {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isActive) {
      setActiveStep(-1);
      return;
    }
    let step = 0;
    setActiveStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        setActiveStep(step % steps.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-display text-xs uppercase tracking-widest text-primary">Analysis in Progress</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                className={`flex-1 rounded-xl p-4 border transition-all duration-500 ${
                  isCurrent
                    ? "border-primary/50 glow-cyan bg-primary/5"
                    : isActive
                    ? "border-success/30 bg-success/5"
                    : "border-border/30 bg-secondary/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${isCurrent ? "bg-primary/20" : isActive ? "bg-success/20" : "bg-secondary/30"}`}>
                    <Icon className={`w-5 h-5 ${isCurrent ? "text-primary" : isActive ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-display text-xs font-semibold uppercase tracking-wide ${isCurrent ? "text-primary" : isActive ? "text-success" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                {isCurrent && (
                  <div className="mt-3 h-1 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                  </div>
                )}
                {isActive && !isCurrent && (
                  <div className="mt-3 h-1 rounded-full bg-success/30">
                    <div className="h-full bg-success rounded-full w-full" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPipeline;
