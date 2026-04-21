import { Fragment } from 'react';
import { T } from '../theme';
import { TALKS } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';
import SpeakerMap from '../components/SpeakerMap';

export default function Talks() {
  const upcoming = TALKS.filter((t) => t.upcoming);
  const past = TALKS.filter((t) => !t.upcoming);
  return (
    <>
      <PageHead
        num="03"
        label="Talks"
        title={
          <>
            Fifty-plus stages, most of them <span style={{ color: T.accent }}>streamed.</span>
          </>
        }
        lead="Every talk was an excuse to think a problem through in public. Here's the record."
      />

      <SpeakerMap />

      {upcoming.length > 0 && (
        <section style={{ padding: '80px 0 40px' }}>
          <Wrap>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
              ◆ Upcoming
            </div>
            {upcoming.map((tk, i) => (
              <div key={i} style={{ padding: 32, border: `1px solid ${T.accent}`, background: 'rgba(253,186,174,0.08)' }}>
                <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, letterSpacing: '0.14em' }}>
                  {tk.year} · {tk.venue} · {tk.place}
                </div>
                <h2 style={{ fontSize: 42, letterSpacing: -0.8, fontWeight: 500, margin: '16px 0 0', lineHeight: 1.1 }}>{tk.title}</h2>
              </div>
            ))}
          </Wrap>
        </section>
      )}

      <section style={{ padding: '60px 0 40px' }}>
        <Wrap>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
            Past talks · selected
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 340px', gap: 24, fontSize: 14 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', paddingBottom: 12 }}>Year</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', paddingBottom: 12 }}>Title</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', paddingBottom: 12 }}>Venue</div>
            {past.map((tk, i) => (
              <Fragment key={i}>
                <div style={{ fontFamily: T.mono, fontSize: 13, color: T.accent, padding: '22px 0', borderTop: `1px solid ${T.rule}`, letterSpacing: '0.1em' }}>
                  {tk.year}
                </div>
                <div style={{ fontSize: 20, color: T.fg, padding: '22px 0', borderTop: `1px solid ${T.rule}`, letterSpacing: -0.2, lineHeight: 1.3 }}>
                  {tk.title}
                </div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    color: T.subdued,
                    padding: '22px 0',
                    borderTop: `1px solid ${T.rule}`,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {tk.venue} · {tk.place}
                </div>
              </Fragment>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
