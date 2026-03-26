import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How accurate is the detection?",
    a: "Our model achieves 97.2% accuracy and a 96.8% F1 score, validated against the Kaggle Fake and Real News Dataset containing 44,898 labeled articles. However, no AI is perfect — always cross-reference critical information with multiple sources.",
  },
  {
    q: "What AI model powers Satya Rama Krishna Torati?",
    a: "We use Google Gemini 2.5 Flash with temperature set to 0.1 for highly deterministic, consistent outputs. The model processes structured prompts that evaluate text across 8 analytical dimensions.",
  },
  {
    q: "Is my data stored or shared?",
    a: "No. All analysis is performed in real-time through secure edge functions. Your input text is processed and immediately discarded — nothing is stored, logged, or shared with third parties.",
  },
  {
    q: "Can it detect deepfakes or images?",
    a: "Currently, Satya Rama Krishna Torati focuses on text-based news analysis. Image and video deepfake detection is on our roadmap for future releases.",
  },
  {
    q: "What types of claims does it detect?",
    a: "Our system classifies claims into 5 categories: Verifiable (factual statements), Vague (unclear claims), Opinion (subjective views), Absolute (extreme statements), and Medical Misinformation (unverified health claims).",
  },
  {
    q: "How fast is the analysis?",
    a: "Average response time is under 0.3 seconds for most articles. Longer texts with many claims may take slightly more time as each claim is individually evaluated.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Common <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors"
              >
                <span className="font-display text-xs uppercase tracking-wider font-semibold pr-4">{faq.q}</span>
                <span className={`text-primary transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground font-body leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
