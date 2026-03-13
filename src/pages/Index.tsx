import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsInput from "@/components/NewsInput";
import ResultCard from "@/components/ResultCard";
import StatsSection from "@/components/StatsSection";
import AnalysisPipeline from "@/components/AnalysisPipeline";
import ThreatLandscape from "@/components/ThreatLandscape";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import ChatBot from "@/components/ChatBot";
import { analyzeNews } from "@/lib/analysisApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeNews(text);
      setResult(analysisResult);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-overlay opacity-20 pointer-events-none" />

      <Header />

      <main className="pt-16 relative z-10">
        <HeroSection />

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <NewsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        </section>

        <AnalysisPipeline isActive={isLoading} />

        {result && (
          <section className="py-8 px-4 pb-20">
            <div className="container mx-auto">
              <ResultCard result={result} />
            </div>
          </section>
        )}

        <StatsSection />
        <ThreatLandscape />
        <HowItWorks />
        <TechStack />
        <UseCases />
        <FAQ />
      </main>

      <footer className="border-t border-border/30 py-10 mt-auto relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-sm tracking-wider text-foreground/80 mb-2">
            VerityAI
          </p>
          <p className="text-xs text-muted-foreground/50 font-body">
            Credibility Analysis Engine · Powered by Deep Learning · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Index;
