import { Art, itemView } from '../components/FoodLabel'
import { IconBack, IconPlus } from '../components/Icons'
import { NAME_HEX, PANEL_HEX, findFood } from '../data/foods'
import { useStore } from '../store'
import { STAMP_KEY } from './Tonight'
import { go } from '../router'

/**
 * Shown when a food is picked on the Add screen: the kids read about it first,
 * then put it on the menu from here.
 * Route: `food/<id>` for a known food, `food/new/<name>` for one typed in.
 */
export default function FoodPreview({ id, customName }: { id?: string; customName?: string }) {
  const { menu, addMenuItem } = useStore()
  const food = findFood(id)
  if (!food && !customName) {
    go('add')
    return null
  }

  const v = itemView({ key: 'preview', foodId: food?.id, customName })
  const onMenu = !!food && menu.items.some((i) => i.foodId === food.id)

  const add = () => {
    const key = addMenuItem({ foodId: food?.id, customName: food ? undefined : customName })
    try { sessionStorage.setItem(STAMP_KEY, key) } catch { /* decoration only */ }
    // Straight back to the food list so the kids can keep adding; Done there goes to the menu.
    go('add')
  }

  return (
    <div className="learn">
      <div className="learn-top">
        <button className="back on-ink" onClick={() => go('add')}><IconBack /> Foods</button>
        <span>{v.group}</span>
      </div>

      <article className="learn-card learn-swap">
        <div className="learn-art" style={{ background: PANEL_HEX[v.panel] }}>
          <Art panel={v.panel} size={220}>{v.art}</Art>
        </div>
        <div className="learn-body">
          <h1 className="learn-name" style={{ color: NAME_HEX[v.panel] }}>{v.name}</h1>
          <p className="learn-fact">
            {v.food?.fact ?? 'We don’t have a fact about this one yet. At dinner, ask someone at the table what they know about it!'}
          </p>
          <p className="senses">{v.food?.senses ?? 'What colour is it? What does it smell like?'}</p>
        </div>
      </article>

      <div className="learn-dock">
        <button className="btn plain" onClick={() => go('add')} aria-label="Back to the foods">
          <IconBack />
        </button>
        <button className="btn red" onClick={add}>
          <IconPlus /> {onMenu ? 'Add it again' : 'Add to the menu'}
        </button>
      </div>
    </div>
  )
}
