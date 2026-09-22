/**
 * audio.js
 * 8-bit 스타일 사운드 이펙트 (Web Audio API)
 */

let ctx = null;

function getContext() {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

/**
 * 단일 스퀘어 웨이브 비프음을 재생한다.
 */
function beep(freq, duration, volume = 0.05) {
  try {
    const ac  = getContext();
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + duration);
  } catch { /* 사용자 인터랙션 전에는 무시 */ }
}

/** 릴 회전 중 틱 사운드 */
export function playTick() {
  beep(180 + Math.random() * 350, 0.03, 0.04);
}

/** 릴 정지 사운드 */
export function playStop() {
  beep(500, 0.1, 0.07);
}

/** 당첨 빵빠레 멜로디 */
export function playFanfare() {
  const melody = [
    { freq: 523,  delay: 0    },
    { freq: 659,  delay: 100  },
    { freq: 784,  delay: 200  },
    { freq: 1047, delay: 320  },
    { freq: 784,  delay: 460  },
    { freq: 1047, delay: 560  },
    { freq: 1319, delay: 680  },
  ];

  for (const { freq, delay } of melody) {
    setTimeout(() => beep(freq, 0.13, 0.08), delay);
  }
}
