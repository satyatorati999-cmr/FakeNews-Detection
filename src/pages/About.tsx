import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, Brain, ShieldCheck, AlertTriangle, CheckCircle2, 
  Code2, Server, XCircle, Eye, Scale
} from "lucide-react";

const About = () => {
  const coreSignals = [
    {
      title: "Source Credibility",
      description: "Known outlet vs unknown blog. Past reliability record. Attribution to named sources.",
      icon: ShieldCheck,
    },
    {
      title: "Language Patterns",
      description: "Emotional exaggeration, clickbait phrasing, absolute claims ('100% proof', 'they don't want you to know').",
      icon: Eye,
    },
    {
      title: "Factual Structure",
      description: "Verifiable claims vs vague assertions. Named entities, dates, places, specific data points.",
      icon: Search,
    },
    {
      title: "Evidence Quality",
      description: "Primary sources linked? Quotes traceable? Peer-reviewed research cited?",
      icon: Scale,
    },
    {
      title: "Cross-Consistency",
      description: "Do multiple reliable sources report the same thing? Are facts internally consistent?",
      icon: Brain,
    },
  ];

  const whyMostFail = [
    { text: "They classify opinion as fake", icon: XCircle },
    { text: "They confuse new info with false info", icon: XCircle },
    { text: "They don't verify sources", icon: XCircle },
    { text: "They give binary answers instead of confidence + reasoning", icon: XCircle },
  ];

  const goodSystem = [
    "Explain WHY it made the decision",
    "Separate claims from facts",
    "Flag uncertainty",
    "Output confidence, reasons, and limits",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">How It Actually Works</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A fake-news model does NOT "know the truth." It estimates likelihood of unreliability based on signals.
            </p>
          </div>

          {/* Core Signals */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Core Signals Used</h2>
            <div className="space-y-4">
              {coreSignals.map((signal, index) => (
                <Card key={index} className="bg-card border-border/50 shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <signal.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">{signal.title}</h3>
                      <p className="text-muted-foreground text-sm">{signal.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              ➡️ The model outputs a probability / classification, <strong>not truth</strong>.
            </p>
          </div>

          {/* Architecture */}
          <Card className="bg-card border-border/50 shadow-card mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Analysis Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
{`Input Article/Text
      ↓
Text Cleaning (remove noise)
      ↓
Feature Extraction
  - Linguistic features
  - Named entities
  - Claim density
  - Source attribution
      ↓
Multi-Signal Analysis
  - Emotional manipulation score
  - Clickbait / urgency score
  - Absolute claims score
  - Source credibility score
  - Balance / nuance score
      ↓
Claim-Level Extraction
  - Classify each claim
  - Verifiable vs Vague vs Opinion vs Absolute
      ↓
Output:
  - Confidence Score (50–100%)
  - Classification: Real News / Fake News
  - Justification with specific reasons
  - What additional verification is needed`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Why Most Fail */}
          <Card className="bg-card border-border/50 shadow-card mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Why Most "Fake News Detectors" Fail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {whyMostFail.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-muted-foreground">
                    <item.icon className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold mb-3 text-success">A good system must:</h4>
                <div className="space-y-2">
                  {goodSystem.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example */}
          <Card className="bg-card border-border/50 shadow-card mb-12">
            <CardHeader>
              <CardTitle>Example: Correct Behavior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Input:</p>
                <p className="text-muted-foreground italic">"Scientists confirm drinking lemon water cures cancer."</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Model reasoning (correct behavior):</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Claim: "lemon water cures cancer" → medical falsehood</li>
                  <li>• No peer-reviewed sources cited</li>
                  <li>• Uses absolute language ("cures")</li>
                  <li>• Contradicts established medical evidence</li>
                </ul>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <p className="text-sm font-medium mb-2">Output:</p>
                <p className="text-sm text-muted-foreground">Credibility score: <strong className="text-destructive">8/100</strong></p>
                <p className="text-sm text-muted-foreground">Classification: <strong className="text-destructive">Fake News</strong></p>
                <p className="text-sm text-muted-foreground mt-2">Reason: Extraordinary medical claim without evidence, contradicts established oncology research, no credible sources or trials cited.</p>
              </div>
            </CardContent>
          </Card>

          {/* Golden Rule */}
          <Card className="bg-primary/5 border-primary/20 shadow-card">
            <CardContent className="p-8 text-center">
              <h3 className="font-display text-xl font-bold mb-3">Golden Rule: Accuracy First</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                No model should say "true" or "false" alone. It should say: <strong>confidence</strong>, <strong>reasons</strong>, and <strong>limits</strong>. Anything else is pretending.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
