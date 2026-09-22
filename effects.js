/**
 * effects.js
 * 당첨 시각 효과 — 파티클 레인 & 골드 플래시
 */

import { PARTICLES } from './config.js';

/** 이모지 파티클을 화면 위에서 떨어뜨린다. */
export function spawnParticles() {
  const { CHARS, COUNT, DELAY, MIN_DUR, MAX_DUR, DRIFT } = PARTICLES;

  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className   = 'particle';
      el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];

      Object.assign(el.style, {
        left:     `${Math.random() * 100}vw`,
        top:      '-24px',
        fontSize: `${14 + Math.random() * 18}px`,
      });

      document.body.appendChild(el);

      const duration = MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR);
      const xDrift   = (Math.random() - 0.5) * DRIFT;
      const rotation = 300 + Math.random() * 400;

      el.animate(
        [
          { transform: 'translateY(0) translateX(0) rotate(0)',     opacity: 1 },
          { transform: `translateY(${innerHeight + 50}px)
                        translateX(${xDrift}px)
                        rotate(${rotation}deg)`,                    opacity: 0 },
        ],
        { duration, easing: 'ease-in' },
      );

      setTimeout(() => el.remove(), duration);
    }, i * DELAY);
  }
}

/** 머신 전체에 골드 플래시를 짧게 터뜨린다. */
export function flashWin() {
  const flash = document.getElementById('winFlash');
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 700);
}
