# Focus App — Worklog

## Project Overview
A single-file HTML/CSS/JS focus & study app inspired by studywithme.io, served via a Next.js 16 project. The actual app lives at `public/focus.html` (fully self-contained — only Google Fonts loaded externally) and is embedded full-viewport via `src/app/page.tsx` (server component rendering an iframe with `allow="autoplay; fullscreen; encrypted-media"` + `allowFullScreen`).

## Current Project Status (Phase 12 — COMPLETE)
The app is **fully functional and verified** via agent-browser (desktop + mobile/iPhone 14 emulation). All core requirements plus Phases 2–12 of enhancements are implemented and working:

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
Phase 1 (core) + Phase 2 (user-requested) + Phase 3 (QA fixes + styling) + Phase 4 (micro-interactions + mindfulness) + Phase 5 (segmented control + ambient theming + timeline) + Phase 6 (ambient presets + bokeh + vinyl + visualizer + task-linkage + focus gauge) + Phase 7 (celebration + live badge + distraction dim + typography) + Phase 8 (achievements + heatmap + command palette) + Phase 9 (brain dump + live clock + stats ticker + glass consistency) + Phase 10 (binaural beats + data backup + refinements) + Phase 11 (session reflection + binaural freqs + custom presets) + Phase 12 (insights panel + mood analytics) are all **complete and verified**.

### Phase 12 — Insights Panel & Mood Analytics (DONE)
QA confirmed the app was stable (reflection prompt, binaural freqs, timer accurate, command palette 14 items). Vision-model feedback drove a new insights panel with mood/time analytics. All browser-verified.

#### QA Results (no bugs found)
- Reflection prompt: "How did it go?" shows after focus session (auto-start off, breathing off).
- Binaural freqs: selector appears on toggle (4 options); change to Beta → storedBeat=20.
- Timer: 89:59 → 89:57 over 2s (accurate).
- Command palette: 14 items.

#### New Feature (1)
1. **Insights panel** — a new `.insights` card in the stats panel (between the focus gauge and the weekly chart) showing three data-driven rows + a mini mood bar chart:
   - **Best time of day** — finds the hour bucket with the most focus minutes from the journal, formatted as "9am" / "2pm" etc.
   - **Most common mood** — the most frequently recorded reflection mood (emoji).
   - **Avg session** — the average focus-session length in minutes (breaks excluded).
   - **Mood bars** — 5 mini vertical bars (one per mood: 💪/🌿/🙂/🌀/😴) showing the relative count of each mood, with hover tooltips + emoji labels.
   - `renderInsights()` reads from `state.store.journal`, called in `renderStats`.
   - Verified: with 4 simulated sessions (2 productive, 1 calm, 1 distracted at 9am) → bestTime="9am", mood="💪", avg="78 min", mood bars [100%, 50%, 3%, 50%, 3%].

### Phase 11 — Session Reflection, Binaural Frequencies & Custom Presets (DONE)
QA confirmed the app was stable (timer accurate, binaural toggle, command palette 14 items, data backup 3 buttons). Vision-model feedback drove 6 upgrades focused on habit-tracking, frequency selection, and custom mixes. All browser-verified.

#### QA Results (no bugs found)
- Timer: 89:59 → 89:57 over 2s (accurate).
- Binaural: toggle on → count "1 on"; freq selector appears.
- Command palette: 14 items with export entry.
- Data backup: 3 buttons (Export/Import/Reset) present.

#### Styling Polish (3 upgrades)
1. **Quote pill** — the rotating quote now has horizontal padding (`0 14px`) + `border-radius: pill`, giving it a subtle container feel + raised opacity to 0.82 for legibility.
2. **Task input padding** — `.task-input` padding increased from `8px 12px` → `10px 14px` for a roomier, more inviting typing area.
3. **Journal mood/note display** — journal items now show a mood emoji next to the mode label + an italic note line below the entry (when a reflection was saved).

