import { CUSTOM_ART, findFood, NAME_HEX, PANEL_HEX, type Panel } from '../data/foods'
import type { MenuItem } from '../store'
import { IconX } from './Icons'

export function itemView(item: MenuItem) {
  const food = findFood(item.foodId)
  const panel: Panel = food?.panel ?? 'ink'
  return {
    food,
    name: food?.name ?? item.customName ?? 'Food',
    panel,
    art: food?.art ?? CUSTOM_ART,
    group: food?.group ?? 'Other',
  }
}

export function Art({ children, size = 64 }: { children: React.ReactNode; panel?: Panel; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {children}
    </svg>
  )
}

export function FoodLabel({
  item, stamped, onOpen, onRemove,
}: { item: MenuItem; stamped?: boolean; onOpen: () => void; onRemove: () => void }) {
  const v = itemView(item)
  return (
    <li className={`label${stamped ? ' stamped' : ''}`}>
      <div className="label-art" style={{ background: PANEL_HEX[v.panel] }}>
        <Art panel={v.panel}>{v.art}</Art>
      </div>
      <div className="label-body">
        <h3 className="label-name" style={{ color: NAME_HEX[v.panel] }}>{v.name}</h3>
        <p className="label-meta">{v.group}</p>
      </div>
      <button className="label-open" onClick={onOpen} aria-label={`Learn about ${v.name}`} />
      <button className="label-x" onClick={onRemove} aria-label={`Take ${v.name} off the menu`}>
        <IconX />
      </button>
    </li>
  )
}
