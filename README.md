# 🎰 Pixel Slot Machine

레트로 픽셀 아트 슬롯머신 — 순수 HTML/CSS/JS, 외부 라이브러리 없음.

[![Pixel Slot Machine](../slot-machine.gif)](https://your-username.github.io/your-repo/)

## 파일 구조

```
pixel-slot-machine/
├── index.html          # HTML 마크업 (구조만)
├── css/
│   └── style.css       # 전체 스타일시트
├── js/
│   ├── config.js       # 게임 설정값·상수
│   ├── symbols.js      # 픽셀 아트 심볼 데이터 + 캔버스 렌더러
│   ├── audio.js        # 8-bit 사운드 이펙트 (Web Audio API)
│   ├── leds.js         # LED 스트립 애니메이션
│   ├── reels.js        # 릴 스트립 생성·스핀 애니메이션
│   ├── effects.js      # 당첨 이펙트 (파티클·플래시)
│   └── game.js         # 메인 게임 루프 (진입점)
└── README.md
```

## 모듈 의존성

```
game.js (진입점)
├── config.js
├── leds.js      ← config.js
├── reels.js     ← config.js, symbols.js, audio.js
├── audio.js
├── effects.js   ← config.js
└── symbols.js   ← config.js
```

## 설정 변경

`js/config.js`에서 조정 가능:

| 항목 | 기본값 | 설명 |
|------|--------|------|
| `WIN_RATE` | `0.65` | 당첨 확률 (0~1) |
| `REEL_ITEMS` | `35` | 릴 스트립 아이템 수 |
| `SPIN_DURATIONS` | `[1600, 2200, 2800]` | 각 릴 회전 시간(ms) |

## 배포

```bash
# GitHub Pages
git add . && git commit -m "add slot machine" && git push
# Settings → Pages → Source: main branch
```