#### New Features (3)
4. **Session reflection prompt** — after a focus session (when auto-start is off), a full-screen reflection card appears: "How did it go?" with 5 mood buttons emojis (💪 productive / 🌿 calm / 🙂 neutral / 🌀 distracted / 😴 tired) + a textarea for a note. Save stores the mood + note on the latest journal entry; Skip closes. Timing accounts for the breathing exercise (waits 30s if breathing shows, else 1.5s). Verified: prompt shows → select "productive" → note "Got a lot done!" → save → journal[0].mood="productive", journal[0].note="Got a lot done!".
5. **Binaural frequency presets** — a frequency selector appears below the ambient mixer when binaural is toggled on: Theta 4Hz, Alpha 10Hz (default), Beta 20Hz, Gamma 40Hz. `setBinauralFreq()` updates `state.store.binauralBeat` + restarts the binaural sound at the new beat. Verified: change to Beta → active="Beta 20Hz", storedBeat=20.
6. **Custom ambient presets** — a "+ Save current mix" button below the preset chips. `saveCustomPreset()` captures all currently-on sounds + their volumes, prompts for a name, and saves to `state.store.customPresets`. Custom presets render as gold-bordered chips with an × delete button. Clicking applies the mix; × deletes it. Verified: turn on rain+fire → save "Test Mix" → 1 custom chip "Test Mix×" appears.

### Phase 10 — Binaural Beats, Data Backup & Refinements (DONE)
QA confirmed the app was stable (brain dump + D shortcut, command palette 13 items, full cycle + celebration + ticker, settings persist). Vision-model feedback drove 5 upgrades focused on focus frequencies, data portability, and typography. All browser-verified.

#### QA Results (no bugs found)
- Brain dump: D shortcut opens panel, add note (count "1").
- Command palette: Ctrl+K opens (13 items), Esc closes.
- Full cycle: skip → BREAK, counter "Session 2", 40 confetti, ticker "1 today·90 min today·1.5 hrs all-time·1 day streak".
- Settings persist: goal=300 saved + confirmed in localStorage.

#### Styling Polish (3 upgrades) — vision-model confirmed
1. **Mode-label weight** — `.mode-label` font-weight raised from 500 → 600 (semi-bold) + letter-spacing 0.18em → 0.2em for a more premium tech feel. Verified: computed weight = 600.
2. **Brain-button hover glow** — `.brain-btn:hover` now adds a warm gold glow (`0 0 16px rgba(255,209,102,0.15)`) + the brain icon rotates -8deg + scales 1.1 on hover, making the secondary action more inviting.
3. **Binaural row styling** — a `.binaural-row` CSS class with a top border separator for the new binaural entry in the ambient mixer.

#### New Features (2)
4. **Binaural beats** — a 9th ambient sound "Binaural" (pink-themed) added to the ambient mixer. Synthesized via `buildBinaural()` using two sine oscillators at 200Hz (left) and 210Hz (right) through a `ChannelMerger` — the 10Hz difference creates an alpha-range binaural beat (focus frequency, headphones recommended). Has its own SVG waveform icon + themed color/glow like all other sounds. Verified: toggle on → `on=true`, count "1 on".
5. **Data backup (export/import/reset)** — a new "Data backup" section in Settings with 3 buttons: Export (downloads a JSON file `focus-app-backup-YYYY-MM-DD.json` via `Blob` + `URL.createObjectURL`), Import (file picker → `JSON.parse` → merge with defaults → reload), Reset (confirm dialog → clears localStorage → reload). Also added "Export data backup" to the command palette (14 commands total). Verified: 3 buttons present; command palette has the export entry.

### Phase 9 — Brain Dump, Live Clock & Stats Ticker (DONE)
QA confirmed the app was stable (command palette 12 items, timer accurate 89:59→89:57, 9 topbar buttons with tooltips, settings complete, tasks add/check work). Vision-model feedback drove 6 upgrades focused on ambient info, distraction capture, and glass cohesion. All browser-verified.

#### QA Results (no bugs found)
- Command palette: Ctrl+K opens (12 items), Esc closes.
- Timer: 89:59 → 89:57 over 2s (accurate).
- Topbar: 9 buttons, 9 with `data-tip` tooltips.
- Settings: 5 presets, 7 scene thumbs, 3 toggles, 2 theme buttons.
- Tasks: add 3, check 1 → 1 done.

