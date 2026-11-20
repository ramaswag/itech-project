export type Meal = 'breakfast' | 'lunch' | 'snack' | 'dinner'

export const MEALS: Meal[] = ['breakfast', 'lunch', 'snack', 'dinner']

export const MEAL_LABEL: Record<Meal, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  snack: 'Snack',
  dinner: 'Dinner',
}

/** Guess the meal from the clock: before 10:30 breakfast, until 14:30 lunch, until 17:00 snack, then dinner. */
export function guessMeal(d = new Date()): Meal {
  const m = d.getHours() * 60 + d.getMinutes()
  if (m < 10 * 60 + 30) return 'breakfast'
  if (m < 14 * 60 + 30) return 'lunch'
  if (m < 17 * 60) return 'snack'
  return 'dinner'
}

/** "Mila", "Mila & Luca", "Mila, Luca & Noor" */
export function joinNames(names: string[]) {
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
}
