import { useEffect } from 'react'
import { StoreProvider, useStore } from './store'
import { LangProvider, useI18n } from './i18n'
import { go, useRoute } from './router'
import { Nav } from './components/Shell'
import Tonight from './screens/Tonight'
import AddFood from './screens/AddFood'
import Learn from './screens/Learn'
import FoodPreview from './screens/FoodPreview'
import Story from './screens/Story'
import Tap from './screens/Tap'
import Result from './screens/Result'
import Shelf from './screens/Shelf'
import Capture from './screens/Capture'
import Grownups from './screens/Grownups'
import Setup from './screens/Setup'

let launched = false

function Screens() {
  const { state, saveError, startNextMeal } = useStore()
  const { t } = useI18n()
  useEffect(() => { document.title = t('app.title') }, [t])
  const [route = 'tonight', arg, ...rest] = useRoute()

  // Every time the app is opened after setup, the kids start by entering tonight's meal.
  // The toy comes later, after the meal and the story.
  const ready = state.setupDone
  useEffect(() => {
    if (!ready || launched) return
    launched = true
    startNextMeal()
    go('add')
  }, [ready, startNextMeal])

  if (!state.setupDone) return <Setup />

  let screen: React.ReactNode
  let nav: 'tonight' | 'shelf' | null = null
  switch (route) {
    case 'add': screen = <AddFood />; break
    case 'food': screen = arg === 'new'
      ? <FoodPreview customName={safeDecode(rest[0])} />
      : <FoodPreview id={arg} />; break
    case 'learn': screen = <Learn index={Number(arg) || 0} />; break
    case 'story': screen = <Story />; break
    case 'tap': screen = <Tap />; break
    case 'result': screen = <Result />; break
    case 'shelf': screen = <Shelf />; nav = 'shelf'; break
    case 'capture': screen = <Capture />; break
    case 'grownups': screen = <Grownups />; break
    default: screen = <Tonight />; nav = 'tonight'
  }

  return (
    <div className="app">
      <main className={`main${nav ? '' : ' no-nav'}`}>{screen}</main>
      {nav && <Nav current={nav} />}
      {saveError && (
        <p className="toast" role="alert">{t('app.saveError')}</p>
      )}
    </div>
  )
}

function safeDecode(s?: string) {
  if (!s) return undefined
  try { return decodeURIComponent(s) } catch { return s }
}

export default function App() {
  return (
    <LangProvider>
      <StoreProvider>
        <Screens />
      </StoreProvider>
    </LangProvider>
  )
}
