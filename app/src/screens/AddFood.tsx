import { joinNames } from '../data/meals'
import { useMemo, useState } from 'react'
import { Band } from '../components/Shell'
import { Art, foodName } from '../components/FoodLabel'
import { FOODS, PANEL_HEX, type FoodGroup } from '../data/foods'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/en'
import { go } from '../router'
import { IconCheck } from '../components/Icons'

const GROUPS: FoodGroup[] = ['Vegetable', 'Fruit', 'Grain', 'Protein', 'Dairy']

export default function AddFood() {
  const { menu, kids } = useStore()
  const { t } = useI18n()
  const [q, setQ] = useState('')

  const onMenu = new Set(menu.items.map((i) => i.foodId))
  const query = q.trim().toLowerCase()
  const hits = useMemo(
    () => FOODS.filter((f) => !query || foodName(t, f).toLowerCase().includes(query) || t(`group.single.${f.group}` as Key).toLowerCase().includes(query)),
    [query, t],
  )

  // Picking a food opens its fact page first; it goes on the plate from there.
  const addFood = (id: string) => go(`food/${id}`)
  const addCustom = (name: string) => go(`food/new/${encodeURIComponent(name)}`)
  const names = joinNames(kids.map((k) => k.name))

  return (
    <>
      <Band
        banner={menu.items.length ? t('add.titleMore') : t('add.title')}
        back="tonight"
        onBack={() => go('tonight')}
        sub={menu.items.length ? t('add.subMore') : names ? t('add.sub', { names }) : t('add.subNoNames')}
      />
      <div className="section" style={{ marginTop: 20 }}>
        <label className="sr-only" htmlFor="food-search">{t('add.searchLabel')}</label>
        <input
          id="food-search" className="search" type="search" placeholder={t('add.search')}
          value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" enterKeyHint="search"
        />

        {query && hits.length === 0 && (
          <div className="note" style={{ marginTop: 14 }}>
            <b>{t('add.unknownTitle', { q: q.trim() })}</b>
            {t('add.unknownText')}
            <div style={{ marginTop: 12 }}>
              <button className="btn small" onClick={() => addCustom(titleCase(q.trim()))}>
                {t('add.addCustom', { q: titleCase(q.trim()) })}
              </button>
            </div>
          </div>
        )}

        {GROUPS.map((g) => {
          const list = hits.filter((f) => f.group === g)
          if (!list.length) return null
          return (
            <section key={g}>
              <h2 className="group-title">{t(`group.${g}` as Key)}</h2>
              <ul className="food-grid">
                {list.map((f) => (
                  <li key={f.id}>
                    <button className={`chip${onMenu.has(f.id) ? ' on-menu' : ''}`} onClick={() => addFood(f.id)}>
                      <span className="chip-art" style={{ background: PANEL_HEX[f.panel] }}>
                        <Art panel={f.panel} size={56}>{f.art}</Art>
                      </span>
                      <span className="chip-name">{foodName(t, f)}</span>
                      <span className="chip-group">{onMenu.has(f.id) ? t('add.alreadyOn') : t(`group.single.${f.group}` as Key)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {!query && (
          <p className="muted" style={{ marginTop: 22 }}>{t('add.cantFind')}</p>
        )}
      </div>
      {menu.items.length > 0 && (
        <div className="dock">
          <button className="btn red" onClick={() => go('tonight')}>
            <IconCheck /> {t('add.done', { n: menu.items.length })}
          </button>
        </div>
      )}
    </>
  )
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
