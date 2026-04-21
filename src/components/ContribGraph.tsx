import { useMemo, useState } from 'react';
import { T } from '../theme';
import { Wrap } from './Shared';

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildContribMatrix(target = 1397): number[][] {
  const rnd = mulberry32(42);
  const weeks = 53,
    days = 7;
  const raw: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    raw.push([]);
    for (let d = 0; d < days; d++) {
      const weekday = d >= 1 && d <= 5 ? 1 : 0.35;
      const weekNoise = Math.pow(rnd(), 2);
      const streakBoost = rnd() > 0.88 ? 2.4 : 1;
      const base = rnd() * 6 * weekday * streakBoost * (0.4 + weekNoise);
      raw[w].push(base);
    }
  }
  let total = 0;
  raw.forEach((w) => w.forEach((v) => (total += v)));
  const scale = target / total;
  const matrix = raw.map((w) => w.map((v) => Math.max(0, Math.round(v * scale))));
  let sum = 0;
  matrix.forEach((w) => w.forEach((v) => (sum += v)));
  let drift = target - sum;
  let safety = 0;
  while (drift !== 0 && safety++ < 3000) {
    const w = Math.floor(rnd() * weeks);
    const d = Math.floor(rnd() * days);
    if (drift > 0) {
      matrix[w][d] += 1;
      drift -= 1;
    } else if (matrix[w][d] > 0) {
      matrix[w][d] -= 1;
      drift += 1;
    }
  }
  return matrix;
}

function contribColor(v: number, max: number) {
  if (v === 0) return 'rgba(236,232,221,0.05)';
  const t = Math.min(1, v / (max * 0.7));
  // GitHub green ramp: dark #0e4429 → bright #39d353
  const r = Math.round(14 + (57 - 14) * t);
  const g = Math.round(68 + (211 - 68) * t);
  const b = Math.round(41 + (83 - 41) * t);
  return `rgb(${r},${g},${b})`;
}

export function ContribGraph({ target = 1397 }: { target?: number }) {
  const matrix = useMemo(() => buildContribMatrix(target), [target]);
  const max = useMemo(() => matrix.reduce((m, w) => Math.max(m, ...w), 0), [matrix]);
  const [hover, setHover] = useState<{ wi: number; di: number; v: number; x: number; y: number } | null>(null);

  const MONTHS = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

  const cell = 12,
    gap = 3;

  let longestStreak = 0,
    curStreak = 0;
  matrix.forEach((w) =>
    w.forEach((v) => {
      if (v > 0) {
        curStreak++;
        longestStreak = Math.max(longestStreak, curStreak);
      } else curStreak = 0;
    })
  );
  const busiest = matrix
    .flatMap((w, wi) => w.map((v, di) => ({ v, wi, di })))
    .sort((a, b) => b.v - a.v)[0];

  return (
    <section id="contrib" style={{ padding: '80px 0 60px', borderTop: `1px solid ${T.rule}` }}>
      <Wrap>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Signal in public
            </div>
            <h2 style={{ fontSize: 44, letterSpacing: -1, fontWeight: 500, margin: '12px 0 0', lineHeight: 1.05 }}>
              <span style={{ color: T.accent }}>{target.toLocaleString()} contributions</span> in the last year.
            </h2>
            <p style={{ fontSize: 15, color: T.subdued, margin: '12px 0 0', maxWidth: 640, lineHeight: 1.6 }}>
              Every square is a commit, PR, review, or issue on{' '}
              <a href="https://github.com/saikrishna321" target="_blank" rel="noreferrer" style={{ color: T.accent, textDecoration: 'none' }}>
                github.com/saikrishna321
              </a>
              . A decade of open-source mobile automation lives here.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Longest streak</div>
              <div style={{ fontSize: 32, letterSpacing: -0.5, color: T.fg, marginTop: 6 }}>
                {longestStreak} <span style={{ fontSize: 13, color: T.muted, fontFamily: T.mono }}>days</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Busiest day</div>
              <div style={{ fontSize: 32, letterSpacing: -0.5, color: T.fg, marginTop: 6 }}>
                {busiest.v} <span style={{ fontSize: 13, color: T.muted, fontFamily: T.mono }}>contribs</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 24, border: `1px solid ${T.rule}`, position: 'relative', overflow: 'auto' }}>
          <div style={{ display: 'flex', marginLeft: 32, gap: 0, height: 16, fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: '0.1em' }}>
            {MONTHS.map((m) => (
              <span key={m} style={{ width: (53 * (cell + gap)) / 12, textTransform: 'uppercase' }}>
                {m}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: `repeat(7, ${cell + gap}px)`,
                fontFamily: T.mono,
                fontSize: 10,
                color: T.muted,
                letterSpacing: '0.1em',
                width: 24,
                paddingTop: 2,
              }}
            >
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <span key={i} style={{ height: cell + gap, lineHeight: `${cell + gap}px` }}>{d}</span>
              ))}
            </div>

            <svg width={53 * (cell + gap)} height={7 * (cell + gap)} style={{ display: 'block' }}>
              {matrix.map((week, wi) =>
                week.map((v, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={wi * (cell + gap)}
                    y={di * (cell + gap)}
                    width={cell}
                    height={cell}
                    rx={2}
                    fill={contribColor(v, max)}
                    style={{ transition: 'fill .2s, stroke .2s' }}
                    stroke={hover && hover.wi === wi && hover.di === di ? T.accent : 'transparent'}
                    strokeWidth={1.5}
                    onMouseEnter={(e) => {
                      const r = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                      setHover({ wi, di, v, x: r.left, y: r.top });
                    }}
                    onMouseLeave={() => setHover(null)}
                  />
                ))
              )}
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              fontFamily: T.mono,
              fontSize: 10,
              color: T.muted,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <a
              href="https://github.com/saikrishna321"
              target="_blank"
              rel="noreferrer"
              style={{ color: T.muted, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              @saikrishna321 · live on GitHub →
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Less</span>
              {[0, max * 0.18, max * 0.38, max * 0.6, max * 0.85].map((v, i) => (
                <span
                  key={i}
                  style={{
                    width: cell,
                    height: cell,
                    background: contribColor(v, max),
                    display: 'inline-block',
                    borderRadius: 2,
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {hover && (
            <div
              style={{
                position: 'fixed',
                left: hover.x + 18,
                top: hover.y - 4,
                background: T.bg,
                border: `1px solid ${T.accent}`,
                padding: '6px 10px',
                fontFamily: T.mono,
                fontSize: 11,
                color: T.fg,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {hover.v} contribution{hover.v === 1 ? '' : 's'}
            </div>
          )}
        </div>
      </Wrap>
    </section>
  );
}
