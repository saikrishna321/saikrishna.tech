import { T } from '../theme';
import { Marquee } from './Shared';
import { SAI } from '../data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ marginTop: 120, borderTop: `1px solid ${T.rule}` }}>
      <Marquee
        items={[
          'signal · saikrishna.tech',
          `© ${year}`,
          'bengaluru',
          'open to talks',
          'inter tight + jetbrains mono',
          'built 2026',
        ]}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 48px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'end',
        }}
      >
        <div>
          <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1, color: T.fg, lineHeight: 1 }}>
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
          padding: '0 48px 24px',
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
