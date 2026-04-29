import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { Link2Off, Clock, Smartphone, RefreshCcw, Wrench, Gauge, BookOpenText, Hand, Code2, Bug, ScanSearch, Rocket, BrainCircuit, Play, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { T } from '../theme';

type CS = CSSProperties;

// ── White theme palette ───────────────────────────────────────────────────────
const P = {
  bg:      '#f5f4f0',
  fg:      '#0f0e0b',
  accent:  '#DB7093',
  subdued: '#4a4540',
  muted:   '#9a9690',
  rule:    'rgba(0,0,0,0.09)',
  display: T.display,
  mono:    T.mono,
};

const MF: CS = { fontFamily: P.mono };

// danger = reddish, success = greenish
const DANGER  = 'rgba(219,112,147,0.88)';
const SUCCESS = 'rgba(40,165,80,0.88)';

// Accent alpha variants (flamingo on white)
const A = {
  fill:   'rgba(219,112,147,0.07)',
  border: 'rgba(219,112,147,0.22)',
  strong: 'rgba(219,112,147,0.48)',
};

// Dark fill for neutral cards on white
const CARD = 'rgba(0,0,0,0.025)';

// ── Slide transition (direction-aware) ────────────────────────────────────────

const slideVar = {
  enter: (d: number) => ({ x: d >= 0 ? '65%' : '-65%', opacity: 0, filter: 'blur(10px)' }),
  center: {
    x: 0, opacity: 1, filter: 'blur(0px)',
    transition: {
      x: { type: 'spring' as const, stiffness: 260, damping: 28 },
      opacity: { duration: 0.35 },
      filter: { duration: 0.4 },
    },
  },
  exit: (d: number) => ({
    x: d >= 0 ? '-55%' : '55%', opacity: 0, filter: 'blur(10px)',
    transition: {
      x: { duration: 0.3, ease: 'easeIn' as const },
      opacity: { duration: 0.22 },
      filter: { duration: 0.22 },
    },
  }),
};

// ── CSS: content stagger + live dot + ghost ───────────────────────────────────

const STAGGER_CSS = `
@keyframes item-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sc > * { animation: item-in 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.sc > *:nth-child(1) { animation-delay: 0.18s; }
.sc > *:nth-child(2) { animation-delay: 0.26s; }
.sc > *:nth-child(3) { animation-delay: 0.34s; }
.sc > *:nth-child(4) { animation-delay: 0.42s; }
.sc > *:nth-child(5) { animation-delay: 0.50s; }
.sc > *:nth-child(6) { animation-delay: 0.58s; }
.sc > *:nth-child(7) { animation-delay: 0.66s; }

@keyframes live-pulse {
  0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(220,50,50,0.5); }
  60%     { opacity:.7; box-shadow: 0 0 0 7px rgba(220,50,50,0); }
}
.live-dot { animation: live-pulse 1.8s ease-in-out infinite; }

@keyframes ghost-in { from { opacity:0; } to { opacity:1; } }
.ghost { animation: ghost-in 0.8s ease 0.4s both; }
`;

// ── Shells ────────────────────────────────────────────────────────────────────

function SlideShell({ children, ghost }: { children: ReactNode; ghost?: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      {ghost && (
        <div className="ghost" style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', ...MF, fontSize: 'clamp(140px,18vw,220px)', fontWeight: 800, color: P.fg, opacity: 0.045, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.06em' }}>
          {ghost}
        </div>
      )}
      <div className="sc" style={{ width: '100%', maxWidth: 1100, padding: 'clamp(28px,5vw,68px) clamp(24px,6vw,80px)', boxSizing: 'border-box' as const, position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ── Atoms ─────────────────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...MF, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.muted, marginBottom: 20 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.accent, flexShrink: 0 }} />
      {children}
    </div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: P.accent }}>{children}</span>;
}

