import { useState } from 'react';
import { Link } from 'react-router-dom';
import { T } from '../theme';
import { PROJECTS, Project } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';
import { ContribGraph } from '../components/ContribGraph';

const CATEGORIES: ReadonlyArray<{
  key: Project['category'];
  label: string;
  desc: string;
}> = [
  { key: 'infra', label: 'Device infra', desc: 'Orchestration, parallelism, device farms.' },
  { key: 'ai', label: 'AI + automation', desc: 'Where LLMs meet real devices and real tests.' },
  { key: 'plugin', label: 'Appium plugins', desc: 'Small, sharp tools that fix one thing well.' },
  { key: 'upstream', label: 'Upstream contributions', desc: 'Patches, reviews, and arguments on the projects everyone else depends on.' },
];

const FEATURED_KEY = 'Appium Device Farm';

function WhatIDo() {
  return (
    <section style={{ padding: '80px 0 90px', borderBottom: `1px solid ${T.rule}`, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -160,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: T.accent,
          filter: 'blur(220px)',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      />
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
              What I do
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 2 }}>
              AI Agents<br />Evaluation<br />Automation<br />Infra
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(48px, 6vw, 76px)', letterSpacing: -1.6, fontWeight: 500, margin: 0, lineHeight: 1.02 }}>
              I build <span style={{ color: T.accent }}>AI agents</span> that test software,<br />
              and the <span style={{ color: T.accent }}>evals</span> that tell you if they're lying.
            </h2>
            <p style={{ fontSize: 19, color: T.subdued, lineHeight: 1.65, margin: '28px 0 0', maxWidth: 760 }}>
              My day job is building autonomous test agents — systems that can read a goal in plain English, drive a real device or browser, and come back with a verdict. The harder half isn't the agent. It's the <span style={{ color: T.fg }}>evaluation harness</span> around it: reproducible test beds, deterministic scoring, drift detection, and benchmarks that survive model upgrades.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 44, background: T.rule, border: `1px solid ${T.rule}` }}>
              {([
                ['Agent systems', 'Tool-using agents for mobile + web test automation. MCP, WebDriverAgent, custom action graphs.'],
                ['Eval harnesses', 'Deterministic test beds, ground-truth datasets, scoring rubrics. The scaffolding that makes "agent accuracy" a real number.'],
                ['Automation infra', 'Device farms, CI runners, orchestration — the production plumbing that agents actually run on.'],
              ] as const).map(([t, d], i) => (
                <div key={t} style={{ background: T.bg, padding: 24 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                    0{i + 1}
                  </div>
                  <div style={{ fontSize: 18, letterSpacing: -0.3, color: T.fg, margin: '10px 0 8px' }}>{t}</div>
                  <div style={{ fontSize: 13, color: T.subdued, lineHeight: 1.55 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}


function Featured() {
  const p = PROJECTS.find((x) => x.title === FEATURED_KEY);
  const [hover, setHover] = useState(false);
  if (!p) return null;
  return (
    <section
      style={{
        padding: '80px 0 100px',
        borderTop: `1px solid ${T.rule}`,
        borderBottom: `1px solid ${T.rule}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: T.accent,
          filter: 'blur(200px)',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      />
      <Wrap>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          ◆ Featured open-source project
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 72, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.95, letterSpacing: -1.6, margin: 0, fontWeight: 500 }}>{p.title}</h2>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: T.subdued, letterSpacing: -0.2, margin: '24px 0 0', maxWidth: 640 }}>{p.blurb}</p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.muted, margin: '16px 0 0', maxWidth: 640 }}>
              Originally scratched an itch at ThoughtWorks — running 20 Android devices against a single CI job without Selenium Grid. Six years later, it's the plugin other companies' device clouds quietly build on top of.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: T.subdued,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '6px 10px',
                    border: `1px solid ${T.rule}`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 32,
                padding: '14px 22px',
                background: hover ? T.accent : 'transparent',
                color: hover ? T.bg : T.fg,
                border: `1px solid ${hover ? T.accent : T.rule}`,
                fontFamily: T.mono,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all .25s',
              }}
            >
              View on GitHub <span style={{ fontSize: 16 }}>→</span>
            </a>
          </div>
          <div style={{ border: `1px solid ${T.rule}`, padding: 28, background: 'rgba(236,232,221,0.02)' }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
              Spec · at a glance
            </div>
            {([
              ['Role', p.tag],
              ['Category', CATEGORIES.find((c) => c.key === p.category)?.label ?? ''],
              ['Language', p.lang],
              ['Stars', `★ ${p.stars}`],
              ['License', 'Apache 2.0'],
              ['Ecosystem', 'Appium 2.0 plugin'],
              ['Active', 'Since 2020'],
            ] as const).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr',
                  gap: 12,
                  padding: '10px 0',
                  borderTop: `1px solid ${T.rule}`,
                  fontSize: 13,
                }}
              >
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</span>
                <span style={{ color: T.fg }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        padding: 28,
        background: hover ? 'rgba(253,186,174,0.06)' : 'transparent',
        border: `1px solid ${hover ? T.accent : T.rule}`,
        transition: 'all .25s',
        position: 'relative',
        minHeight: 280,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: hover ? T.accent : T.muted,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            transition: 'color .25s',
          }}
        >
          {String(i).padStart(2, '0')} / {p.tag}
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.1em' }}>★ {p.stars}</span>
      </div>
      <h3 style={{ fontSize: 28, letterSpacing: -0.5, fontWeight: 500, margin: '24px 0 12px', color: T.fg, lineHeight: 1.05 }}>{p.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: T.subdued, margin: 0 }}>{p.blurb}</p>
      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {p.tech.slice(0, 2).join(' · ')}
        </span>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 14,
            color: hover ? T.accent : T.muted,
            transition: 'all .25s',
            transform: hover ? 'translateX(4px)' : 'translateX(0)',
            display: 'inline-block',
          }}
        >
          →
        </span>
      </div>
    </a>
  );
}

function Catalog() {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');
  const rest = PROJECTS.filter((p) => p.title !== FEATURED_KEY);
  const visible = filter === 'all' ? rest : rest.filter((p) => p.category === filter);
  return (
    <section style={{ padding: '80px 0 40px' }}>
      <Wrap>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>The catalog</div>
            <h2 style={{ fontSize: 42, letterSpacing: -1, fontWeight: 500, margin: '12px 0 0' }}>The rest, sorted by intent.</h2>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.muted }}>
            {visible.length} of {rest.length}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, paddingTop: 20, borderTop: `1px solid ${T.rule}` }}>
          {([['all', 'All'] as const, ...CATEGORIES.map((c) => [c.key, c.label] as const)]).map(([k, label]) => {
            const active = filter === k;
            return (
              <button
                key={k}
                onClick={() => setFilter(k)}
                style={{
                  background: active ? T.accent : 'transparent',
                  color: active ? T.bg : T.subdued,
                  border: `1px solid ${active ? T.accent : T.rule}`,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  fontFamily: T.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  transition: 'all .2s',
                }}
              >
                {label}{' '}
                <span style={{ opacity: 0.5, marginLeft: 6 }}>
                  {k === 'all' ? rest.length : rest.filter((p) => p.category === k).length}
                </span>
              </button>
            );
          })}
        </div>
        {filter === 'all' ? (
          CATEGORIES.map((cat) => {
            const items = rest.filter((p) => p.category === cat.key);
            if (!items.length) return null;
            return (
              <div key={cat.key} style={{ marginBottom: 56 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, marginBottom: 24, alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{cat.label}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, marginTop: 6 }}>
                      {items.length} {items.length === 1 ? 'project' : 'projects'}
                    </div>
                  </div>
                  <div style={{ fontSize: 15, color: T.subdued, lineHeight: 1.6, borderTop: `1px solid ${T.rule}`, paddingTop: 12 }}>{cat.desc}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(items.length, 2)}, 1fr)`, gap: 16 }}>
                  {items.map((p, i) => (
                    <ProjectCard key={p.title} p={p} i={i + 1} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {visible.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i + 1} />
            ))}
          </div>
        )}
      </Wrap>
    </section>
  );
}

function EndCTA() {
  return (
    <section style={{ padding: '100px 0 40px', borderTop: `1px solid ${T.rule}` }}>
      <Wrap>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Up next</div>
            <h3 style={{ fontSize: 48, letterSpacing: -1.2, fontWeight: 500, margin: '16px 0 0', maxWidth: 760, lineHeight: 1.05 }}>
              Curious how these get <span style={{ color: T.accent }}>into production</span>?
            </h3>
            <p style={{ fontSize: 17, color: T.subdued, margin: '18px 0 0', maxWidth: 620, lineHeight: 1.6 }}>
              I've turned most of this work into conference talks — post-mortems, architecture walk-throughs, and the occasional strong opinion.
            </p>
          </div>
          <Link
            to="/talks"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '18px 28px',
              background: T.accent,
              color: T.bg,
              fontFamily: T.mono,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            View the talks <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </div>
      </Wrap>
    </section>
  );
}

export default function Work() {
  return (
    <>
      <PageHead
        num="02"
        label="Work"
        title={
          <>
            What I <span style={{ color: T.accent }}>build.</span>
          </>
        }
        lead="I build AI agents for test automation — and the evaluation harnesses that keep them honest. The rest is open source."
      />
      <WhatIDo />
      <Featured />
      <Catalog />
      <ContribGraph />
      <EndCTA />
    </>
  );
}