#### Styling Polish (3 upgrades) — vision-model confirmed
1. **Standardized glass depth** — all panels (`.panel`, `.music-player`, `.ambient-mixer`) now use uniform `blur(20px)` + `--glass-bg-strong` + inset bevel highlights, giving consistent premium-thickness glass across the whole UI (previously the side panels used `--glass-bg` + 18px blur while the music player used `--glass-bg-strong` + 22px).
2. **Larger control-button icons** — secondary ctrl-btn (reset/skip) icons increased from 22px → 24px for better visual weight balance against the primary play button.
3. **Stats ticker** — a compact live summary line below the rotating quote: "N today · N min today · N.N hrs all-time · N day streak" with bold values + dim separators. `updateStatsTicker()` reads from store, called in renderStats. Verified: empty → "0 today·0 min today·0.0 hrs all-time·0 day streak"; after a session → "1 today·90 min today·1.5 hrs all-time·1 day streak".

#### New Features (3)
4. **Live clock widget** — a clock under the logo showing "HH:MM" + "Day, Mon Date" (e.g. "11:01 Thu, Oct 1"), updating every second via `startLiveClock()`. Tabular nums + a small circle bullet prefix. Verified: present + updating.
5. **Brain-dump scratchpad** — a floating "Brain dump" button at the bottom center (with a count badge) opens a glass panel with a textarea + a list of quick notes. Enter saves a note (Shift+Enter for newline); each note has a delete button. Notes persist in `state.store.brainDump` (max 50, 300 chars). Also opens via the `D` keyboard shortcut + the command palette. Verified: add 2 notes (count "2"), delete 1 (1 left).
6. **Brain dump in command palette + shortcuts** — added "Open brain dump" (key D) to both the command palette (13 commands total) and the help overlay shortcuts list (12 entries).

### Phase 8 — Achievements, Heatmap & Command Palette (DONE)
QA confirmed the app was stable (cycle + celebration + counter work, ambient presets clear on manual adjustment, task-complete prompt fires). Vision-model feedback drove 5 upgrades focused on data visualization, gamification, and power-user tooling. All browser-verified.

#### QA Results (no bugs found)
- Full session cycle + celebration: skip → BREAK, counter "Session 2", 40 confetti + banner shown.
- Ambient preset "Beach" → 2 on; manual slider adjustment clears the active preset highlight.
- Task-complete prompt: focused task → skip → "Nice work! Mark 'Study calculus' as done?".
- Music: play toggles vinyl spin + visualizer; next track cycles.

#### Styling Polish (2 upgrades)
1. **Quote legibility** — quote opacity raised from 0.55 to 0.78 (weight 300→400, +letter-spacing) so it's readable as a "whisper" rather than nearly invisible.
2. **Ambient row spacing** — `.amb-row` padding increased from 3px to 4px vertical for more breathing room.

#### New Features (3)
3. **Focus heatmap** — a 7×7 grid (49 cells) in the stats panel showing the last 7 weeks of focus activity. Each cell is colored by intensity: empty (0 min), l1 (>0), l2 (≥25), l3 (≥60), l4 (≥120 min, with glow). Hover scales the cell + shows a tooltip with date + minutes. `renderHeatmap()` reads from `state.store.sessions`. Verified: 49 empty cells → 1 active cell after a session.
4. **Achievements / milestones** — 7 badge chips in the stats panel: "First Focus" (1 session), "5 Sessions", "25 Sessions", "10 Hours", "3-Day Streak", "7-Day Streak", "Daily Goal Hit". Each tests against `totalSessions()` / `totalAllMins()` / streak / today's goal. Unlocked badges get gold tint + accent icon. Verified: 0 unlocked → "First Focus" unlocks after 1 session.
5. **Command palette (Ctrl/Cmd+K)** — a power-user command palette overlay with a search input + list of 12 commands (timer, music, scene, theme, fullscreen, zen, settings, journal, shortcuts). Fuzzy filter by typing; arrow-key navigation; Enter runs the selected command; Esc/click-outside closes. The shortcut hint below the controls now mentions `⌘K`, and the help overlay lists it too. Verified: opens via Ctrl+K (12 items), filters "music" → 2 results, arrow nav to index 2, Enter runs "Skip to next session" + closes.

### Phase 7 — Celebration, Live Badge & Distraction Dim (DONE)
QA confirmed the app was stable (cycle works, scene auto-rotation works, all settings sections present). Vision-model feedback drove 7 upgrades focused on session feedback, ambient life, and refined typography. All browser-verified.

#### QA Results (no bugs found)
- Full cycle: deep→break→quick→break (skip×3) works.
- Scene auto-rotation: Sunny Meadow → Golden Hour after 62s (1-min interval).
- Settings: 5 presets, 3 duration fields, 7 scene thumbs, all toggles present.
- Help overlay (10 shortcuts), Journal modal (empty state) both work.

