import { T } from '../theme';
import { PRESENTATIONS } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';

export default function Presentations() {
  return (
    <>
      <PageHead
        num="04"
        label="Presentations"
        title={
          <>
            The <span style={{ color: T.accent }}>decks.</span>
          </>
        }
        lead="Slides from recent talks and workshops — click through each deck in your browser."
      />

      <section style={{ padding: '80px 0 60px' }}>
        <Wrap>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Decks · slides
              </div>
              <h2 style={{ fontSize: 42, letterSpacing: -1, fontWeight: 500, margin: '12px 0 0', lineHeight: 1.05 }}>
                Open a <span style={{ color: T.accent }}>deck</span>, full-screen in the browser.
              </h2>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 12, color: T.muted }}>{PRESENTATIONS.length} decks</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: 16 }}>
            {PRESENTATIONS.map((p, i) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: 32,
                  background: 'transparent',
                  border: `1px solid ${T.rule}`,
                  transition: 'all .25s',
                  position: 'relative',
                  minHeight: 240,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(253,186,174,0.06)';
                  e.currentTarget.style.borderColor = T.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = T.rule;
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: T.muted,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: T.mono, fontSize: 18, color: T.muted }}>↗</span>
                </div>

                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: T.accent,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  {p.event}{p.year ? ` · ${p.year}` : ''}
                </div>

                <h3 style={{ fontSize: 26, letterSpacing: -0.4, fontWeight: 500, margin: '0 0 12px', color: T.fg, lineHeight: 1.2 }}>
                  {p.title}
                </h3>

                {p.description && (
                  <p style={{ fontSize: 14, color: T.subdued, lineHeight: 1.6, margin: 0 }}>{p.description}</p>
                )}

                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    color: T.accent,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginTop: 24,
                  }}
                >
                  Open deck →
                </div>
              </a>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
