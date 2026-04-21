import { T } from '../theme';
import { SAI } from '../data';
import { Wrap, useIsMobile } from '../components/Shared';
import { PageHead } from '../components/PageHead';

const TIMELINE: ReadonlyArray<readonly [string, string, string]> = [
  ['2024', 'Appium Insights', 'Book published — Apress.'],
  ['2024', 'TestMu AI', 'Joined as Director of Engineering.'],
  ['2023', 'MCP WebDriverAgent', 'Gave Claude and friends a real iOS device to drive.'],
  ['2020', 'Appium Device Farm', 'Open-sourced the plugin after shipping it in production at ThoughtWorks.'],
  ['2018', 'AppiumConf', 'First talk. Been on a stage most years since.'],
  ['2015', 'First Appium PR', 'The commit that started all the others.'],
];

export default function About() {
  const mobile = useIsMobile();
  return (
    <>
      <PageHead
        num="01"
        label="About"
        title={
          <>
            Ten years rewriting the pipes of <span style={{ color: T.accent }}>test automation.</span>
          </>
        }
        lead="Appium core contributor. Selenium and Taiko alum. Currently obsessed with what happens when autonomous AI agents meet real devices."
      />
      <section style={{ padding: mobile ? '48px 0 24px' : '80px 0 40px' }}>
        <Wrap>
          <div style={{ display: mobile ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 340px', gap: mobile ? 40 : 72, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: mobile ? 22 : 28, lineHeight: 1.4, margin: 0, letterSpacing: -0.4, color: T.fg }}>{SAI.bio}</p>
              <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.7, marginTop: 32, color: T.subdued, maxWidth: 680 }}>
                The through-line: testing is a first-class engineering discipline. It deserves better tools, better primitives, and a community willing to argue about them in public.
              </p>
              <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.7, marginTop: 16, color: T.subdued, maxWidth: 680 }}>
                These days I'm most interested in where testing meets AI agents — not autocomplete for test scripts, but systems that actually reason about an app and verify it behaves.
              </p>
              <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.7, marginTop: 16, color: T.subdued, maxWidth: 680 }}>
                Before TestMu AI, I led mobile automation at a string of product companies and spent a few formative years at ThoughtWorks, where I learned that shipping a test framework is the same problem as shipping a product — just with different customers.
              </p>
            </div>
            <aside
              style={{
                borderLeft: mobile ? 'none' : `1px solid ${T.rule}`,
                borderTop: mobile ? `1px solid ${T.rule}` : 'none',
                paddingLeft: mobile ? 0 : 28,
                paddingTop: mobile ? 28 : 0,
                fontFamily: T.mono,
                fontSize: 12,
                color: T.muted,
                lineHeight: 2,
                width: mobile ? '100%' : undefined,
              }}
            >
              <div style={{ color: T.accent, marginBottom: 8, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 10 }}>Current stack</div>
              TypeScript · Java · Python<br />Node · WebDriver · MCP<br />Appium · Selenium · Espresso · XCUITest
              <div style={{ color: T.accent, margin: '28px 0 8px', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 10 }}>Past lives</div>
              Gauge · Taiko · ThoughtWorks<br />Several product startups
              <div style={{ color: T.accent, margin: '28px 0 8px', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 10 }}>Based</div>
              Bengaluru, IN · 12.97°N
              <div style={{ color: T.accent, margin: '28px 0 8px', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 10 }}>Open to</div>
              Conference talks<br />Workshop bookings<br />Advisory conversations
            </aside>
          </div>

          <div style={{ marginTop: mobile ? 60 : 100, borderTop: `1px solid ${T.rule}`, paddingTop: 40 }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
              A partial timeline
            </div>
            <div style={{ display: 'grid', gap: 0 }}>
              {TIMELINE.map(([y, t, d]) => (
                <div
                  key={y + t}
                  style={{
                    display: mobile ? 'flex' : 'grid',
                    flexDirection: 'column',
                    gridTemplateColumns: '90px 280px 1fr',
                    gap: mobile ? 4 : 32,
                    padding: mobile ? '16px 0' : '22px 0',
                    borderTop: `1px solid ${T.rule}`,
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontFamily: T.mono, fontSize: 13, color: T.accent, letterSpacing: '0.1em' }}>{y}</span>
                  <span style={{ fontSize: mobile ? 18 : 20, letterSpacing: -0.3, color: T.fg }}>{t}</span>
                  <span style={{ fontSize: mobile ? 14 : 15, color: T.subdued, lineHeight: 1.55 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
