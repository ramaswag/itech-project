import { Art, itemView } from '../components/FoodLabel'
import { IconBack, IconNext, IconTap } from '../components/Icons'
import { NAME_HEX, PANEL_HEX } from '../data/foods'
import { useStore } from '../store'
import { go } from '../router'

export default function Learn({ index }: { index: number }) {
  const { menu } = useStore()
  const items = menu.items
  if (!items.length) {
    go('tonight')
    return null
  }
  const i = Math.min(Math.max(index, 0), items.length - 1)
  const v = itemView(items[i])
  const last = i === items.length - 1

  return (
    <div className="learn">
      <div className="learn-top">
        <button className="back on-ink" onClick={() => go('tonight')}><IconBack /> Menu</button>
        <span><b>{i + 1}</b> of <b>{items.length}</b></span>
      </div>

      <article className="learn-card learn-swap" key={items[i].key}>
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
        <button className="btn plain" disabled={i === 0} onClick={() => go(`learn/${i - 1}`)} aria-label="Previous food">
          <IconBack />
        </button>
        {last ? (
          <button className="btn red" onClick={() => go(menu.sentAt ? 'tonight' : 'tap')}>
            {menu.sentAt ? 'Back to the menu' : <><IconTap /> Tap the tablecloth</>}
          </button>
        ) : (
          <button className="btn" onClick={() => go(`learn/${i + 1}`)}>
            Next food <IconNext />
          </button>
        )}
      </div>
    </div>
  )
}
