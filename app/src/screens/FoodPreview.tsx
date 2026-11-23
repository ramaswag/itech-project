import { Art, useItemView } from '../components/FoodLabel'
import { IconBack, IconPlus } from '../components/Icons'
import { NAME_HEX, PANEL_HEX, findFood } from '../data/foods'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import { STAMP_KEY } from './Tonight'
import { go } from '../router'

/**
 * Shown when a food is picked on the Add screen: the kids read about it first,
 * then put it on the plate from here.
 * Route: `food/<id>` for a known food, `food/new/<name>` for one typed in.
 */
export default function FoodPreview({ id, customName }: { id?: string; customName?: string }) {
  const { menu, addMenuItem } = useStore()
  const { t } = useI18n()
  const food = findFood(id)
  const v = useItemView({ key: 'preview', foodId: food?.id, customName })
  if (!food && !customName) {
    go('add')
    return null
  }

  const onMenu = !!food && menu.items.some((i) => i.foodId === food.id)

  const add = () => {
    const key = addMenuItem({ foodId: food?.id, customName: food ? undefined : customName })
    try { sessionStorage.setItem(STAMP_KEY, key) } catch { /* decoration only */ }
    // Straight back to the food list so the kids can keep adding; Done there goes to the plate.
    go('add')
  }

  return (
    <div className="learn">
      <div className="learn-top">
        <button className="back on-ink" onClick={() => go('add')}><IconBack /> {t('preview.foods')}</button>
        <span>{v.group}</span>
      </div>

      <article className="learn-card learn-swap">
        <div className="learn-art" style={{ background: PANEL_HEX[v.panel] }}>
          <Art panel={v.panel} size={220}>{v.art}</Art>
        </div>
        <div className="learn-body">
          <h1 className="learn-name" style={{ color: NAME_HEX[v.panel] }}>{v.name}</h1>
          <p className="learn-fact">{v.fact}</p>
        </div>
      </article>

      <div className="learn-dock">
        <button className="btn plain" onClick={() => go('add')} aria-label={t('preview.backAria')}>
          <IconBack />
        </button>
        <button className="btn red" onClick={add}>
          <IconPlus /> {onMenu ? t('preview.addAgain') : t('preview.add')}
        </button>
      </div>
    </div>
  )
}
