import React from 'react';

const CODE_SYMBOLS = [
  '{ }', '( )', '[ ]', '< />', '=>', '...', '===', '&&', '||', '++', '::', '?..',
];

// Deterministic pseudo-random based on seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface FloatingSymbol {
  text: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
  isAmber: boolean;
}

const generateSymbols = (count: number): FloatingSymbol[] => {
  return Array.from({ length: count }, (_, i) => ({
    text: CODE_SYMBOLS[Math.floor(seededRandom(i + 500) * CODE_SYMBOLS.length)],
    x: seededRandom(i) * 90 + 5,
    y: seededRandom(i + 100) * 90 + 5,
    size: seededRandom(i + 300) * 10 + 14,
    rotation: seededRandom(i + 400) * 40 - 20,
    opacity: seededRandom(i + 600) * 0.10 + 0.03,
    duration: seededRandom(i + 200) * 12 + 18,
    delay: seededRandom(i + 700) * -20,
    isAmber: seededRandom(i + 800) > 0.5,
  }));
};

const symbols = generateSymbols(10);

const CodeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((sym, i) => (
        <span
          key={i}
          className="absolute font-mono font-bold select-none code-float"
          style={{
            left: `${sym.x}%`,
            top: `${sym.y}%`,
            fontSize: `${sym.size}px`,
            transform: `rotate(${sym.rotation}deg)`,
            opacity: sym.opacity,
            color: sym.isAmber ? 'var(--symbol-color-1)' : 'var(--symbol-color-2)',
            textShadow: `0 0 20px ${sym.isAmber ? 'var(--symbol-color-1)' : 'var(--symbol-color-2)'}`,
            animationDuration: `${sym.duration}s`,
            animationDelay: `${sym.delay}s`,
          }}
        >
          {sym.text}
        </span>
      ))}
    </div>
  );
};

export default CodeBackground;
