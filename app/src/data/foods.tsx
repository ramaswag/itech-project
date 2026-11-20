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
  name: string
  group: FoodGroup
  panel: Panel
  fact: string
  senses: string
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
    id: 'tomato', name: 'Tomato', group: 'Vegetable', panel: 'leaf',
    fact: 'A tomato is really a fruit, because it has seeds inside. Cut one open and count them!',
    senses: 'Is the inside squishy or firm?',
    art: (<g><path d="M32 18c12 0 20 7 20 18s-9 17-20 17-20-6-20-17 8-18 20-18z" fill={R} {...line} /><path d="M24 15l8 6 8-6M32 21v-8" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /><path d="M20 32c1-5 4-8 8-9" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'broccoli', name: 'Broccoli', group: 'Vegetable', panel: 'red',
    fact: 'A broccoli head is made of hundreds of tiny flower buds that have not opened yet.',
    senses: 'Does it look like a little tree? Which part is the crunchiest?',
    art: (<g><path d="M27 34h10l3 20H24z" fill={S} {...line} /><circle cx="22" cy="26" r="10" fill={L} {...line} /><circle cx="42" cy="26" r="10" fill={L} {...line} /><circle cx="32" cy="18" r="11" fill={L} {...line} /><circle cx="27" cy="20" r="1.8" fill={I} /><circle cx="38" cy="24" r="1.8" fill={I} /><circle cx="20" cy="27" r="1.8" fill={I} /></g>),
  },
  {
    id: 'carrot', name: 'Carrot', group: 'Vegetable', panel: 'leaf',
    fact: 'Carrots are roots that grow down into the soil. Long ago, most carrots were purple or yellow.',
    senses: 'Listen: how loud is the crunch?',
    art: (<g><path d="M18 22h28L34 56c-1 2-3 2-4 0z" fill={R} {...line} /><path d="M26 32h6M30 42h5" {...line} /><path d="M32 22c-6-6-8-12-6-16M32 22c0-7 2-12 6-15M32 22c5-4 10-6 14-5" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'peas', name: 'Peas', group: 'Vegetable', panel: 'gold',
    fact: 'Peas grow lined up inside a pod, like green beads. One pod can hold up to ten peas.',
    senses: 'Can you squash one flat with your tongue?',
    art: (<g><path d="M8 34c10-12 38-12 48 0-10 12-38 12-48 0z" fill={L} {...line} /><circle cx="20" cy="34" r="5" fill={S} {...line} /><circle cx="32" cy="34" r="5" fill={S} {...line} /><circle cx="44" cy="34" r="5" fill={S} {...line} /></g>),
  },
  {
    id: 'cucumber', name: 'Cucumber', group: 'Vegetable', panel: 'red',
    fact: 'A cucumber is almost all water. That is why it feels cool when you bite it.',
    senses: 'Is it cold, cool or warm in your mouth?',
    art: (<g><circle cx="32" cy="32" r="20" fill={L} {...line} /><circle cx="32" cy="32" r="15" fill={S} /><g fill={G}><ellipse cx="32" cy="24" rx="2" ry="3" /><ellipse cx="39" cy="35" rx="2" ry="3" transform="rotate(60 39 35)" /><ellipse cx="25" cy="35" rx="2" ry="3" transform="rotate(-60 25 35)" /></g><circle cx="32" cy="32" r="20" fill="none" {...line} /></g>),
  },
  {
    id: 'pepper', name: 'Sweet pepper', group: 'Vegetable', panel: 'leaf',
    fact: 'Green, yellow and red peppers can grow on the same plant. Red ones just stayed on longer.',
    senses: 'Is it sweet like fruit, or not?',
    art: (<g><path d="M18 24c4-6 24-6 28 0 4 8 2 22-6 28-4 3-12 3-16 0-8-6-10-20-6-28z" fill={R} {...line} /><path d="M32 20v-8h6" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /><path d="M32 26v24" {...line} /></g>),
  },
  {
    id: 'corn', name: 'Corn', group: 'Vegetable', panel: 'ink',
    fact: 'One corn cob has hundreds of kernels, and every kernel is a seed.',
    senses: 'Does it pop when you bite a kernel?',
    art: (<g><path d="M22 14c0-4 20-4 20 0v34c0 6-20 6-20 0z" fill={G} stroke={S} strokeWidth={2.5} /><path d="M27 16v32M32 15v34M37 16v32M22 24h20M22 32h20M22 40h20" stroke={I} strokeWidth={1.6} /><path d="M22 48c-6-2-10-8-10-16 6 2 10 8 12 18zM42 48c6-2 10-8 10-16-6 2-10 8-12 18z" fill={L} stroke={S} strokeWidth={2.5} strokeLinejoin="round" /></g>),
  },
  {
    id: 'potato', name: 'Potato', group: 'Vegetable', panel: 'leaf',
    fact: "Potatoes grow under the ground. The little 'eyes' on a potato can sprout into a new plant.",
    senses: 'Soft and fluffy, or crispy?',
    art: (<g><path d="M14 30c2-10 14-14 26-12s14 10 12 18-12 14-24 12-16-10-14-18z" fill={G} {...line} /><circle cx="24" cy="30" r="1.8" fill={I} /><circle cx="38" cy="26" r="1.8" fill={I} /><circle cx="34" cy="40" r="1.8" fill={I} /></g>),
  },
  {
    id: 'spinach', name: 'Spinach', group: 'Vegetable', panel: 'red',
    fact: 'Spinach shrinks a lot when it is cooked. A big pile of leaves becomes one small spoonful.',
    senses: 'Is it smooth or a bit squeaky on your teeth?',
    art: (<g><path d="M32 54C16 44 14 24 30 10c14 10 18 32 2 44z" fill={L} {...line} /><path d="M32 54V20M32 34l-7-6M32 42l7-7" {...line} /></g>),
  },
  {
    id: 'mushroom', name: 'Mushroom', group: 'Vegetable', panel: 'red',
    fact: 'Mushrooms are not plants. They are fungi, and they can grow in the dark.',
    senses: 'Is it chewy, slippery or soft?',
    art: (<g><path d="M10 32c0-12 10-20 22-20s22 8 22 20z" fill={S} {...line} /><path d="M25 32h14v16c0 4-14 4-14 0z" fill={G} {...line} /><circle cx="24" cy="23" r="3" fill={I} /><circle cx="40" cy="22" r="2.5" fill={I} /></g>),
  },
  {
    id: 'pumpkin', name: 'Pumpkin', group: 'Vegetable', panel: 'ink',
    fact: 'Pumpkins grow on long vines along the ground. Their seeds can be roasted and eaten too.',
    senses: 'Does it taste a little bit sweet?',
    art: (<g><ellipse cx="32" cy="36" rx="22" ry="16" fill={G} stroke={S} strokeWidth={2.5} /><path d="M32 20c-6 6-6 26 0 32M32 20c6 6 6 26 0 32M20 23c-5 7-5 20 0 27M44 23c5 7 5 20 0 27" fill="none" stroke={I} strokeWidth={2} /><path d="M32 20c0-6 2-9 6-10" fill="none" stroke={L} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'beans', name: 'Green beans', group: 'Vegetable', panel: 'red',
    fact: 'Green beans are pods with small beans hiding inside. Snap one in half and listen!',
    senses: 'Snap one. Did it make a sound?',
    art: (<g><path d="M14 48C20 30 34 16 50 12" fill="none" stroke={I} strokeWidth={9} strokeLinecap="round" /><path d="M14 48C20 30 34 16 50 12" fill="none" stroke={L} strokeWidth={5} strokeLinecap="round" /><path d="M22 54C30 38 42 28 54 26" fill="none" stroke={I} strokeWidth={9} strokeLinecap="round" /><path d="M22 54C30 38 42 28 54 26" fill="none" stroke={L} strokeWidth={5} strokeLinecap="round" /></g>),
  },
  {
    id: 'apple', name: 'Apple', group: 'Fruit', panel: 'leaf',
    fact: 'Cut an apple across the middle and the seeds make a star shape.',
    senses: 'Crunchy or soft? Sweet or sour?',
    art: (<g><path d="M32 22c-8-6-20-2-20 12 0 12 8 20 14 20 3 0 4-2 6-2s3 2 6 2c6 0 14-8 14-20 0-14-12-18-20-12z" fill={R} {...line} /><path d="M32 22c0-5 1-8 4-10" {...line} fill="none" /><path d="M36 14c4-4 9-4 12-2-3 4-8 5-12 2z" fill={G} {...line} /></g>),
  },
  {
    id: 'banana', name: 'Banana', group: 'Fruit', panel: 'ink',
    fact: 'Bananas grow in big bunches, and they curve up toward the sky.',
    senses: 'Is it soft enough to squish?',
    art: (<g><path d="M12 22c4 18 20 28 40 22 2-1 2-3 0-4-16 2-28-6-34-20-2-3-6-2-6 2z" fill={G} stroke={S} strokeWidth={2.5} strokeLinejoin="round" /><path d="M52 40l4-2" stroke={S} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'strawberry', name: 'Strawberry', group: 'Fruit', panel: 'gold',
    fact: 'A strawberry wears its seeds on the outside, about two hundred of them.',
    senses: 'Can you feel the tiny seeds?',
    art: (<g><path d="M14 22c6-4 30-4 36 0 2 14-8 30-18 32-10-2-20-18-18-32z" fill={R} {...line} /><path d="M18 20l6-6 4 4 4-6 4 6 4-4 6 6" fill={L} {...line} /><g fill={G}><circle cx="24" cy="30" r="1.6" /><circle cx="32" cy="28" r="1.6" /><circle cx="40" cy="30" r="1.6" /><circle cx="28" cy="38" r="1.6" /><circle cx="36" cy="38" r="1.6" /><circle cx="32" cy="46" r="1.6" /></g></g>),
  },
  {
    id: 'pasta', name: 'Pasta', group: 'Grain', panel: 'red',
    fact: 'Pasta is made from wheat flour and water. There are hundreds of different pasta shapes.',
    senses: 'Which shape is tonight’s pasta?',
    art: (<g><path d="M10 34h44c0 12-10 20-22 20S10 46 10 34z" fill={S} {...line} /><path d="M16 34c2-8 6-12 10-6s6 2 8-4 6-4 8 2 6 4 8 8" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" /></g>),
  },
  {
    id: 'rice', name: 'Rice', group: 'Grain', panel: 'gold',
    fact: 'Rice grows in fields that are often flooded with water. People all over the world eat it every day.',
    senses: 'Is it sticky or does every grain fall apart?',
    art: (<g><path d="M8 30h48c0 14-11 22-24 22S8 44 8 30z" fill={I} {...line} /><path d="M14 30c2-10 34-10 36 0" fill={S} {...line} /><g fill={I}><ellipse cx="26" cy="25" rx="2.5" ry="1.2" /><ellipse cx="34" cy="23" rx="2.5" ry="1.2" /><ellipse cx="40" cy="27" rx="2.5" ry="1.2" /></g></g>),
  },
  {
    id: 'bread', name: 'Bread', group: 'Grain', panel: 'leaf',
    fact: 'Bread rises because of yeast: tiny living things that make bubbles in the dough. Look for the holes!',
    senses: 'Find the bubble holes. How many?',
    art: (<g><path d="M14 30c-6-2-6-14 4-16h28c10 2 10 14 4 16v20H14z" fill={G} {...line} /><path d="M20 30v18h24V30c4-2 4-8-2-10H22c-6 2-6 8-2 10z" fill={S} /><circle cx="27" cy="34" r="2" fill={G} /><circle cx="36" cy="40" r="2.5" fill={G} /><circle cx="30" cy="44" r="1.5" fill={G} /></g>),
  },
  {
    id: 'fish', name: 'Fish', group: 'Protein', panel: 'leaf',
    fact: 'Cooked fish is flaky: it comes apart in thin layers when you press it with a fork.',
    senses: 'Press it with your fork. Does it flake?',
    art: (<g><path d="M8 32c8-12 30-14 40 0-10 14-32 12-40 0z" fill={I} stroke={I} strokeWidth={2.5} strokeLinejoin="round" /><path d="M48 32l10-9v18z" fill={I} {...line} /><circle cx="18" cy="30" r="2.5" fill={S} /><path d="M28 24c3 5 3 11 0 16M36 24c3 5 3 11 0 16" fill="none" stroke={S} strokeWidth={2} /></g>),
  },
  {
    id: 'chicken', name: 'Chicken', group: 'Protein', panel: 'red',
    fact: 'Chicken legs have darker meat than the rest, because chickens use their legs for walking all day.',
    senses: 'Is your piece light or dark?',
    art: (<g><path d="M30 14c12-2 22 8 18 20-3 8-12 10-18 8L20 52c-3 3-8 0-6-4l8-12c-4-8 0-20 8-22z" fill={G} {...line} /><path d="M20 52l-4 2M14 48l-2 4" {...line} /><path d="M34 22c4 0 8 4 7 8" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round" /></g>),
  },
  {
    id: 'egg', name: 'Egg', group: 'Protein', panel: 'leaf',
    fact: 'The colour of an egg yolk depends on what the hen eats.',
    senses: 'Is the yolk runny or firm?',
    art: (<g><path d="M12 34c-4-12 10-22 20-18 8-6 24 0 22 14 4 10-8 20-20 18-10 4-24-2-22-14z" fill={S} {...line} /><circle cx="32" cy="33" r="9" fill={G} {...line} /></g>),
  },
  {
    id: 'cheese', name: 'Cheese', group: 'Dairy', panel: 'gold',
    fact: 'Cheese is made from milk. The holes in some cheeses come from little gas bubbles.',
    senses: 'Is it stretchy, crumbly or smooth?',
    art: (<g><path d="M10 40L46 18l8 10v20H10z" fill={G} {...line} /><path d="M10 40h44" {...line} /><circle cx="24" cy="46" r="3" fill={R} /><circle cx="40" cy="44" r="2.5" fill={R} /><circle cx="44" cy="32" r="2.5" fill={R} /></g>),
  },
  {
    id: 'lentils', name: 'Lentils', group: 'Protein', panel: 'leaf',
    fact: 'Lentils and beans are seeds. Put a dry one on wet cotton and it can sprout a tiny plant.',
    senses: 'Are they soft or a little bit firm?',
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
