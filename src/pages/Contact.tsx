import { T } from '../theme';
import { SAI } from '../data';
import { Wrap } from '../components/Shared';

export default function Contact() {
  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', overflow: 'hidden' }}>
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
      <Wrap>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>08 · Contact</div>
        <h1
          style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            margin: '24px 0 48px',
            lineHeight: 0.92,
            letterSpacing: -4,
            fontWeight: 500,
          }}
        >
          Let's <span style={{ color: T.accent }}>trade signal.</span>
        </h1>
        <p style={{ fontSize: 22, color: T.subdued, maxWidth: 720, lineHeight: 1.5, letterSpacing: -0.2, margin: '0 0 64px' }}>
          Happy to talk about test infrastructure, conference speaking, workshop bookings, or anything at the seam of AI and automation. Fastest responses by email.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            background: T.rule,
            border: `1px solid ${T.rule}`,
            maxWidth: 900,
          }}
        >
          {(
            [
              ['Email', SAI.email, SAI.socials.email, 'Fastest channel. Reply within a day or two.'],
              ['GitHub', '@saikrishna321', SAI.socials.github, 'Where most of the work lives.'],
              ['LinkedIn', 'Sai Krishna', SAI.socials.linkedin, 'For work conversations and introductions.'],
              ['Twitter', '@saikrisv', SAI.socials.twitter, 'Hot takes on testing. DM open.'],
            ] as const
          ).map(([k, v, href, d]) => (
            <a
              key={k}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: T.bg, padding: 32, transition: 'background .2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(253,186,174,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = T.bg)}
            >
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontSize: 24, marginTop: 10, letterSpacing: -0.4, color: T.fg }}>{v}</div>
              <div style={{ fontSize: 14, color: T.subdued, marginTop: 10, lineHeight: 1.55 }}>{d}</div>
            </a>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: `1px solid ${T.rule}`,
            fontFamily: T.mono,
            fontSize: 11,
            color: T.muted,
            letterSpacing: '0.14em',
            lineHeight: 1.8,
            maxWidth: 720,
          }}
        >
          <span style={{ color: T.accent }}>Bengaluru, IST (UTC+5:30).</span> Usually replying mornings and evenings.
        </div>
      </Wrap>
    </section>
  );
}
