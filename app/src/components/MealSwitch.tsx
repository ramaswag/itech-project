import { MEALS, MEAL_LABEL } from '../data/meals'
import { useStore } from '../store'

/** The app guesses the meal from the clock; one tap changes it. */
export function MealSwitch() {
  const { menu, setMeal } = useStore()
  return (
    <div className="meal-switch" role="radiogroup" aria-label="Which meal is it?">
      {MEALS.map((m) => (
        <button key={m} role="radio" aria-checked={menu.meal === m} onClick={() => setMeal(m)}>
          {MEAL_LABEL[m]}
        </button>
      ))}
    </div>
  )
}
