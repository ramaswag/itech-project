import { useEffect } from 'react'
import { StoreProvider, useStore } from './store'
import { go, useRoute } from './router'
import { Nav } from './components/Shell'
import Tonight from './screens/Tonight'
import AddFood from './screens/AddFood'
import Learn from './screens/Learn'
import FoodPreview from './screens/FoodPreview'
import Tap from './screens/Tap'
import Track from './screens/Track'
import Shelf from './screens/Shelf'
import Capture from './screens/Capture'
import Grownups from './screens/Grownups'
import Setup from './screens/Setup'

let launched = false

function Screens() {
  const { state, character, saveError, startNextMeal, title } = useStore()
  useEffect(() => { document.title = title }, [title])
  const [route = 'tonight', arg, ...rest] = useRoute()

  // Every time the app is opened after setup, the kids start by entering the next meal
  // (or by choosing the family's toy, when there isn't one on the track).
  const ready = state.setupDone
  useEffect(() => {
    if (!ready || launched) return
    launched = true
    startNextMeal()
    go(character ? 'add' : 'capture')
  }, [ready, character, startNextMeal])

  if (!state.setupDone) return <Setup />

  let screen: React.ReactNode
  let nav: 'tonight' | 'track' | 'shelf' | null = null
  switch (route) {
    case 'add': screen = <AddFood />; break
    case 'food': screen = arg === 'new'
      ? <FoodPreview customName={safeDecode(rest[0])} />
      : <FoodPreview id={arg} />; break
    case 'learn': screen = <Learn index={Number(arg) || 0} />; break
    case 'tap': screen = <Tap />; break
    case 'track': screen = <Track />; nav = 'track'; break
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
        <p className="toast" role="alert">This phone is out of space, so changes won’t be kept. A grown-up can erase old data in Grown-ups.</p>
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
    <StoreProvider>
      <Screens />
    </StoreProvider>
  )
}
