import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  highlightWords?: string[];
}

const TypewriterText = ({ text, speed = 50, delay = 500, className = "", highlightWords = [] }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  const renderText = () => {
    let result = displayed;
    for (const word of highlightWords) {
      result = result.replace(word, `<span class="text-gradient">${word}</span>`);
    }
    return result;
  };

  return (
    <span className={className}>
      <span dangerouslySetInnerHTML={{ __html: renderText() }} />
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
};

export default TypewriterText;
