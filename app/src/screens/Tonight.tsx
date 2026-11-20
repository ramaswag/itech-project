import { MEAL_LABEL } from '../data/meals'
import { MealSwitch } from '../components/MealSwitch'
import { useEffect, useState } from 'react'
import { Band } from '../components/Shell'
import { FoodLabel } from '../components/FoodLabel'
import { IconCamera, IconCheck, IconPlus, IconTap } from '../components/Icons'
import { useStore } from '../store'
import { go } from '../router'

export const STAMP_KEY = 'tc:stamp'

export function longDate(d = new Date()) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function Tonight() {
  const { menu, character, removeMenuItem, title } = useStore()
  const meal = MEAL_LABEL[menu.meal]
  const [stamp, setStamp] = useState<string | null>(null)

  useEffect(() => {
    try {
      const k = sessionStorage.getItem(STAMP_KEY)
      if (k) { setStamp(k); sessionStorage.removeItem(STAMP_KEY) }
    } catch { /* stamping is decoration */ }
  }, [])

  const n = menu.items.length
  const sent = Boolean(menu.sentAt)

  return (
    <>
      <Band banner={title} sub={`${meal} · ${longDate()}`} />
      <MealSwitch />

      {!character && (
        <div className="section" style={{ marginTop: 20 }}>
          <div className="note">
            <b>No toy on the track yet</b>
            Take a photo of a toy to play with. It becomes your player on the tablecloth.
            <div style={{ marginTop: 12 }}>
              <button className="btn small ink" onClick={() => go('capture')}><IconCamera /> Choose our toy</button>
            </div>
          </div>
        </div>
      )}

      <div className="count">
        <span>Foods for {meal.toLowerCase()}</span>
        <b aria-label={`${n} foods`}>{n}</b>
      </div>

      {n === 0 ? (
        <div className="empty">
          <EmptyCrate />
          <p>Nothing here yet. What are you eating for {meal.toLowerCase()}?</p>
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
            <button className="add-slot" onClick={() => go('add')}><IconPlus /> Add another food</button>
          </li>
        </ul>
      )}

      <div className="dock">
        {n === 0 && (
          <button className="btn" onClick={() => go('add')}>
            <IconPlus /> Add a food
          </button>
        )}
        {sent ? (
          <button className="btn ink" onClick={() => go('tap')}>
            <IconCheck /> Sent to the tablecloth
          </button>
        ) : n > 0 && (
          <button className="btn red" onClick={() => go('tap')}>
            <IconTap /> Done! Tap the tablecloth
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
