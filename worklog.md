# Focus App — Worklog

## Project Overview
A single-file HTML/CSS/JS focus & study app inspired by studywithme.io, served via a Next.js 16 project. The actual app lives at `public/focus.html` (fully self-contained — only Google Fonts loaded externally) and is embedded full-viewport via `src/app/page.tsx` (server component rendering an iframe with `allow="autoplay; fullscreen; encrypted-media"` + `allowFullScreen`).

## Current Project Status (Phase 3 — COMPLETE)
The app is **fully functional and verified** via agent-browser (desktop + mobile/iPhone 14 emulation). All core requirements plus Phase 2 user-requested enhancements and Phase 3 QA-driven fixes + styling/feature upgrades are implemented and working:

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
Phase 1 (core build) + Phase 2 (user-requested enhancements) + Phase 3 (QA fixes + styling/features) are all **complete and verified**.

### Phase 3 — QA-Driven Bug Fixes + Styling & Feature Upgrades (DONE)
Ran comprehensive agent-browser QA, found and fixed 3 bugs, then added major styling polish + 5 new features. All browser-verified.

#### Bugs Fixed (3)
1. **Session cycle never returned to Deep** — `setMode()` called `CYCLE.indexOf(mode)` which, for the duplicated 'break' entry, always returned index 1. After the 2nd break, the cycle jumped to Quick instead of Deep (deep→break→quick→break→quick→…). Fix: removed the cycleIndex assignment from `setMode`; manual mode-pill clicks now set `cycleIndex` explicitly, and `finishSession` advances it independently. Verified: 4 skips now yield deep→break→quick→break→**deep**.
2. **Ambient mixer count didn't decrement on toggle-off** — `ambientNodes[type] = null` left the key in the object, so `Object.keys().length` stayed wrong (DOM row visually turned off but count read "2 on" after toggling rain off). Fix: `delete ambientNodes[type]`. Verified: 2 on → toggle rain off → "1 on".
3. **Music progress bar was janky** — updated only every half-bar (~1.7s) because `updateProgressUI` was coupled to the note scheduler. Fix: added a separate 250ms `progressTicker` interval (`startProgressTicker`/`stopProgressTicker`) that updates the progress fill + cur-time independently of note scheduling. Verified: progress now moves smoothly every 250ms.

#### Styling Polish (6 upgrades) — vision-model assessed at 8.5/10
4. **Film-grain noise overlay** — a fixed full-screen `#grain` div using an inline SVG `feTurbulence` noise pattern at 4% opacity with `mix-blend-mode: overlay`, giving a tactile lo-fi/paper feel.
5. **Vignette** — a `#vignette` radial-gradient overlay darkens the edges to push focus toward the center timer, adding depth.
6. **Warm spotlight glow behind the timer** — a `.timer-spotlight` blurred radial gradient (warm cream) sits behind the ring; intensifies in dark-text mode.
7. **Goal ring upgrade** — SVG `<linearGradient>` (gold #ffd166 → orange #ff7e6b) applied as the progress stroke with a `drop-shadow` glow; thicker (7px), rounded caps. Shows the warm gradient arc as the timer runs.
8. **Enriched background scenes** — every scene got deeper gradients + layered atmospheric depth: Sunny Meadow (sun ray conic spin + double glow + ground light bloom), Golden Hour (dual sun glow halos), Sakura Dusk (pink glow bloom), Starry Night (moon halo + crater detail), Rainy Forest (sky tint + upper haze), Misty Morning (soft sun + drifting fog animation via `fogDrift` keyframe).
9. **Glass hierarchy + custom sliders** — music player uses `--glass-bg-strong` + inset highlight (primary control); ambient mixer sliders get accent-gold track fill on active rows + glowing thumbs on hover; music progress fill uses the gold→orange gradient with a glow.

#### New Features (5)
10. **Keyboard shortcuts + help overlay** — press `?` to toggle a shortcuts card listing 10 shortcuts (Space, R, S, M, N, B, T, F, Z, ?). Full keydown handler with input-field guard. New `btn-help` icon in the topbar.
11. **Focus Journal** — new `btn-journal` icon opens a modal listing the last 50 completed sessions (mode dot, label, minutes, day+time). Journal entries recorded via `recordJournal()` on each focus-session completion. "Clear history" button resets journal + focusCount. Persisted in localStorage.
12. **Long-break logic (Pomodoro-style)** — after every 3rd completed focus session, the next break doubles in duration (e.g., 20min → 40min). `focusCount` tracked in store; `isLongBreakDue()` checked in `finishSession`. Verified: skip through deep→break→quick→break→deep→**break(40:00)**.
13. **Rotating focus quotes** — an italic `.quote` line below the mode label cycles through 12 inspirational quotes every 22s with a fade transition. Initially shows after 800ms.
14. **Mouse parallax on background scenes** — `mousemove` (rAF-throttled) shifts hills + sun/moon subtly based on cursor position, giving the scenes a living, 3D depth feel.

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

### Phase 3 Verification Results (agent-browser)
- **Cycle bug fixed**: 4 skips yield deep→break→quick→break→**deep** (previously got stuck at quick).
- **Ambient count fixed**: toggle 2 on → toggle rain off → count reads "1 on" (was "2 on").
- **Music progress smooth**: updates every 250ms (verified cur-time advances ~1s per real second).
- **New elements present**: grain, vignette, spotlight, quote, btn-help, btn-journal, ringGrad SVG def, help-overlay, journal-modal all in DOM.
- **Quotes**: show after 800ms, cycle every 22s ("Lost time is never found again.").
- **Help overlay**: `?` key opens it, shows 10 shortcuts; Esc closes.
- **Keyboard shortcuts**: N→next track, B→next scene, T→toggle theme, all verified.
- **Journal**: after 1 skip, journal modal shows 1 item (Deep Focus, 90 min, timestamp).
- **Long-break**: after 3 focus skips, break shows 40:00 (2×20).
- **Visual (vision model, 8.5/10)**: confirmed film-grain noise, vignette, warm spotlight, rich layered scenes, custom glowing ambient sliders, warm gold→orange ring gradient (visible when running).
- ESLint clean; no runtime errors in dev.log.

## Unresolved Issues / Risks / Next-Phase Recommendations
- **No known bugs.** App is stable across desktop + mobile.
- **Potential enhancements for future phases** (for the recurring webDevReview cron):
  - Persist music playback state + ambient on-state across reloads (currently audio restarts on refresh).
  - Add a "today's timeline" visualization (sessions laid out on a 24h bar).
  - Add a configurable long-break interval (currently hardcoded to every 3rd focus session).
  - Add a "focus mode" color tint per scene (warm/cool) that shifts the glass accent.
  - Add PWA manifest + service worker for offline use (still single-file friendly).
  - Add subtle entrance animations for panels on first load.
  - The `scene-custom` wallpaper is excluded from auto-rotation; consider a "pin custom wallpaper" toggle.

## Architecture Notes
- `public/focus.html` — the entire self-contained app (HTML + CSS + vanilla JS, ~2080 lines). Only external dependency: Google Fonts (Poppins + Caveat).
- `src/app/page.tsx` — server component, renders a full-viewport `<iframe src="/focus.html">` so the single-file constraint is preserved while remaining previewable at `/`.
- No Next.js API routes, no database, no external images/audio — fully client-side.
