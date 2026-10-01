# Focus App — Worklog

## Project Overview
A single-file HTML/CSS/JS focus & study app inspired by studywithme.io, served via a Next.js 16 project. The actual app lives at `public/focus.html` (fully self-contained — only Google Fonts loaded externally) and is embedded full-viewport via `src/app/page.tsx` (server component rendering an iframe with `allow="autoplay; fullscreen; encrypted-media"` + `allowFullScreen`).

## Current Project Status (Phase 2 — COMPLETE)
The app is **fully functional and verified** via agent-browser (desktop + mobile/iPhone 14 emulation). All core requirements plus Phase 2 user-requested enhancements are implemented and working:

### Implemented Features
- **Timer**: 3 pill modes (Deep Focus 90 / Break 20 / Quick 40, all editable). End-timestamp timing (accurate in background tabs). Auto-cycle deep→break→quick→break→deep. Auto-start toggle. Chime on session end (Web Audio bell chord). Tab-title countdown (`▶ 89:58 · Sunny Meadow · focus`). Spacebar toggle. Goal/progress SVG ring around the timer.
- **Backgrounds**: 6 animated CSS-gradient scenes (Sunny Meadow, Golden Hour, Sakura Dusk, Starry Night, Rainy Forest, Misty Morning). Canvas FX overlays: twinkling stars, animated rain, falling petals. Crossfade every N minutes (editable). First scene picked by time of day. Manual "next scene" button. Custom wallpaper upload (data URL, no external asset).
- **Music player** (bottom-left): Frosted-glass card, album-art gradient, title/artist, progress bar with seek, prev/play-pause/next, volume slider. **8 lo-fi tracks** (expanded in Phase 2) generated with Web Audio API (soft triangle-wave chord pads through lowpass filter + random sine pluck melodies), auto-advance.
- **Ambient mixer** (bottom-right, **redesigned in Phase 2**): Now a full mixer panel with **8 sounds** (Rain, Wind, Waves, Fireplace, Birds, Café, Thunder, Stream) — each row has its own toggle button **plus an individual volume slider**. All synthesized via Web Audio (filtered noise + LFOs + event-scheduled chirps/crackles/thunder rumbles). Per-sound volumes persisted to localStorage.
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
Phase 1 (core build) + Phase 2 (user-requested enhancements) are both **complete and verified**.

### Phase 2 — User-Requested Enhancements (DONE)
Responded to user feedback with four changes, all browser-verified:

1. **Per-sound volume sliders for ambient sounds** — The old toggle-only chips were replaced with a full **Ambient Mixer panel**. Each sound now has its own toggle button *and* an individual volume slider. Added **5 new synthesized sounds** (Fireplace with random crackles, Birds with chirp sweeps, Café murmur + clinks, Thunder rumbles, Stream bubbles) → 8 total. Per-sound volumes persist to localStorage.
2. **Moved "auto-start next" toggle into Settings** — Removed from the main timer controls (which now hold reset + play + a new skip button). Added a "Session" section in the settings modal with the auto-start switch. `finishSession` now reads `state.store.autoStart` (not the DOM) for reliability.
3. **More sounds and music** — Expanded lo-fi music from 3 → **8 generated tracks** (added Library Whispers, Late Night Drive, Autumn Leaves, Coffee Shop Vibes, Deep Work, each with distinct key/scale/chords/bpm). Ambient sounds 3 → 8 (above).
4. **Dark mode option** — New theme toggle button (sun/moon) in the top toolbar + an "Appearance" segmented control (Light text / Dark text) in settings. In dark-text mode: white text/buttons become dark navy, glass panels lighten to opaque white, a `#veil` overlay gently lightens background scenes so dark text stays readable on any scene. Persisted to localStorage. Theme vars (`--text`, `--glass-bg`, `--pill-active-*`, `--slider-track`, `--thumb-bg`, etc.) flip via an `html.theme-dark` class.

### Phase 2 Verification Results (agent-browser)
- Ambient mixer renders 8 rows (Rain, Wind, Waves, Fireplace, Birds, Café, Thunder, Stream); toggling a sound marks it `on` and the count updates ("1 on"); volume slider input updates the live gain.
- Dark mode toggle: `html.theme-dark` applied, body text color → `rgb(24,26,46)` (dark navy); vision model confirmed dark timer text + lightened glass panels with correct contrast; toggles back cleanly.
- Music: cycling `next` walks through new tracks (Morning Coffee → Midnight Study → Library Whispers …), confirming 8 tracks.
- Settings: auto-start checkbox present in Session section; Appearance section has 2 theme buttons; auto-start no longer in main controls (count 0).
- Skip button: from Deep Focus → advances cycle to BREAK (20:00) and chimes.
- ESLint clean; no runtime errors in dev.log.

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
