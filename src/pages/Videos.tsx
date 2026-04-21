import { useMemo, useState } from 'react';
import { T } from '../theme';
import { VIDEOS, Video } from '../data';
import { Wrap } from '../components/Shared';
import { PageHead } from '../components/PageHead';

// Extract the YouTube video ID from both watch?v=... and /shorts/... URLs.
function ytId(url: string): string | null {
  const m = url.match(/(?:v=|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function isShort(v: Video) {
  return v.url.includes('/shorts/');
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}

function VideoTile({ v, i }: { v: Video; i: number }) {
  const id = ytId(v.url);
  const thumb = v.thumbnail || (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '');
  const short = isShort(v);
  return (
    <a href={v.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: short ? '9/16' : '16/9',
          overflow: 'hidden',
          background: '#111',
          border: `1px solid ${T.rule}`,
        }}
      >
        {thumb && (
          <img
            src={thumb}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform .6s, filter .6s',
              filter: 'grayscale(.2) brightness(.82)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.filter = 'grayscale(0) brightness(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'grayscale(.2) brightness(.82)';
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(14,13,11,0.7)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${T.accent}`,
            }}
          >
            <span style={{ color: T.accent, fontSize: 18, marginLeft: 3 }}>▶</span>
          </div>
        </div>
        {v.duration && (
          <span
            style={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              background: 'rgba(14,13,11,0.85)',
              color: T.fg,
              fontFamily: T.mono,
              fontSize: 11,
              padding: '4px 8px',
              border: `1px solid ${T.rule}`,
            }}
          >
            {v.duration}
          </span>
        )}
        <span
          style={{
            position: 'absolute',
            left: 12,
            top: 12,
            fontFamily: T.mono,
            fontSize: 9,
            color: T.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            background: 'rgba(14,13,11,0.85)',
            padding: '4px 8px',
            border: `1px solid ${T.rule}`,
          }}
        >
          {String(i + 1).padStart(2, '0')}
          {short ? ' · short' : ''}
        </span>
      </div>
      <div style={{ fontSize: 17, marginTop: 16, lineHeight: 1.35, letterSpacing: -0.2, color: T.fg }}>{v.title}</div>
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 11,
          color: T.muted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: 6,
        }}
      >
        {formatDate(v.publishedAt)} · {short ? 'YouTube Short' : 'Watch →'}
      </div>
    </a>
  );
}

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const allTags = useMemo(
    () => Array.from(new Set(VIDEOS.flatMap((v) => v.tags))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return VIDEOS.filter((v) => {
      const matchesSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q);
      const matchesTag = !selectedTag || v.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [searchTerm, selectedTag]);

  return (
    <>
      <PageHead
        num="06"
        label="Videos"
        title={
          <>
            On <span style={{ color: T.accent }}>video.</span>
          </>
        }
        lead={`${VIDEOS.length} conference recordings, tutorials, shorts, and deep-dives. The ones worth your time.`}
      />

      <section style={{ padding: '60px 0 24px', borderBottom: `1px solid ${T.rule}` }}>
        <Wrap>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', flex: '1 1 320px', maxWidth: 420 }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search videos…"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 14px',
                    background: 'rgba(236,232,221,0.04)',
                    border: `1px solid ${T.rule}`,
                    color: T.fg,
                    fontFamily: T.body,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color .2s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = T.rule)}
                />
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T.muted}
                  strokeWidth={2}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {filtered.length} of {VIDEOS.length}
                {searchTerm && ` · "${searchTerm}"`}
                {selectedTag && ` · #${selectedTag}`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['', ...allTags].map((tag) => {
                const active = selectedTag === tag;
                return (
                  <button
                    key={tag || 'all'}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      background: active ? T.accent : 'transparent',
                      color: active ? T.bg : T.subdued,
                      border: `1px solid ${active ? T.accent : T.rule}`,
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontFamily: T.mono,
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      transition: 'all .2s',
                    }}
                  >
                    {tag || 'All'}
                  </button>
                );
              })}
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ padding: '48px 0 40px' }}>
        <Wrap>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {filtered.map((v, i) => (
                <VideoTile key={v.id} v={v} i={i} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                No videos found
              </div>
              <p style={{ fontSize: 16, color: T.subdued, marginTop: 12 }}>Try a different search term or tag.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                style={{
                  marginTop: 24,
                  padding: '12px 20px',
                  background: T.accent,
                  color: T.bg,
                  border: 'none',
                  fontFamily: T.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </Wrap>
      </section>
    </>
  );
}
