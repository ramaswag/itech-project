/* One stroke family: 24px box, 2.5 stroke, square-ish joins to match the printed rules. */
const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
}

export const IconCrate = () => (<svg {...base}><path d="M3 9h18v11H3zM3 9l2-5h14l2 5M3 14.5h18M8 9v11M16 9v11" /></svg>)
export const IconShelf = () => (<svg {...base}><path d="M3 20h18M3 12h18M6 12V7h4v5M14 12V5l4 1-1 6M6 20v-4h3v4M13 20v-5h5v5" /></svg>)
export const IconMinus = () => (<svg {...base}><path d="M5 12h14" /></svg>)
export const IconPlus = () => (<svg {...base}><path d="M12 5v14M5 12h14" /></svg>)
export const IconBack = () => (<svg {...base}><path d="M15 5l-7 7 7 7" /></svg>)
export const IconNext = () => (<svg {...base}><path d="M9 5l7 7-7 7" /></svg>)
export const IconX = () => (<svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const IconCamera = () => (<svg {...base}><path d="M3 8h4l2-3h6l2 3h4v11H3z" /><circle cx="12" cy="13" r="3.5" /></svg>)
export const IconCheck = () => (<svg {...base}><path d="M5 12.5l4.5 4.5L19 7" /></svg>)
export const IconTap = () => (<svg {...base}><rect x="7" y="3" width="10" height="18" rx="1" /><path d="M3 9c-1.3 1.8-1.3 4.2 0 6M21 9c1.3 1.8 1.3 4.2 0 6" /></svg>)
export const IconDown = () => (<svg {...base} width={18} height={18}><path d="M6 9l6 6 6-6" /></svg>)
export const IconRedo = () => (<svg {...base}><path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" /></svg>)
export const IconUpload = () => (<svg {...base}><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg>)
