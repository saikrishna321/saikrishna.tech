import { ReactNode } from 'react';
import { T } from '../theme';
import { BOOK } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';

export default function Book() {
  return (
    <>
      <PageHead
        num="09"
        label="Book"
        title={
          <>
            The <span style={{ color: T.accent }}>book.</span>
          </>
        }
        lead="Published by Apress. One spine on a QA lead's shelf, somewhere between the Appium docs and the regret of using Thread.sleep."
      />

      <section style={{ padding: '80px 0 100px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: 64, alignItems: 'start' }}>
            <Cover />
            <Details />
          </div>
        </Wrap>
      </section>
    </>
  );
}

function Cover() {
  return (
    <a
      href={BOOK.amazonUrl}
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'relative',
        display: 'block',
        border: `1px solid ${T.accent}`,
        boxShadow: `14px 14px 0 0 ${T.accent}22`,
        transition: 'transform 400ms cubic-bezier(.2,.7,.2,1), box-shadow 400ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-4px, -4px)';
        e.currentTarget.style.boxShadow = `20px 20px 0 0 ${T.accent}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = `14px 14px 0 0 ${T.accent}22`;
      }}
    >
      <img
        src={BOOK.coverImage}
        alt={`${BOOK.title} book cover`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </a>
  );
}

function Details() {
  return (
    <div>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
        {BOOK.publisher} · {BOOK.year}
      </div>
      <h2 style={{ fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: -1.2, fontWeight: 500, margin: 0, lineHeight: 1.05 }}>
        {BOOK.title}
      </h2>
      <p style={{ fontSize: 22, color: T.subdued, letterSpacing: -0.3, margin: '16px 0 0', lineHeight: 1.35 }}>
        {BOOK.subtitle}
      </p>

      <div
        style={{
          fontFamily: T.mono,
          fontSize: 11,
          color: T.muted,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: 24,
          lineHeight: 1.9,
        }}
      >
        By <span style={{ color: T.fg }}>{BOOK.author}</span> · Published by {BOOK.publisher}
      </div>

      <p style={{ fontSize: 17, color: T.subdued, lineHeight: 1.65, margin: '28px 0 0', maxWidth: 680 }}>
        {BOOK.blurb}
      </p>

      <div style={{ marginTop: 40, padding: 28, border: `1px solid ${T.rule}`, background: 'rgba(253,186,174,0.04)' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
          What you'll learn
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BOOK.learnings.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.accent}
                strokeWidth={2}
                style={{ flexShrink: 0, marginTop: 3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ fontSize: 15, color: T.subdued, lineHeight: 1.55 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
        <CTAButton href={BOOK.springerUrl} primary label="Get on Springer" icon={bookIcon} />
        <CTAButton href={BOOK.amazonUrl} label="Buy on Amazon" icon={cartIcon} />
        <CTAButton href={BOOK.oreillyUrl} label="Read on O'Reilly" icon={externalIcon} />
      </div>
    </div>
  );
}

const bookIcon = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const cartIcon = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);
const externalIcon = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
  </svg>
);

function CTAButton({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 22px',
        background: primary ? T.accent : 'transparent',
        color: primary ? T.bg : T.fg,
        border: `1px solid ${primary ? T.accent : T.rule}`,
        fontFamily: T.mono,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'all .2s',
      }}
      onMouseEnter={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = T.accent;
          e.currentTarget.style.color = T.accent;
        } else {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = T.rule;
          e.currentTarget.style.color = T.fg;
        } else {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {icon}
      {label}
    </a>
  );
}
