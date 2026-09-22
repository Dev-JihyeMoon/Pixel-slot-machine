/**
 * config.js
 * 게임 설정값 및 심볼 메타데이터
 */

export const GAME = Object.freeze({
  WIN_RATE:    0.65,
  REEL_COUNT:  3,
  REEL_ITEMS:  35,
  LED_COUNT:   22,
  SPIN_DURATIONS: [1600, 2200, 2800],
  RESULT_DELAY:   3000,
});

export const PIXEL = Object.freeze({
  SCALE:      5,
  GRID_SIZE:  18,
});

export const SYMBOLS = Object.freeze({
  COUNT: 5,
  NAMES: ['SEVEN', 'CHERRY', 'BELL', 'DIAMOND', 'STAR'],
  EMOJI: ['7️⃣', '🍒', '🔔', '💎', '⭐'],
});

export const PARTICLES = Object.freeze({
  COUNT:    35,
  CHARS:    ['⭐', '💰', '✨', '🪙', '💎', '🍒', '🔔', '7️⃣'],
  DELAY:    50,
  MIN_DUR:  1400,
  MAX_DUR:  2800,
  DRIFT:    220,
});
