import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Database } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon: Icon, value, numericValue, suffix, label, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative z-10">
        <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="font-display text-4xl font-bold text-foreground mb-1">
          {isVisible ? (numericValue % 1 !== 0 ? count.toFixed(1) : Math.floor(count)) : "0"}{suffix}
        </div>
        <div className="text-sm text-muted-foreground font-body">{label}</div>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Precision <span className="text-gradient">Metrics</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our deep learning model delivers industry-leading accuracy across millions of analyzed articles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard
            icon={ShieldCheck}
            value="97.2"
            numericValue={97.2}
            suffix="%"
            label="Detection Accuracy"
            delay={0}
          />
          <StatCard
            icon={Database}
            value="1M+"
            numericValue={1}
            suffix="M+"
            label="Articles Analyzed"
            delay={0.15}
          />
          <StatCard
            icon={Zap}
            value="0.3"
            numericValue={0.3}
            suffix="s"
            label="Average Response"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
