import { Link } from 'react-router-dom';
import { T } from '../theme';
import { SAI } from '../data';
import { Wrap, FadeIn, StatusDot, SentenceCycler, Frame, useIsMobile } from '../components/Shared';
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
  const mobile = useIsMobile();
  return (
    <section style={{ padding: mobile ? '48px 0 60px' : '88px 0 100px', position: 'relative', overflow: 'hidden' }}>
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
          width: mobile ? 300 : 600,
          height: mobile ? 300 : 600,
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
            display: mobile ? 'flex' : 'grid',
            flexDirection: 'column',
            gridTemplateColumns: '1fr 380px',
            gap: mobile ? 40 : 64,
            alignItems: 'start',
            marginTop: 24,
          }}
        >
          <div>
            <FadeIn delay={100}>
              <h1 style={{ fontSize: 'clamp(56px, 13vw, 180px)', lineHeight: 0.88, fontWeight: 500, letterSpacing: mobile ? -3 : -6, margin: 0 }}>
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
                  marginTop: mobile ? 24 : 32,
                  fontSize: mobile ? 20 : 28,
                  lineHeight: 1.25,
                  letterSpacing: -0.4,
                  color: T.subdued,
                  maxWidth: 720,
                  minHeight: mobile ? 80 : 120,
                }}
              >
                A <SentenceCycler accent={T.accent} frames={FRAMES} />
              </div>
            </FadeIn>

            <FadeIn delay={340}>
              <SocialLinks />
            </FadeIn>
          </div>

          <FadeIn delay={220} y={24}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: mobile ? 'flex-start' : 'flex-end' }}>
              <div style={{ position: 'relative', width: mobile ? '100%' : 340, maxWidth: 340, height: mobile ? 320 : 420 }}>
                <div style={{ position: 'absolute', inset: 0, border: `1px solid ${T.accent}`, transform: 'translate(14px,14px)', pointerEvents: 'none' }} />
                <img
                  src="/assets/sai-hero.webp"
                  alt="Sai Krishna"
                  style={{
                    width: '100%',
                    height: '100%',
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

      {!mobile && <ScrollHint />}
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
  const mobile = useIsMobile();
  return (
    <section style={{ padding: mobile ? '48px 0 60px' : '80px 0 100px', borderTop: `1px solid ${T.rule}` }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mobile ? 24 : 32 }}>
              {SAI.stats.map((s) => (
                <div key={s.v} style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 12 }}>
                  <div style={{ fontSize: mobile ? 32 : 40, fontWeight: 500, letterSpacing: -1, color: T.fg }}>{s.k}</div>
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


function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        border: `1px solid ${T.rule}`,
        color: T.subdued,
        textDecoration: 'none',
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        transition: 'all .2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = T.accent;
        e.currentTarget.style.color = T.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = T.rule;
        e.currentTarget.style.color = T.subdued;
      }}
    >
      {icon}
      {label}
    </a>
  );
}

function SocialLinks() {
  return (
    <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <SocialLink
        href={SAI.socials.github}
        label="GitHub"
        icon={
          <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.85 3.14 8.96 7.49 10.42.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.05.66-3.69-1.29-3.69-1.29-.5-1.27-1.22-1.61-1.22-1.61-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.47-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.48-1.39.11-2.9 0 0 .92-.29 3.02 1.12A10.5 10.5 0 0112 6.29c.93.01 1.86.12 2.73.36 2.1-1.41 3.02-1.12 3.02-1.12.6 1.51.22 2.62.11 2.9.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.14-5.01 5.42.39.33.74.99.74 2v2.96c0 .29.2.64.76.53 4.35-1.46 7.48-5.57 7.48-10.42C23.01 5.24 18.27.5 12 .5z" />
          </svg>
        }
      />
      <SocialLink
        href={SAI.socials.linkedin}
        label="LinkedIn"
        icon={
          <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.63-1.86 3.36-1.86 3.6 0 4.26 2.37 4.26 5.45v6.3zM5.34 7.44a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
          </svg>
        }
      />
      <SocialLink
        href={SAI.socials.twitter}
        label="Twitter"
        icon={
          <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        }
      />
      <SocialLink
        href={SAI.socials.email}
        label="Email"
        icon={
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  );
}

function BookBannerCompact() {
  const mobile = useIsMobile();
  return (
    <Link
      to="/book"
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 18,
        alignItems: 'center',
        width: mobile ? '100%' : 340,
        maxWidth: 340,
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
          View the book →
        </div>
      </div>
    </Link>
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
