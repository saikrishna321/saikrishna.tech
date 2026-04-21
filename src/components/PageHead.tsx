import { ReactNode } from 'react';
import { T } from '../theme';
import { Wrap, useIsMobile } from './Shared';

export function PageHead({
  num,
  label,
  title,
  lead,
}: {
  num: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  const mobile = useIsMobile();
  return (
    <div style={{ padding: mobile ? '56px 0 36px' : '96px 0 56px', borderBottom: `1px solid ${T.rule}` }}>
      <Wrap>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            color: T.muted,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {num} · {label}
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 8vw, 104px)',
            lineHeight: 0.95,
            letterSpacing: mobile ? -1.5 : -3,
            fontWeight: 500,
            margin: '20px 0 0',
            maxWidth: 1100,
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            style={{
              fontSize: mobile ? 16 : 20,
              lineHeight: 1.5,
              color: T.subdued,
              margin: '24px 0 0',
              maxWidth: 780,
            }}
          >
            {lead}
          </p>
        )}
      </Wrap>
    </div>
  );
}