function HR() {
  return (
    <div style={{ width: '100%', margin: '28px 0', position: 'relative', height: 1 }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, ${P.rule} 20%, ${P.rule} 80%, transparent)` }} />
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'inline-block', padding: '5px 12px', background: A.fill, border: `1px solid ${A.border}`, ...MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.accent }}>
      {children}
    </div>
  );
}

function DBadge({ label }: { label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 14px', border: `1px solid ${A.border}`, ...MF, fontSize: 11, color: P.accent, letterSpacing: '0.1em', marginBottom: 20 }}>
      {label}
    </div>
  );
}

function H({ children, size = 52 }: { children: ReactNode; size?: number }) {
  return (
    <h2 style={{ fontSize: `clamp(26px,4.5vw,${size}px)`, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '0 0 24px', color: P.fg }}>
      {children}
    </h2>
  );
}

function BarItem({ num, label, text }: { num: string; label: string; text: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '0 20px', alignItems: 'start', borderBottom: `1px solid ${P.rule}`, padding: '18px 0' }}>
      <div style={{ ...MF, fontSize: 30, fontWeight: 800, color: P.accent, opacity: 0.28, lineHeight: 1, paddingTop: 3 }}>{num}</div>
      <div>
        <div style={{ ...MF, fontSize: 10, color: P.fg, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 14, color: P.subdued, lineHeight: 1.55 }}>{text}</div>
      </div>
    </div>
  );
}

function McpCapabilityCards({ compact }: { compact?: boolean }) {
  const rows: { n: string; title: string; body: ReactNode }[] = [
    {
      n: '01',
      title: 'Intents, not commands',
      body: (
        <>
          Tools wrap intents like <em style={{ color: P.subdued }}>“find & interact with the login form.”</em> The AI composes low-level actions from a single high-level intent.
        </>
      ),
    },
    {
      n: '02',
      title: 'Vision-aware',
      body: 'No accessibility IDs? Captures a screenshot and uses visual understanding to identify elements — like a human tester.',
    },
    {
      n: '03',
      title: 'DOM + vision',
      body: 'Structured page source when available, visual recognition when not. Precision when possible, resilience always.',
    },
  ];

  const pad = compact ? 'clamp(16px,2vw,22px) clamp(18px,2.4vw,24px)' : 'clamp(18px,2.2vw,24px) clamp(20px,2.6vw,28px)';
  const titleFs = compact ? 'clamp(18px,2vw,24px)' : 'clamp(20px,2.2vw,26px)';
  const bodyFs = compact ? 16 : 17;
  const capFs = compact ? 12 : 13;
  const gap = compact ? 'clamp(14px,1.8vw,20px)' : 'clamp(16px,2vw,22px)';
  const gridMin = compact ? 'min(100%, 270px)' : 'min(100%, 320px)';

  return (
    <div
      style={{
        paddingTop: compact ? 'clamp(16px,2.2vw,22px)' : 'clamp(20px,2.6vw,28px)',
        borderTop: `1px solid ${P.rule}`,
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${gridMin}, 1fr))`,
        gap,
        flexShrink: 0,
        ...(compact
          ? {}
          : {
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              backgroundPosition: '-1px -1px',
            }),
      }}
    >
      {rows.map((c) => (
        <div
          key={c.n}
          style={{
            position: 'relative',
            border: `1px solid ${P.rule}`,
            borderRadius: 12,
            borderTop: `3px solid ${A.border}`,
            padding: pad,
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ position: 'absolute', top: 12, right: 14, width: 6, height: 6, borderRadius: '50%', background: P.muted, opacity: 0.22 }} />
          <div style={{ ...MF, fontSize: capFs, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, marginBottom: 10, opacity: 0.85 }}>
            Capability {c.n}
          </div>
          <div style={{ fontSize: titleFs, fontWeight: 600, color: P.subdued, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 10 }}>
            {c.title}
          </div>
          <div style={{ fontSize: bodyFs, color: P.muted, lineHeight: 1.4 }}>{c.body}</div>
        </div>
      ))}
    </div>
  );
}

// ── Decorative helpers ────────────────────────────────────────────────────────

function GridBg() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.07 }}>
      <defs>
        <pattern id="pres-g" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke={P.fg} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pres-g)" />
    </svg>
  );
}

function Orb({ top, right, left, bottom, size = 500 }: { top?: string; right?: string; left?: string; bottom?: string; size?: number }) {
  return (
    <div style={{ position: 'absolute', top, right, left, bottom, width: size, height: size, borderRadius: '50%', background: P.accent, filter: `blur(${Math.round(size * 0.42)}px)`, opacity: 0.07, pointerEvents: 'none' }} />
  );
}


// ── Slides ────────────────────────────────────────────────────────────────────

function Slide01() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        background: P.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GridBg />
      <img
        src="/assets/LandingPageSEConf.png"
        alt="Selenium and Appium Conference 2026 — Bridging AI and Mobile Testing"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
          minWidth: 0,
          objectFit: 'contain',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  );
}

