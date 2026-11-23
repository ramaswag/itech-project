import type { ReactNode } from 'react'

export const INK = {
  ink: '#16285e',
  red: '#e2401c',
  gold: '#f2b01e',
  leaf: '#2f7d3a',
  sky: '#dfe9f5',
  stock: '#fffdf8',
} as const

export type Panel = 'red' | 'gold' | 'leaf' | 'ink'

export type FoodGroup = 'Vegetable' | 'Fruit' | 'Grain' | 'Protein' | 'Dairy' | 'Other'

export interface Food {
  id: string
  group: FoodGroup
  panel: Panel
  art: ReactNode
}

const I = INK.ink
const R = INK.red
const G = INK.gold
const L = INK.leaf
const S = INK.stock
const line = { stroke: I, strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/* Flat three-ink produce drawings, 64 x 64. Each sits on its label's panel colour. */
export const FOODS: Food[] = [
  {
    id: 'tomato', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M32 18c12 0 20 7 20 18s-9 17-20 17-20-6-20-17 8-18 20-18z" fill={R} {...line} /><path d="M24 15l8 6 8-6M32 21v-8" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /><path d="M20 32c1-5 4-8 8-9" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'broccoli', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M27 34h10l3 20H24z" fill={S} {...line} /><circle cx="22" cy="26" r="10" fill={L} {...line} /><circle cx="42" cy="26" r="10" fill={L} {...line} /><circle cx="32" cy="18" r="11" fill={L} {...line} /><circle cx="27" cy="20" r="1.8" fill={I} /><circle cx="38" cy="24" r="1.8" fill={I} /><circle cx="20" cy="27" r="1.8" fill={I} /></g>),
  },
  {
    id: 'carrot', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M18 22h28L34 56c-1 2-3 2-4 0z" fill={R} {...line} /><path d="M26 32h6M30 42h5" {...line} /><path d="M32 22c-6-6-8-12-6-16M32 22c0-7 2-12 6-15M32 22c5-4 10-6 14-5" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'peas', group: 'Vegetable', panel: 'gold',
    art: (<g><path d="M8 34c10-12 38-12 48 0-10 12-38 12-48 0z" fill={L} {...line} /><circle cx="20" cy="34" r="5" fill={S} {...line} /><circle cx="32" cy="34" r="5" fill={S} {...line} /><circle cx="44" cy="34" r="5" fill={S} {...line} /></g>),
  },
  {
    id: 'cucumber', group: 'Vegetable', panel: 'red',
    art: (<g><circle cx="32" cy="32" r="20" fill={L} {...line} /><circle cx="32" cy="32" r="15" fill={S} /><g fill={G}><ellipse cx="32" cy="24" rx="2" ry="3" /><ellipse cx="39" cy="35" rx="2" ry="3" transform="rotate(60 39 35)" /><ellipse cx="25" cy="35" rx="2" ry="3" transform="rotate(-60 25 35)" /></g><circle cx="32" cy="32" r="20" fill="none" {...line} /></g>),
  },
  {
    id: 'pepper', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M18 24c4-6 24-6 28 0 4 8 2 22-6 28-4 3-12 3-16 0-8-6-10-20-6-28z" fill={R} {...line} /><path d="M32 20v-8h6" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /><path d="M32 26v24" {...line} /></g>),
  },
  {
    id: 'corn', group: 'Vegetable', panel: 'ink',
    art: (<g><path d="M22 14c0-4 20-4 20 0v34c0 6-20 6-20 0z" fill={G} stroke={S} strokeWidth={2.5} /><path d="M27 16v32M32 15v34M37 16v32M22 24h20M22 32h20M22 40h20" stroke={I} strokeWidth={1.6} /><path d="M22 48c-6-2-10-8-10-16 6 2 10 8 12 18zM42 48c6-2 10-8 10-16-6 2-10 8-12 18z" fill={L} stroke={S} strokeWidth={2.5} strokeLinejoin="round" /></g>),
  },
  {
    id: 'potato', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M14 30c2-10 14-14 26-12s14 10 12 18-12 14-24 12-16-10-14-18z" fill={G} {...line} /><circle cx="24" cy="30" r="1.8" fill={I} /><circle cx="38" cy="26" r="1.8" fill={I} /><circle cx="34" cy="40" r="1.8" fill={I} /></g>),
  },
  {
    id: 'spinach', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M32 54C16 44 14 24 30 10c14 10 18 32 2 44z" fill={L} {...line} /><path d="M32 54V20M32 34l-7-6M32 42l7-7" {...line} /></g>),
  },
  {
    id: 'mushroom', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M10 32c0-12 10-20 22-20s22 8 22 20z" fill={S} {...line} /><path d="M25 32h14v16c0 4-14 4-14 0z" fill={G} {...line} /><circle cx="24" cy="23" r="3" fill={I} /><circle cx="40" cy="22" r="2.5" fill={I} /></g>),
  },
  {
    id: 'pumpkin', group: 'Vegetable', panel: 'ink',
    art: (<g><ellipse cx="32" cy="36" rx="22" ry="16" fill={G} stroke={S} strokeWidth={2.5} /><path d="M32 20c-6 6-6 26 0 32M32 20c6 6 6 26 0 32M20 23c-5 7-5 20 0 27M44 23c5 7 5 20 0 27" fill="none" stroke={I} strokeWidth={2} /><path d="M32 20c0-6 2-9 6-10" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'beans', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M14 48C20 30 34 16 50 12" fill="none" stroke={I} strokeWidth={9} strokeLinecap="round" /><path d="M14 48C20 30 34 16 50 12" fill="none" stroke={L} strokeWidth={5} strokeLinecap="round" /><path d="M22 54C30 38 42 28 54 26" fill="none" stroke={I} strokeWidth={9} strokeLinecap="round" /><path d="M22 54C30 38 42 28 54 26" fill="none" stroke={L} strokeWidth={5} strokeLinecap="round" /></g>),
  },
  {
    id: 'cauliflower', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M20 38c-8-2-10-14-2-18 2-8 14-10 18-4 8-4 16 2 14 10 6 4 4 14-4 14z" fill={S} {...line} /><path d="M18 36c-2 10 6 18 14 18s16-8 14-18" fill={L} {...line} /><path d="M24 26c3-2 5 0 6 2M36 24c3-1 6 1 6 4M28 34c2-1 4 0 5 2" fill="none" stroke={I} strokeWidth={2} strokeLinecap="round" /></g>),
  },
  {
    id: 'onion', group: 'Vegetable', panel: 'ink',
    art: (<g><path d="M32 12c2 6 4 8 4 10 10 4 16 12 14 22-2 8-10 12-18 12s-16-4-18-12c-2-10 4-18 14-22 0-2 2-4 4-10z" fill={R} stroke={S} strokeWidth={2.5} strokeLinejoin="round" /><path d="M32 22c-8 6-10 22 0 32M32 22c8 6 10 22 0 32M32 22v32" fill="none" stroke={S} strokeWidth={2} /></g>),
  },
  {
    id: 'lettuce', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M10 34c0-10 8-18 22-18s22 8 22 18c0 10-8 20-22 20S10 44 10 34z" fill={L} {...line} /><path d="M32 52V26M32 40l-9-8M32 40l9-8M32 46l-10-4M32 46l10-4" fill="none" stroke={S} strokeWidth={2.5} strokeLinecap="round" /></g>),
  },
  {
    id: 'zucchini', group: 'Vegetable', panel: 'gold',
    art: (<g><path d="M16 50L44 14c4-4 10 0 8 6L28 54c-4 4-14 2-12-4z" fill={L} {...line} /><path d="M26 40l6 4M32 32l6 4M38 24l5 4" fill="none" stroke={G} strokeWidth={3} strokeLinecap="round" /><path d="M47 14c1-4 3-5 6-6" fill="none" stroke={I} strokeWidth={3.5} strokeLinecap="round" /></g>),
  },
  {
    id: 'eggplant', group: 'Vegetable', panel: 'gold',
    art: (<g><path d="M24 20c-10 6-14 22-8 32 4 6 12 4 20-2 10-8 14-22 8-28-6-4-14-8-20-2z" fill={I} {...line} /><path d="M24 20c-2-4 0-8 4-10l4 4 4-2c4 2 6 6 4 10-4 2-12 2-16-2z" fill={L} {...line} /><path d="M22 36c2-6 6-10 10-12" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'cabbage', group: 'Vegetable', panel: 'ink',
    art: (<g><circle cx="32" cy="34" r="22" fill={L} stroke={S} strokeWidth={2.5} /><path d="M32 12c-12 8-12 36 0 44M32 12c12 8 12 36 0 44M12 34c10-6 30-6 40 0" fill="none" stroke={S} strokeWidth={2.5} strokeLinecap="round" /></g>),
  },
  {
    id: 'leek', group: 'Vegetable', panel: 'red',
    art: (<g><path d="M26 30h12l2 24H24z" fill={S} {...line} /><path d="M26 30c-8-4-12-12-12-20 8 2 14 8 14 16zM38 30c8-4 12-12 12-20-8 2-14 8-14 16zM32 30c-4-6-4-14 0-20 4 6 4 14 0 20z" fill={L} {...line} /><path d="M25 42h14M25 48h14" stroke={I} strokeWidth={1.8} /></g>),
  },
  {
    id: 'radish', group: 'Vegetable', panel: 'gold',
    art: (<g><path d="M32 16c14 0 20 12 14 24-4 8-10 14-14 14s-10-6-14-14c-6-12 0-24 14-24z" fill={R} {...line} /><path d="M32 54l-1 6" fill="none" stroke={I} strokeWidth={2.5} strokeLinecap="round" /><path d="M32 16c-6-4-10-8-10-12M32 16c0-6 2-10 6-12M32 16c6-4 12-6 14-4" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /><path d="M24 30c1-4 3-6 6-7" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'beetroot', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M32 22c14 0 20 10 16 22-3 8-10 12-16 12s-13-4-16-12c-4-12 2-22 16-22z" fill={R} {...line} /><path d="M32 56l2 6" fill="none" stroke={I} strokeWidth={2.5} strokeLinecap="round" /><path d="M32 22c-6-4-10-10-8-16M32 22c0-6 0-12 4-16M32 22c6-4 12-8 14-12" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /><path d="M22 36c2-6 6-8 10-8" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'sweetpotato', group: 'Vegetable', panel: 'leaf',
    art: (<g><path d="M8 38c0-12 14-20 30-20 10 0 18 4 18 10s-8 14-20 18c-14 4-28 2-28-8z" fill={G} {...line} /><path d="M16 36c4-6 10-8 14-8M30 44c6-2 12-6 16-12" fill="none" stroke={R} strokeWidth={3} strokeLinecap="round" /><circle cx="42" cy="26" r="1.8" fill={I} /><circle cx="22" cy="42" r="1.8" fill={I} /></g>),
  },
  {
    id: 'apple', group: 'Fruit', panel: 'leaf',
    art: (<g><path d="M32 22c-8-6-20-2-20 12 0 12 8 20 14 20 3 0 4-2 6-2s3 2 6 2c6 0 14-8 14-20 0-14-12-18-20-12z" fill={R} {...line} /><path d="M32 22c0-5 1-8 4-10" {...line} fill="none" /><path d="M36 14c4-4 9-4 12-2-3 4-8 5-12 2z" fill={G} {...line} /></g>),
  },
  {
    id: 'banana', group: 'Fruit', panel: 'ink',
    art: (<g><path d="M12 22c4 18 20 28 40 22 2-1 2-3 0-4-16 2-28-6-34-20-2-3-6-2-6 2z" fill={G} stroke={S} strokeWidth={2.5} strokeLinejoin="round" /><path d="M52 40l4-2" stroke={S} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'strawberry', group: 'Fruit', panel: 'gold',
    art: (<g><path d="M14 22c6-4 30-4 36 0 2 14-8 30-18 32-10-2-20-18-18-32z" fill={R} {...line} /><path d="M18 20l6-6 4 4 4-6 4 6 4-4 6 6" fill={L} {...line} /><g fill={G}><circle cx="24" cy="30" r="1.6" /><circle cx="32" cy="28" r="1.6" /><circle cx="40" cy="30" r="1.6" /><circle cx="28" cy="38" r="1.6" /><circle cx="36" cy="38" r="1.6" /><circle cx="32" cy="46" r="1.6" /></g></g>),
  },
  {
    id: 'pasta', group: 'Grain', panel: 'red',
    art: (<g><path d="M10 34h44c0 12-10 20-22 20S10 46 10 34z" fill={S} {...line} /><path d="M16 34c2-8 6-12 10-6s6 2 8-4 6-4 8 2 6 4 8 8" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'rice', group: 'Grain', panel: 'gold',
    art: (<g><path d="M8 30h48c0 14-11 22-24 22S8 44 8 30z" fill={I} {...line} /><path d="M14 30c2-10 34-10 36 0" fill={S} {...line} /><g fill={I}><ellipse cx="26" cy="25" rx="2.5" ry="1.2" /><ellipse cx="34" cy="23" rx="2.5" ry="1.2" /><ellipse cx="40" cy="27" rx="2.5" ry="1.2" /></g></g>),
  },
  {
    id: 'bread', group: 'Grain', panel: 'leaf',
    art: (<g><path d="M14 30c-6-2-6-14 4-16h28c10 2 10 14 4 16v20H14z" fill={G} {...line} /><path d="M20 30v18h24V30c4-2 4-8-2-10H22c-6 2-6 8-2 10z" fill={S} /><circle cx="27" cy="34" r="2" fill={G} /><circle cx="36" cy="40" r="2.5" fill={G} /><circle cx="30" cy="44" r="1.5" fill={G} /></g>),
  },
  {
    id: 'fish', group: 'Protein', panel: 'leaf',
    art: (<g><path d="M8 32c8-12 30-14 40 0-10 14-32 12-40 0z" fill={I} stroke={I} strokeWidth={2.5} strokeLinejoin="round" /><path d="M48 32l10-9v18z" fill={I} {...line} /><circle cx="18" cy="30" r="2.5" fill={S} /><path d="M28 24c3 5 3 11 0 16M36 24c3 5 3 11 0 16" fill="none" stroke={S} strokeWidth={2} /></g>),
  },
  {
    id: 'chicken', group: 'Protein', panel: 'red',
    art: (<g><path d="M30 14c12-2 22 8 18 20-3 8-12 10-18 8L20 52c-3 3-8 0-6-4l8-12c-4-8 0-20 8-22z" fill={G} {...line} /><path d="M20 52l-4 2M14 48l-2 4" {...line} /><path d="M34 22c4 0 8 4 7 8" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'egg', group: 'Protein', panel: 'leaf',
    art: (<g><path d="M12 34c-4-12 10-22 20-18 8-6 24 0 22 14 4 10-8 20-20 18-10 4-24-2-22-14z" fill={S} {...line} /><circle cx="32" cy="33" r="9" fill={G} {...line} /></g>),
  },
  {
    id: 'cheese', group: 'Dairy', panel: 'gold',
    art: (<g><path d="M10 40L46 18l8 10v20H10z" fill={G} {...line} /><path d="M10 40h44" {...line} /><circle cx="24" cy="46" r="3" fill={R} /><circle cx="40" cy="44" r="2.5" fill={R} /><circle cx="44" cy="32" r="2.5" fill={R} /></g>),
  },
  {
    id: 'lentils', group: 'Protein', panel: 'leaf',
    art: (<g><path d="M8 30h48c0 14-11 22-24 22S8 44 8 30z" fill={S} {...line} /><g fill={R} stroke={I} strokeWidth={1.5}><ellipse cx="20" cy="28" rx="4" ry="3" /><ellipse cx="29" cy="25" rx="4" ry="3" /><ellipse cx="38" cy="27" rx="4" ry="3" /><ellipse cx="45" cy="29" rx="3.5" ry="2.5" /><ellipse cx="25" cy="30" rx="3.5" ry="2.5" /><ellipse cx="34" cy="30" rx="3.5" ry="2.5" /></g></g>),
  },
]

export const CUSTOM_ART = (
  <g><path d="M8 34h48c0 12-10 18-24 18S8 46 8 34z" fill={S} {...line} /><path d="M20 34c0-8 6-14 12-14s12 6 12 14" fill="none" {...line} strokeDasharray="4 5" /><path d="M32 12v4" {...line} /></g>
)

export const PANEL_HEX: Record<Panel, string> = { red: R, gold: G, leaf: L, ink: I }
/** Name colour on stock: gold is too light for text, so gold panels name in ink. */
export const NAME_HEX: Record<Panel, string> = { red: R, gold: I, leaf: L, ink: I }

export function findFood(id: string | undefined) {
  return FOODS.find((f) => f.id === id)
}
