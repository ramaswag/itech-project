import { CUSTOM_ART, findFood, NAME_HEX, PANEL_HEX, type Food, type Panel } from '../data/foods'
import type { MenuItem } from '../store'
import { useI18n, type T } from '../i18n'
import type { Key } from '../i18n/en'
import { IconX } from './Icons'

export const foodName = (t: T, f: Food) => t(`food.${f.id}.name` as Key)
export const foodFact = (t: T, f: Food | undefined) => (f ? t(`food.${f.id}.fact` as Key) : t('food.noFact'))

export function useItemView(item: MenuItem) {
  const { t } = useI18n()
  const food = findFood(item.foodId)
  const panel: Panel = food?.panel ?? 'ink'
  return {
    food,
    name: food ? foodName(t, food) : item.customName ?? t('food.defaultName'),
    fact: foodFact(t, food),
    panel,
    art: food?.art ?? CUSTOM_ART,
    group: t(`group.single.${food?.group ?? 'Other'}` as Key),
  }
}

/** Same as `useItemView`, for use outside render (event handlers, payloads). */
export function itemView(t: T, item: MenuItem) {
  const food = findFood(item.foodId)
  return { name: food ? foodName(t, food) : item.customName ?? t('food.defaultName') }
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
  const { t } = useI18n()
  const v = useItemView(item)
  return (
    <li className={`label${stamped ? ' stamped' : ''}`}>
      <div className="label-art" style={{ background: PANEL_HEX[v.panel] }}>
        <Art panel={v.panel}>{v.art}</Art>
      </div>
      <div className="label-body">
        <h3 className="label-name" style={{ color: NAME_HEX[v.panel] }}>{v.name}</h3>
        <p className="label-meta">{v.group}</p>
      </div>
      <button className="label-open" onClick={onOpen} aria-label={t('tonight.learnAbout', { name: v.name })} />
      <button className="label-x" onClick={onRemove} aria-label={t('tonight.remove', { name: v.name })}>
        <IconX />
      </button>
    </li>
  )
}