function Slide02() {
  const speakers = [
    { name: 'Sai Krishna', handle: '@saikrisv', role: 'Core Maintainer · Appium', book: 'Author — Appium Insights (Apress)', site: 'saikrishna.tech', avatar: '/sai_gray_profile.png', qr: '/qr-code.png' },
    { name: 'Srinivasan Sekar', handle: '@srisekar', role: 'Core Maintainer · Appium & Appium MCP', book: 'Author — MCP Standard', site: 'srini.codes', avatar: '/srini_gray_profile.png', qr: '/QR-sekar.png' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — heading */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>The maintainers</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Two maintainers,<br /><span style={{ color: P.accent }}>one obsession.</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          Two Appium core maintainers. One shared belief — mobile testing should work for everyone, not just teams with weeks to spare.
        </p>
      </div>

      {/* Right — speakers, no card chrome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', width: '100%' }}>
        {speakers.map((s) => (
          <div key={s.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px' }}>

            {/* Avatar */}
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: `radial-gradient(circle, ${A.fill} 0%, transparent 70%)` }} />
              <img
                src={s.avatar}
                alt={s.name}
                style={{
                  width: 'clamp(300px,27vw,380px)',
                  height: 'auto',
                  aspectRatio: '1 / 1',
                  borderRadius: 9999,
                  objectFit: 'cover',
                  display: 'block',
                  border: `3px solid ${A.border}`,
                  position: 'relative',
                }}
              />
            </div>

            {/* Identity */}
            <div style={{ ...MF, fontSize: 13, color: P.accent, letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 8 }}>{s.handle}</div>
            <div style={{ fontSize: 'clamp(32px,3.6vw,46px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>{s.name}</div>
            <div style={{ fontSize: 'clamp(18px,2vw,24px)', color: P.subdued, lineHeight: 1.5, marginBottom: 4 }}>{s.role}</div>
            <div style={{ fontSize: 'clamp(15px,1.7vw,20px)', color: P.muted, fontStyle: 'italic', marginBottom: 14 }}>{s.book}</div>

            {/* QR — tight below identity */}
            <img src={s.qr} alt={`QR — ${s.site}`} style={{ width: 'clamp(200px,22vw,260px)', height: 'clamp(200px,22vw,260px)', borderRadius: 14, display: 'block', marginBottom: 8 }} />
            <div style={{ ...MF, fontSize: 'clamp(13px,1.3vw,15px)', color: P.muted, letterSpacing: '0.14em' }}>{s.site}</div>

          </div>
        ))}
        </div>
      </div>

    </div>
  );
}

const PAIN_FEATURES = [
  {
    Icon: Link2Off,
    name: 'Brittle',
    description: 'Complex XPath, accessibility IDs that change with every release. One UI tweak breaks fifty tests.',
    category: 'Locators',
    className: 'col-span-1',
    bg: '#DB7093',
  },
  {
    Icon: Clock,
    name: 'Slow',
    description: 'Weeks to write automation. Hours to maintain it. Backlog grows faster than coverage.',
    category: 'Velocity',
    className: 'col-span-2',
    bg: '#6366f1',
  },
  {
    Icon: Smartphone,
    name: 'iOS hell',
    description: 'Provisioning profiles, signing certs, WebDriverAgent builds — hours lost before a single test runs.',
    category: 'Setup time',
    className: 'col-span-2',
    bg: '#0ea5e9',
  },
  {
    Icon: RefreshCcw,
    name: 'Lossy',
    description: 'Manual testing finds bugs, but the knowledge stays in your head. Nothing gets reused.',
    category: 'Reuse',
    className: 'col-span-1',
    bg: '#10b981',
  },
  {
    Icon: Wrench,
    name: 'Costly',
    description: 'Test suites become liabilities. Teams spend more time fixing tests than shipping features.',
    category: 'Maintenance',
    className: 'col-span-1',
    bg: '#f59e0b',
  },
  {
    Icon: Gauge,
    name: 'Lagging',
    description: 'Apps ship faster than your suite can keep up. What if describing a test was running it?',
    category: 'Coverage gap',
    className: 'col-span-2',
    bg: '#8b5cf6',
  },
];

function Slide03() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — heading */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>The state of things</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Six daily<br /><span style={{ color: P.accent }}>frustrations.</span>
        </h2>
      </div>

      {/* Right — bento grid */}
      <div style={{ padding: '20px', boxSizing: 'border-box' as const, height: '100%' }}>
        <BentoGrid className="h-full [grid-template-rows:repeat(3,1fr)] gap-3">
          {PAIN_FEATURES.map((f) => (
            <BentoCard
              key={f.name}
              name={f.name}
              description={f.description}
              Icon={f.Icon}
              href="#"
              cta={f.category}
              className={f.className}
              background={
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 120, fontWeight: 900, color: f.bg, opacity: 0.07, lineHeight: 1, userSelect: 'none', fontFamily: 'monospace' }}>
                    {String(PAIN_FEATURES.indexOf(f) + 1).padStart(2, '0')}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${f.bg}10, transparent)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: f.bg, opacity: 0.4 }} />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>

    </div>
  );
}

