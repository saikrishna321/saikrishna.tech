import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plug, Terminal, Bot, ScanSearch, Network, Smartphone, FileText, Bug,
  DollarSign, Link2, ClipboardList, Wand2, Stethoscope,
  Repeat, Layers, KeyRound, Skull,
  Crosshair, Globe, Eye, Code2, Boxes,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CS = CSSProperties;

// ── Type system ────────────────────────────────────────────────────────────────
const F = {
  display: "'Bricolage Grotesque', 'Hanken Grotesk', sans-serif",
  body:    "'Hanken Grotesk', system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
};

// ── Blueprint palette (built around #4A6FA5) ────────────────────────────────────
const P = {
  ground:     '#ffffff',
  panel:      '#ffffff',
  panelT:     'rgba(255,255,255,0.80)',
  fg:         '#10151c',
  subdued:    '#3b4552',
  muted:      '#8a94a3',
  accent:     '#4A6FA5',
  accentDeep: '#33507e',
  rule:       'rgba(16,21,28,0.11)',
  ruleStrong: 'rgba(16,21,28,0.20)',
  wire:       'rgba(74,111,165,0.10)',
  wireMajor:  'rgba(74,111,165,0.17)',
  display: F.display,
  body:    F.body,
  mono:    F.mono,
};

const MF: CS = { fontFamily: P.mono };
const DF: CS = { fontFamily: P.display };

const A = {
  fill:   'rgba(74,111,165,0.06)',
  border: 'rgba(74,111,165,0.28)',
};

// Card / data accent set — cool, blueprint-friendly
const C = {
  blue:   '#4A6FA5',
  teal:   '#2f8f8f',
  indigo: '#5b62b3',
  amber:  '#bf853a',
  green:  '#3f8f6b',
  rose:   '#ac5468',
};

// ── Fonts ────────────────────────────────────────────────────────────────────
const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

// ── Slide transition ───────────────────────────────────────────────────────────
const slideVar = {
  enter: (d: number) => ({ x: d >= 0 ? '7%' : '-7%', opacity: 0, filter: 'blur(6px)' }),
  center: {
    x: 0, opacity: 1, filter: 'blur(0px)',
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 30 },
      opacity: { duration: 0.32 },
      filter: { duration: 0.34 },
    },
  },
  exit: (d: number) => ({
    x: d >= 0 ? '-5%' : '5%', opacity: 0, filter: 'blur(6px)',
    transition: { duration: 0.24, ease: 'easeIn' as const },
  }),
};

const STAGGER_CSS = `
@keyframes item-in { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
.sc > * { animation: item-in 0.5s cubic-bezier(0.22,0.7,0.2,1) both; }
.sc > *:nth-child(1){animation-delay:.14s}.sc > *:nth-child(2){animation-delay:.22s}
.sc > *:nth-child(3){animation-delay:.30s}.sc > *:nth-child(4){animation-delay:.38s}
.sc > *:nth-child(5){animation-delay:.46s}.sc > *:nth-child(6){animation-delay:.54s}
.sc > *:nth-child(7){animation-delay:.62s}

@keyframes rule-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.rule-draw { transform-origin: left; animation: rule-draw .6s cubic-bezier(.2,.7,.2,1) .34s both; }

@keyframes flow-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
.flow-arrow { animation: flow-pulse 2.2s ease-in-out infinite; }

@keyframes scan { from{ background-position: 0 -100%; } to { background-position: 0 200%; } }
`;

// ── Primitives ───────────────────────────────────────────────────────────────

function Tick({ size = 9, color = P.accent }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ flexShrink: 0, display: 'block' }}>
      <line x1="5" y1="0" x2="5" y2="10" stroke={color} strokeWidth="1" />
      <line x1="0" y1="5" x2="10" y2="5" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function Corners({ inset = 7, len = 9, color = P.ruleStrong, sw = 1.4 }: { inset?: number; len?: number; color?: string; sw?: number }) {
  const base: CS = { position: 'absolute', width: len, height: len, pointerEvents: 'none' };
  return (
    <>
      <span style={{ ...base, top: inset, left: inset, borderTop: `${sw}px solid ${color}`, borderLeft: `${sw}px solid ${color}` }} />
      <span style={{ ...base, top: inset, right: inset, borderTop: `${sw}px solid ${color}`, borderRight: `${sw}px solid ${color}` }} />
      <span style={{ ...base, bottom: inset, left: inset, borderBottom: `${sw}px solid ${color}`, borderLeft: `${sw}px solid ${color}` }} />
      <span style={{ ...base, bottom: inset, right: inset, borderBottom: `${sw}px solid ${color}`, borderRight: `${sw}px solid ${color}` }} />
    </>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, ...MF, fontSize: 10.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.muted, marginBottom: 18 }}>
      <Tick />
      <span>{children}</span>
    </div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: P.accent }}>{children}</span>;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: A.fill, border: `1px solid ${A.border}`, borderRadius: 3, ...MF, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.accentDeep }}>
      <span style={{ color: P.accent }}>＋</span>{children}
    </div>
  );
}

function BlueprintBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="pw-grid" width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 0 0 0 15" fill="none" stroke={P.wire} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pw-grid)" />
      </svg>
    </div>
  );
}

