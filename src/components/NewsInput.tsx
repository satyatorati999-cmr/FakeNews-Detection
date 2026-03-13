import { useState, useEffect } from "react";
import { Search, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface NewsInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const placeholderExamples = [
  "Paste a news article or claim here...",
  "Scientists discover miracle cure for all diseases...",
  "Harvard study confirms exercise reduces heart disease...",
  "Government secretly tracking citizens via 5G towers...",
];

const NewsInput = ({ onAnalyze, isLoading }: NewsInputProps) => {
  const [text, setText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholderExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onAnalyze(text.trim());
  };

  const exampleNews = [
    {
      label: "🔴 Fake",
      text: "SHOCKING: Scientists confirm drinking lemon water cures cancer. Doctors hate this miracle cure! Big Pharma has been covering this up for years. Share before they delete this!!!",
    },
    {
      label: "🟢 Real",
      text: "According to a study published in the Journal of Medicine, researchers at Harvard University found that regular exercise reduces the risk of heart disease by 30%. The peer-reviewed findings, based on data from 50,000 participants over 10 years, were confirmed by independent experts.",
    },
    {
      label: "🟡 Mixed",
      text: "Breaking: A new report suggests that social media companies are secretly collecting user data. While officials said investigations are underway, critics argue the evidence remains unclear. Some experts disagree on the scope of the issue.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          
          <div className="relative glass rounded-2xl overflow-hidden">
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholderExamples[placeholderIndex]}
              className="w-full min-h-[200px] resize-none bg-transparent border-none p-6 text-base leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 text-foreground font-body relative z-10"
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-3 z-10">
              <span className="text-xs text-muted-foreground/60 font-display">
                {text.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-primary to-[hsl(165,100%,45%)] text-primary-foreground font-display text-sm uppercase tracking-wider py-6 px-8 rounded-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="absolute inset-0 rounded-xl" style={{ animation: "pulseGlow 1.5s ease-in-out infinite" }} />
                <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                <span className="relative z-10">Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyze Credibility
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Outputs confidence + reasons, not truth</span>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-xs text-muted-foreground mb-3 font-display uppercase tracking-widest">Try an example:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {exampleNews.map((example, index) => (
            <button
              key={index}
              onClick={() => setText(example.text)}
              className="text-xs px-4 py-2.5 rounded-lg glass text-secondary-foreground hover:border-primary/40 transition-all duration-300 text-left font-body hover:glow-cyan"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsInput;