function Slide04McpArchitecture() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — heading */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>The protocol</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          MCP<br /><span style={{ color: P.accent }}>Architecture</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          "USB-C for AI" — one protocol to connect any LLM to any tool.
        </p>
      </div>

      {/* Right — MCP architecture image */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px,3vw,40px)',
          position: 'relative',
          overflow: 'hidden',
          background: P.bg,
          minHeight: 0,
        }}
      >
        <img
          src="/assets/mcp_arch.jpg"
          alt="MCP architecture — AI client, MCP server, and external systems"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

function Slide04() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — heading */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>The protocol</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Appium<br /><span style={{ color: P.accent }}>MCP</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          "USB-C for AI" — one protocol to connect any LLM to any tool.
        </p>
      </div>

      {/* Right — diagram + capabilities */}
      <div
        className="sc"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          padding: 'clamp(16px,2.5vw,32px) clamp(20px,3vw,36px)',
          position: 'relative',
          overflow: 'auto',
          background: P.bg,
          minHeight: 0,
          height: '100%',
          boxSizing: 'border-box' as const,
        }}
      >
        <div
          style={{
            flex: '1 1 0',
            minHeight: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/assets/appium_mcp.jpg"
            alt="Appium MCP — tooling and session flow"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
        <McpCapabilityCards compact />
      </div>
    </div>
  );
}

function Slide05() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — title */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>The bridge</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Introducing<br /><span style={{ color: P.accent }}>mcp-appium</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, opacity: 0.6 }} />
      </div>

      {/* Right — body + subtle capability cards */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px,5vw,60px) clamp(36px,5.5vw,72px)', overflow: 'auto', boxSizing: 'border-box' as const, minHeight: 0 }}>
        <div className="sc" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,28px)', width: '100%', maxWidth: 920 }}>
          <div>
            <p style={{ fontSize: 16, color: P.subdued, lineHeight: 1.7, margin: '0 0 24px' }}>
              An open-source MCP server that exposes Appium as a structured, intent-based tool interface — for any LLM, any test stack.
            </p>
            <div style={{ border: `1px solid ${P.rule}`, padding: '16px 20px', background: CARD }}>
              <div style={{ ...MF, fontSize: 9, color: P.muted, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Open source</div>
              <div style={{ ...MF, fontSize: 12, color: P.accent }}>AppiumTestDistribution / appium-mcp</div>
            </div>
          </div>

          <McpCapabilityCards />
        </div>
      </div>
    </div>
  );
}

function Slide06() {
  const solved = [
    { num: '01', name: 'Instant docs', description: 'RAG over Appium docs — answers in seconds, not Slack threads', cta: 'Knowledge', Icon: BookOpenText, bg: '#22c55e', className: 'col-span-1' },
    { num: '02', name: 'Smart gestures', description: 'Intent-based swipe, long-press, pinch — no hardcoded coordinates', cta: 'Interaction', Icon: Hand, bg: '#16a34a', className: 'col-span-2' },
    { num: '03', name: 'Production code', description: 'CI-ready scripts with proper locators and waits, not throwaway snippets', cta: 'Code quality', Icon: Code2, bg: '#10b981', className: 'col-span-2' },
    { num: '04', name: 'Debug assist', description: 'Log, screenshot, page-source analysis — the AI diagnoses the failure', cta: 'Troubleshooting', Icon: Bug, bg: '#14b8a6', className: 'col-span-1' },
    { num: '05', name: 'Visual ID', description: 'Element identification from screenshots — no accessibility ID required', cta: 'Vision', Icon: ScanSearch, bg: '#34d399', className: 'col-span-1' },
    { num: '06', name: 'Guided setup', description: 'From zero to a running Appium session in minutes, not days', cta: 'Onboarding', Icon: Rocket, bg: '#84cc16', className: 'col-span-2' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      {/* Left — heading */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>Community pain points — solved</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Six problems<br /><span style={{ color: P.accent }}>solved.</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          Common Appium bottlenecks resolved with intent-driven tooling, visual context, and faster setup automation.
        </p>
      </div>

      {/* Right — solved bento grid */}
      <div style={{ padding: '20px', boxSizing: 'border-box' as const, height: '100%' }}>
        <BentoGrid className="h-full [grid-template-rows:repeat(3,1fr)] gap-3">
          {solved.map((s) => (
            <BentoCard
              key={s.num}
              name={s.name}
              description={s.description}
              Icon={s.Icon}
              href="#"
              cta={s.cta}
              className={s.className}
              background={
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 120, fontWeight: 900, color: s.bg, opacity: 0.08, lineHeight: 1, userSelect: 'none', fontFamily: 'monospace' }}>
                    {s.num}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${s.bg}15, transparent)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: s.bg, opacity: 0.4 }} />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>

    </div>
  );
}

function Slide07() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        background: P.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GridBg />
      <img
        src="/assets/demo.png"
        alt="Live demo slide"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
          minWidth: 0,
          objectFit: 'contain',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  );
}

