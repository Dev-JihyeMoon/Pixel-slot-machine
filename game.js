/**
 * game.js
 * 메인 게임 루프 — 초기화, 스핀, 승패 판정
 */

import { GAME, SYMBOLS }                       from './config.js';
import { initLEDs, startLEDs, stopLEDs }        from './leds.js';
import { measureItemHeight, buildAllStrips, animateReel } from './reels.js';
import { playFanfare }                          from './audio.js';
import { spawnParticles, flashWin }             from './effects.js';

/* ── 상태 ── */

let spinning = false;
const results = [0, 0, 0];

/* ── 결과 판정 ── */

function pickResults() {
  if (Math.random() < GAME.WIN_RATE) {
    const pick = Math.floor(Math.random() * SYMBOLS.COUNT);
    results.fill(pick);
  } else {
    results[0] = Math.floor(Math.random() * SYMBOLS.COUNT);
    results[1] = Math.floor(Math.random() * SYMBOLS.COUNT);
    results[2] = Math.floor(Math.random() * SYMBOLS.COUNT);

    // 우연히 3개 일치하면 다시 뽑기
    while (results[0] === results[1] && results[1] === results[2]) {
      results[2] = Math.floor(Math.random() * SYMBOLS.COUNT);
    }
  }
}

function isWin() {
  return results[0] === results[1] && results[1] === results[2];
}

/* ── UI 헬퍼 ── */

const $btn    = () => document.getElementById('spinBtn');
const $result = () => document.getElementById('resultText');

function showPortfolioRecommendation() {
  const container = document.getElementById('portfolioLink');
  const link = document.createElement('a');

  link.href = 'https://dev-jihyemoon.github.io/jihye-portfolio/';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', "Jihye's portfolio");
  link.textContent = "Jihye's portfolio => https://dev-jihyemoon.github.io/jihye-portfolio/";

  container.replaceChildren(link);
  container.classList.add('visible');
}

function hidePortfolioRecommendation() {
  const container = document.getElementById('portfolioLink');
  container.classList.remove('visible');
  container.replaceChildren();
}

function showResult() {
  const res = $result();

  if (isWin()) {
    showPortfolioRecommendation();
    res.textContent = `★ JACKPOT! ${SYMBOLS.NAMES[results[0]]}! ★`;
    res.className   = 'result-text win';
    playFanfare();
    spawnParticles();
    stopLEDs(true);
    flashWin();
  } else {
    hidePortfolioRecommendation();
    const emoji = results.map((i) => SYMBOLS.EMOJI[i]).join(' ');
    res.textContent = `${emoji}  TRY AGAIN`;
    res.className   = 'result-text';
    stopLEDs(false);
  }
}

/* ── 스핀 ── */

function spin() {
  if (spinning) return;
  spinning = true;

  $btn().disabled      = true;
  $result().textContent = '';
  $result().className   = 'result-text';
  hidePortfolioRecommendation();

  startLEDs();
  pickResults();

  GAME.SPIN_DURATIONS.forEach((dur, i) => {
    animateReel(i, results[i], dur);
  });

  setTimeout(() => {
    spinning = false;
    $btn().disabled = false;
    showResult();
  }, GAME.RESULT_DELAY);
}

/* ── 초기화 ── */

function init() {
  initLEDs();
  measureItemHeight();
  buildAllStrips();

  window.addEventListener('resize', () => {
    measureItemHeight();
    buildAllStrips();
  });

  $btn().addEventListener('click', spin);
}

document.addEventListener('DOMContentLoaded', init);
