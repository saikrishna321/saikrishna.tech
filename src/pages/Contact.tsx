import { T } from '../theme';
import { SAI } from '../data';
import { Wrap, FadeIn, StatusDot, useIsMobile } from '../components/Shared';

const CHANNELS = [
  {
    label: 'Email',
    value: SAI.email,
    href: SAI.socials.email,
    desc: 'Fastest channel. Reply within a day or two.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: '@saikrishna321',
    href: SAI.socials.github,
    desc: 'Where most of the work lives.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.85 3.14 8.96 7.49 10.42.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.05.66-3.69-1.29-3.69-1.29-.5-1.27-1.22-1.61-1.22-1.61-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.47-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.48-1.39.11-2.9 0 0 .92-.29 3.02 1.12A10.5 10.5 0 0112 6.29c.93.01 1.86.12 2.73.36 2.1-1.41 3.02-1.12 3.02-1.12.6 1.51.22 2.62.11 2.9.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.14-5.01 5.42.39.33.74.99.74 2v2.96c0 .29.2.64.76.53 4.35-1.46 7.48-5.57 7.48-10.42C23.01 5.24 18.27.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Sai Krishna',
    href: SAI.socials.linkedin,
    desc: 'For work conversations and introductions.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.63-1.86 3.36-1.86 3.6 0 4.26 2.37 4.26 5.45v6.3zM5.34 7.44a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    value: '@saikrisv',
    href: SAI.socials.twitter,
    desc: 'Hot takes on testing. DM open.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

const OPEN_TO = [
  'Conference & meetup talks',
  'Hands-on workshop bookings',
  'Advisory conversations on test infra',
  'Open-source collaboration',
  'Podcast & panel appearances',
];

export default function Contact() {
  const mobile = useIsMobile();
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: T.accent,
          filter: 'blur(200px)',
          opacity: 0.16,
          pointerEvents: 'none',
        }}
      />

      {/* Hero */}
      <div style={{ padding: mobile ? '56px 0 36px' : '96px 0 56px', borderBottom: `1px solid ${T.rule}` }}>
        <Wrap>
          <FadeIn>
            <StatusDot label="Open to conversations" color={T.accent} />
          </FadeIn>
          <FadeIn delay={80}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 28 }}>
              08 · Contact
            </div>
            <h1
              style={{
                fontSize: 'clamp(40px, 12vw, 140px)',
                margin: '20px 0 0',
                lineHeight: 0.92,
                letterSpacing: mobile ? -2 : -4,
                fontWeight: 500,
                maxWidth: 900,
              }}
            >
              Let's <span style={{ color: T.accent }}>trade signal.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={180}>
            <p style={{ fontSize: mobile ? 17 : 22, color: T.subdued, maxWidth: 680, lineHeight: 1.5, letterSpacing: -0.2, margin: '28px 0 0' }}>
              Happy to talk about test infrastructure, conference speaking, workshop bookings, or anything at the seam of AI and automation.
            </p>
          </FadeIn>
        </Wrap>
      </div>

      {/* Channels */}
      <div style={{ padding: mobile ? '40px 0' : '64px 0', borderBottom: `1px solid ${T.rule}` }}>
        <Wrap>
          <FadeIn>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: mobile ? 24 : 32,
                fontFamily: T.mono,
                fontSize: 11,
                color: T.muted,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <span>Reach out</span>
              <span style={{ flex: 1, height: 1, background: T.rule }} />
            </div>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 2,
              background: T.rule,
              border: `1px solid ${T.rule}`,
            }}
          >
            {CHANNELS.map((ch) => (
              <FadeIn key={ch.label} delay={100}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    gap: mobile ? 16 : 20,
                    alignItems: 'flex-start',
                    color: 'inherit',
                    textDecoration: 'none',
                    background: T.bg,
                    padding: mobile ? '20px 18px' : '28px 32px',
                    transition: 'background .25s, border-color .25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(253,186,174,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = T.bg)}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${T.rule}`,
                      color: T.accent,
                      flexShrink: 0,
                    }}
                  >
                    {ch.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {ch.label}
                    </div>
                    <div style={{ fontSize: mobile ? 18 : 22, marginTop: 6, letterSpacing: -0.4, color: T.fg, lineHeight: 1.2 }}>
                      {ch.value}
                    </div>
                    <div style={{ fontSize: 13, color: T.subdued, marginTop: 8, lineHeight: 1.5 }}>{ch.desc}</div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </Wrap>
      </div>

      {/* Open to */}
      <div style={{ padding: mobile ? '40px 0' : '64px 0', borderBottom: `1px solid ${T.rule}` }}>
        <Wrap>
          <div style={{ display: mobile ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '280px 1fr', gap: mobile ? 24 : 64, alignItems: 'start' }}>
            <FadeIn>
              <div>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Open to
                </div>
                <div style={{ fontSize: mobile ? 24 : 32, letterSpacing: -0.6, fontWeight: 500, lineHeight: 1.1, color: T.fg }}>
                  Things I'll say yes to.
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {OPEN_TO.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                      padding: '16px 0',
                      borderTop: `1px solid ${T.rule}`,
                      fontSize: mobile ? 16 : 18,
                      color: T.subdued,
                      letterSpacing: -0.2,
                    }}
                  >
                    <span style={{ color: T.accent, fontSize: 10 }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Wrap>
      </div>

      {/* Location / timezone */}
      <div style={{ padding: mobile ? '40px 0 48px' : '56px 0 64px' }}>
        <Wrap>
          <FadeIn>
            <div style={{ display: mobile ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1fr 1fr', gap: mobile ? 24 : 32 }}>
              {([
                ['Location', 'Bengaluru, India', '12.97°N, 77.59°E'],
                ['Timezone', 'IST (UTC+5:30)', 'Usually online mornings & evenings'],
                ['Response', 'Within 1–2 days', 'Email is the fastest channel'],
              ] as const).map(([label, value, sub]) => (
                <div key={label} style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 16 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: mobile ? 20 : 24, letterSpacing: -0.4, color: T.fg, fontWeight: 500, lineHeight: 1.15 }}>
                    {value}
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.1em', marginTop: 8 }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Wrap>
      </div>
    </section>
  );
}
