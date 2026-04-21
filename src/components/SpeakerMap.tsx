import { useEffect, useState, useRef, useCallback, CSSProperties } from 'react';
import Globe from 'react-globe.gl';
import { T } from '../theme';

const keyframes = `
  @keyframes sm-fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

type Conference = {
  city: string;
  country: string;
  lat: number;
  lng: number;
  conf: string;
  year: string;
  talk: string;
  video?: string;
};

type VirtualConference = { conf: string; year: string; talk: string; video?: string };

const CONFERENCES: Conference[] = [
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, conf: 'AppiumConf', year: '2019', talk: 'Life Cycle of an Appium Command' },
  { city: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431, conf: 'SeleniumConf', year: '2017', talk: 'Dockerize Appium Tests: Test Inside Containers', video: 'https://youtu.be/jGW6ycW_tTQ' },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, conf: 'SeleniumConf', year: '2023', talk: 'Clean Code Practices for Test Automation' },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, conf: 'SLASSCOM', year: '2019', talk: 'Shift Left for Better End-User Experience' },
  { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, conf: 'Quest for Quality', year: '2018', talk: 'On Demand Private Appium Device Cloud using ATD' },
  { city: 'Tallinn', country: 'Estonia', lat: 59.437, lng: 24.7536, conf: 'Nordic Testing Days', year: '2025', talk: 'Advanced Appium Workshop' },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, conf: 'SeleniumConf', year: '2018', talk: 'Next Level Front-end Testing with DevTools & WebDriver' },
  { city: 'Belgrade', country: 'Serbia', lat: 44.7866, lng: 20.4489, conf: 'Belgrade Test Conference', year: '2018', talk: 'On Demand Private Appium Device Cloud' },
  { city: 'Vilnius', country: 'Lithuania', lat: 54.6872, lng: 25.2797, conf: 'TestCon Europe', year: '2025', talk: 'Testing Agentic AI Applications: Beyond Traditional QA' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, conf: 'XConf', year: '2023', talk: 'Addressing Unconscious Bias & Ethics in Testing', video: 'https://youtu.be/QMr30Za_-vM' },
  { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, conf: 'FOSDEM', year: '2017', talk: 'Future of Mobile Automation Testing, Appium Steals It', video: 'https://video.fosdem.org/2017/H.2213/mobile_testing_with_appium.mp4' },
  { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946, conf: 'SeleniumConf & AppiumConf', year: '2018', talk: 'Code Once Test Anywhere: Appium Device Cloud using ATD' },
  { city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, conf: 'TechXpresso - IDFC First Bank', year: '2026', talk: 'Testing Autonomous AI Agents: Beyond Traditional QA' },
  { city: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763, conf: 'SeleniumConf & AppiumConf', year: '2025', talk: 'Advanced Appium 2.0 Workshop', video: 'https://youtu.be/lugEm6j1Nl8' },
];

const VIRTUAL_CONFERENCES: VirtualConference[] = [
  { conf: 'Automation Guild', year: '2026', talk: 'Testing Autonomous AI Agents' },
  { conf: 'TestMu Conf', year: '2025', talk: 'Mastering Appium 3 & QA for AI Agents' },
  { conf: 'Spartans Summit', year: '2025', talk: 'Building & Testing AI-Agent Powered LLM Apps', video: 'https://www.youtube.com/watch?v=9mHfvGN7FwU' },
  { conf: 'SeleniumConf', year: '2024', talk: 'Harnessing Open-Source: Building a Device Farm' },
  { conf: 'AppiumConf', year: '2024', talk: 'The Performance Paradox: Mobile App Optimisation' },
  { conf: 'Spartans Summit', year: '2024', talk: 'Web Performance Metrics for Testers', video: 'https://www.youtube.com/watch?v=uo_lX1pUv9o' },
  { conf: 'TestMu Conf', year: '2023', talk: 'Building Appium 2.0 Plugin Live', video: 'https://www.youtube.com/watch?v=b6yWXfLpazc' },
  { conf: 'SeleniumConf', year: '2022', talk: 'Build Your Own Appium 2.0 Driver' },
  { conf: 'TestMu Conf', year: '2022', talk: "Appium: Endgame & What's Next?" },
  { conf: 'Automation Guild', year: '2022', talk: 'Testing Containers & k8s Manifests' },
  { conf: 'Worqference', year: '2022', talk: 'Automate Mobile Gestures Using Appium' },
  { conf: 'Agile India', year: '2022', talk: 'Speed Matters: Client Side Performance' },
  { conf: 'VodQA', year: '2022', talk: 'Build Appium 2.0 Plugins Workshop' },
  { conf: 'AppiumConf', year: '2021', talk: 'Build Your Own Appium Plugin' },
  { conf: 'Agile India', year: '2021', talk: 'Testing Service Mesh & k8s Manifests' },
  { conf: 'Automation Guild', year: '2021', talk: 'Consumer Driven Contracts' },
  { conf: 'Future of Testing: Mobile', year: '2021', talk: "Appium 2.0: What's Next" },
  { conf: 'SeleniumConf', year: '2020', talk: 'Advanced Appium Workshop' },
];

const HOME = { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 };
const HOME_COLOR = '#2ca36b';

const arcsData = CONFERENCES.map((conf, i) => ({
  startLat: HOME.lat,
  startLng: HOME.lng,
  endLat: conf.lat,
  endLng: conf.lng,
  color: ['rgba(253, 186, 174, 0.85)', 'rgba(232, 160, 144, 0.35)'],
  conf: conf.conf,
  city: conf.city,
  index: i,
}));

const pointsData: Array<{
  city: string;
  country?: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  conf?: string;
}> = [
  { ...HOME, size: 0.8, color: HOME_COLOR, label: 'Home Base' },
  ...CONFERENCES.map((c) => ({ ...c, size: 0.5, color: T.accent, label: c.conf })),
];

const pill = (active: boolean, tone: 'accent' | 'home' = 'accent'): CSSProperties => ({
  padding: '6px 12px',
  borderRadius: 999,
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'all .2s',
  border: `1px solid ${active ? (tone === 'home' ? HOME_COLOR : T.accent) : T.rule}`,
  background: active ? (tone === 'home' ? HOME_COLOR : T.accent) : 'rgba(236,232,221,0.04)',
  color: active ? T.bg : T.subdued,
});

const panel: CSSProperties = {
  background: 'rgba(14,13,11,0.82)',
  backdropFilter: 'blur(14px)',
  border: `1px solid ${T.rule}`,
  color: T.fg,
};

export default function SpeakerMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedConf, setSelectedConf] = useState<Conference | null>(null);
  const [showVirtual, setShowVirtual] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ lat: 20, lng: 77, altitude: 2.5 }, 1000);
    }
  }, [globeReady]);

  const handlePointClick = useCallback((point: any) => {
    if (point.label === 'Home Base') {
      setShowVirtual(true);
      setSelectedConf(null);
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.8 }, 1000);
      }
      return;
    }
    if (point.conf) {
      const conf = CONFERENCES.find((c) => c.city === point.city);
      setSelectedConf(conf || null);
      setShowVirtual(false);
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.8 }, 1000);
      }
    }
  }, []);

  const uniqueCountries = new Set(CONFERENCES.map((c) => c.country)).size;

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: 720,
        marginLeft: 'calc(-50vw + 50%)',
        marginTop: -32,
        marginBottom: 32,
        overflow: 'hidden',
        background: T.bg,
      }}
    >
      <style>{keyframes}</style>

      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          animation: isLoaded ? 'sm-fade-in-up 1s ease-out forwards' : 'none',
        }}
      >
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={arcsData}
            arcColor={'color' as any}
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            arcsTransitionDuration={1000}
            pointsData={pointsData}
            pointAltitude={0.01}
            pointColor={'color' as any}
            pointRadius={'size' as any}
            pointsMerge={false}
            onPointClick={handlePointClick}
            atmosphereColor={T.accent}
            atmosphereAltitude={0.2}
            onGlobeReady={() => setGlobeReady(true)}
          />
        )}
      </div>

      {/* Top gradient (fade from hero) + bottom gradient (fade to content) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(to top, ${T.bg} 0%, rgba(14,13,11,0) 25%, rgba(14,13,11,0) 75%, ${T.bg}cc 100%)`,
        }}
      />

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontFamily: T.mono,
          fontSize: 10,
          color: T.muted,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: HOME_COLOR }} />
          <span>Home Base</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent }} />
          <span>In-Person ({CONFERENCES.length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={HOME_COLOR} strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Virtual ({VIRTUAL_CONFERENCES.length})</span>
        </div>
      </div>

      {/* Stats + city pills */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '24px 48px 32px',
          zIndex: 10,
          transition: 'opacity 700ms, transform 700ms',
          transitionDelay: '500ms',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 32, letterSpacing: -0.8, fontWeight: 500, margin: 0, lineHeight: 1.1 }}>
              <span style={{ color: T.accent }}>Conference Speaking</span>
            </h2>
            <p style={{ color: T.subdued, fontSize: 14, margin: '6px 0 0' }}>
              Sharing knowledge on test automation, Appium & Selenium across the globe.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginBottom: 18 }}>
            <Stat value={uniqueCountries} label="Countries" />
            <Stat value={CONFERENCES.length} label="Cities" />
            <Stat value={`${CONFERENCES.length + VIRTUAL_CONFERENCES.length}+`} label="Talks" />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CONFERENCES.map((conf, i) => {
              const active = selectedConf?.city === conf.city && !showVirtual;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedConf(conf);
                    setShowVirtual(false);
                    if (globeRef.current) {
                      globeRef.current.pointOfView({ lat: conf.lat, lng: conf.lng, altitude: 1.5 }, 1000);
                    }
                  }}
                  style={pill(active)}
                >
                  {conf.city}
                </button>
              );
            })}
            <button
              onClick={() => {
                setShowVirtual(!showVirtual);
                setSelectedConf(null);
                if (globeRef.current) {
                  globeRef.current.pointOfView({ lat: HOME.lat, lng: HOME.lng, altitude: 2.0 }, 1000);
                }
              }}
              style={{ ...pill(showVirtual, 'home'), display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Virtual ({VIRTUAL_CONFERENCES.length})
            </button>
          </div>
        </div>
      </div>

      {/* Selected conference card */}
      {selectedConf && (
        <div
          style={{
            position: 'absolute',
            top: 96,
            right: 24,
            zIndex: 20,
            width: 300,
            padding: 16,
            ...panel,
            animation: 'sm-fade-in-up 0.3s ease-out forwards',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 500, color: T.fg, fontSize: 15 }}>{selectedConf.city}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{selectedConf.country}</div>
            </div>
            <button
              onClick={() => setSelectedConf(null)}
              style={{ background: 'transparent', border: 'none', color: T.muted, cursor: 'pointer', padding: 4 }}
              aria-label="Close"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
            {selectedConf.conf} · {selectedConf.year}
          </div>
          <div style={{ fontSize: 13, color: T.subdued, lineHeight: 1.55 }}>{selectedConf.talk}</div>
          {selectedConf.video && (
            <a
              href={selectedConf.video}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 12,
                color: T.accent,
                fontFamily: T.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch talk
            </a>
          )}
        </div>
      )}

      {/* Virtual conferences panel */}
      {showVirtual && (
        <div
          style={{
            position: 'absolute',
            top: 96,
            right: 24,
            zIndex: 20,
            width: 340,
            maxHeight: '70vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            ...panel,
            animation: 'sm-fade-in-up 0.3s ease-out forwards',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 14,
              borderBottom: `1px solid ${T.rule}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={HOME_COLOR} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 500, color: T.fg }}>Virtual Conferences</span>
              <span style={{ fontSize: 11, color: T.muted }}>{VIRTUAL_CONFERENCES.length}</span>
            </div>
            <button
              onClick={() => setShowVirtual(false)}
              style={{ background: 'transparent', border: 'none', color: T.muted, cursor: 'pointer', padding: 4 }}
              aria-label="Close"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {VIRTUAL_CONFERENCES.map((vc, i) => (
              <div
                key={i}
                style={{
                  padding: 12,
                  background: 'rgba(236,232,221,0.03)',
                  border: `1px solid ${T.rule}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      fontWeight: 600,
                      color: HOME_COLOR,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {vc.conf}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {vc.video && (
                      <a
                        href={vc.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Watch Talk"
                        style={{ color: T.accent, display: 'inline-flex' }}
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </a>
                    )}
                    <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{vc.year}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: T.subdued, margin: 0, lineHeight: 1.55 }}>{vc.talk}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: `1px solid ${T.rule}`,
          background: 'rgba(236,232,221,0.04)',
        }}
      />
      <div>
        <div style={{ fontSize: 22, fontWeight: 500, color: T.fg, letterSpacing: -0.3 }}>{value}</div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.muted,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
