import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { T, NAV } from '../theme';
import { useIsMobile } from './Shared';

export function Header() {
  const mobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [menuOpen]);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: mobile ? '16px 20px' : '32px 56px',
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
          gap: mobile ? 8 : 12,
          textDecoration: 'none',
          color: T.fg,
          position: 'relative',
          zIndex: 102,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="4" fill={T.accent} />
          <circle cx="11" cy="11" r="10" fill="none" stroke={T.accent} strokeWidth="0.5" />
        </svg>
        <span style={{ fontSize: mobile ? 18 : 22, letterSpacing: -0.4, fontWeight: 500 }}>Sai Krishna</span>
        {!mobile && (
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
        )}
      </Link>

      {mobile ? (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: T.fg,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            position: 'relative',
            zIndex: 102,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: T.fg,
              transition: 'all .3s',
              transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: T.fg,
              transition: 'all .3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: T.fg,
              transition: 'all .3s',
              transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
            }}
          />
        </button>
      ) : (
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
      )}

      {mobile && menuOpen && createPortal(
        <MobileMenu onClose={() => setMenuOpen(false)} />,
        document.body,
      )}
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: T.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        zIndex: 101,
        padding: 40,
      }}
    >
      {NAV.map(([n, h]) => (
        <NavLink
          key={h}
          to={h}
          end={h === '/'}
          onClick={onClose}
          style={({ isActive }) => ({
            color: isActive ? T.accent : T.subdued,
            textDecoration: 'none',
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: -0.4,
            padding: '10px 20px',
            transition: 'color .2s',
          })}
        >
          {n}
        </NavLink>
      ))}
      <div
        style={{
          marginTop: 24,
          fontFamily: T.mono,
          fontSize: 11,
          color: T.muted,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        Director of Engineering · TestMu AI
      </div>
    </nav>
  );
}
