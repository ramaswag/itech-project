import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/** The tablecloth track always has 10 squares after the start. */
export const TRACK_LENGTH = 10

export interface MenuItem {
  key: string
  foodId?: string
  customName?: string
}

/** One reading of the toy's square: typed in by the family, or (later) read from the cloth over NFC. */
export interface PositionReading {
  at: string
  position: number
  demo: boolean
}

/** The family's toy on the tablecloth. One at a time, shared by all the kids. */
export interface Character {
  id: string
  name: string
  sticker: string // data URL of the printed sticker
  createdAt: string
  position: number
  log: PositionReading[]
  finishedAt?: string
}

export interface Kid {
  id: string
  name: string
}

/** Tonight's dinner: one shared plate for the whole family. */
export interface Menu {
  date: string // yyyy-mm-dd
  items: MenuItem[]
  sentAt?: string
  sentVia?: 'nfc' | 'demo'
}

export interface State {
  version: 2
  setupDone: boolean
  kids: Kid[]
  characters: Character[]
  activeCharacterId: string | null
  menu: Menu | null
}

const KEY = 'tonights-crate:v1'

const initial: State = { version: 2, setupDone: false, kids: [], characters: [], activeCharacterId: null, menu: null }

export const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const uid = () => Math.random().toString(36).slice(2, 10)

const freshMenu = (): Menu => ({ date: today(), items: [] })

/* eslint-disable @typescript-eslint/no-explicit-any */
const normLog = (log: any): PositionReading[] =>
  Array.isArray(log) ? log.map((l: any) => ({ at: l.at, position: l.position ?? 0, demo: l.demo ?? true })) : []

function migrateV1(p: any): State {
  const kids: Kid[] = (p.kids ?? []).map((k: any) => ({ id: k.id, name: k.name }))
  const first = (p.kids ?? [])[0]
  const characters: Character[] = (p.characters ?? []).map((c: any) => ({
    id: c.id, name: c.name, sticker: c.sticker, createdAt: c.createdAt, finishedAt: c.finishedAt,
    log: normLog(c.log),
    position: Math.min(TRACK_LENGTH, Math.max(0, c.position ?? 0)),
  }))
  const old = first ? p.menus?.[first.id] : undefined
  return {
    version: 2,
    setupDone: kids.length > 0,
    kids,
    characters,
    activeCharacterId: first?.activeCharacterId ?? null,
    menu: old ? { date: old.date, items: (old.items ?? []).map((i: any) => ({ key: i.key, foodId: i.foodId, customName: i.customName })), sentAt: old.sentAt, sentVia: old.sentVia } : null,
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initial
    const parsed = JSON.parse(raw)
    if (parsed.version === 1) return migrateV1(parsed)
    if (parsed.version !== 2) return initial
    // Older saves may still carry familyName and menu.meal; they are simply ignored.
    return { ...initial, ...parsed, characters: (parsed.characters ?? []).map((c: any) => ({ ...c, log: normLog(c.log) })) }
  } catch {
    return initial
  }
}

interface Store {
  state: State
  saveError: boolean
  kids: Kid[]
  character: Character | null
  menu: Menu
  finishSetup: (kidNames: string[]) => void
  addKid: (name: string) => void
  renameKid: (id: string, name: string) => void
  removeKid: (id: string) => void
  addCharacter: (name: string, sticker: string) => void
  addMenuItem: (item: Omit<MenuItem, 'key'>) => string
  removeMenuItem: (key: string) => void
  markSent: (via: 'nfc' | 'demo') => void
  startNextMeal: () => void
  recordPosition: (position: number, demo: boolean) => void
  shelveCharacter: () => void
  resetAll: () => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
      setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }, [state])

  const store = useMemo<Store>(() => {
    const character = state.characters.find((c) => c.id === state.activeCharacterId) ?? null
    const menu: Menu = state.menu ?? freshMenu()

    const patchMenu = (fn: (m: Menu) => Menu) => setState((s) => ({ ...s, menu: fn(s.menu ?? freshMenu()) }))
    const patchCharacter = (fn: (c: Character) => Character) =>
      setState((s) => (s.activeCharacterId
        ? { ...s, characters: s.characters.map((c) => (c.id === s.activeCharacterId ? fn(c) : c)) }
        : s))

    return {
      state,
      saveError,
      kids: state.kids,
      character,
      menu,
      finishSetup: (kidNames) =>
        setState((s) => ({
          ...s,
          setupDone: true,
          kids: kidNames.map((name) => ({ id: uid(), name })),
        })),
      addKid: (name) => setState((s) => ({ ...s, kids: [...s.kids, { id: uid(), name }] })),
      renameKid: (id, name) => setState((s) => ({ ...s, kids: s.kids.map((k) => (k.id === id ? { ...k, name } : k)) })),
      removeKid: (id) => setState((s) => ({ ...s, kids: s.kids.filter((k) => k.id !== id) })),
      addCharacter: (name, sticker) => {
        const c: Character = { id: uid(), name, sticker, createdAt: new Date().toISOString(), position: 0, log: [] }
        setState((s) => ({ ...s, characters: [...s.characters, c], activeCharacterId: c.id }))
      },
      addMenuItem: (item) => {
        const key = uid()
        patchMenu((m) => ({ ...m, sentAt: undefined, items: [...m.items, { ...item, key }] }))
        return key
      },
      removeMenuItem: (key) => patchMenu((m) => ({ ...m, sentAt: undefined, items: m.items.filter((i) => i.key !== key) })),
      markSent: (via) => patchMenu((m) => ({ ...m, sentAt: new Date().toISOString(), sentVia: via })),
      // A new dinner starts when the last one was sent, or it is from another day.
      startNextMeal: () =>
        setState((s) => {
          const m = s.menu
          if (!m || m.sentAt || m.date !== today()) return { ...s, menu: freshMenu() }
          return s
        }),
      recordPosition: (p, demo) =>
        patchCharacter((c) => {
          const position = Math.min(TRACK_LENGTH, Math.max(0, Math.round(p)))
          return { ...c, position, log: [...c.log, { at: new Date().toISOString(), position, demo }] }
        }),
      shelveCharacter: () =>
        setState((s) => (s.activeCharacterId
          ? {
              ...s,
              characters: s.characters.map((c) => (c.id === s.activeCharacterId ? { ...c, finishedAt: new Date().toISOString() } : c)),
              activeCharacterId: null,
            }
          : s)),
      resetAll: () => setState(initial),
    }
  }, [state, saveError])

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore outside provider')
  return s
}
