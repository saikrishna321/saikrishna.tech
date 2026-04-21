import { Link } from 'react-router-dom';
import { T } from '../theme';
import { WORKSHOPS, Workshop } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';

const TRACKS: ReadonlyArray<{ key: 'all' | Workshop['track']; label: string; desc: string }> = [
  { key: 'all', label: 'All', desc: '' },
  { key: 'ai', label: 'AI & agents', desc: 'Using LLMs and agents responsibly — for QA teams and developers.' },
  { key: 'automation', label: 'Test automation', desc: 'Cross-stack: Playwright, Appium, Selenium. Tool-agnostic principles.' },
  { key: 'platform', label: 'Appium platform', desc: 'Deep-dive internals for teams already running Appium at scale.' },
];

function trackColor(t: Workshop['track']): string {
  if (t === 'ai') return T.accent;
  if (t === 'automation') return '#6bb3d6';
  return '#a58fd6';
}

function WorkshopCard({ w, i }: { w: Workshop; i: number }) {
  const color = trackColor(w.track);
  return (
    <div
      style={{
        background: T.bg,
        padding: 36,
        transition: 'background .3s',
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(253,186,174,0.06)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = T.bg)}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Workshop {String(i + 1).padStart(2, '0')}
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              border: `1px solid ${color}`,
            }}
          >
            {TRACKS.find((t) => t.key === w.track)?.label ?? w.track}
          </div>
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{w.length}</div>
        <h3 style={{ fontSize: 24, margin: '14px 0 14px', letterSpacing: -0.4, fontWeight: 400, lineHeight: 1.2, color: T.accent }}>
          {w.title}
        </h3>
        <p style={{ fontSize: 13.5, color: T.subdued, lineHeight: 1.75, margin: 0, fontWeight: 300, opacity: 0.85 }}>{w.blurb}</p>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.muted,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 16,
          }}
        >
          For: <span style={{ color: T.subdued, opacity: 0.85 }}>{w.audience}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
          {w.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.subdued,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                border: `1px solid ${T.rule}`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <Link
        to="/contact"
        style={{
          fontFamily: T.mono,
          fontSize: 11,
          color: T.accent,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginTop: 24,
          display: 'inline-block',
        }}
      >
        Request this workshop →
      </Link>
    </div>
  );
}

export default function Workshops() {
  const visible = WORKSHOPS;

  return (
    <>
      <PageHead
        num="05"
        label="Workshops"
        title={
          <>
            I also <span style={{ color: T.accent }}>teach.</span>
          </>
        }
        lead="Hands-on sessions for QA teams and developers — AI used responsibly, cross-stack test automation with Playwright and Appium, and the Appium internals behind a serious mobile lab. One to three days."
      />

      <section style={{ padding: '80px 0 24px' }}>
        <Wrap>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 1,
              background: T.rule,
              border: `1px solid ${T.rule}`,
              marginBottom: 40,
            }}
          >
            {TRACKS.filter((t) => t.key !== 'all').map((t, i) => (
              <div key={t.key} style={{ background: T.bg, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: trackColor(t.key as Workshop['track']) }} />
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: T.accent,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Track 0{i + 1} · {t.label}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: T.subdued, lineHeight: 1.55, margin: '10px 0 0' }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 2,
              background: T.rule,
              border: `1px solid ${T.rule}`,
            }}
          >
            {visible.map((w, i) => (
              <WorkshopCard key={w.title} w={w} i={i} />
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              padding: 32,
              border: `1px solid ${T.rule}`,
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Custom</div>
              <h3 style={{ fontSize: 28, margin: '10px 0 8px', letterSpacing: -0.5, fontWeight: 500 }}>Need something tailored?</h3>
              <p style={{ fontSize: 15, color: T.subdued, margin: 0, maxWidth: 620, lineHeight: 1.6 }}>
                AI agent design, eval harnesses for your app, plugin internals, device-lab setup, or mixing Playwright + Appium in one CI pipeline — happy to put something together for your team.
              </p>
            </div>
            <Link
              to="/contact"
              style={{
                padding: '14px 22px',
                background: T.accent,
                color: T.bg,
                fontFamily: T.mono,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Get in touch →
            </Link>
          </div>
        </Wrap>
      </section>
    </>
  );
}