function Slide08() {
  const deepDives = [
    {
      n: 'D1',
      title: 'iOS setup',
      desc: 'WebDriverAgent provisioning, signing, and build handled via MCP-to-MCP orchestration.',
      cta: 'Hours -> 2 min',
      Icon: Wrench,
      className: 'col-span-2',
      bg: '#DB7093',
    },
    {
      n: 'D2',
      title: 'Docs retrieval',
      desc: 'RAG over Appium docs with precise capabilities and driver flags in plain language.',
      cta: 'Ocean in a sentence',
      Icon: BookOpenText,
      className: 'col-span-1',
      bg: '#8b5cf6',
    },
    {
      n: 'D3',
      title: 'Intent gestures',
      desc: 'Replace brittle x/y coordinates with stable natural-language gestures across screen sizes.',
      cta: 'No hardcoded coords',
      Icon: Hand,
      className: 'col-span-1',
      bg: '#0ea5e9',
    },
    {
      n: 'D4',
      title: 'CI-ready code',
      desc: 'Describe goal -> explore -> generate script -> CI-ready output with robust waits and locators.',
      cta: 'Conversation to code',
      Icon: Code2,
      className: 'col-span-2',
      bg: '#10b981',
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>Deep dives, unified</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Four deep dives,<br /><span style={{ color: P.accent }}>one view.</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          Setup, documentation, gestures, and production code generation condensed into one bento overview.
        </p>
      </div>

      <div style={{ padding: '20px', boxSizing: 'border-box' as const, height: '100%' }}>
        <BentoGrid className="h-full [grid-template-rows:repeat(2,1fr)] gap-3">
          {deepDives.map((d) => (
            <BentoCard
              key={d.n}
              name={d.title}
              description={d.desc}
              Icon={d.Icon}
              href="#"
              cta={d.cta}
              className={d.className}
              background={
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 120, fontWeight: 900, color: d.bg, opacity: 0.08, lineHeight: 1, userSelect: 'none', fontFamily: 'monospace' }}>
                    {d.n}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${d.bg}12, transparent)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: d.bg, opacity: 0.4 }} />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

function Slide12() {
  const loop = [
    { n: '01', label: 'Perceive', text: 'Screen state via DOM XML or screenshot', Icon: ScanSearch, bg: '#0ea5e9', className: 'col-span-1' },
    { n: '02', label: 'Reason', text: 'LLM decides the next best action', Icon: BrainCircuit, bg: '#8b5cf6', className: 'col-span-1' },
    { n: '03', label: 'Act', text: 'Execute tap, type, swipe via MCP', Icon: Play, bg: '#10b981', className: 'col-span-1' },
    { n: '04', label: 'Verify', text: 'Check outcome, detect stuck state, adapt', Icon: ShieldCheck, bg: '#22c55e', className: 'col-span-3' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>

      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>Going further</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          <span style={{ color: P.accent }}>AppClaw</span><br />agent loop.
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          Autonomous mobile testing with pluggable LLM backends and MCP-native execution.
        </p>
      </div>

      <div style={{ padding: '20px', boxSizing: 'border-box' as const, height: '100%' }}>
        <BentoGrid className="h-full [grid-template-rows:1.1fr_1fr_1fr] gap-3">
          <BentoCard
            name="AppClaw"
            description="An autonomous mobile testing agent. Tell it what to verify — it navigates, taps, and reports back. Built on mcp-appium with pluggable LLM backends (Claude, GPT-4, Gemini, Groq, Ollama)."
            Icon={Rocket}
            href="https://github.com/AppiumTestDistribution/AppClaw"
            cta="Give the repo a star ★"
            className="col-span-3"
            background={
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                <div style={{ position: 'absolute', top: -14, right: -10, fontSize: 132, fontWeight: 900, color: P.accent, opacity: 0.08, lineHeight: 1, userSelect: 'none', fontFamily: 'monospace' }}>
                  OSS
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: `linear-gradient(to top, ${P.accent}14, transparent)` }} />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: P.accent, opacity: 0.45 }} />
                <img
                  src="/appclaw_qr.jpg"
                  alt="AppClaw repository QR code"
                  style={{
                    position: 'absolute',
                    right: 16,
                    bottom: 16,
                    width: 176,
                    height: 176,
                    borderRadius: 10,
                    border: `1px solid ${A.border}`,
                    background: '#fff',
                    objectFit: 'cover',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
                  }}
                />
              </div>
            }
          />

          {loop.map((s) => (
            <BentoCard
              key={s.n}
              name={`${s.n} ${s.label}`}
              description={s.text}
              Icon={s.Icon}
              href="#"
              cta="The agent loop"
              className={s.className}
              background={
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 120, fontWeight: 900, color: s.bg, opacity: 0.08, lineHeight: 1, userSelect: 'none', fontFamily: 'monospace' }}>
                    {s.n}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${s.bg}12, transparent)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: s.bg, opacity: 0.4 }} />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

