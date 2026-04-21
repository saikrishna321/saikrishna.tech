import { NavLink, Link } from 'react-router-dom';
import { T, NAV } from '../theme';

export function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 56px',
        borderBottom: `1px solid ${T.rule}`,
        position: 'sticky',
        top: 0,
        background: `${T.bg}ee`,
        backdropFilter: 'blur(10px)',
        zIndex: 50,
      }}
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textDecoration: 'none',
          color: T.fg,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="4" fill={T.accent} />
          <circle cx="11" cy="11" r="10" fill="none" stroke={T.accent} strokeWidth="0.5" />
        </svg>
        <span style={{ fontSize: 22, letterSpacing: -0.4, fontWeight: 500 }}>Sai Krishna</span>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 12,
            color: T.muted,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            paddingLeft: 16,
            borderLeft: `1px solid ${T.rule}`,
          }}
        >
          Director of Engineering · TestMu AI
        </span>
      </Link>
      <nav style={{ display: 'flex', gap: 36, fontSize: 22, fontWeight: 500, letterSpacing: -0.2, color: T.subdued }}>
        {NAV.map(([n, h]) => (
          <NavLink
            key={h}
            to={h}
            end={h === '/'}
            style={({ isActive }) => ({
              color: isActive ? T.accent : T.subdued,
              textDecoration: 'none',
              transition: 'color .2s',
              position: 'relative',
              paddingBottom: 4,
            })}
          >
            {({ isActive }) => (
              <>
                {n}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -34,
                      height: 2,
                      background: T.accent,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
