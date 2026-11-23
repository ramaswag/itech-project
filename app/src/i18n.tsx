import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type Key } from './i18n/en'
import { nl } from './i18n/nl'

export type Lang = 'en' | 'nl'

const LANG_KEY = 'tc:lang'
const DICTS = { en, nl } as const

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'en' || saved === 'nl') return saved
  } catch { /* storage can be blocked */ }
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

type Vars = Record<string, string | number>
export type T = (key: Key, vars?: Vars) => string

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
  /** BCP-47 tag for dates and speech. */
  locale: string
}

const Ctx = createContext<I18n | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(LANG_KEY, l) } catch { /* the choice just won't be remembered */ }
  }, [])

  const value = useMemo<I18n>(() => {
    const dict = DICTS[lang] as Record<Key, string>
    const t: T = (key, vars) => {
      const s = dict[key] ?? key
      return vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s
    }
    return { lang, setLang, t, locale: lang === 'nl' ? 'nl-NL' : 'en-GB' }
  }, [lang, setLang])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useI18n outside provider')
  return c
}

/** Small EN | NL switch. */
export function LangToggle() {
  const { lang, setLang, t } = useI18n()
  return (
    <div className="lang-toggle" role="radiogroup" aria-label={t('common.language')}>
      {(['en', 'nl'] as const).map((l) => (
        <button key={l} type="button" role="radio" aria-checked={lang === l} onClick={() => setLang(l)}>
          {l === 'en' ? 'English' : 'Nederlands'}
        </button>
      ))}
    </div>
  )
}
