import { motion } from "framer-motion";
import { Quote, Newspaper, Smartphone, GraduationCap, FlaskConical } from "lucide-react";

const useCases = [
  {
    icon: Newspaper,
    title: "Journalists & Fact-Checkers",
    quote: "Quickly screen incoming tips and stories before investing investigative resources.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Smartphone,
    title: "Social Media Users",
    quote: "Verify viral posts before sharing. Stop the spread of misinformation in your network.",
    color: "from-success/20 to-success/5",
  },
  {
    icon: GraduationCap,
    title: "Educators & Students",
    quote: "Teach critical thinking and media literacy with real-time AI-powered analysis tools.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: FlaskConical,
    title: "Researchers & Analysts",
    quote: "Analyze large volumes of content for patterns of disinformation and propaganda campaigns.",
    color: "from-destructive/20 to-destructive/5",
  },
];

const UseCases = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">Use Cases</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Who <span className="text-gradient">Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            From newsrooms to classrooms, VerityAI empowers anyone fighting misinformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed italic">"{item.quote}"</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
