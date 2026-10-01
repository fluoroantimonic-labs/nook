# Focus App — Worklog

## Project Overview
A single-file HTML/CSS/JS focus & study app inspired by studywithme.io, served via a Next.js 16 project. The actual app lives at `public/focus.html` (fully self-contained — only Google Fonts loaded externally) and is embedded full-viewport via `src/app/page.tsx` (server component rendering an iframe with `allow="autoplay; fullscreen; encrypted-media"` + `allowFullScreen`).

## Current Project Status (Phase 1 — COMPLETE)
The app is **fully functional and verified** via agent-browser (desktop + mobile/iPhone 14 emulation). All core requirements from the task spec are implemented and working:

### Implemented Features
- **Timer**: 3 pill modes (Deep Focus 90 / Break 20 / Quick 40, all editable). End-timestamp timing (accurate in background tabs). Auto-cycle deep→break→quick→break→deep. Auto-start toggle. Chime on session end (Web Audio bell chord). Tab-title countdown (`▶ 89:58 · Sunny Meadow · focus`). Spacebar toggle. Goal/progress SVG ring around the timer.
- **Backgrounds**: 6 animated CSS-gradient scenes (Sunny Meadow, Golden Hour, Sakura Dusk, Starry Night, Rainy Forest, Misty Morning). Canvas FX overlays: twinkling stars, animated rain, falling petals. Crossfade every N minutes (editable). First scene picked by time of day. Manual "next scene" button. Custom wallpaper upload (data URL, no external asset).
- **Music player** (bottom-left): Frosted-glass card, album-art gradient, title/artist, progress bar with seek, prev/play-pause/next, volume slider. 3 lo-fi tracks generated with Web Audio API (soft triangle-wave chord pads through lowpass filter + random sine pluck melodies), auto-advance.
- **Ambient mixer**: Toggle chips for rain (bandpass filtered noise), wind (lowpass + LFO), waves (lowpass + slow gain swell), all from a generated white-noise buffer.
- **Student features**: Task list (add/check/delete, click-to-set "Focusing on: …"). Stats panel (sessions today, minutes today, all-time hours, daily goal %). Streaks. Weekly bar chart. All persisted in localStorage with try/catch. Fullscreen button.
- **Design**: Poppins (UI) + Caveat (logo) from Google Fonts. White text with soft shadow. Glassmorphism panels (backdrop-filter blur, translucent white). Rounded pills. Responsive (breakpoints at 640px and 900px) + safe-area-aware CSS variables + theme-aware variables.
- **Nice-to-haves**: Streaks, weekly chart, distraction-free (zen) mode that hides UI, custom wallpaper upload, YouTube/Spotify embed input (local use), break-time stretch/water reminder toast, goal/progress ring.

### Verification Results (agent-browser)
- Desktop (1280×800): layout renders correctly — logo, mode pills, timer+ring, controls, music player, ambient chips, side panels (tasks/stats) all visible, no overlap.
- Mobile (iPhone 14, 390px): elements stack vertically, timer centered, music + ambient accessible at bottom, no overflow/cutoff.
- Timer counts down correctly (90:00 → 89:58) with tab-title update.
- Mode switching: Break→20:00, Quick→40:00, Deep→90:00.
- Task add + click-to-focus → "Focusing on: Finish thesis chapter".
- Settings modal opens; Pomodoro preset sets 25/5/15; saves & persists to localStorage; Deep mode shows 25:00 after save.
- Ambient rain chip toggles active state.
- Music play button toggles play/pause icon (Web Audio engine initializes on first gesture).
- Scene rotation works (3 clicks → Sakura Dusk), FX canvas draws petals.
- Zen mode toggles `distraction-free` class.
- ESLint clean. No runtime errors in dev.log.

### Bug Fixed During Verification
- Tab title showed "undefined" for the scene name — `currentSceneClass()` returned the data-name string but was used to index `SCENE_NAMES`. Renamed to `currentSceneName()` and used the value directly. Verified: title now "▶ 24:58 · Sunny Meadow · focus".

## Current Goals / Completed
Phase 1 (core build) is **complete and verified**. The app meets all requirements from the task description.

## Unresolved Issues / Risks / Next-Phase Recommendations
- **No known bugs.** App is stable.
- **Potential enhancements for future phases** (for the recurring webDevReview cron):
  - Add keyboard shortcuts overlay / help modal (currently only Space + Esc documented).
  - Persist music playback state + ambient state across reloads.
  - Add a session history log / "focus journal" with timestamps.
  - Add Pomodoro-style long-break logic (every N cycles → longer break).
  - Add more music tracks / a "shuffle" toggle.
  - Add subtle parallax on the background scenes (mouse/gyro).
  - Add a "dark/dim" theme toggle that shifts glass tint per scene.
  - Improve the weekly chart with tooltips + goal line.
  - Add PWA manifest + service worker for offline use (still single-file friendly).
  - The `scene-custom` wallpaper is excluded from auto-rotation; consider an option to keep it pinned.

## Architecture Notes
- `public/focus.html` — the entire self-contained app (HTML + CSS + vanilla JS, ~1640 lines). Only external dependency: Google Fonts (Poppins + Caveat).
- `src/app/page.tsx` — server component, renders a full-viewport `<iframe src="/focus.html">` so the single-file constraint is preserved while remaining previewable at `/`.
- No Next.js API routes, no database, no external images/audio — fully client-side.