// Reusable left-heading column
function HeadCol({ label, title, blurb, children }: { label: string; title: ReactNode; blurb?: ReactNode; children?: ReactNode }) {
  return (
    <div className="sc" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(34px,5vw,70px) clamp(32px,4.4vw,60px)', borderRight: `1px solid ${P.rule}`, overflow: 'hidden' }}>
      <Label>{label}</Label>
      <h2 style={{ ...DF, fontSize: 'clamp(38px,5.4vw,70px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, margin: '0 0 24px', color: P.fg, position: 'relative' }}>
        {title}
      </h2>
      <div className="rule-draw" style={{ width: 46, height: 2, background: P.accent, marginBottom: 22, opacity: 0.75 }} />
      {blurb && (
        <p style={{ ...{ fontFamily: P.body }, fontSize: 15.5, color: P.muted, lineHeight: 1.7, margin: 0, maxWidth: 384, position: 'relative' }}>
          {blurb}
        </p>
      )}
      {children}
    </div>
  );
}

// Spec card for grids (replaces bento)
function SpecCard({ tag, idx, name, desc, foot, Icon, c, span }: { tag: string; idx: string; name: string; desc: string; foot: string; Icon: React.ElementType; c: string; span: number }) {
  return (
    <div style={{ gridColumn: `span ${span}`, position: 'relative', display: 'flex', flexDirection: 'column', border: `1px solid ${P.rule}`, borderRadius: 4, background: P.panelT, backdropFilter: 'blur(4px)', padding: 'clamp(16px,1.9vw,24px)', overflow: 'hidden' }}>
      <Corners color={`${c}55`} />
      <div style={{ position: 'absolute', top: -6, right: 6, ...MF, fontSize: 96, fontWeight: 700, color: c, opacity: 0.06, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{idx}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 3, border: `1px solid ${c}40`, background: `${c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={19} color={c} />
        </div>
        <span style={{ ...MF, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted }}>{tag}</span>
      </div>
      <div style={{ ...DF, fontSize: 'clamp(20px,2.1vw,26px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>{name}</div>
      <div style={{ fontFamily: P.body, fontSize: 13.5, color: P.subdued, lineHeight: 1.5, flex: 1 }}>{desc}</div>
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${P.rule}`, display: 'flex', alignItems: 'center', gap: 8, ...MF, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted }}>
        <span style={{ color: c }}>→</span>{foot}
      </div>
    </div>
  );
}

// ── Slides ───────────────────────────────────────────────────────────────────

function SlideTitle() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, minWidth: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/PWTitle.png"
        alt="Three doors to agentic browser testing — Playwright × AI hands-on workshop"
        style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', minHeight: 0, minWidth: 0, objectFit: 'contain', objectPosition: 'center', display: 'block' }}
      />
    </div>
  );
}

