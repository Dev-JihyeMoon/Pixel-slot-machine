/**
 * reels.js
 * 릴 스트립 생성 및 스핀 애니메이션
 */

import { GAME, SYMBOLS } from './config.js';
import { renderSymbol }   from './symbols.js';
import { playTick, playStop } from './audio.js';

let itemHeight = 120;

/** 릴 래퍼 높이를 측정해서 아이템 높이를 동기화한다. */
export function measureItemHeight() {
  const wrapper = document.getElementById('rw0');
  if (wrapper) itemHeight = wrapper.offsetHeight;
}

/**
 * 릴 스트립 하나를 심볼로 채운다.
 * @param {HTMLElement} stripEl - .reel 요소
 */
export function buildStrip(stripEl) {
  const displaySize = Math.min(
    (document.getElementById('rw0')?.offsetWidth ?? 140) * 0.7,
    80,
  );

  stripEl.innerHTML = '';

  for (let i = 0; i < GAME.REEL_ITEMS; i++) {
    const item = document.createElement('div');
    item.className = 'reel-item';
    item.style.height = `${itemHeight}px`;
    item.appendChild(renderSymbol(i % SYMBOLS.COUNT, displaySize));
    stripEl.appendChild(item);
  }
}

/** 3개 릴 스트립을 모두 다시 빌드한다. */
export function buildAllStrips() {
  for (let i = 0; i < GAME.REEL_COUNT; i++) {
    buildStrip(document.getElementById(`rs${i}`));
  }
}

/**
 * 단일 릴의 스핀 애니메이션을 실행한다.
 * @param {number} reelIndex  - 릴 인덱스 (0~2)
 * @param {number} target     - 정지할 심볼 인덱스
 * @param {number} duration   - 애니메이션 시간(ms)
 */
export function animateReel(reelIndex, target, duration) {
  const strip = document.getElementById(`rs${reelIndex}`);
  strip.style.transition = 'none';
  strip.style.top = '0px';

  const totalDistance = (GAME.REEL_ITEMS - SYMBOLS.COUNT + target) * itemHeight;
  const wrapDistance  = GAME.REEL_ITEMS * itemHeight;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);          // ease-out cubic

    strip.style.top = `${-(eased * totalDistance % wrapDistance)}px`;

    if (progress < 0.88 && Math.random() < 0.1) playTick();

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      strip.style.top = `${-(target * itemHeight)}px`;
      playStop();
    }
  }

  requestAnimationFrame(frame);
}
