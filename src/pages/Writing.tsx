import { T } from '../theme';
import { WRITING } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';

export default function Writing() {
  const essays = WRITING.filter((w) => w.kind === 'Essay');
  return (
    <>
      <PageHead
        num="04"
        label="Writing"
        title={
          <>
            Book, and <span style={{ color: T.accent }}>the essays.</span>
          </>
        }
        lead="One book and a handful of long-form pieces. I write when I can't finish a thought in a conference talk."
      />

      <section style={{ padding: '80px 0 40px' }}>
        <Wrap>
          <div
            style={{
              padding: 44,
              border: `1px solid ${T.rule}`,
              background: 'rgba(253,186,174,0.05)',
              display: 'grid',
              gridTemplateColumns: '200px 1fr auto',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <a
              href="https://www.amazon.com/s?k=appium+insights+sai+krishna"
              target="_blank"
              rel="noreferrer"
              style={{
                position: 'relative',
                display: 'block',
                width: 200,
                height: 300,
                border: `1px solid ${T.accent}`,
                boxShadow: `10px 10px 0 0 ${T.accent}22`,
                transition: 'transform 400ms cubic-bezier(.2,.7,.2,1), box-shadow 400ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = `14px 14px 0 0 ${T.accent}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `10px 10px 0 0 ${T.accent}22`;
              }}
            >
              <img
                src="https://m.media-amazon.com/images/I/51w3vvzqGWL._SL1180_.jpg"
                alt="Appium Insights book cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </a>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}>The book</div>
              <h3 style={{ fontSize: 38, margin: '12px 0 16px', letterSpacing: -1, fontWeight: 500, lineHeight: 1.05 }}>
                Appium Insights. Strategies for Successful Mobile Automation.
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: T.subdued, margin: 0, maxWidth: 560 }}>
                For engineers who know Appium works, and want it to stop surprising them. Architecture, patterns, and the anti-patterns I had to un-ship — the mobile slice of a broader automation practice.
              </p>
            </div>
            <a
              href="https://www.amazon.com/s?k=appium+insights+sai+krishna"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '16px 24px',
                  background: T.accent,
                  color: T.bg,
                  border: 'none',
                  fontFamily: T.mono,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Order →
              </button>
            </a>
          </div>

          <div style={{ marginTop: 72 }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
              Essays
            </div>
            <div style={{ display: 'grid', gap: 0 }}>
              {essays.map((w, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 240px',
                    gap: 28,
                    padding: '28px 0',
                    borderTop: `1px solid ${T.rule}`,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'background .2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(253,186,174,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontFamily: T.mono, fontSize: 12, color: T.accent }}>{w.year}</span>
                  <div>
                    <div style={{ fontSize: 22, color: T.fg, letterSpacing: -0.3, lineHeight: 1.3 }}>{w.title}</div>
                    <div style={{ fontSize: 15, color: T.subdued, marginTop: 6, lineHeight: 1.55 }}>{w.blurb}</div>
                  </div>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      color: T.muted,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      alignSelf: 'start',
                      paddingTop: 6,
                    }}
                  >
                    @ {w.source} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