function SlideIntro() {
  const speakers = [
    { name: 'Sai Krishna', handle: '@saikrisv', role: 'Core Maintainer · Appium', book: 'Author — Appium Insights (Apress)', site: 'saikrishna.tech', avatar: '/sai_gray_profile.png', qr: '/qr-code.png' },
    { name: 'Srinivasan Sekar', handle: '@srisekar', role: 'Core Maintainer · Appium & Appium MCP', book: 'Author — The MCP Standard', site: 'srini.codes', avatar: '/srini_gray_profile.png', qr: '/QR-sekar.png' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="Your instructors"
        title={<>Two maintainers,<br /><Accent>one obsession.</Accent></>}
        blurb="Two open-source maintainers who've spent a decade building the infrastructure teams test on — now obsessed with what happens when AI agents meet test automation."
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', width: '100%' }}>
          {speakers.map((s) => (
            <div key={s.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 10px' }}>
              <div style={{ position: 'relative', marginBottom: 16, padding: 12 }}>
                <Corners inset={0} len={14} color={A.border} />
                <img
                  src={s.avatar}
                  alt={s.name}
                  style={{ width: 'clamp(240px,22vw,310px)', height: 'auto', aspectRatio: '1 / 1', borderRadius: 9999, objectFit: 'cover', display: 'block', border: `2px solid ${A.border}`, position: 'relative' }}
                />
              </div>
              <div style={{ ...MF, fontSize: 12.5, color: P.accent, letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 8 }}>{s.handle}</div>
              <div style={{ ...DF, fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontFamily: P.body, fontSize: 'clamp(15px,1.7vw,20px)', color: P.subdued, lineHeight: 1.5, marginBottom: 4 }}>{s.role}</div>
              <div style={{ fontFamily: P.body, fontSize: 'clamp(13px,1.4vw,17px)', color: P.muted, marginBottom: 16 }}>{s.book}</div>
              <div style={{ position: 'relative', padding: 8 }}>
                <Corners inset={0} len={11} color={P.ruleStrong} />
                <img src={s.qr} alt={`QR — ${s.site}`} style={{ width: 'clamp(150px,16vw,200px)', height: 'clamp(150px,16vw,200px)', display: 'block' }} />
              </div>
              <div style={{ ...MF, fontSize: 'clamp(12px,1.2vw,14px)', color: P.muted, letterSpacing: '0.14em', marginTop: 10 }}>{s.site}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideArchitecture() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '38% 1fr', overflow: 'hidden' }}>
      <div className="sc" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(34px,4.8vw,64px) clamp(30px,4.2vw,56px)', borderRight: `1px solid ${P.rule}`, overflow: 'auto' }}>
        <Label>The foundation</Label>
        <h2 style={{ ...DF, fontSize: 'clamp(34px,4.8vw,62px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, margin: '0 0 20px', color: P.fg, position: 'relative' }}>
          One browser,<br /><Accent>many clients.</Accent>
        </h2>
        <div className="rule-draw" style={{ width: 46, height: 2, background: P.accent, marginBottom: 20, opacity: 0.75 }} />
        <p style={{ fontFamily: P.body, fontSize: 15, color: P.muted, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 420, position: 'relative' }}>
          One architectural choice on day one — a client/server split over a persistent socket — is why MCP, CLI, and agents can all drive, and even <em style={{ color: P.subdued, fontStyle: 'normal', fontWeight: 600 }}>share</em>, the same browser session.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 9, position: 'relative' }}>
          {[
            <>Every Page / Frame / Locator is a <strong style={{ color: P.subdued }}>ChannelOwner</strong> proxy.</>,
            <>JSON-RPC over one WebSocket — not WebDriver's HTTP-per-command.</>,
            <>Contexts are <strong style={{ color: P.subdued }}>~10ms</strong> — why <code style={{ ...MF, fontSize: 12.5, color: P.accentDeep }}>storageState</code> matters.</>,
            <>One ARIA tree feeds the selector engine, snapshots, and MCP.</>,
          ].map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontFamily: P.body, fontSize: 13.5, color: P.subdued, lineHeight: 1.5 }}>
              <span style={{ ...MF, color: P.accent, flexShrink: 0, fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div style={{ position: 'relative', padding: '12px 16px', border: `1px solid ${A.border}`, background: A.fill, borderRadius: 4 }}>
          <Corners color={A.border} />
          <span style={{ ...MF, fontSize: 11.5, color: P.accentDeep, letterSpacing: '0.02em' }}>
            browser.bind (1.59) → multiple clients join one running browser.
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(18px,2.5vw,34px)', position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        <img
          src="/pwarch.png"
          alt="Playwright architecture — clients, playwright-core client/server, and the browser process"
          style={{ width: '100%', height: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
        />
      </div>
    </div>
  );
}

function DoorCard({ n, Icon, name, pkg, when, cost, costNote, c }: { n: string; Icon: React.ElementType; name: string; pkg: string; when: string; cost: string; costNote: string; c: string }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', border: `1px solid ${P.rule}`, borderRadius: 4, padding: 'clamp(20px,2.3vw,28px)', background: P.panelT, backdropFilter: 'blur(4px)', overflow: 'hidden' }}>
      <Corners color={`${c}55`} />
      <div style={{ position: 'absolute', top: 4, right: 10, ...MF, fontSize: 96, fontWeight: 700, color: c, opacity: 0.07, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{n}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <div style={{ width: 38, height: 38, borderRadius: 3, border: `1px solid ${c}40`, background: `${c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={19} color={c} />
        </div>
        <div style={{ ...MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted }}>Door {n}</div>
      </div>
      <div style={{ ...DF, fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.025em', marginBottom: 4 }}>{name}</div>
      <div style={{ ...MF, fontSize: 11.5, color: c, marginBottom: 16 }}>{pkg}</div>
      <div style={{ fontFamily: P.body, fontSize: 13.5, color: P.subdued, lineHeight: 1.55, flex: 1, marginBottom: 16 }}>{when}</div>
      <div style={{ borderTop: `1px solid ${P.rule}`, paddingTop: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ ...MF, fontSize: 'clamp(19px,2.2vw,25px)', fontWeight: 700, color: c, lineHeight: 1 }}>{cost}</span>
        <span style={{ ...MF, fontSize: 9.5, color: P.muted, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>{costNote}</span>
      </div>
    </div>
  );
}

function SlideThreeDoors() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(28px,4vw,60px) clamp(32px,5vw,72px)', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        <div className="sc">
          <Label>The mental model</Label>
          <h2 style={{ ...DF, fontSize: 'clamp(34px,5vw,62px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, margin: '0 0 10px', color: P.fg }}>
            Three doors. <Accent>One browser.</Accent>
          </h2>
          <p style={{ fontFamily: P.body, fontSize: 16, color: P.muted, lineHeight: 1.6, maxWidth: 720, margin: '0 0 28px' }}>
            Same substrate underneath — the question is which surface fits the job and the budget.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(14px,2vw,22px)' }}>
            <DoorCard n="01" Icon={Plug} name="MCP" pkg="@playwright/mcp" when="Sandboxed clients — Claude Desktop, Copilot Chat. Exploratory work for PMs, designers, non-technical stakeholders." cost="~114K" costNote="tokens / flow" c={C.blue} />
            <DoorCard n="02" Icon={Terminal} name="CLI" pkg="@playwright/cli" when="Daily SDET work with coding agents (Claude Code, Cursor CLI). Snapshots write to disk — only filenames flow back." cost="~27K" costNote="tokens · 4× cheaper" c={C.teal} />
            <DoorCard n="03" Icon={Bot} name="Agents" pkg="playwright init-agents" when="Full test lifecycle: plan → write → repair. Three auditable .agent.md prompts, human-supervised at each step." cost="Plan→Gen→Heal" costNote="varies by role" c={C.indigo} />
          </div>
        </div>
      </div>
    </div>
  );
}

function McpCapabilityCards() {
  const rows = [
    { n: '01', title: 'No vision model', body: <>Returns the <em style={{ color: P.subdued, fontStyle: 'normal', fontWeight: 600 }}>accessibility tree</em> (~200–400 tokens), not a screenshot. Cheaper, and the agent rarely hallucinates element identity.</> },
    { n: '02', title: 'Intent, not coordinates', body: 'browser_click / browser_type / browser_fill_form act on roles and names — resilient across layouts and screen sizes.' },
    { n: '03', title: 'Opt-in --caps', body: 'network · storage · devtools · testing · vision · pdf. Power stays off until you ask for it — keep the agent on a leash.' },
  ];
  return (
    <div style={{ paddingTop: 'clamp(18px,2.4vw,26px)', borderTop: `1px solid ${P.rule}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 'clamp(14px,1.8vw,20px)' }}>
      {rows.map((c) => (
        <div key={c.n} style={{ position: 'relative', border: `1px solid ${P.rule}`, borderRadius: 4, padding: 'clamp(16px,2vw,22px)', background: P.panelT, backdropFilter: 'blur(4px)' }}>
          <Corners color={A.border} />
          <div style={{ ...MF, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, marginBottom: 10 }}>Why · {c.n}</div>
          <div style={{ ...DF, fontSize: 'clamp(18px,2vw,22px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.02em', marginBottom: 8 }}>{c.title}</div>
          <div style={{ fontFamily: P.body, fontSize: 14, color: P.subdued, lineHeight: 1.5 }}>{c.body}</div>
        </div>
      ))}
    </div>
  );
}

function SlideMcpFoundations() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="Door 1 · MCP foundations"
        title={<>The <Accent>snapshot</Accent> is the magic.</>}
        blurb="40+ tools, but one primitive carries the day: browser_snapshot. It hands the LLM the page as structured text."
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px,4vw,56px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <div className="sc" style={{ width: '100%', maxWidth: 900 }}>
          <p style={{ fontFamily: P.body, fontSize: 16, color: P.subdued, lineHeight: 1.7, margin: '0 0 18px' }}>
            Wire MCP into your client and ask in plain English — you should see real tool calls like
            {' '}<code style={{ ...MF, fontSize: 13, color: P.accentDeep }}>browser_navigate</code>,{' '}
            <code style={{ ...MF, fontSize: 13, color: P.accentDeep }}>browser_snapshot</code>. If you only get prose, it isn't connected.
          </p>
          <div style={{ position: 'relative', border: `1px solid ${P.rule}`, padding: '16px 20px', background: P.panelT, borderRadius: 4, marginBottom: 4 }}>
            <Corners color={A.border} />
            <div style={{ ...MF, fontSize: 9.5, color: P.muted, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>The reflex to build</div>
            <div style={{ fontFamily: P.mono, fontSize: 13.5, color: P.subdued, lineHeight: 1.6 }}>
              "List every product on the inventory page with its name and price. Don't screenshot — read the accessibility snapshot."
            </div>
          </div>
          <McpCapabilityCards />
        </div>
      </div>
    </div>
  );
}

const MCP_LABS = [
  { idx: '01', tag: 'Lab · explore', name: 'Exploratory bug hunt', desc: 'Turn the agent loose like a curious user — edge cases, broken images, locked-out accounts. The killer demo for non-coders.', foot: 'Curious-user mode', Icon: Bug, c: C.blue, span: 2 },
  { idx: '02', tag: 'Lab · a11y', name: 'A11y audit', desc: 'Missing labels, unlabelled inputs, no alt text — a 2-minute first pass in one prompt.', foot: 'One-prompt pass', Icon: ScanSearch, c: C.indigo, span: 1 },
  { idx: '03', tag: 'Lab · routes', name: 'Network mocking', desc: 'Intercept /api/inventory.json → 500, out-of-stock, offline. Negative paths made cheap.', foot: '--caps=network', Icon: Network, c: C.teal, span: 1 },
  { idx: '04', tag: 'Lab · mobile', name: 'Mobile emulation', desc: 'Walk guest checkout on an iPhone 15. Screenshot every layout break.', foot: '--device "iPhone 15"', Icon: Smartphone, c: C.amber, span: 1 },
  { idx: '05', tag: 'Lab · trace', name: 'Tracing', desc: 'Record a trace.zip — a shareable artifact any dev can replay. Drop it in a Jira ticket.', foot: '--caps=devtools', Icon: FileText, c: C.green, span: 1 },
];

function SlideMcpLabs() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="Door 1 · MCP power-use"
        title={<>Five labs,<br />one <Accent>browser.</Accent></>}
        blurb="Each is 10–15 minutes. What's painful to write by hand becomes a prompt."
      />
      <div style={{ padding: 'clamp(16px,2vw,24px)', boxSizing: 'border-box', height: '100%' }}>
        <div className="sc" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 'clamp(12px,1.5vw,18px)', height: '100%' }}>
          {MCP_LABS.map((f) => (
            <SpecCard key={f.idx} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideCli() {
  const bars = [
    { label: 'MCP', val: '114K', w: '100%', c: C.blue, note: 'full a11y snapshots in-context' },
    { label: 'CLI', val: '27K', w: '24%', c: C.teal, note: 'snapshots on disk · 4× cheaper' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="Door 2 · Playwright CLI"
        title={<>The <Accent>token-efficient</Accent> path.</>}
        blurb="Same client surface, stateless. Snapshots write to disk — only filenames flow back into the prompt."
      />
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: 'clamp(28px,3.4vw,56px) clamp(24px,3vw,48px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <div className="sc" style={{ width: '100%', maxWidth: 860, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'clamp(18px,2.4vw,32px)' }}>
          <div>
            <div style={{ ...MF, fontSize: 11, color: P.muted, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 'clamp(14px,1.8vw,20px)' }}>Same task · tokens consumed</div>
            {bars.map((b) => (
              <div key={b.label} style={{ marginBottom: 'clamp(14px,1.8vw,22px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                  <span style={{ ...MF, fontSize: 13.5, color: P.fg, fontWeight: 700, letterSpacing: '0.04em' }}>{b.label}</span>
                  <span style={{ ...MF, fontSize: 12, color: P.muted }}>{b.note}</span>
                </div>
                <div style={{ position: 'relative', height: 'clamp(34px,4vw,46px)', border: `1px solid ${P.rule}`, borderRadius: 3, overflow: 'hidden', background: 'rgba(16,21,28,0.02)', backgroundImage: `repeating-linear-gradient(90deg, ${P.rule} 0, ${P.rule} 1px, transparent 1px, transparent 10%)` }}>
                  <div style={{ width: b.w, height: '100%', background: b.c, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
                    <span style={{ ...MF, fontSize: 'clamp(13px,1.4vw,16px)', color: '#fff', fontWeight: 700 }}>{b.val}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'clamp(14px,1.8vw,20px)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 220px', border: `1px solid ${A.border}`, background: A.fill, borderRadius: 5, padding: 'clamp(18px,2.2vw,26px)' }}>
              <Corners color={A.border} />
              <DollarSign size={22} color={P.accent} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: P.body, fontSize: 'clamp(14px,1.5vw,16.5px)', color: P.subdued, lineHeight: 1.55 }}>The 4× delta compounds: at <strong style={{ color: P.fg }}>500 flows/day</strong>, reportedly ~<strong style={{ color: P.fg }}>$650/day</strong> in API spend.</div>
            </div>
            <div style={{ position: 'relative', flex: '1 1 220px', border: `1px solid ${P.rule}`, background: P.panelT, borderRadius: 5, padding: 'clamp(18px,2.2vw,26px)' }}>
              <Corners color={`${C.teal}55`} />
              <Link2 size={22} color={C.teal} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: P.body, fontSize: 'clamp(14px,1.5vw,16.5px)', color: P.subdued, lineHeight: 1.55 }}>The killer move: <strong style={{ color: P.fg }}>bind one browser</strong> — you hand-drive, CLI automates, MCP narrates, all on the same tab.</div>
            </div>
          </div>

          <div style={{ position: 'relative', ...MF, fontSize: 'clamp(12px,1.3vw,14px)', background: '#0e131a', color: '#dfe6ee', padding: 'clamp(18px,2.2vw,26px)', borderRadius: 5, lineHeight: 2, border: `1px solid ${P.ruleStrong}` }}>
            <span style={{ position: 'absolute', top: 10, right: 14, ...MF, fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)' }}>SHELL</span>
            <span style={{ color: C.teal }}>$</span> npm i -g @playwright/cli@latest<br />
            <span style={{ color: C.teal }}>$</span> playwright-cli install <span style={{ color: '#7aa0d6' }}>--skills</span><br />
            <span style={{ color: C.teal }}>$</span> playwright-cli open localhost:5173 --headed <span style={{ color: '#7aa0d6' }}>--bind</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideAgents() {
  const steps = [
    { Icon: ClipboardList, name: 'Planner', desc: 'Reads the flow, writes a checklist spec → specs/checkout.md. Surfaces what it covered, missed, or hallucinated.', c: C.blue },
    { Icon: Wand2, name: 'Generator', desc: 'Spec → executable tests. Role-based locators, reuses the authedPage fixture. Watch the quality bar — fixtures, toPass().', c: C.indigo },
    { Icon: Stethoscope, name: 'Healer', desc: 'Repairs failing tests. Patches locator drift cleanly — but can weaken assertions to make them pass. Read the diff.', c: C.green },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="Door 3 · Agents end-to-end"
        title={<>Plan → Generate → <Accent>Heal.</Accent></>}
        blurb="Three .agent.md files — just prompts + tool lists. Auditable, editable, version-controlled. No opaque magic."
      />
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: 'clamp(26px,3vw,52px) clamp(24px,3vw,48px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <div className="sc" style={{ width: '100%', maxWidth: 900, height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.8vw,22px)' }}>
          {steps.map((s, i) => (
            <div key={s.name} style={{ flex: '1 1 0', minHeight: 0, display: 'flex', alignItems: 'stretch', gap: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 52, flexShrink: 0 }}>
                <div style={{ width: 52, height: 52, borderRadius: 4, border: `1px solid ${s.c}40`, background: `${s.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.Icon size={24} color={s.c} />
                </div>
                {i < steps.length - 1 && <div className="flow-arrow" style={{ width: 1.5, flex: 1, background: `linear-gradient(${s.c}, ${steps[i + 1].c})`, marginTop: 6, opacity: 0.5 }} />}
              </div>
              <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${P.rule}`, borderLeft: `3px solid ${s.c}`, borderRadius: 5, padding: 'clamp(16px,2.2vw,30px) clamp(20px,2.6vw,34px)', background: P.panelT }}>
                <Corners color={`${s.c}40`} />
                <div style={{ ...DF, fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.025em', marginBottom: 'clamp(6px,1vw,12px)' }}>{s.name}</div>
                <div style={{ fontFamily: P.body, fontSize: 'clamp(14px,1.5vw,17px)', color: P.subdued, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ position: 'relative', flexShrink: 0, padding: 'clamp(16px,1.8vw,22px) clamp(20px,2.4vw,28px)', border: `1px solid ${A.border}`, background: A.fill, borderRadius: 5 }}>
            <Corners color={A.border} />
            <span style={{ ...MF, fontSize: 'clamp(11px,1.2vw,13px)', color: P.accentDeep, letterSpacing: '0.02em', lineHeight: 1.65 }}>
              Honest framing: no frontier model exceeds ~30% F1 on real web testing without a human-supplied checklist. That's why the work is split into three supervised steps.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FAILURES = [
  { idx: 'F1', tag: 'fix · review gate', name: 'Hallucinated assertion', desc: 'Healer "fixes" a test by deleting the assertion. Mitigate: guardrail prompt + human review gate.', foot: 'Human review gate', Icon: Skull, c: C.rose, span: 2 },
  { idx: 'F2', tag: 'fix · cap iters', name: 'Tool-loop exhaustion', desc: 'A 30+ turn flow burns budget going nowhere. Mitigate: max_tool_iterations: 8.', foot: 'max_tool_iterations: 8', Icon: Repeat, c: C.amber, span: 1 },
  { idx: 'F3', tag: 'fix · seed+chunk', name: 'Context decay', desc: 'Long suites without seeds drift. Mitigate: chunk runs, lean on storageState.', foot: 'Seed + chunk', Icon: Layers, c: C.indigo, span: 1 },
  { idx: 'F4', tag: 'fix · manual', name: 'Shadow DOM blindness', desc: 'A shadow root and the agent goes dark. Mitigate: a manual fallback path.', foot: 'Manual fallback', Icon: Eye, c: C.teal, span: 1 },
  { idx: 'F5', tag: 'fix · never skip', name: 'Re-auth loop', desc: 'Lose .auth/user.json mid-run → re-login storm. Mitigate: restore it, never skip the seed.', foot: 'Never skip the seed', Icon: KeyRound, c: C.green, span: 1 },
];

function SlideFailures() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="The most important 15 min"
        title={<>Five ways agents <Accent>fail.</Accent></>}
        blurb="Never auto-commit Healer output to main — ~25% false-positive rate. Generated tests land in proposed/; a human promotes them."
      />
      <div style={{ padding: 'clamp(16px,2vw,24px)', boxSizing: 'border-box', height: '100%' }}>
        <div className="sc" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 'clamp(12px,1.5vw,18px)', height: '100%' }}>
          {FAILURES.map((f) => (
            <SpecCard key={f.idx} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideDecision() {
  const stages = [
    { n: '01', stage: 'Starter', team: '3-person QA', door: 'CLI + Claude Code', explain: 'Every dollar and minute counts. CLI is cheapest and fastest — snapshots write to disk, not into the prompt. With three people you ARE the review; approval workflows would only slow you down.', unlock: 'Speed over process', c: C.teal },
    { n: '02', stage: 'Scaling', team: '10–30 SDETs', door: 'CLI daily · Agents for bursts', explain: 'You already have code review — that\'s the unlock. CLI stays the daily driver; when a big feature lands, let the planner → generator → healer agents draft tests in bulk. Your PR gate catches what they get wrong.', unlock: 'Code review already exists', c: C.indigo },
    { n: '03', stage: 'Enterprise', team: '50+ org', door: 'All three, in lanes', explain: 'Different audiences need different doors. MCP lets non-coders explore in a sandbox; CLI is the SDETs\' daily tool; Agents run for scale behind review gates. The keyword is lanes: each door serves a role, with the right guardrail.', unlock: 'Match the door to the role', c: C.blue },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '34% 1fr', overflow: 'hidden' }}>
      <div className="sc" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(34px,4.8vw,64px) clamp(30px,4.2vw,56px)', borderRight: `1px solid ${P.rule}`, overflow: 'hidden' }}>
        <Label>Pick the right door</Label>
        <h2 style={{ ...DF, fontSize: 'clamp(34px,4.8vw,60px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, margin: '0 0 20px', color: P.fg, position: 'relative' }}>
          Which door for <Accent>your team?</Accent>
        </h2>
        <div className="rule-draw" style={{ width: 46, height: 2, background: P.accent, marginBottom: 20, opacity: 0.75 }} />
        <p style={{ fontFamily: P.body, fontSize: 15, color: P.muted, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 384, position: 'relative' }}>
          There's no single right door. The right one is a function of <strong style={{ color: P.subdued }}>size, governance, and test volume</strong> — not hype. Read it top-to-bottom as a maturity curve: the same team, growing up.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...MF, fontSize: 10.5, color: P.accentDeep, letterSpacing: '0.14em', textTransform: 'uppercase', position: 'relative' }}>
          <span style={{ width: 18, height: 1.5, background: P.accent, opacity: 0.7 }} /> Maturity ↓
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: 'clamp(26px,3vw,52px) clamp(24px,3vw,48px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <div className="sc" style={{ width: '100%', maxWidth: 940, height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.8vw,22px)' }}>
          {stages.map((s, i) => (
            <div key={s.n} style={{ flex: '1 1 0', minHeight: 0, display: 'grid', gridTemplateColumns: '66px 1fr', border: `1px solid ${P.rule}`, borderLeft: `3px solid ${s.c}`, borderRadius: 5, overflow: 'hidden', background: P.panelT, backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '18px 0', borderRight: `1px solid ${P.rule}`, position: 'relative', background: `${s.c}06` }}>
                <div style={{ ...MF, fontSize: 26, fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.n}</div>
                <div style={{ ...MF, fontSize: 9, color: P.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 12, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{s.stage}</div>
                {i < stages.length - 1 && <div style={{ position: 'absolute', bottom: -8, left: '50%', width: 1, height: 16, background: P.rule, transform: 'translateX(-50%)' }} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(16px,2vw,28px) clamp(20px,2.4vw,32px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 'clamp(8px,1.2vw,14px)' }}>
                  <div style={{ ...DF, fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.025em' }}>{s.team}</div>
                  <div style={{ ...MF, fontSize: 'clamp(11px,1.1vw,13px)', fontWeight: 600, color: s.c, padding: '6px 13px', border: `1px solid ${s.c}40`, background: `${s.c}10`, borderRadius: 3, whiteSpace: 'nowrap' }}>{s.door}</div>
                </div>
                <div style={{ fontFamily: P.body, fontSize: 'clamp(14px,1.45vw,16.5px)', color: P.subdued, lineHeight: 1.6, marginBottom: 'clamp(10px,1.4vw,16px)' }}>{s.explain}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...MF, fontSize: 'clamp(9.5px,1vw,11px)', color: P.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  <span style={{ color: s.c }}>◆</span> Unlock — <span style={{ color: P.subdued }}>{s.unlock}</span>
                </div>
              </div>
            </div>
          ))}

          <div style={{ position: 'relative', flexShrink: 0, display: 'flex', gap: 18, alignItems: 'center', padding: 'clamp(16px,1.8vw,22px) clamp(20px,2.4vw,28px)', border: `1px solid ${A.border}`, background: A.fill, borderRadius: 5 }}>
            <Corners color={A.border} />
            <div style={{ ...MF, fontSize: 'clamp(34px,3.6vw,52px)', fontWeight: 700, color: P.accent, lineHeight: 1, flexShrink: 0 }}>200</div>
            <div>
              <div style={{ ...MF, fontSize: 'clamp(9.5px,1vw,11px)', color: P.accentDeep, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>The readiness floor</div>
              <div style={{ fontFamily: P.body, fontSize: 'clamp(13px,1.4vw,15.5px)', color: P.subdued, lineHeight: 1.6 }}>
                Below ~200 tests, agent integration overhead costs <em style={{ fontStyle: 'normal', fontWeight: 600, color: P.subdued }}>more</em> than the maintenance it relieves. When leadership asks "should we adopt agents?", the honest first question is "do we even have 200 tests?" If not — <strong style={{ color: P.fg }}>not yet</strong>. CLI is plenty.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideFourthDoor() {
  const terms = [
    { Icon: Globe, term: 'Synthetic monitoring', def: 'Scheduled Playwright runs against prod from N global locations', c: C.blue },
    { Icon: Code2, term: 'Monitoring as Code', def: 'Monitors in Git, reviewed in PRs, same lifecycle as tests', c: C.teal },
    { Icon: Boxes, term: 'Check Suites', def: 'A playwright.config.ts running unchanged as a monitor', c: C.indigo },
    { Icon: Crosshair, term: 'AI failure triage', def: 'LLM reads trace + network + console to explain failures', c: C.green },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '36% 1fr', overflow: 'hidden' }}>
      <HeadCol
        label="The fourth door"
        title={<>Tests as <Accent>monitors.</Accent></>}
        blurb="The same config you wired into CI can run on a schedule as a production monitor. No rewrite, no parallel suite — every guardrail applies double."
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px,4vw,56px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <div className="sc" style={{ width: '100%', maxWidth: 820 }}>
          <p style={{ fontFamily: P.body, fontSize: 16, color: P.subdued, lineHeight: 1.7, margin: '0 0 22px' }}>
            The agent-authored tests that survive the <code style={{ ...MF, fontSize: 13, color: P.accentDeep }}>proposed/</code> → <code style={{ ...MF, fontSize: 13, color: P.accentDeep }}>tests/</code> review gate are exactly the suite you want watching production.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 14 }}>
            {terms.map((t) => (
              <div key={t.term} style={{ position: 'relative', border: `1px solid ${P.rule}`, borderRadius: 4, padding: '18px 20px', background: P.panelT, backdropFilter: 'blur(4px)' }}>
                <Corners color={`${t.c}55`} />
                <div style={{ width: 36, height: 36, borderRadius: 3, border: `1px solid ${t.c}40`, background: `${t.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <t.Icon size={18} color={t.c} />
                </div>
                <div style={{ ...DF, fontSize: 'clamp(16px,1.9vw,20px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.015em', marginBottom: 6 }}>{t.term}</div>
                <div style={{ fontFamily: P.body, fontSize: 13.5, color: P.muted, lineHeight: 1.5 }}>{t.def}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideThankYou() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px,5vw,60px)', boxSizing: 'border-box', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="sc">
          <div style={{ marginBottom: 22 }}><Chip>The take-home capstone awaits</Chip></div>
          <div style={{ ...DF, fontSize: 'clamp(58px,9vw,124px)', fontWeight: 700, letterSpacing: '-0.04em', color: P.fg, lineHeight: 0.92 }}>
            Thank <Accent>you</Accent>.
          </div>
          <p style={{ fontFamily: P.body, fontSize: 'clamp(15px,2vw,19px)', color: P.subdued, lineHeight: 1.6, maxWidth: 620, margin: '24px auto 30px' }}>
            Apply the three doors to <em style={{ fontStyle: 'normal', fontWeight: 600, color: P.fg }}>your own</em> app within a week — plan, generate, heal, then decide: MCP, CLI, Agents, or "not yet."
          </p>

          <div style={{ display: 'flex', gap: 'clamp(16px,2vw,26px)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'Sai Krishna', role: 'Maintainer · Speaker · Author', site: 'saikrishna.tech', qr: '/qr-code.png' },
              { name: 'Srinivasan Sekar', role: 'Maintainer · Speaker · Author', site: 'srini.codes', qr: '/QR-sekar.png' },
            ].map((p) => (
              <div key={p.name} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 18, padding: '18px 24px', border: `1px solid ${P.rule}`, borderRadius: 4, background: P.panelT, backdropFilter: 'blur(4px)' }}>
                <Corners color={A.border} len={12} />
                <img src={p.qr} alt={`QR — ${p.site}`} style={{ width: 92, height: 92, display: 'block' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ ...DF, fontSize: 'clamp(18px,2.1vw,25px)', fontWeight: 700, color: P.fg, letterSpacing: '-0.02em' }}>{p.name}</div>
                  <div style={{ fontFamily: P.body, fontSize: 13.5, color: P.subdued, marginBottom: 6 }}>{p.role}</div>
                  <div style={{ ...MF, fontSize: 12, color: P.accentDeep, letterSpacing: '0.08em' }}>{p.site}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Registry ───────────────────────────────────────────────────────────────────

const SLIDES = [
  SlideTitle, SlideIntro, SlideArchitecture, SlideThreeDoors, SlideMcpFoundations, SlideMcpLabs,
  SlideCli, SlideAgents, SlideFailures, SlideDecision,
  SlideFourthDoor, SlideThankYou,
];

// ── Nav button ───────────────────────────────────────────────────────────────

function NavBtn({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { color: P.accentDeep }}
      style={{ ...MF, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: disabled ? P.muted : P.subdued, background: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.35 : 1, padding: '0 4px' }}
    >
      {children}
    </motion.button>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function PlaywrightMCP() {
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

  const topBar = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', height: 42, borderBottom: `1px solid ${P.rule}`, flexShrink: 0, position: 'relative' }}>
      <Link to="/presentations" style={{ ...MF, fontSize: 10.5, color: P.muted, textDecoration: 'none', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        ← Index
      </Link>
      <span style={{ ...MF, fontSize: 10.5, color: P.muted, letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Playwright ✕ AI · The Three Doors
      </span>
      <div style={{ width: 56, textAlign: 'right', overflow: 'hidden', position: 'relative', height: 18 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={slide}
            initial={{ opacity: 0, y: direction >= 0 ? 7 : -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction >= 0 ? -7 : 7 }}
            transition={{ duration: 0.18 }}
            style={{ ...MF, fontSize: 11, fontWeight: 700, color: P.accentDeep, position: 'absolute', right: 0, whiteSpace: 'nowrap' }}
          >
            {String(slide + 1).padStart(2, '0')}<span style={{ color: P.muted, fontWeight: 400 }}>·{String(n).padStart(2, '0')}</span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );

  // ruler / measuring-scale nav
  const ruler = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', height: 46, borderTop: `1px solid ${P.rule}`, flexShrink: 0 }}>
      <NavBtn onClick={() => go(slide - 1)} disabled={slide === 0}>← Prev</NavBtn>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 22, paddingBottom: 1, borderBottom: `1px solid ${P.rule}` }}>
        {SLIDES.map((_, i) => {
          const active = i === slide;
          const done = i <= slide;
          return (
            <motion.button
              key={i}
              onClick={() => go(i)}
              title={`Slide ${i + 1}`}
              animate={{ height: active ? 16 : 8, backgroundColor: active ? P.accent : done ? 'rgba(74,111,165,0.4)' : P.ruleStrong }}
              transition={{ type: 'spring', stiffness: 480, damping: 32 }}
              style={{ width: 2, border: 'none', cursor: 'pointer', padding: 0, borderRadius: 0 }}
            />
          );
        })}
      </div>
      <NavBtn onClick={() => go(slide + 1)} disabled={slide === n - 1}>Next →</NavBtn>
    </div>
  );

  return (
    <>
      <style>{FONT_CSS}</style>
      <style>{STAGGER_CSS}</style>
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: P.ground, padding: 'clamp(10px,1.4vw,18px)', boxSizing: 'border-box', fontFamily: P.body, color: P.fg }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 60) go(dx < 0 ? slide + 1 : slide - 1); }}
      >
        {/* Framed drafting sheet */}
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, border: `1px solid ${P.ruleStrong}`, background: '#ffffff', overflow: 'hidden' }}>
          <BlueprintBg />
          <Corners inset={6} len={13} color={P.accent} sw={1.6} />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            {topBar}
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence custom={direction}>
                <motion.div
                  key={slide}
                  custom={direction}
                  variants={slideVar}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, willChange: 'transform, opacity, filter' }}
                >
                  <div style={{ flex: 1, minHeight: 0, minWidth: 0, width: '100%', position: 'relative', overflow: 'hidden' }}>
                    <SlideComponent />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {ruler}
          </div>
        </div>
      </div>
    </>
  );
}
