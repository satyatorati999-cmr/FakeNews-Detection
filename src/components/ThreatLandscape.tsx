import { motion } from "framer-motion";
import { Shield, AlertTriangle, Globe, Fingerprint, Layers } from "lucide-react";
import threatRadar from "@/assets/threat-radar.png";

const threats = [
  {
    icon: AlertTriangle,
    title: "Clickbait & Sensationalism",
    description: "Headlines engineered to trigger emotions and bypass critical thinking. Our AI detects exaggerated claims and emotional manipulation tactics.",
    stat: "68%",
    statLabel: "of fake news uses emotional triggers",
  },
  {
    icon: Globe,
    title: "Propaganda & State Media",
    description: "Coordinated disinformation campaigns designed to influence public opinion. We analyze source credibility and narrative patterns.",
    stat: "2.4B",
    statLabel: "people exposed to propaganda yearly",
  },
  {
    icon: Fingerprint,
    title: "Deepfakes & Manipulation",
    description: "AI-generated content that blurs reality. Our system cross-references claims with verified databases and detects synthetic patterns.",
    stat: "96%",
    statLabel: "increase in deepfakes since 2023",
  },
  {
    icon: Layers,
    title: "Medical Misinformation",
    description: "False health claims that endanger lives. We flag unverified medical advice and compare against peer-reviewed research.",
    stat: "800K",
    statLabel: "deaths linked to COVID misinfo",
  },
];

const ThreatLandscape = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Shield className="w-4 h-4 text-destructive" />
            <span className="text-xs font-display uppercase tracking-widest text-destructive">Threat Intelligence</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient-danger">Misinformation</span> Crisis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Every day, millions of people are exposed to fabricated news stories. Understanding the threat landscape is the first step toward digital literacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Left cards */}
          <div className="space-y-6">
            {threats.slice(0, 2).map((threat, index) => {
              const Icon = threat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="glass rounded-2xl p-6 group hover:border-destructive/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-destructive/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-destructive/10 shrink-0">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xs font-semibold mb-2 uppercase tracking-wider">{threat.title}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">{threat.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl font-bold text-destructive">{threat.stat}</span>
                        <span className="text-[10px] text-muted-foreground/70 font-body">{threat.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <img src={threatRadar} alt="Threat Radar" className="w-full max-w-[350px] rounded-2xl opacity-90" style={{ filter: "drop-shadow(0 0 30px hsl(345 100% 60% / 0.3))" }} />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right cards */}
          <div className="space-y-6">
            {threats.slice(2, 4).map((threat, index) => {
              const Icon = threat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="glass rounded-2xl p-6 group hover:border-destructive/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-destructive/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-destructive/10 shrink-0">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xs font-semibold mb-2 uppercase tracking-wider">{threat.title}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">{threat.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl font-bold text-destructive">{threat.stat}</span>
                        <span className="text-[10px] text-muted-foreground/70 font-body">{threat.statLabel}</span>
                      </div>
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

export default ThreatLandscape;
