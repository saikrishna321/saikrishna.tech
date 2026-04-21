import { T } from '../theme';
import { Marquee, useIsMobile } from './Shared';
import { SAI } from '../data';

export function Footer() {
  const year = new Date().getFullYear();
  const mobile = useIsMobile();
  return (
    <footer style={{ marginTop: mobile ? 60 : 120, borderTop: `1px solid ${T.rule}` }}>
      <Marquee
        items={[
          'signal · saikrishna.tech',
          `© ${year}`,
          'bengaluru',
          'open to talks',
          'built 2026',
        ]}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: mobile ? '24px 20px 32px' : '32px 48px 40px',
          display: mobile ? 'flex' : 'grid',
          flexDirection: 'column',
          gridTemplateColumns: '1fr auto',
          gap: mobile ? 24 : 40,
          alignItems: mobile ? 'flex-start' : 'end',
        }}
      >
        <div>
          <div style={{ fontSize: mobile ? 28 : 40, fontWeight: 500, letterSpacing: -1, color: T.fg, lineHeight: 1 }}>
            Sai Krishna
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 11,
              color: T.muted,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: 10,
            }}
          >
            Director of Engineering · TestMu AI · Bengaluru
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            fontFamily: T.mono,
            fontSize: 11,
            color: T.muted,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}
        >
          <a href={SAI.socials.github} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            GitHub
          </a>
          <a href={SAI.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            LinkedIn
          </a>
          <a href={SAI.socials.twitter} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            Twitter
          </a>
          <a href={SAI.socials.email} style={{ color: 'inherit', textDecoration: 'none' }}>
            Email
          </a>
        </div>
      </div>
      <div
        style={{
          padding: mobile ? '0 20px 20px' : '0 48px 24px',
          fontFamily: T.mono,
          fontSize: 10,
          color: T.muted,
          display: 'flex',
          justifyContent: 'space-between',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span>End of page</span>
        <span>v.{year}.q2</span>
      </div>
    </footer>
  );
}
