---
name: Tablecloth companion
description: Fruit-crate label and seed-packet print for a child's pre-dinner food ritual.
colors:
  ink: "#16285e"
  ink-2: "#2a3d78"
  ink-soft: "#3f4f80"
  red: "#e2401c"
  red-text: "#c4330f"
  gold: "#f2b01e"
  gold-hover: "#f6bf41"
  leaf: "#2f7d3a"
  sky: "#dfe9f5"
  sky-2: "#c9d9ec"
  stock: "#fffdf8"
typography:
  display:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "clamp(44px, 15vw, 72px)"
    fontWeight: 400
    lineHeight: 0.92
  headline:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "clamp(28px, 8.4vw, 36px)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "clamp(26px, 8vw, 34px)"
    fontWeight: 400
    lineHeight: 0.98
  title-sm:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.1
  numeral:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tnum"
  button:
    fontFamily: "'Alfa Slab One', 'Rockwell', serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.1
  body-lg:
    fontFamily: "'Atkinson Hyperlegible', system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "'Atkinson Hyperlegible', system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "'Atkinson Hyperlegible', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "20px"
  xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "60px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "60px"
  button-ink-hover:
    backgroundColor: "{colors.ink-2}"
  button-red:
    backgroundColor: "{colors.red-text}"
    textColor: "{colors.stock}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "60px"
  button-red-hover:
    backgroundColor: "{colors.red}"
  button-plain:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "60px"
  button-small:
    height: "48px"
  button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
  button-danger:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.red-text}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "60px"
  button-danger-armed:
    backgroundColor: "{colors.red}"
    textColor: "{colors.stock}"
  banner:
    backgroundColor: "{colors.red}"
    textColor: "{colors.stock}"
    typography: "{typography.headline}"
    padding: "11px 26px 13px"
  banner-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  banner-leaf:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.stock}"
  band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    padding: "14px 20px 22px"
  crate-label:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    height: "104px"
  add-slot:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "76px"
  food-chip:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  search-input:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "56px"
  nav-bar:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    height: "72px"
  nav-item-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    width: "52px"
    height: "32px"
  status-ok:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.stock}"
    padding: "14px 16px"
  status-wait:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    padding: "14px 16px"
  status-err:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.red-text}"
    padding: "14px 16px"
  note:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    padding: "12px 14px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    padding: "12px 16px"
---

# Design System: Tablecloth companion

## Overview

**Creative North Star: "The Market Crate Label"**

Every screen is a print job on a fruit crate or a seed packet. A pale sky ground carries ultramarine ink, three flat spot colours (vermilion, marigold, leaf) and an off-white label stock that appears only where something is printed. Each food tonight is its own crate label: a flat produce drawing on a solid colour panel, a huge slab-serif name, and a rubber-stamped familiarity mark. The child does not tap tiles; they add labels to a stack and stamp them.

Density is low and scale contrast does the hierarchy. One phone-width column, one notched banner per screen in the ink band, names set huge, everything a child reads set in a face built for early readers. Depth comes from printed rules (a heavy ink border with an inset stock gap and a second hairline of ink), never from blur. Corners are square everywhere. Motion is mechanical and print-like: things arrive by being pressed onto the paper.

The system rejects the rounded-pastel-card kids app: no soft shadows, no rounded cards, no mascot greeting, no tile grid of identical pastel squares.

