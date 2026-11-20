---
version: 1
slug: "app"
primary_target: "app"
related_targets: []
---

# Surface: companion app (mobile web)

Mode: Operate. Phone-first app UI for children 6-10, used mostly alone before dinner; parent area secondary.

Jobs: build tonight's menu (with one short food fact per food), send it to the tablecloth (Web NFC on Android Chrome, labelled simulation elsewhere), photograph a toy to make its character sticker, see the active character's position on the track (read from the tablecloth, simulated sync), collect finished characters and pick the next one, parent setup (kids, reset).

Constraints: user said avoid babyish and avoid generic template kids-app. Movement rule stays open: position only ever comes from the tablecloth.

## Direction contract

THESIS: Every food tonight gets its own printed crate label and the child stamps it. Refuses the rounded-pastel-card kids app with a mascot greeting and tile grid.

OWN-WORLD: Fruit-crate label and seed-packet print. Pale sky ground #dfe9f5, ultramarine ink #16285e as shell band and all line work, vermilion #e2401c, marigold #f2b01e, leaf #2f7d3a; label stock #fffdf8 only inside labels. Alfa Slab One for names and banners, Atkinson Hyperlegible for everything a child reads. Labels: 3px ink border with inset stock rule, square corners, flat three-ink produce drawings in authored SVG. Banners are notched ribbons. No soft shadows, no rounded cards.

STORY: Child sees tonight's crate, adds foods as labels, opens each label full-screen to learn one fact, taps the cloth. Later checks where their toy is on the track and the shelf of finished toys.

FIRST VIEWPORT: Ultramarine band with child + character chip and a vermilion notched banner "Tonight's crate" and the date; count row right-aligned; stacked food labels (art panel left, slab name huge); marigold Add a food bar at thumb height; tablecloth tap button pinned under it, disabled-dashed until one food exists. Bottom nav: Tonight, Track, Shelf.

FORM: Market crate label, position 6 of my ordered list. seed:118b558c3462f5a5. Signature move: the label stamp, adding a food prints its label onto the stack with an ink-press motion; the learn view is one label filling the screen. Raises: scale contrast alone (specimen), one item owns the screen while learning (feed), isolated destructive parent actions (console), tight right-aligned counts (j-card), strict three inks per label (rail).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
