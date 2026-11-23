import { Art, useItemView } from '../components/FoodLabel'
import { IconBack, IconNext } from '../components/Icons'
import { NAME_HEX, PANEL_HEX } from '../data/foods'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import { go } from '../router'

export default function Learn({ index }: { index: number }) {
  const { menu } = useStore()
  const { t } = useI18n()
  const items = menu.items
  const i = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0))
  const v = useItemView(items[i] ?? { key: 'none' })
  if (!items.length) {
    go('tonight')
    return null
  }
  const last = i === items.length - 1

  return (
    <div className="learn">
      <div className="learn-top">
        <button className="back on-ink" onClick={() => go('tonight')}><IconBack /> {t('learn.menu')}</button>
        <span>{t('learn.of', { i: i + 1, n: items.length })}</span>
      </div>

      <article className="learn-card learn-swap" key={items[i].key}>
        <div className="learn-art" style={{ background: PANEL_HEX[v.panel] }}>
          <Art panel={v.panel} size={220}>{v.art}</Art>
        </div>
        <div className="learn-body">
          <h1 className="learn-name" style={{ color: NAME_HEX[v.panel] }}>{v.name}</h1>
          <p className="learn-fact">{v.fact}</p>
        </div>
      </article>

      <div className="learn-dock">
        <button className="btn plain" disabled={i === 0} onClick={() => go(`learn/${i - 1}`)} aria-label={t('learn.prevAria')}>
          <IconBack />
        </button>
        {last ? (
          <button className="btn red" onClick={() => go(menu.sentAt ? 'tonight' : 'story')}>
            {menu.sentAt ? t('learn.backToMenu') : <>{t('learn.toStory')} <IconNext /></>}
          </button>
        ) : (
          <button className="btn" onClick={() => go(`learn/${i + 1}`)}>
            {t('learn.next')} <IconNext />
          </button>
        )}
      </div>
    </div>
  )
}
