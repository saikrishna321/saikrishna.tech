import { T } from '../theme';

export function ThreeHero() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes grid-drift-x { from { transform: translateX(0) } to { transform: translateX(-40px) } }
        @keyframes grid-drift-y { from { transform: translateY(0) } to { transform: translateY(-40px) } }
        @keyframes grid-scan-h {
          0% { transform: translateY(-10%); opacity: 0 }
          10% { opacity: 1 }
          90% { opacity: 1 }
          100% { transform: translateY(110%); opacity: 0 }
        }
        @keyframes grid-scan-v {
          0% { transform: translateX(-10%); opacity: 0 }
          10% { opacity: 1 }
          90% { opacity: 1 }
          100% { transform: translateX(110%); opacity: 0 }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1) }
          50% { opacity: 0.8; transform: scale(1.08) }
        }
        @keyframes grid-crosshair {
          0%, 100% { transform: translate(0, 0) }
          25% { transform: translate(40px, -20px) }
          50% { transform: translate(-30px, 30px) }
          75% { transform: translate(20px, 40px) }
        }
      `}</style>

      {/* Radial vignette behind everything */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 60% 40%, ${T.accent}22 0%, transparent 55%)`,
        }}
      />

      {/* Base fine dot grid, drifting */}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',
          backgroundImage: `radial-gradient(${T.rule} 0.75px, transparent 0.75px)`,
          backgroundSize: '14px 14px',
          animation: 'grid-drift-x 40s linear infinite',
          opacity: 0.6,
        }}
      />

      {/* Secondary line grid, drifts opposite direction */}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',
          backgroundImage: `
            linear-gradient(to right, ${T.rule} 1px, transparent 1px),
            linear-gradient(to bottom, ${T.rule} 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          animation: 'grid-drift-y 60s linear infinite',
          opacity: 0.45,
        }}
      />

      {/* Horizontal scan line (accent) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(to right, transparent 0%, ${T.accent} 50%, transparent 100%)`,
          boxShadow: `0 0 20px ${T.accent}`,
          animation: 'grid-scan-h 9s linear infinite',
        }}
      />

      {/* Vertical scan line (subtle fg) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 1,
          background: `linear-gradient(to bottom, transparent 0%, ${T.fg}55 50%, transparent 100%)`,
          animation: 'grid-scan-v 14s linear infinite 2s',
        }}
      />

      {/* Corner registration marks */}
      <svg
        style={{ position: 'absolute', top: 24, left: 24, opacity: 0.5 }}
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
      >
        <path d="M0 12 L0 0 L12 0" stroke={T.accent} strokeWidth={1} />
        <circle cx={0} cy={0} r={3} stroke={T.accent} strokeWidth={0.5} fill="none" />
      </svg>
      <svg
        style={{ position: 'absolute', bottom: 24, right: 24, opacity: 0.5 }}
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
      >
        <path d="M48 36 L48 48 L36 48" stroke={T.accent} strokeWidth={1} />
        <circle cx={48} cy={48} r={3} stroke={T.accent} strokeWidth={0.5} fill="none" />
      </svg>

      {/* A scattering of pulsing accent dots at grid intersections */}
      {[
        { top: '18%', left: '22%', d: 0 },
        { top: '36%', left: '78%', d: 1.2 },
        { top: '64%', left: '34%', d: 0.5 },
        { top: '72%', left: '62%', d: 2 },
        { top: '28%', left: '58%', d: 1.6 },
        { top: '52%', left: '18%', d: 0.8 },
      ].map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: T.accent,
            animation: `grid-pulse 3.6s ease-in-out infinite ${d.d}s`,
            boxShadow: `0 0 12px ${T.accent}`,
          }}
        />
      ))}

      {/* Floating crosshair */}
      <div
        style={{
          position: 'absolute',
          top: '44%',
          left: '68%',
          width: 40,
          height: 40,
          animation: 'grid-crosshair 18s ease-in-out infinite',
        }}
      >
        <svg width={40} height={40} viewBox="0 0 40 40" fill="none" style={{ opacity: 0.6 }}>
          <circle cx={20} cy={20} r={10} stroke={T.accent} strokeWidth={0.75} fill="none" />
          <line x1={0} y1={20} x2={10} y2={20} stroke={T.accent} strokeWidth={0.5} />
          <line x1={30} y1={20} x2={40} y2={20} stroke={T.accent} strokeWidth={0.5} />
          <line x1={20} y1={0} x2={20} y2={10} stroke={T.accent} strokeWidth={0.5} />
          <line x1={20} y1={30} x2={20} y2={40} stroke={T.accent} strokeWidth={0.5} />
          <text x={24} y={14} fill={T.accent} fontFamily="JetBrains Mono" fontSize={5} letterSpacing="0.1em">
            FIG.A
          </text>
        </svg>
      </div>

      {/* Diagonal measure-marks in the corner */}
      <svg
        style={{ position: 'absolute', top: 90, right: 60, opacity: 0.4 }}
        width={180}
        height={100}
        viewBox="0 0 180 100"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={i * 15}
            y1={0}
            x2={i * 15}
            y2={i % 3 === 0 ? 18 : 8}
            stroke={T.muted}
            strokeWidth={0.5}
          />
        ))}
        <text x={0} y={34} fill={T.muted} fontFamily="JetBrains Mono" fontSize={8} letterSpacing="0.2em">
          X+ 0 — 180 UNITS
        </text>
      </svg>
    </div>
  );
}
