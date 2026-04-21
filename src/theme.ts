export const T = {
  bg: '#0e0d0b',
  fg: '#ece8dd',
  subdued: '#bcb6a8',
  muted: '#6e6a60',
  rule: 'rgba(236,232,221,0.12)',
  accent: '#fdbaae',
  accentSoft: 'rgba(253,186,174,0.12)',
  display: '"Inter Tight", "Inter", -apple-system, sans-serif',
  body: '"Inter Tight", "Inter", -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export type Theme = typeof T;

export const NAV: ReadonlyArray<readonly [string, string]> = [
  ['Home', '/'],
  ['Work', '/work'],
  ['Talks', '/talks'],
  ['Presentations', '/presentations'],
  ['Writing', '/writing'],
  ['Book', '/book'],
  ['Workshops', '/workshops'],
  ['Videos', '/videos'],
  ['Contact', '/contact'],
];