function Slide15BehindTheHood() {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: P.bg, padding: 'clamp(16px,2.2vw,26px)', boxSizing: 'border-box' as const }}>
      <div
        className="sc"
        style={{
          height: '100%',
          border: `1px solid ${P.rule}`,
          borderRadius: 18,
          background: 'rgba(255,255,255,0.74)',
          padding: 'clamp(14px,2vw,22px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/appclaw_arch.png"
          alt="AppClaw architecture diagram"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            borderRadius: 14,
            background: 'rgba(250,249,246,0.7)',
            border: `1px solid ${P.rule}`,
            padding: 10,
            boxSizing: 'border-box' as const,
          }}
        />
      </div>
    </div>
  );
}

function Slide13() {
  const patterns = [
    {
      num: '01',
      title: 'Compress.',
      text: "Don't dump 50KB of DOM. Score elements, keep top 80, flatten hierarchy.",
      cta: 'Top 80 nodes',
      Icon: Gauge,
      bg: '#DB7093',
      className: 'col-span-2',
    },
    {
      num: '02',
      title: 'Diff.',
      text: 'After every action, show what changed — not the full state again.',
      cta: 'Δ state only',
      Icon: RefreshCcw,
      bg: '#0ea5e9',
      className: 'col-span-1',
    },
    {
      num: '03',
      title: 'Remember.',
      text: 'Positive: "tap Search worked 5×". Negative: "old_btn failed — skip it".',
      cta: 'Hit / miss log',
      Icon: BrainCircuit,
      bg: '#f59e0b',
      className: 'col-span-1',
    },
    {
      num: '04',
      title: 'Recover.',
      text: 'Inject untried elements + alternative strategies. Let the model choose.',
      cta: 'Retry budget',
      Icon: ShieldCheck,
      bg: '#22c55e',
      className: 'col-span-2',
    },
    {
      num: '05',
      title: 'Verify.',
      text: 'When agent says "done" — take a fresh screenshot and ask again.',
      cta: 'Re-screenshot',
      Icon: ScanSearch,
      bg: '#8b5cf6',
      className: 'col-span-3',
    },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      {/* Left — title */}
      <div className="sc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,80px) clamp(36px,5vw,68px)', borderRight: `1px solid ${P.rule}`, position: 'relative', overflow: 'hidden' }}>
        <Orb bottom="-30%" left="-20%" size={360} />
        <Label>What works in production</Label>
        <h2 style={{ fontSize: 'clamp(44px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 32px', color: P.fg, position: 'relative' }}>
          Five context engineering<br /><span style={{ color: P.accent }}>patterns that work.</span>
        </h2>
        <div style={{ width: 40, height: 2, background: P.accent, marginBottom: 24, opacity: 0.6 }} />
        <p style={{ fontSize: 16, color: P.muted, lineHeight: 1.75, margin: 0, maxWidth: 340, position: 'relative' }}>
          Reduce tokens, surface deltas, track wins/losses, recover fast, and verify with fresh perception.
        </p>
      </div>

      {/* Right — bento grid */}
      <div style={{ padding: '20px', boxSizing: 'border-box' as const, height: '100%' }}>
        <BentoGrid className="h-full [grid-template-rows:repeat(3,1fr)] gap-3 auto-rows-[14.5rem]">
          {patterns.map((p) => (
            <BentoCard
              key={p.num}
              name={`${p.num} · ${p.title}`}
              description={p.text}
              Icon={p.Icon}
              href="#"
              cta={p.cta}
              className={p.className}
              background={
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12 }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      right: -10,
                      fontSize: 132,
                      fontWeight: 900,
                      color: p.bg,
                      opacity: 0.085,
                      lineHeight: 1,
                      userSelect: 'none',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.06em',
                    }}
                  >
                    {p.num}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: `linear-gradient(to top, ${p.bg}14, transparent)` }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: p.bg, opacity: 0.4 }} />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

