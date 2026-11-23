import { useEffect, useState } from 'react'
import { Band } from '../components/Shell'
import { FoodLabel } from '../components/FoodLabel'
import { IconPlus, IconTap } from '../components/Icons'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import { go } from '../router'

export const STAMP_KEY = 'tc:stamp'

export default function Tonight() {
  const { menu, removeMenuItem } = useStore()
  const { t, locale } = useI18n()
  const [stamp, setStamp] = useState<string | null>(null)

  useEffect(() => {
    try {
      const k = sessionStorage.getItem(STAMP_KEY)
      if (k) { setStamp(k); sessionStorage.removeItem(STAMP_KEY) }
    } catch { /* stamping is decoration */ }
  }, [])

  const n = menu.items.length
  const sent = Boolean(menu.sentAt)
  const date = new Date().toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <Band banner={t('app.title')} sub={t('tonight.sub', { date })} />

      <div className="count">
        <span>{t('tonight.count')}</span>
        <b aria-label={t('tonight.countAria', { n })}>{n}</b>
      </div>

      {n === 0 ? (
        <div className="empty">
          <EmptyCrate />
          <p>{t('tonight.empty')}</p>
        </div>
      ) : (
        <ul className="labels">
          {menu.items.map((item, i) => (
            <FoodLabel
              key={item.key}
              item={item}
              stamped={item.key === stamp}
              onOpen={() => go(`learn/${i}`)}
              onRemove={() => removeMenuItem(item.key)}
            />
          ))}
          <li>
            <button className="add-slot" onClick={() => go('add')}><IconPlus /> {t('tonight.addAnother')}</button>
          </li>
        </ul>
      )}

      <div className="dock">
        {n === 0 && (
          <button className="btn" onClick={() => go('add')}>
            <IconPlus /> {t('tonight.addFood')}
          </button>
        )}
        {!sent && n > 0 && (
          <button className="btn red" onClick={() => go('story')}>
            <IconTap /> {t('tonight.done')}
          </button>
        )}
      </div>
    </>
  )
}

function EmptyCrate() {
  return (
    <svg viewBox="0 0 132 92" aria-hidden="true">
      <path d="M8 30h116v56H8z" fill="#fffdf8" stroke="#16285e" strokeWidth="3" />
      <path d="M8 30l12-22h92l12 22" fill="#f2b01e" stroke="#16285e" strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 58h116M44 30v56M88 30v56" stroke="#16285e" strokeWidth="3" />
      <path d="M52 44h28" stroke="#e2401c" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
