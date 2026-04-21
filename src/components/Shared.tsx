import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { T } from '../theme';

export function Wrap({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', ...style }}>
      {children}
    </div>
  );
}

export function GlobalStyles() {
  return (
    <style>{`
      @keyframes blink { 50% { opacity: 0; } }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes pulse { 0% { transform: scale(1); opacity: .6 } 100% { transform: scale(2.8); opacity: 0 } }
      @keyframes scrollhint { 0%,100% { transform: translateY(0); opacity: .5 } 50% { transform: translateY(6px); opacity: 1 } }
      @keyframes drift { 0% { transform: translate(0,0) } 50% { transform: translate(3px,-3px) } 100% { transform: translate(0,0) } }
      @keyframes glow-sweep { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
      .site-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
      .site-scroll::-webkit-scrollbar-track { background: transparent; }
      .site-scroll::-webkit-scrollbar-thumb { background: currentColor; opacity: .15; border-radius: 3px; }
      .site-scroll { scrollbar-width: thin; }
    `}</style>
  );
}

export function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    window.addEventListener('scroll', on);
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100 }}>
      <div
        style={{
          height: '100%',
          width: `${p * 100}%`,
          background: T.accent,
          transition: 'width 120ms linear',
        }}
      />
    </div>
  );
}

export function FadeIn({
  delay = 0,
  y = 14,
  children,
  style = {},
}: {
  delay?: number;
  y?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;
    const reveal = () => {
      if (!revealed) {
        revealed = true;
        setOn(true);
      }
    };
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) reveal();
          });
        },
        { threshold: 0 }
      );
      io.observe(el);
    } catch {
      /* ignore */
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) reveal();
    const t = setTimeout(reveal, 400 + delay);
    return () => {
      if (io) io.disconnect();
      clearTimeout(t);
    };
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function StatusDot({
  color = T.accent,
  label,
}: {
  color?: string;
  label: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: T.mono,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: T.muted,
      }}
    >
      <span style={{ position: 'relative', width: 8, height: 8 }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: color,
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: color,
            animation: 'pulse 2.2s ease-out infinite',
          }}
        />
      </span>
      {label}
    </span>
  );
}

export function Marquee({
  items,
  speed = 40,
}: {
  items: string[];
  speed?: number;
}) {
  const line = items.join('  ·  ');
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: `1px solid ${T.rule}`,
        borderBottom: `1px solid ${T.rule}`,
        padding: '18px 0',
        color: T.muted,
        fontFamily: T.mono,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: `marquee ${speed}s linear infinite`,
          paddingRight: 60,
        }}
      >
        {line} · {line} · {line}
      </div>
    </div>
  );
}

export type Frame = { role: string; tail: ReactNode };

export function SentenceCycler({
  frames,
  accent,
  mono = false,
  caretChar = '▋',
  holdMs = 2600,
}: {
  frames: Frame[];
  accent: string;
  mono?: boolean;
  caretChar?: string;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>('type');
  const [tailOn, setTailOn] = useState(false);

  useEffect(() => {
    const word = frames[i].role;
    let to: ReturnType<typeof setTimeout>;
    if (phase === 'type') {
      if (text.length < word.length) {
        to = setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          55 + Math.random() * 40
        );
      } else {
        setTailOn(true);
        to = setTimeout(() => setPhase('hold'), 60);
      }
    } else if (phase === 'hold') {
      to = setTimeout(() => {
        setTailOn(false);
        setPhase('erase');
      }, holdMs);
    } else {
      if (text.length > 0)
        to = setTimeout(() => setText(word.slice(0, text.length - 1)), 26);
      else {
        setPhase('type');
        setI((i + 1) % frames.length);
        return;
      }
    }
    return () => clearTimeout(to);
  }, [text, phase, i, frames, holdMs]);

  const tail = frames[i].tail;
  return (
    <>
      <span
        style={{
          fontFamily: mono
            ? '"JetBrains Mono", ui-monospace, monospace'
            : 'inherit',
          color: accent,
        }}
      >
        {text}
        <span
          style={{
            display: 'inline-block',
            width: mono ? '0.55em' : '0.08em',
            animation: 'blink 1s steps(2) infinite',
            marginLeft: mono ? 2 : 0,
            color: accent,
          }}
        >
          {caretChar}
        </span>
      </span>
      <span
        style={{
          display: 'inline-block',
          opacity: tailOn ? 1 : 0,
          transform: tailOn ? 'translateY(0)' : 'translateY(6px)',
          transition:
            'opacity 500ms cubic-bezier(.2,.7,.2,1), transform 500ms cubic-bezier(.2,.7,.2,1)',
        }}
      >
        {' '}
        {tail}
      </span>
    </>
  );
}