function Slide14ThankYou() {
  const people = [
    {
      name: 'Sai Krishna',
      role1: 'Core Maintainer · Appium',
      role2: 'Author — Appium Insights',
      avatar: '/sai-profile.webp',
      qr: '/qr-code.png',
      site: 'saikrishna.tech',
      tag: 'Appium Core',
      tag2: 'Author',
    },
    {
      name: 'Srinivasan Sekar',
      role1: 'Core Maintainer · Appium & MCP',
      role2: 'Author — MCP Standard',
      avatar: '/sekar-profile.webp',
      qr: '/QR-sekar.png',
      site: 'srini.codes',
      tag: 'Appium Core',
      tag2: 'Speaker',
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: P.bg }}>
      <GridBg />
      <Orb top="-20%" left="-12%" size={520} />
      <Orb bottom="-25%" right="-10%" size={640} />

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(22px,4vw,46px)', boxSizing: 'border-box' as const }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px,3vw,34px)' }}>
          <div style={{ fontFamily: P.display, fontSize: 'clamp(56px,7vw,96px)', fontWeight: 650, letterSpacing: '-0.03em', color: P.fg, lineHeight: 0.9 }}>
            Thank
          </div>
          <div style={{ fontFamily: P.display, fontSize: 'clamp(56px,7vw,96px)', fontStyle: 'italic', fontWeight: 520, letterSpacing: '-0.02em', color: P.accent, lineHeight: 0.95, marginTop: 6 }}>
            you
          </div>
        </div>

        <div style={{ width: 'min(1120px, 100%)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.25fr) minmax(0,1fr)', alignItems: 'center', gap: 'clamp(18px,2.5vw,34px)' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 'clamp(210px,19vw,260px)',
                height: 'clamp(280px,26vw,360px)',
                borderRadius: 16,
                border: `1px solid ${P.rule}`,
                background: 'rgba(255,255,255,0.8)',
                boxShadow: '0 14px 34px rgba(0,0,0,0.10)',
                padding: 20,
                boxSizing: 'border-box' as const,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/book-appium-insights.jpg"
                alt="Appium Insights book cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.16))',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(16px,2.2vw,26px)' }}>
            {people.map((p) => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <div style={{ position: 'relative', marginBottom: 14 }}>
                  <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: `radial-gradient(circle, ${A.fill} 0%, transparent 70%)` }} />
                  <img
                    src={p.avatar}
                    alt={p.name}
                    style={{
                      width: 'clamp(185px,16vw,230px)',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                      borderRadius: 9999,
                      objectFit: 'cover',
                      display: 'block',
                      border: `3px solid ${A.border}`,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: P.display,
                    fontSize: 'clamp(17px,2.05vw,24px)',
                    fontWeight: 650,
                    color: P.fg,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.name}
                </div>
                <div style={{ width: '100%', maxWidth: 280, minHeight: 56, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div style={{ fontSize: 13, color: P.subdued, lineHeight: 1.45 }}>{p.role1}</div>
                  <div style={{ fontSize: 13, color: P.muted, fontStyle: 'italic', lineHeight: 1.45 }}>{p.role2}</div>
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '12px 0' }}>
                  <div style={{ padding: '6px 10px', borderRadius: 999, border: `1px solid ${P.rule}`, background: 'rgba(255,255,255,0.55)', ...MF, fontSize: 10, letterSpacing: '0.12em', color: P.muted, textTransform: 'uppercase' }}>
                    {p.tag}
                  </div>
                  <div style={{ padding: '6px 10px', borderRadius: 999, border: `1px solid ${P.rule}`, background: 'rgba(255,255,255,0.55)', ...MF, fontSize: 10, letterSpacing: '0.12em', color: P.muted, textTransform: 'uppercase' }}>
                    {p.tag2}
                  </div>
                </div>

                <img
                  src={p.qr}
                  alt={`QR — ${p.site}`}
                  style={{
                    width: 'clamp(180px,15vw,220px)',
                    height: 'clamp(180px,15vw,220px)',
                    borderRadius: 14,
                    display: 'block',
                    border: `1px solid ${A.border}`,
                    background: '#fff',
                    boxShadow: '0 10px 22px rgba(0,0,0,0.08)',
                    marginBottom: 12,
                  }}
                />
                <div style={{ ...MF, fontSize: 12, color: P.muted, letterSpacing: '0.10em' }}>{p.site}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 'clamp(210px,19vw,260px)',
                height: 'clamp(280px,26vw,360px)',
                borderRadius: 16,
                border: `1px solid ${P.rule}`,
                background: 'rgba(255,255,255,0.8)',
                boxShadow: '0 14px 34px rgba(0,0,0,0.10)',
                padding: 20,
                boxSizing: 'border-box' as const,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/book-mcp-standard.png"
                alt="The MCP Standard book cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.16))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Registry ──────────────────────────────────────────────────────────────────

const SLIDES = [
  Slide01, Slide02, Slide03, Slide04McpArchitecture, Slide04, Slide06, Slide07,
  Slide08, Slide12, Slide15BehindTheHood, Slide13, Slide14ThankYou,
];

// ── Nav button ────────────────────────────────────────────────────────────────

function NavBtn({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { color: P.fg }}
      style={{ ...MF, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: disabled ? P.muted : P.subdued, background: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.35 : 1, padding: '0 4px' }}
    >
      {children}
    </motion.button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BridgingAI() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchX = useRef(0);
  const n = SLIDES.length;

  const go = useCallback((to: number) => {
    if (to < 0 || to >= n) return;
    setDirection(to > slide ? 1 : -1);
    setSlide(to);
  }, [n, slide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(slide + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(slide - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slide, go]);

  const SlideComponent = SLIDES[slide];
  const landing = slide === 0;

  const topBarInner = (
    <>
      <Link to="/presentations" style={{ ...MF, fontSize: 11, color: P.muted, textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        ← Presentations
      </Link>
      <span style={{ ...MF, fontSize: 11, color: P.muted, letterSpacing: '0.06em' }}>
        Bridging AI and Mobile Testing
      </span>
      <div style={{ width: 52, textAlign: 'right', overflow: 'hidden', position: 'relative', height: 20 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={slide}
            initial={{ opacity: 0, y: direction >= 0 ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction >= 0 ? -8 : 8 }}
            transition={{ duration: 0.18 }}
            style={{ ...MF, fontSize: 11, color: P.muted, position: 'absolute', right: 0, whiteSpace: 'nowrap' }}
          >
            {String(slide + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  );

  const progressStrip = (
    <div style={{ height: 3, background: P.rule, flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', background: P.accent }}
        animate={{ width: `${((slide + 1) / n) * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      />
    </div>
  );

  const bottomBarInner = (
    <>
      <NavBtn onClick={() => go(slide - 1)} disabled={slide === 0}>← Prev</NavBtn>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {SLIDES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => go(i)}
            title={`Slide ${i + 1}`}
            animate={{ width: i === slide ? 18 : 5, background: i === slide ? P.accent : P.rule }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            style={{ height: 5, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>
      <NavBtn onClick={() => go(slide + 1)} disabled={slide === n - 1}>Next →</NavBtn>
    </>
  );

  return (
    <>
      <style>{STAGGER_CSS}</style>
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: P.bg, display: 'flex', flexDirection: 'column', fontFamily: P.display, color: P.fg, minHeight: 0 }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 60) go(dx < 0 ? slide + 1 : slide - 1); }}
      >
        {!landing && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: 50, borderBottom: `1px solid ${P.rule}`, flexShrink: 0, zIndex: 10 }}>
              {topBarInner}
            </div>
            {progressStrip}
          </>
        )}

        {/* Slide — full viewport height on landing; docked chrome reduces area on other slides */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              variants={slideVar}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                minWidth: 0,
                willChange: 'transform, opacity, filter',
              }}
            >
              <div style={{ flex: 1, minHeight: 0, minWidth: 0, width: '100%', position: 'relative', overflow: 'hidden' }}>
                <SlideComponent />
              </div>
            </motion.div>
          </AnimatePresence>

          {landing && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 30,
                  paddingTop: 'max(0px, env(safe-area-inset-top))',
                  background: 'linear-gradient(180deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.88) 52%, rgba(250,249,246,0) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 8px' }}>
                  {topBarInner}
                </div>
                <div style={{ padding: '0 20px 14px' }}>{progressStrip}</div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 30,
                  paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
                  background: 'linear-gradient(0deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.88) 55%, rgba(250,249,246,0) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
                  {bottomBarInner}
                </div>
              </div>
            </>
          )}
        </div>

        {!landing && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: 50, borderTop: `1px solid ${P.rule}`, flexShrink: 0 }}>
            {bottomBarInner}
          </div>
        )}
      </div>
    </>
  );
}
