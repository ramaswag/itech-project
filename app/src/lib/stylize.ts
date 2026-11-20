/**
 * Turns a photo of a toy into a printed "crate label" sticker, entirely in the browser:
 * 1. square crop, 2. background removal by flood fill from the edges,
 * 3. three-ink posterize with an ordered dither (ink / accent / stock),
 * 4. die-cut outline: stock rim then ink rim.
 * Works best on a plain background; when the subject can't be separated the whole
 * square is printed instead, and `cutout` is false so the UI can say so.
 */

const SIZE = 240
const PAD = 14
const INK: RGB = [22, 40, 94]
const STOCK: RGB = [255, 253, 248]
type RGB = [number, number, number]

export const ACCENTS = {
  red: [226, 64, 28] as RGB,
  gold: [242, 176, 30] as RGB,
  leaf: [47, 125, 58] as RGB,
}
export type Accent = keyof typeof ACCENTS

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

export interface StickerResult {
  dataUrl: string
  cutout: boolean
}

export function makeSticker(src: CanvasImageSource, srcW: number, srcH: number, accent: Accent): StickerResult {
  const side = Math.min(srcW, srcH)
  const c = document.createElement('canvas')
  c.width = c.height = SIZE
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(src, (srcW - side) / 2, (srcH - side) / 2, side, side, 0, 0, SIZE, SIZE)
  const img = ctx.getImageData(0, 0, SIZE, SIZE)
  const px = img.data
  const N = SIZE * SIZE

  // --- background mask by flood fill from the border
  let br = 0, bg = 0, bb = 0, bn = 0
  for (let i = 0; i < SIZE; i++) {
    for (const p of [i, (SIZE - 1) * SIZE + i, i * SIZE, i * SIZE + SIZE - 1]) {
      br += px[p * 4]; bg += px[p * 4 + 1]; bb += px[p * 4 + 2]; bn++
    }
  }
  br /= bn; bg /= bn; bb /= bn
  let spread = 0
  for (let i = 0; i < SIZE; i++) {
    const p = i
    spread += Math.hypot(px[p * 4] - br, px[p * 4 + 1] - bg, px[p * 4 + 2] - bb)
  }
  spread /= SIZE
  const tol = Math.min(70, Math.max(28, spread * 2.2))

  const bgMask = new Uint8Array(N)
  const stack: number[] = []
  const near = (p: number, ref: number) =>
    Math.hypot(px[p * 4] - px[ref * 4], px[p * 4 + 1] - px[ref * 4 + 1], px[p * 4 + 2] - px[ref * 4 + 2]) < tol * 0.55 &&
    Math.hypot(px[p * 4] - br, px[p * 4 + 1] - bg, px[p * 4 + 2] - bb) < tol * 1.6
  for (let i = 0; i < SIZE; i++) {
    for (const p of [i, (SIZE - 1) * SIZE + i, i * SIZE, i * SIZE + SIZE - 1]) {
      if (!bgMask[p] && Math.hypot(px[p * 4] - br, px[p * 4 + 1] - bg, px[p * 4 + 2] - bb) < tol) {
        bgMask[p] = 1
        stack.push(p)
      }
    }
  }
  while (stack.length) {
    const p = stack.pop()!
    const x = p % SIZE, y = (p / SIZE) | 0
    const nb = [x > 0 ? p - 1 : -1, x < SIZE - 1 ? p + 1 : -1, y > 0 ? p - SIZE : -1, y < SIZE - 1 ? p + SIZE : -1]
    for (const q of nb) {
      if (q >= 0 && !bgMask[q] && near(q, p)) {
        bgMask[q] = 1
        stack.push(q)
      }
    }
  }
  let fg: Uint8Array = new Uint8Array(N)
  let fgCount = 0
  for (let i = 0; i < N; i++) if (!bgMask[i]) { fg[i] = 1; fgCount++ }

  const ratio = fgCount / N
  const cutout = ratio > 0.06 && ratio < 0.9
  if (!cutout) fg.fill(1)
  else fg = close(fg)

  // --- tone thresholds from the subject's own luminance
  const lum = new Float32Array(N)
  const vals: number[] = []
  for (let i = 0; i < N; i++) {
    lum[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]
    if (fg[i]) vals.push(lum[i])
  }
  vals.sort((a, b) => a - b)
  let lo = vals[Math.floor(vals.length * 0.3)] ?? 85
  let hi = vals[Math.floor(vals.length * 0.72)] ?? 170
  if (hi - lo < 50) {
    // flat-coloured toys: centre the accent band on the median instead
    const med = vals[Math.floor(vals.length * 0.5)] ?? 128
    lo = Math.max(20, med - 45)
    hi = Math.min(235, med + 45)
  }

  const acc = ACCENTS[accent]
  const out = ctx.createImageData(SIZE, SIZE)
  const o = out.data
  for (let i = 0; i < N; i++) {
    if (!fg[i]) continue
    const x = i % SIZE, y = (i / SIZE) | 0
    const t = BAYER[(y % 4) * 4 + (x % 4)]
    const l = lum[i]
    let col: RGB
    if (l < lo) col = (lo - l) / Math.max(1, lo) < t * 0.6 ? acc : INK
    else if (l < hi) col = (l - lo) / Math.max(1, hi - lo) > 0.55 + t * 0.45 ? STOCK : acc
    else col = STOCK
    o[i * 4] = col[0]; o[i * 4 + 1] = col[1]; o[i * 4 + 2] = col[2]; o[i * 4 + 3] = 255
  }

  // --- die-cut rims
  const FULL = SIZE + PAD * 2
  const f = document.createElement('canvas')
  f.width = f.height = FULL
  const fctx = f.getContext('2d')!
  const big = new Uint8Array(FULL * FULL)
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) big[(y + PAD) * FULL + x + PAD] = fg[y * SIZE + x]
  const stockRim = dilate(big, FULL, 6)
  const inkRim = dilate(stockRim, FULL, 4)
  const rim = fctx.createImageData(FULL, FULL)
  for (let i = 0; i < FULL * FULL; i++) {
    const col = stockRim[i] ? STOCK : inkRim[i] ? INK : null
    if (!col) continue
    rim.data[i * 4] = col[0]; rim.data[i * 4 + 1] = col[1]; rim.data[i * 4 + 2] = col[2]; rim.data[i * 4 + 3] = 255
  }
  fctx.putImageData(rim, 0, 0)
  const tmp = document.createElement('canvas')
  tmp.width = tmp.height = SIZE
  tmp.getContext('2d')!.putImageData(out, 0, 0)
  fctx.drawImage(tmp, PAD, PAD)

  return { dataUrl: f.toDataURL('image/png'), cutout }
}

function dilate(m: Uint8Array, w: number, r: number): Uint8Array {
  let cur: Uint8Array = m
  for (let k = 0; k < r; k++) {
    const nx = new Uint8Array(cur.length)
    for (let i = 0; i < cur.length; i++) {
      if (cur[i]) { nx[i] = 1; continue }
      const x = i % w
      if ((x > 0 && cur[i - 1]) || (x < w - 1 && cur[i + 1]) || cur[i - w] || cur[i + w]) nx[i] = 1
    }
    cur = nx
  }
  return cur
}

function erode(m: Uint8Array, w: number, r: number) {
  const inv = m.map((v) => (v ? 0 : 1))
  return dilate(inv, w, r).map((v) => (v ? 0 : 1))
}

/** Morphological close + open: fills pin holes and drops speckle. */
function close(m: Uint8Array) {
  return dilate(erode(erode(dilate(m, SIZE, 2), SIZE, 2), SIZE, 1), SIZE, 1)
}
