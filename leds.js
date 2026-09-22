/**
 * leds.js
 * LED 스트립 초기화 및 애니메이션
 */

import { GAME } from './config.js';

let timer = null;

/** LED 요소들을 생성해서 스트립에 추가한다. */
export function initLEDs() {
  const strip = document.getElementById('ledStrip');
  strip.innerHTML = '';

  for (let i = 0; i < GAME.LED_COUNT; i++) {
    const led = document.createElement('span');
    led.className = 'led';
    strip.appendChild(led);
  }
}

/** 회전 중 LED 체이서 애니메이션을 시작한다. */
export function startLEDs() {
  const leds = document.querySelectorAll('.led');
  const half = Math.floor(leds.length / 2);
  let tick = 0;

  timer = setInterval(() => {
    leds.forEach((led, i) => {
      led.classList.remove('on', 'gold');
      const isActive = i === tick % leds.length
                    || i === (tick + half) % leds.length;
      if (isActive) led.classList.add('on');
    });
    tick++;
  }, 70);
}

/**
 * LED 애니메이션을 중지하고 최종 상태를 설정한다.
 * @param {boolean} isWin - true면 전체 골드, false면 전체 소등
 */
export function stopLEDs(isWin) {
  clearInterval(timer);
  timer = null;

  document.querySelectorAll('.led').forEach((led) => {
    led.classList.remove('on', 'gold');
    if (isWin) led.classList.add('gold');
  });
}
