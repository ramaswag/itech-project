import { MEAL_LABEL, joinNames } from '../data/meals'
import { MealSwitch } from '../components/MealSwitch'
import { useMemo, useState } from 'react'
import { Band } from '../components/Shell'
import { Art } from '../components/FoodLabel'
import { FOODS, PANEL_HEX, type Food, type FoodGroup } from '../data/foods'
import { useStore } from '../store'
import { go } from '../router'
import { IconCheck } from '../components/Icons'

const GROUPS: FoodGroup[] = ['Vegetable', 'Fruit', 'Grain', 'Protein', 'Dairy']
const GROUP_TITLE: Record<FoodGroup, string> = {
  Vegetable: 'Vegetables', Fruit: 'Fruit', Grain: 'Pasta, rice & bread', Protein: 'Fish, meat, eggs & beans', Dairy: 'Cheese & milk', Other: 'Other',
}

type Pick = { food?: Food; customName?: string }

export default function AddFood() {
  const { menu, kids } = useStore()
  const [q, setQ] = useState('')

  const onMenu = new Set(menu.items.map((i) => i.foodId))
  const query = q.trim().toLowerCase()
  const hits = useMemo(
    () => FOODS.filter((f) => !query || f.name.toLowerCase().includes(query) || f.group.toLowerCase().includes(query)),
    [query],
  )

  // Picking a food opens its fact page first; it goes on the menu from there.
  const add = (p: Pick) => {
    go(p.food ? `food/${p.food.id}` : `food/new/${encodeURIComponent(p.customName ?? '')}`)
  }

  return (
    <>
      <Band
        banner={menu.items.length ? 'Add a food' : `What’s for ${MEAL_LABEL[menu.meal].toLowerCase()}?`}
        back="tonight"
        onBack={() => go('tonight')}
        sub={menu.items.length ? 'What else is on the table?' : `Hi ${joinNames(kids.map((k) => k.name))}! Pick the first food.`}
      />
      {!menu.items.length && <MealSwitch />}
      <div className="section" style={{ marginTop: 20 }}>
        <label className="sr-only" htmlFor="food-search">Find a food</label>
        <input
          id="food-search" className="search" type="search" placeholder="Find a food…"
          value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" enterKeyHint="search"
        />

        {query && hits.length === 0 && (
          <div className="note" style={{ marginTop: 14 }}>
            <b>We don’t have “{q.trim()}” yet</b>
            You can still add it. There’s no fact for it, so ask your family what they know about it!
            <div style={{ marginTop: 12 }}>
              <button className="btn small" onClick={() => add({ customName: titleCase(q.trim()) })}>
                Add “{titleCase(q.trim())}”
              </button>
            </div>
          </div>
        )}

        {GROUPS.map((g) => {
          const list = hits.filter((f) => f.group === g)
          if (!list.length) return null
          return (
            <section key={g}>
              <h2 className="group-title">{GROUP_TITLE[g]}</h2>
              <ul className="food-grid">
                {list.map((f) => (
                  <li key={f.id}>
                    <button className={`chip${onMenu.has(f.id) ? ' on-menu' : ''}`} onClick={() => add({ food: f })}>
                      <span className="chip-art" style={{ background: PANEL_HEX[f.panel] }}>
                        <Art panel={f.panel} size={56}>{f.art}</Art>
                      </span>
                      <span className="chip-name">{f.name}</span>
                      <span className="chip-group">{onMenu.has(f.id) ? 'Already on the menu' : f.group}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {!query && (
          <p className="muted" style={{ marginTop: 22 }}>Can’t find it? Type its name in the search box to add it anyway.</p>
        )}
      </div>
      {menu.items.length > 0 && (
        <div className="dock">
          <button className="btn red" onClick={() => go('tonight')}>
            <IconCheck /> Done · {menu.items.length} on the menu
          </button>
        </div>
      )}
    </>
  )
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
