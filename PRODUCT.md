# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Mobile web (phone-first). Not a native app.

## Stack

Delegated: Vite + React + TypeScript single-page app, frontend only. No backend; state lives in the browser (localStorage) with mock/seed data. Chosen because the product is a prototype of a phone companion to a physical object: component structure keeps screens (menu entry, character capture, progress) easy to grow, and a static build deploys anywhere. Source goes in `app/`.

## Users

- **Primary: children aged 6–10 who are picky eaters.** They read simple words and use the app mostly on their own: entering today's menu, photographing their character, tapping the phone on the tablecloth.
- **Secondary: parents.** Do first-time setup and are present at the family meal; not the main operator.

Usage scene: at home, shortly before dinner, often in or near the kitchen, phone handed to the child.

## Product Purpose

Companion app to an interactive tablecloth that helps picky-eating children approach food through play. The app is the main way to set up and drive the tablecloth:

1. **Record the meal's menu.** Before dinner the child enters today's menu. While doing so they receive short educational content about the foods the family will eat.
2. **Transfer to the tablecloth.** When the menu is complete, the child taps the phone on the tablecloth; the menu is sent over NFC.
3. **Control game progression over time.** The app holds the child's characters and their progress along the track across meals.

Success: children engage with unfamiliar foods willingly and look forward to the pre-dinner ritual.

## Positioning

Food exploration through a physical board game on the dinner table itself, driven by the child's own real toy. The tablecloth's printed track (in the tradition of the Goose Game) plus an RFID-tagged personal object makes the meal the game board; the phone is the setup and memory, not the play surface.

## Operating Context

- **Tablecloth:** coloured track printed on it, Goose-Game style. Detects character position via RFID. Receives the menu via NFC tap from the phone.
- **Characters:** a small real object the child likes (toy monkey, small train, etc.) carrying an RFID tag. The child photographs it in the app; the photo becomes its digital copy.
- **Ritual:** menu entry + learning happens before dinner; play happens at the table during the meal.

## Capabilities and Constraints

- **Character lifecycle (confirmed):** the child photographs the object they want to play with first. When that object completes the path, the child collects it (it joins a collection) and gets to pick a new object to play with next.
- **Photo to game graphic (desired):** the photo should be turned into a digital, game-like graphic version of the object. Frontend-only constraint: this must be achievable in the browser (e.g. canvas-based stylisation), with no server-side AI.
- **NFC:** Web NFC works only in Chrome on Android. iOS Safari and others need a simulated/fallback transfer path in the prototype.
- **Camera:** browser camera capture (file input with capture or getUserMedia).
- **Track (confirmed):** always 10 squares after the start.
- **Challenges and movement (confirmed):** run entirely by the tablecloth. Every square has a receiver that detects when the toy is moved onto it. Doing a challenge moves the toy one square forward, not doing it one square back. The app does not deal or score challenges; it only shows the toy's position, read from the cloth with an NFC tap (labelled demo where Web NFC is unavailable).
- **Session start (confirmed):** every time the app is opened, the first screen is entering the next meal. A new menu starts when the last one was sent, or it was for another day or meal time; otherwise it is continued.
- **Family model (confirmed):** one shared menu per meal and one shared toy on the tablecloth for all the kids; the app does not identify which kid is holding the phone. Kids' names are only used to greet them.
- **Setup and handoff (confirmed):** a grown-up does first setup (family name, kids' names), then hands the phone over; the kids photograph the toy themselves.
- **Meals (confirmed):** any meal, not only dinner. The app guesses breakfast (before 10:30), lunch (until 14:30), snack (until 17:00) or dinner from the clock; one tap switches it.
- **Personal title (confirmed):** grown-ups set a family name; the main title reads “The <name> family menu” (default “Tonight’s crate”). A name containing menu/crate/kitchen/table/family is used as the whole title.
- **No familiarity question:** foods go straight into the menu; the app does not ask whether a food is new or liked.
- **Open:** reward details beyond "collect the finished object"; how the tablecloth shares challenges between several kids.
- **Language:** English and Dutch (toggle on setup and in Grown-ups). Default follows the browser language.
- **Open: product name.**

## Evidence on Hand

- `Papers on picky eating.pdf`, `benedikt_trinn_capita_selecta_final_report (002).pdf`, `ethical-review-261817.pdf` in project root: research and ethics background (not yet summarised into the app).
- No real food-education content, testimonials, or user data yet. Educational food facts in the prototype must be clearly placeholder or drawn from credible general knowledge; never invent studies or health claims.

## Product Principles

1. **The child is the operator.** Every primary flow must be doable by a 6–10-year-old alone: short words, big targets, obvious next step.
2. **The table is the game; the phone is the setup.** Keep app sessions short and point the child back to the physical tablecloth.
3. **Curiosity, not pressure.** Food content invites and explains; it never shames, scores eating, or moralises about "bad" food.
4. **Their toy, their story.** The child's own object and its journey along the track is the emotional core; progress and collection belong to it.
5. **Honest prototype.** Hardware steps (NFC, RFID) that a browser can't perform are simulated visibly, not faked as real.

## Accessibility & Inclusion

- Early readers: plain, short copy; pair words with images/icons; avoid relying on reading alone.
- Large touch targets for small hands; one-handed phone use.
- Food content must stay neutral about diets, cultures, and body; no weight or calorie talk aimed at children.
- WCAG 2.2 AA contrast and reduced-motion support as baseline.
