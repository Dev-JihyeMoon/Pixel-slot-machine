/**
 * symbols.js
 * 픽셀 아트 심볼 정의 및 캔버스 렌더링
 */

import { PIXEL } from './config.js';

/* ── 색상 팔레트 ── */

const PAL = Object.freeze({
  _: null,

  /* Red (7, Cherry) */
  r: '#e63946', R: '#c0232f', q: '#ff5c6a', p: '#9b1420',

  /* Gold / Yellow (Bell) */
  g: '#ffd700', G: '#b8860b', y: '#ffed6f', Y: '#e6b800', w: '#fff5ba',

  /* Green (Cherry stem) */
  n: '#2ecc40', N: '#1a8a2a', m: '#55e868',

  /* Blue (Diamond) */
  b: '#4fc3f7', B: '#0288d1', c: '#b3e5fc', d: '#01579b',

  /* Gray (unused reserve) */
  s: '#c0c0c0', S: '#888888', t: '#e8e8e8', T: '#666666',

  /* Orange (Star) */
  o: '#ff9800', O: '#e65100', a: '#ffcc02', A: '#ffb74d',

  /* Mono */
  W: '#ffffff', K: '#222222', k: '#444444',
});

/* ── 18×18 픽셀 맵 ── */

const SEVEN = [
  '______KKKKKK______',
  '____KKrrrrrrKK____',
  '___KrrrrrrrrrrrK___',
  '__KrrrrrrrrrrrrK___',
  '__KrrrrrrrrrrrrK___',
  '__KKKKKKrrrrrrK____',
  '________KrrrrK_____',
  '_______KrrrrK______',
  '______KrrrrK_______',
  '_____KrrrrrK_______',
  '_____KrrrrK________',
  '____KrrrrK_________',
  '____KrrrrK_________',
  '___KrrrrK__________',
  '___KrrrrK__________',
  '___KrrrrK__________',
  '____KKKK___________',
  '___________________',
];

const CHERRY = [
  '___________________',
  '________NK_________',
  '_______NnK_________',
  '______NnnNK________',
  '_____NnnnnmmK______',
  '____NnnnmmmK_______',
  '___KKKnmmmK________',
  '__KrrrKKKK___KKK___',
  '_KrrqrrK____KrrrK__',
  '_KrqrrrrK__KrrqrrK_',
  'KrrrrrrrrK_KrqrrrK_',
  'KrrrrrrrrKKrrrrrrK_',
  'KrrRrrrrKKrrrrrrrK_',
  '_KrrRrrK_KrrRrrrrK_',
  '__KrrrrK_KrrrRrrK__',
  '___KKKK___KrrrrK___',
  '___________KKKK____',
  '___________________',
];

const BELL = [
  '___________________',
  '________gK_________',
  '_______gygK________',
  '______KKKKKK_______',
  '_____KyyyyygK______',
  '____KyyyyyyyGK_____',
  '____KyyyyyyyGK_____',
  '___KyyyyyyygGK_____',
  '___KyyyyyygGGK_____',
  '___KyyyyygGGGK_____',
  '___KyyyygGGGGK_____',
  '__KyyyyygGGGGGK____',
  '__KyyyygGGGGGGK____',
  '_KKKKKKKKKKKKKkK___',
  '_KggggggggggggGK___',
  '__KKKKKKKKKKKKK____',
  '______KggGK________',
  '_______KKK_________',
];

const DIAMOND = [
  '___________________',
  '________dK_________',
  '_______dBbK________',
  '______dBBbbK_______',
  '_____dBBBbbbK______',
  '____dBBBBbbbbK_____',
  '___dBBBBBbbbbbK____',
  '__dBBBBBBbbbbcbK___',
  '_dBBBBBBBbbbccbK___',
  '__dBBBBBBbbccbK____',
  '___dBBBBBbccbK_____',
  '____dBBBBccbK______',
  '_____dBBBcbK_______',
  '______dBBbK________',
  '_______dBK_________',
  '________dK_________',
  '___________________',
  '___________________',
];

const STAR = [
  '___________________',
  '________oK_________',
  '________oaK________',
  '_______ooaaK_______',
  '_______oaaaK_______',
  '______ooaaaaK______',
  '_KKKKKoaaaaaKKKKK__',
  '_KoooooaaaaaaaaOK__',
  '__KooooaaaaaaaOK___',
  '___KoooaaaaaaOK____',
  '____KooaaaaaOK_____',
  '____KoaaaaaOOK_____',
  '____KoaaaaaOOK_____',
  '___KoaK__KaaOOK____',
  '___KoK____KaOOK____',
  '__KoK______KOOK____',
  '__KK________KKK____',
  '___________________',
];

const DESIGNS = [SEVEN, CHERRY, BELL, DIAMOND, STAR];

/* ── 렌더링 ── */

/**
 * 심볼 인덱스를 받아 픽셀 아트 캔버스를 반환한다.
 * @param {number} index  - 0~4
 * @param {number} [displaySize] - CSS 표시 크기(px)
 * @returns {HTMLCanvasElement}
 */
export function renderSymbol(index, displaySize = 80) {
  const design = DESIGNS[index];
  const { SCALE: px, GRID_SIZE: g } = PIXEL;

  const canvas = document.createElement('canvas');
  canvas.width  = g * px;
  canvas.height = g * px;
  canvas.className = 'sym';

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  for (let row = 0; row < g; row++) {
    const line = design[row] ?? '';
    for (let col = 0; col < g; col++) {
      const color = PAL[line[col]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(col * px, row * px, px, px);
    }
  }

  canvas.style.width  = `${displaySize}px`;
  canvas.style.height = `${displaySize}px`;
  return canvas;
}