**Key Characteristics:**
- Pale sky ground, ultramarine ink for the shell band and all line work.
- Three spot inks (vermilion, marigold, leaf), never more than three inks on one label.
- Label stock (#fffdf8) only inside printed objects.
- Alfa Slab One for names, banners, numbers and buttons; Atkinson Hyperlegible for anything read as a sentence.
- Double-ruled labels with square corners; notched ribbon banners.
- Ink-press arrival motion with one shared ease-out curve.

## Colors

A three-spot-ink print palette on pale sky, with ultramarine doing every job ink does on paper.

### Primary
- **Ultramarine Ink** (ink): the shell band behind every screen header, all borders and rules, all line work in produce drawings and icons, default text, the bottom nav's top rule, the shelf planks. If it is a line, it is ink.
- **Pressed Ink** (ink-2): hover state of ink-filled buttons only.
- **Faded Ink** (ink-soft): muted text, placeholders, the disabled button's dashed outline and label, empty shelf slots. Never used for line work on a live element.

### Secondary
- **Crate Vermilion** (red): the notched banner, the primary "send it" button, label panels, track squares, the armed destructive button, error borders. Stock text on vermilion is a large-text pairing only; the primary send button therefore uses Small Red (#c4330f) as its fill and #e2401c on hover.
- **Stamp Vermilion** (red-text): the deeper vermilion for any red text at small size: a step back in the trip log, error status text, the danger button's label.

### Tertiary
- **Marigold** (gold): the default action colour (Add a food, Next, primary buttons), the active nav item block, the "wait" status, gold banners, text selection, the viewfinder corner marks. Gold is never text on stock; on a gold label panel the food name prints in ink instead.
- **Leaf** (leaf): label panels, a step forward in the trip log, success status, finished-track celebration block, leaf banners.

### Neutral
- **Pale Sky** (sky): the page ground on every screen, the dock behind pinned actions, the sky track square.
- **Deep Sky** (sky-2): the desktop surround outside the phone column (520px and up) and the sticker stage backdrop.
- **Label Stock** (stock): label and learn-card paper, chips, inputs, notes, the bottom nav, text on ink and on vermilion/leaf fills.

### Named Rules
**The Three Inks Rule.** A label, chip, produce drawing or sticker is printed in ink plus at most two of vermilion, marigold and leaf, on stock. Panel colour and name colour come as a pair: vermilion panel names in vermilion, leaf in leaf, marigold and ink panels name in ink.

**The Stock Is Paper Rule.** Label stock (#fffdf8) appears only on printed objects and writable fields. The page ground is always pale sky; never lay stock as a full-bleed background.

**The Small Red Rule.** Red text below the 24px slab sizes uses Stamp Vermilion (red-text), not Crate Vermilion.

## Typography

**Display Font:** Alfa Slab One (with Rockwell, serif), self-hosted via Fontsource, weight 400 only.
**Body Font:** Atkinson Hyperlegible (with system-ui, sans-serif), weights 400 and 700.

**Character:** A wood-type slab shouted off a crate, paired with a typeface designed for low-vision and early readers. The slab names things; Atkinson explains them.

### Hierarchy
- **Display** (400, clamp(44px, 15vw, 72px), 0.92): the food name on the full-screen learn view. One per screen.
- **Headline** (400, clamp(28px, 8.4vw, 36px), 1): the notched banner title in the band; it is the screen's h1.
- **Title** (400, clamp(26px, 8vw, 34px), 0.98): food names on crate labels; 24px on the small welcome labels.
- **Title small** (400, 24px, 1.1): in-page section headings; 30px on the finish block, 22px for the current character name.
- **Numeral** (400, 44px, 1, tabular): the track position; counts use the same face at 24px (crate count) and 20px (learn "1 of 4"), always tabular.
- **Button** (400, 21px, 1.1): every filled button and the add slot; 17px on small buttons.
- **Body large** (400, 21px, 1.4, max 34ch): the one food fact on the learn view. The senses prompt beneath it is 700 at 22px.
- **Body** (400, 17px, 1.45): default reading text; 18px for leads, empty states and status lines.
- **Label** (700, 13px, 0.06em, uppercase): the food group on a label and chip (12px on chips). Group headings in the food picker use 14px at 0.08em.

### Named Rules
**The Slab Names, Atkinson Reads Rule.** Alfa Slab One sets names, banners, numbers, button verbs and stamps. Any sentence a child has to read (facts, instructions, notes, status) is Atkinson Hyperlegible. Never set a sentence in the slab.

**The Tabular Count Rule.** Every number that counts (crate count, position, steps, log rows) is tabular and right-aligned against its label.

## Layout

A single phone column, max 480px, centred. At 520px and wider the surround turns Deep Sky and the column gets 3px ink rules on both sides, like a printed strip on a table.

Every main screen stacks the same way: the ink band (status row of child + character chip and Grown-ups link, then the notched banner, then a sub line), a count row (label left, slab numeral right), the content, a sticky dock holding the thumb-height actions, and a fixed three-item bottom nav (72px plus safe area). The dock sits on sky with a faint 2px ink-at-18% top rule. Screens without nav (learn, capture, flows) drop the nav and pin the dock to the bottom.

Spacing rhythm: 16px gutter for printed objects (labels, cloth, trackboard, cards), 20px for text sections and the band, 10-12px between stacked labels and buttons, 28px between sections. Touch targets are at least 44px; primary actions are 60px tall, inputs 56px.

## Elevation & Depth

Flat print. There are no soft drop shadows on surfaces. Depth is printed: a 3px ink border, then an inset gap of stock, then an inset ink hairline, so a label reads as a die-cut label with a printed frame. Weight of rule is the only hierarchy of depth: 3px ink for objects, 2px ink for secondary chips, list rules and stamps, 1px ink-at-25% for log dividers. The shelf plank is a 10px ink bar.

### Shadow Vocabulary
- **Label frame** (`box-shadow: inset 0 0 0 4px var(--stock), inset 0 0 0 6px var(--ink)`): crate labels; the add slot uses the same with gold in place of stock.
- **Learn frame** (`box-shadow: inset 0 0 0 5px var(--stock), inset 0 0 0 8px var(--ink)`): the single label that fills the learn screen.
- **Empty slot frame** (`box-shadow: inset 0 0 0 4px var(--stock), inset 0 0 0 5px rgba(22, 40, 94, 0.3)`): an unprinted shelf slot.

### Named Rules
**The Printed Frame Rule.** Box-shadow is only ever inset and only ever draws a rule. If a shadow has blur or offset, it does not belong.

**The Dashed Means Not Yet Rule.** A dashed border marks something not live: the disabled button, informational notes, the danger-zone divider. Never dash a live, tappable control.

## Shapes

Square corners everywhere (0px); the only non-rectangular silhouette in the chrome is the notched ribbon banner, cut 14px deep at both ends. Stamps are 2px outlined boxes rotated a few degrees (new -4deg, tried 3deg, liked -2deg). Produce drawings are flat 64x64 SVGs with 2.5px round-capped ink line. Icons share one stroke family: 24px box, 2.5px stroke, currentColor. The photographed toy is printed into a three-ink dithered sticker with a stock rim and an ink rim, so photos join the same print world.

## Components

### Buttons
Heavy, flat, slab-lettered blocks that press down.
- **Shape:** square (0px), 3px ink border, full width, 60px tall.
- **Primary:** marigold with ink slab text (21px). Variants: ink (stock text), vermilion (stock text, the send-to-tablecloth action), plain stock.
- **Hover / Focus:** hover lightens the fill (gold-hover, ink-2, red over red-text, white); active translates down 2px over 120ms on the shared ease-out. Focus is a 3px ink outline offset 3px, gold on ink surfaces.
- **Disabled:** transparent with a dashed ink-soft border and ink-soft text; no press.
- **Small:** 48px, 17px text, auto width.
- **Text button:** Atkinson 700 with a 2px underline offset 4px.
- **Danger:** isolated below a dashed divider, stock fill with vermilion border and red-text Atkinson label; arms to solid vermilion on first tap.

### Crate Label (signature)
- **Structure:** three columns: an 88px art panel in the food's panel colour behind a 3px ink rule, the body (slab name, uppercase group), and a 44px remove target. Minimum 104px tall; stock paper with the Label frame.
- **Behaviour:** the whole label opens the learn view; the remove button sits above it.
- **Stamp motion:** a newly added label drops in with the ink-press (520ms: from -18px, scale 1.07, -2.5deg, 1.5px blur to a small overshoot and settle), the art wipes in left to right (700ms).
- **Add slot:** the marigold sibling of a label, 76px, same frame in gold, "Add another food" in slab.

### Learn Card
One label fills the screen: stock card with the Learn frame, art panel 34vh in the food's colour, display-size name, one fact in body large, a 2px ink rule, the senses prompt. A plain square back button and a gold "Next food" sit in the dock. Moving between foods slides in from 24px over 380ms.

### Chips
- **Food chip:** stock card with 3px ink border, 84px art row in the panel colour over a 3px rule, slab name (19px), uppercase group in ink-soft. Already-on-menu chips drop to 55% opacity.
- **Mini list item:** 2px ink border on stock, Atkinson 700 at 15px with a 22px drawing.

### Inputs / Fields
- **Style:** 3px ink border, stock fill, square, 56px tall, 18-20px text, placeholder in ink-soft. Caret and accent are vermilion.
- **Focus:** the global 3px ink outline offset 3px.
- **Trip log:** under the track board, each tablecloth reading as a row: time left, "Square N" right in bold with the change in brackets; forward in leaf, back in Stamp Vermilion.

### Navigation
- **Band:** ink header with the child + character chip (40px gold square with a stock rule holding the sticker) and an underlined "Grown-ups" link; notched banner below.
- **Bottom nav:** stock bar with a 3px ink top rule, three equal columns (Tonight, Track, Shelf), icon over 14px Atkinson 700 label. The current item gets a 52x32 marigold block with a 2px ink border behind its icon.

### Status, Notes, Toast
- **Status:** 3px ink border, 18px Atkinson 700 with an icon. Ok is leaf with stock text, wait is marigold, error is stock with a vermilion border and red-text.
- **Note:** 2px dashed ink border on stock, 15px; carries simulation and honesty notices. A small ink tag with gold uppercase text marks demo behaviour.
- **Toast:** ink with stock text and a 2px marigold border, floating above the nav.

### Track Board
Stock board with a six-column grid of square cells ruled in 1.5px ink, cycling vermilion, marigold, leaf and sky; start and goal cells in ink with gold lettering; passed cells hatched with ink-at-35% diagonal lines. The character sticker hops onto its square (600ms).

## Do's and Don'ts

### Do:
- **Do** print every object on Label Stock with a 3px ink border and square corners; frame labels with the inset stock-then-ink rule.
- **Do** pair each label panel with its name colour (vermilion/vermilion, leaf/leaf, marigold/ink, ink/ink).
- **Do** keep one notched banner per screen, in the ink band, as the h1.
- **Do** set names, banners, counts and button verbs in Alfa Slab One, and every sentence in Atkinson Hyperlegible.
- **Do** use Stamp Vermilion (#c4330f) for small red text.
- **Do** animate arrivals with the ink-press family on cubic-bezier(0.16, 1, 0.3, 1), and collapse all motion under prefers-reduced-motion.
- **Do** draw icons and produce as authored SVG in the 2.5px ink stroke family.

### Don't:
- **Don't** round corners on cards, labels, buttons or inputs.
- **Don't** use blurred or offset drop shadows on surfaces; depth is printed rules.
- **Don't** use more than three inks on one label or drawing.
- **Don't** set marigold as text on stock.
- **Don't** fill the page with Label Stock; the ground is Pale Sky.
- **Don't** dash the border of a control that works.
- **Don't** add a mascot greeting or a grid of identical pastel tiles.
