import { T } from '../theme';
import { SAI } from '../data';
import { Wrap, FadeIn, StatusDot, SentenceCycler, Frame } from '../components/Shared';
import { ThreeHero } from '../components/ThreeHero';
import { ContribGraph } from '../components/ContribGraph';

const FRAMES: Frame[] = [
  { role: 'maintainer', tail: <>shipping <span style={{ color: T.fg }}>Appium plugins</span> that thousands of test suites quietly depend on.</> },
  { role: 'speaker', tail: <>turning messy production postmortems into <span style={{ color: T.fg }}>50+ conference talks</span>.</> },
  { role: 'author', tail: <>whose book <span style={{ color: T.fg }}>Appium Insights</span> <span style={{ color: T.muted }}>(Apress)</span> sits on the shelf of more QA leads than I can count.</> },
  { role: 'open-source contributor', tail: <>with a decade of commits to <span style={{ color: T.fg }}>Appium</span>, <span style={{ color: T.fg }}>Selenium</span>, and <span style={{ color: T.fg }}>Taiko</span>.</> },
  { role: 'engineer', tail: <>leading infrastructure at <span style={{ color: T.fg }}>TestMu AI</span> — where every build ships through hardware I helped wire up.</> },
  { role: 'teacher', tail: <>whose workshops have graduated <span style={{ color: T.fg }}>thousands of QA engineers</span> into Appium 2.0.</> },
  { role: 'test automation nerd', tail: <>currently obsessed with the seam between <span style={{ color: T.fg }}>software under test</span> and <span style={{ color: T.accent }}>autonomous AI agents</span>.</> },
];

function Hero() {
  return (
    <section style={{ padding: '88px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <ThreeHero />

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.14 }}>
        <defs>
          <pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke={T.rule} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: T.accent,
          filter: 'blur(200px)',
          opacity: 0.14,
          pointerEvents: 'none',
        }}
      />

      <Wrap style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <StatusDot label="Currently at TestMu AI · open to conversations" color={T.accent} />
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 64,
            alignItems: 'start',
            marginTop: 24,
          }}
        >
          <div>
            <FadeIn delay={100}>
              <h1 style={{ fontSize: 'clamp(88px, 13vw, 180px)', lineHeight: 0.88, fontWeight: 500, letterSpacing: -6, margin: 0 }}>
                Sai<br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${T.fg} 0%, ${T.fg} 40%, ${T.accent} 50%, ${T.fg} 60%, ${T.fg} 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'glow-sweep 6s ease-in-out infinite',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Krishna.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={260}>
              <div
                style={{
                  marginTop: 32,
                  fontSize: 28,
                  lineHeight: 1.25,
                  letterSpacing: -0.4,
                  color: T.subdued,
                  maxWidth: 720,
                  minHeight: 120,
                }}
              >
                A <SentenceCycler accent={T.accent} frames={FRAMES} />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={220} y={24}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-end' }}>
              <div style={{ position: 'relative', width: 340, height: 420 }}>
                <div style={{ position: 'absolute', inset: 0, border: `1px solid ${T.accent}`, transform: 'translate(14px,14px)', pointerEvents: 'none' }} />
                <img
                  src="/assets/sai-hero.webp"
                  alt="Sai Krishna"
                  style={{
                    width: 340,
                    height: 420,
                    objectFit: 'cover',
                    objectPosition: '50% 28%',
                    filter: 'contrast(1.05) saturate(0.9)',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 600ms cubic-bezier(.2,.7,.2,1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-4px,-4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(0,0)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.accent,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    zIndex: 2,
                    background: T.bg,
                    padding: '4px 8px',
                    border: `1px solid ${T.rule}`,
                  }}
                >
                  fig. 01 · sai
                </div>
              </div>
              <BookBannerCompact />
            </div>
          </FadeIn>
        </div>

      </Wrap>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  const onClick = () => {
    const el = document.getElementById('contrib');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to contributions"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 28,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: T.muted,
        fontFamily: T.mono,
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        padding: 8,
        zIndex: 3,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
    >
      <span>Signal in public — scroll</span>
      <svg
        width={16}
        height={22}
        viewBox="0 0 16 22"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        style={{ animation: 'scrollhint 1.6s ease-in-out infinite' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3 L8 17" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12 L8 17 L13 12" />
      </svg>
    </button>
  );
}

function Tally() {
  return (
    <section style={{ padding: '80px 0 100px', borderTop: `1px solid ${T.rule}` }}>
      <Wrap>
        <FadeIn>
          <div style={{ maxWidth: 1080 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 28,
                fontFamily: T.mono,
                fontSize: 11,
                color: T.muted,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <span>The tally — by the numbers</span>
              <span style={{ flex: 1, height: 1, background: T.rule }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
              {SAI.stats.map((s) => (
                <div key={s.v} style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 12 }}>
                  <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1, color: T.fg }}>{s.k}</div>
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      color: T.muted,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Wrap>
    </section>
  );
}


function BookBannerCompact() {
  return (
    <a
      href="https://www.amazon.com/s?k=appium+insights+sai+krishna"
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 18,
        alignItems: 'center',
        width: 340,
        padding: '18px 20px',
        border: `1px solid ${T.rule}`,
        background: 'rgba(253,186,174,0.04)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color .25s, background .25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = T.accent;
        e.currentTarget.style.background = 'rgba(253,186,174,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = T.rule;
        e.currentTarget.style.background = 'rgba(253,186,174,0.04)';
      }}
    >
      <img
        src="https://m.media-amazon.com/images/I/51w3vvzqGWL._SL1180_.jpg"
        alt="Appium Insights book cover"
        style={{
          width: 80,
          height: 120,
          objectFit: 'cover',
          border: `1px solid ${T.accent}`,
          display: 'block',
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Book · Apress 2024
        </div>
        <div
          style={{
            fontSize: 18,
            letterSpacing: -0.3,
            color: T.fg,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span style={{ color: T.accent }}>Appium Insights</span>
        </div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            color: T.muted,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 8,
          }}
        >
          Order on Amazon →
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ContribGraph />
      <Tally />
    </>
  );
}