#### Styling Polish (3 upgrades) — vision-model confirmed
1. **Live-session badge** — a pill below the logo showing "Idle" (dim dot) when paused and "In session" (pulsing gold dot, 1.6s `livePulse`) when running. Toggles via `updateLiveBadge()` on every render.
2. **Styled timer colon** — the `:` separator in the timer is now wrapped in a `.sep` span with reduced opacity (0.6), giving a refined typographic hierarchy (numbers stay bold, colon recedes).
3. **Refined quote + task placeholder** — quote opacity lowered to 0.55 (a "whisper" rather than competing for attention); task input placeholder changed from "Add a task…" to the more engaging "What are you working on?".

#### New Features (4)
4. **Session-complete celebration** — on every session end, a confetti burst (40 pieces in 6 themed colors, mix of circles + squares, randomized delays/durations on a 2.4s `confettiFall`) fires across the screen, plus a centered banner ("Session complete!" + "N min focused — beautiful work. Keep the momentum." for focus; "Break over" + "Refreshed and ready." for breaks). Banner shows for 2.6s; confetti cleans up after 3s. Verified: 40 confetti + banner shown on skip.
5. **Session counter** — a pill next to the mode label showing "Session N" (where N = today's completed focus sessions + 1). `updateSessionCounter()` reads today's stats + renders in setMode + renderStats. Verified: "Session 1" → "Session 2" after a focus session (focusCount=1).
6. **Distraction dim** — when the tab loses focus/visibility during a running session, the topbar + side panels + music player + ambient mixer dim to 25% opacity (0.8s transition) while the timer spotlight intensifies, reducing peripheral distraction. Removed on focus return. `setupDistractionDim()` listens to `visibilitychange` + `blur`/`focus`. Verified: `dimmed` class added on blur during running, removed on focus.
7. **Mode-label session context** — the mode label now flex-displays the mode text + the session counter pill inline, giving "DEEP FOCUS · Session 1" context.

### Phase 6 — Ambient Presets, Bokeh Depth, Vinyl & Task Linkage (DONE)
QA confirmed the app was stable (timer accurate, tab title updates, music+ambient play together, tasks work). Vision-model feedback drove 7 upgrades focused on ambient depth, music vitality, and task-timer linkage. All browser-verified.

#### QA Results (no bugs found)
- Timer countdown accurate (89:59→89:57 over 2s); tab title updates (`▶ 89:59 · Sunny Meadow · focus`).
- Music + ambient play together without conflict.
- Tasks add + click-to-focus → "Focusing on: Review code".

#### Styling Polish (4 upgrades) — vision-model confirmed
1. **Soft bokeh light orbs** — 5 large blurred orbs (`#bokeh`) in warm tones (gold/orange/white) drift slowly on a 22s `drift` animation with staggered delays, adding atmospheric depth to all scenes.
2. **Vinyl-style spinning album art** — the music player's album art is now circular with a dark center hole (vinyl record look). When music plays, it spins on an 8s `spin` animation (`animation-play-state` toggled via `.playing` class); pauses when music stops.
3. **Music visualizer bars** — 4 accent-colored bars in the music player card that animate on a 0.7s `vizBar` keyframe (staggered) when music plays; static/dim when paused.
4. **Shortcut hint + stat-card bevels** — a tiny `.shortcut-hint` line below the controls ("Press Space to start · ? for shortcuts" with `<kbd>` badges) for discoverability; stat cards get an inset top highlight for a beveled look.

#### New Features (3)
5. **Ambient scene presets** — 5 one-tap combo chips at the top of the ambient mixer: "Rainy Library" (rain+cafe), "Night Forest" (fire+wind+thunder), "Beach" (waves+wind), "Morning Garden" (birds+stream), "Cozy Café" (cafe+rain). `applyAmbientPreset()` stops all current sounds, sets the preset's volumes, rebuilds the mixer, and toggles the preset's sounds on. Active preset highlights; manual slider adjustment clears the highlight. Verified: "Rainy Library" → rain+cafe on (2 on), fire off, preset highlighted.
6. **Focus score gauge** — a circular SVG gauge in the stats panel (reusing the gold→orange `ringGrad`) showing today's focus minutes as a percentage of the daily goal. `renderFocusGauge()` sets the arc's `strokeDashoffset`. Verified: 0% at empty state (offset = full circumference 150.8).
7. **Task-completion prompt (task-timer linkage)** — after a focus session completes, if a task was focused, a special reminder toast appears: "Nice work! Mark 'X' as done?" with "Mark done" / "Not now" buttons. "Mark done" completes the task. Timing accounts for the breathing exercise (waits 30s if breathing shows, else 1.2s). Verified: prompt shows with task name → "Mark done" → reminder hides + task marked done.

### Phase 5 — Segmented Control, Ambient Theming & Timeline (DONE)
QA confirmed the app was stable (the parallax "issue" from earlier testing was a test-method artifact — dispatching on `window` instead of `document`; the feature works). Vision-model feedback drove 8 upgrades focused on visual cohesion + ambient life + data viz. All browser-verified.

#### QA Results (no bugs found)
- Timer countdown accurate; settings persist across reload (durations + goal).
- Breathing exercise text cycles correctly ("breathe in…" → "breathe out…" over 2.5s).
- Parallax works when dispatching mousemove on `document` (hills translate).

#### Styling Polish (5 upgrades) — vision-model confirmed
1. **Sliding segmented indicator for mode pills** — replaced per-pill active backgrounds with a single `.modes-indicator` element that slides behind the active mode (Deep/Break/Quick) with a spring cubic-bezier transition. Repositions on resize + mode change. Verified: translateX 1px→124px→207px across modes.
2. **Themed per-sound colors in the ambient mixer** — each sound now has a `color` + `glow` (rain=blue #5ba8e0, wind=sage, waves=teal, fire=orange #ff8a4c, birds=green, café=brown, thunder=purple, stream=mint). Active rows get a colored left-edge accent (`inset 3px 0 0`), the toggle gets a colored glow, and the slider track fill + thumb use the sound's color. Verified by vision model: distinct blue/orange/green glows.
3. **Animated mini-waveform indicators** — 4 tiny bars next to each active sound's label, animating on a 0.9s `wave` keyframe (staggered delays) with the sound's themed color. Hidden when off. Verified visible on active rows.
4. **Floating firefly particles** — 14 warm glowing dots (`#fireflies`) drift upward across the scene on a 12s `floatUp` animation with randomized delays/durations, adding ambient life to all scenes.
5. **Topbar icon tooltips + entrance animations** — all 9 topbar icon buttons now have `data-tip` attributes rendering fade-in tooltip labels on hover (e.g. "Next scene (B)", "Fullscreen (F)", "Shortcuts (?)"). All panels/music/ambient get a 0.55s `panelIn` entrance animation with staggered delays.

#### New Features (3)
6. **Today's 24h timeline** — in the stats panel, a horizontal `.timeline-bar` represents the 24h day with colored segments marking when today's sessions occurred (positioned by start hour, width by duration). Shows "no sessions yet today" when empty. `renderTimeline()` filters journal entries by today's date. Verified: 0 segments → 1 segment after a skip.
7. **Configurable long-break interval** — new "Long break every N focus sessions" input in Settings → Session (range 2–8, default 3). `isLongBreakDue()` now reads `state.store.longBreakEvery`. Verified: set to 2 → long break (40:00) fires at fc=2 instead of fc=3.
8. **Persisted long-break setting** — `longBreakEvery` added to defaultStore, wired through openSettings/saveSettings, persisted in localStorage.

### Phase 4 — Micro-Interactions + Mindfulness Features (DONE)
QA confirmed the app was stable (no bugs). Vision-model feedback pushed toward "premium cozy sanctuary" — implemented 8 upgrades focused on tactile feedback + emotional/mindful touches. All browser-verified.

#### QA Results (no bugs found)
- Timer countdown accurate (89:59 → 89:56 over 3s). Reset works (90:00).
- Ambient toggle + count correct (3 on); volume persists (70 stored, --fill=70%).
- Music plays + progress smooth (00:03 after 3s).
- Dark mode toggles cleanly; mobile (390px) layout intact (timer, cycle dots, music visible).

#### Styling Polish (4 upgrades) — vision-model confirmed
1. **Beveled glass panels** — all `.panel`s now have `inset 0 1px 0 rgba(255,255,255,0.22)` top highlight + `inset 0 -1px 0 rgba(0,0,0,0.08)` bottom shadow, giving a premium "thick glass tile" look (intensified in dark-text mode).
2. **Timer idle breathing** — the `.ring-svg` gets a `.idle` class triggering a 4.5s `ringBreathe` keyframe (subtle scale + opacity pulse) when the timer is paused; removed when running.
3. **Play button running state** — when running, `.ctrl-btn.primary.running` switches to a warm gold→orange gradient with a 2.4s `playPulse` glow animation. Verified: running=true, idle=false on start; reversed on pause.
4. **Task slide-in + check-pop animations** — new tasks animate in with a spring (`taskSlideIn` cubic-bezier with overshoot); checking a task pops the checkmark (`checkPop` 0→1.3→1) + scales the checkbox; delete buttons rotate 90° on hover; removing tasks slide out.

#### New Features (4)
5. **Cycle progress dots** — a row of dots below the mode label tracks Pomodoro-set progress: ● ○ ○ ○ → ● ● ○ ○ → ● ● ● ○ (then the long break fires). The 4th dot is a wider "long break" indicator. `renderCycleDots()` reads `focusCount % 3`. Verified: 0→next, 1→done+next, 2→done+done+next.
6. **Post-session breathing exercise** — after a focus session completes (when auto-start is off), a full-screen `.breath-overlay` appears with a glowing warm circle that expands/contracts on an 8s `breathe` cycle, cycling "breathe in… / hold… / breathe out… / rest…" text every 2s. Skippable via button, click-outside, or Esc. Toggle in Settings → Reminders ("Post-session breathing exercise"). Verified: shows "breathe in…" after skip with auto-start off; skip button hides it.
7. **Streak garden** — in the stats panel, a tiny garden of CSS plants grows with the streak: 1 plant per 2 days (max 5), each with a terracotta pot, a swaying green stem (`sway` keyframe), leaves that appear at 30% growth, and a glowing bloom at full growth. `renderGarden()` reads `state.store.streak`. Verified: streak=0 → 1 plant, 0 blooms; streak=5 → 3 plants, 2 blooms.
8. **Idle nudge** — during a running focus session, a 120s idle timer (`resetIdleTimer`/`clearIdleTimer`) triggers a gentle reminder toast if there's no mouse/keyboard/click activity, encouraging re-engagement. Reset on any activity listener. Wired in startTimer/pauseTimer/resetTimer/finishSession.

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

### Phase 4 Verification Results (agent-browser)
- **No bugs found** in QA: timer accurate, ambient/music/stats all stable.
- **New elements present**: `.ring-svg.idle`, `#cycle-dots` (4 dots), `#garden`, `#breath-overlay`, `#breath-toggle` all in DOM.
- **Cycle dots progression**: 0→[next,empty,empty]; skip→[done,next,empty]; skip×2→[done,done,next].
- **Play button running state**: start → `running=true, idle=false`; pause → `running=false, idle=true`.
- **Breathing exercise**: with auto-start off, skip a focus session → overlay shows "breathe in…"; skip button hides it.
- **Streak garden**: streak=0 → 1 plant, 0 blooms; streak=5 → 3 plants, 2 blooms.
- **Visual (vision model)**: confirmed warm gold/orange pulsing play button when running, warm gradient ring arc, beveled premium-thickness glass panels, cycle dots below mode label, spotlight glow behind timer.
- **Mobile (iPhone 14, 390px)**: timer, cycle dots, music player all visible; no overflow.
- ESLint clean; no runtime errors in dev.log.

### Phase 5 Verification Results (agent-browser)
- **No bugs found** in QA: timer accurate, settings persist, breathing cycles, parallax works.
- **New elements present**: `#modes-indicator` (ready), `#fireflies` (14 dots), `#timeline`, `#long-break-every`, 9 `data-tip` tooltips — all in DOM.
- **Sliding indicator**: translateX changes 1px→124px→207px across Deep→Break→Quick (repositions on resize).
- **Themed ambient colors**: fire row `--amb-color=#ff8a4c`, toggle glow = orange, waveform visible on active rows. Vision model confirmed distinct blue/orange/green glows + waveform bars.
- **Timeline**: empty state ("no sessions yet today") → 1 segment after completing a session.
- **Configurable long-break**: set to 2 → long break (40:00) fires at fc=2 (was fc=3 at default).
- **Mobile (iPhone 14, 390px)**: indicator ready, fireflies present, layout intact (timeline hidden — side panel collapses on mobile as designed).
- ESLint clean; no runtime errors in dev.log.

### Phase 6 Verification Results (agent-browser)
- **No bugs found** in QA: timer accurate, tab title updates, music+ambient play together, tasks work.
- **New elements present**: `#bokeh` (5 orbs), `.amb-presets` (5 chips), `#music-viz` (4 bars), `#focus-gauge` + `#gauge-arc`, `#shortcut-hint` — all in DOM.
- **Ambient preset "Rainy Library"**: rain+cafe on (2 on), fire off, preset highlighted.
- **Vinyl spin + visualizer**: on music play → `album-art.playing=true`, `music-viz.playing=true`; both false on pause.
- **Focus gauge**: 0% at empty state (offset=150.8 = full circumference).
- **Task-completion prompt**: after a focus session with a focused task → "Nice work! Mark 'Read book' as done?" → "Mark done" → reminder hides + task marked done.
- **Visual (vision model)**: confirmed bokeh light orbs for depth, circular vinyl-style album art with center hole, music visualizer bars, focus-score gauge.
- **Mobile (iPhone 14, 390px)**: bokeh (5 orbs), shortcut hint visible, music player accessible, no overflow.
- ESLint clean; no runtime errors in dev.log.

### Phase 7 Verification Results (agent-browser)
- **No bugs found** in QA: cycle works, scene auto-rotation works, all settings sections present.
- **New elements present**: `#live-badge`, `#session-counter`, `#celebrate`, `#celebrate-banner`, `.timer-text .sep` — all in DOM.
- **Live badge**: "Idle" (dim dot) → "In session" (pulsing gold dot, `on` class) when timer starts; back to "Idle" on pause.
- **Styled colon**: `.timer-text .sep` present (opacity 0.6).
- **Celebration**: on skip → 40 confetti pieces + banner "Session complete!" shown; confetti cleans up after 3s.
- **Session counter**: "Session 1" → "Session 2" after a focus session (focusCount=1).
- **Distraction dim**: `body.dimmed` added on window blur during running session; removed on focus.
- **Task placeholder**: "What are you working on?".
- **Visual (vision model)**: confirmed live-session badge "IN SESSION" with pulsing dot, styled dimmer colon, session counter pill.
- **Mobile (iPhone 14, 390px)**: live badge + session counter present, timer intact.
- ESLint clean; no runtime errors in dev.log.

### Phase 8 Verification Results (agent-browser)
- **No bugs found** in QA: cycle + celebration + counter work, ambient presets clear on manual adjustment, task-complete prompt fires, music vinyl/visualizer toggle.
- **New elements present**: `#heatmap` (49 cells), `#achievements` (7 badges), `#cmdk-overlay` + `#cmdk-input` — all in DOM and visible.
- **Command palette**: Ctrl+K opens (12 commands), "music" filter → 2 results, ArrowDown×2 → sel index 2 ("Skip to next session"), Enter runs it + closes.
- **Heatmap**: 49 empty cells initially → 1 active cell after a focus session.
- **Achievements**: 0 unlocked → "First Focus" unlocks after 1 focus session.
- **Quote opacity**: 0.78 (raised from 0.55 for legibility).
- **Shortcut hint**: updated to "Press Space to start · ⌘K command palette · ? all shortcuts".
- **Mobile (iPhone 14, 390px)**: command palette opens via Ctrl+K dispatch, timer intact.
- ESLint clean; no runtime errors in dev.log.

### Phase 9 Verification Results (agent-browser)
- **No bugs found** in QA: command palette, timer, topbar, settings, tasks all stable.
- **New elements present**: `#live-clock`, `#stats-ticker`, `#brain-btn` + `#brain-panel` — all in DOM and visible.
- **Live clock**: shows "11:01 Thu, Oct 1" (HH:MM + weekday/month/day), updating every second.
- **Stats ticker**: empty → "0 today·0 min today·0.0 hrs all-time·0 day streak"; after a session → "1 today·90 min today·1.5 hrs all-time·1 day streak".
- **Brain dump**: add 2 notes (count badge "2"), delete 1 (1 left); `D` shortcut opens panel.
- **Glass consistency**: all panels now use uniform `blur(20px)` + `--glass-bg-strong` + bevel highlights.
- **Visual (vision model)**: confirmed live clock widget under logo, stats ticker below quote, brain dump button at bottom center, consistent glass panels.
- **Mobile (iPhone 14, 390px)**: live clock + stats ticker visible, timer intact (brain button hidden on mobile to avoid overlap — accessible via `D` shortcut / command palette).
- ESLint clean; no runtime errors in dev.log.

### Phase 10 Verification Results (agent-browser)
- **No bugs found** in QA: brain dump, command palette, full cycle, settings persistence all stable.
- **New elements present**: `.amb-row[data-amb=binaural]` (9th sound), 3 `#data-*` buttons in settings, "Export data backup" in command palette — all in DOM.
- **Binaural beats**: toggle on → `on=true`, count "1 on"; 9 ambient rows total (was 8).
- **Data backup**: 3 buttons (Export/Import/Reset) present in settings; vision model confirmed the "Data backup" section.
- **Command palette**: now 14 items (added "Export data backup").
- **Mode label**: computed font-weight = 600 (semi-bold, was 500).
- **Brain button**: hover glow + icon rotation confirmed via CSS.
- **Mobile (iPhone 14, 390px)**: binaural row exists, timer intact.
- ESLint clean; no runtime errors in dev.log.

### Phase 11 Verification Results (agent-browser)
- **No bugs found** in QA: timer accurate, binaural toggle, command palette 14 items, data backup 3 buttons.
- **New elements present**: `#reflect-overlay` + 5 `.mood-btn`, `#binaural-freqs` (4 freq buttons), `#amb-save-preset` — all in DOM.
- **Binaural freqs**: selector appears on binaural toggle (`display:flex`); change to Beta → active="Beta 20Hz", storedBeat=20.
- **Custom presets**: turn on rain+fire → save "Test Mix" → 1 gold-bordered custom chip "Test Mix×" appears.
- **Reflection**: after focus session (auto-start off, breathing off) → "How did it go?" prompt → select 💪 productive → note "Got a lot done!" → save → journal[0].mood="productive", journal[0].note="Got a lot done!".
- **Quote pill**: padding + border-radius applied; opacity 0.82.
- **Task input**: padding 10px 14px (was 8px 12px).
- **Mobile (iPhone 14, 390px)**: reflect overlay + save-preset button present, timer intact.
- ESLint clean; no runtime errors in dev.log.

### Phase 12 Verification Results (agent-browser)
- **No bugs found** in QA: reflection, binaural, timer, command palette all stable.
- **New element present**: `#insights` card with 3 insight rows + `#mood-bars` (5 bars) — in DOM.
- **Empty state**: all insights show "—", mood bars at min height (3%).
- **Populated state** (4 simulated sessions): bestTime="9am", mood="💪", avg="78 min", mood bars [100%, 50%, 3%, 50%, 3%].
- **Mobile (iPhone 14, 390px)**: timer intact, insights panel collapses with side-right (hidden on mobile as designed).
- ESLint clean; no runtime errors in dev.log.

## Unresolved Issues / Risks / Next-Phase Recommendations
- **No known bugs.** App is stable across desktop + mobile, light + dark themes.
- **Potential enhancements for future phases** (for the recurring webDevReview cron):
  - Persist music playback state + ambient on-state across reloads (audio restarts on refresh).
  - Add a "focus mode" color tint per scene (warm/cool) that shifts the glass accent.
  - Add PWA manifest + service worker for offline use (still single-file friendly).
  - The `scene-custom` wallpaper is excluded from auto-rotation; consider a "pin custom wallpaper" toggle.
  - Add a co-view/presence feature (share timer status link) — bigger scope, needs a backend.
  - Add a real Web Audio AnalyserNode-driven visualizer (currently CSS-animated fake bars).
  - Add a "focus shield" / DND toggle indicator near the timer.
  - Make the brain dump button visible on mobile (currently hidden to avoid overlap).
  - Add a weekly insights summary (best day, total hours, mood trend over time).

## Architecture Notes
- `public/focus.html` — the entire self-contained app (HTML + CSS + vanilla JS, ~3350 lines). Only external dependency: Google Fonts (Poppins + Caveat).
- `src/app/page.tsx` — server component, renders a full-viewport `<iframe src="/focus.html">` so the single-file constraint is preserved while remaining previewable at `/`.
- No Next.js API routes, no database, no external images/audio — fully client-side.
