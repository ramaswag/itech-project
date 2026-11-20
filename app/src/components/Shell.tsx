import type { ReactNode } from 'react'
import { useStore } from '../store'
import { IconBack, IconCrate, IconShelf, IconTrack } from './Icons'
import { go } from '../router'

export function Band({
  banner, bannerTone, sub, back, onBack, children,
}: { banner: string; bannerTone?: 'gold' | 'leaf'; sub?: ReactNode; back?: string; onBack?: () => void; children?: ReactNode }) {
  const { character } = useStore()
  return (
    <header className="band">
      <div className="band-top">
        {back ? (
          <button className="back" onClick={onBack ?? (() => (history.length > 1 ? history.back() : go(back)))}>
            <IconBack /> Back
          </button>
        ) : (
          <button className="who" onClick={() => go(character ? 'track' : 'capture')} aria-label={character ? `Our toy: ${character.name}. See the track` : 'Choose our toy'}>
            <span className="who-badge">{character && <img src={character.sticker} alt="" />}</span>
            <span>{character ? character.name : 'No toy yet'}</span>
          </button>
        )}
        {!back && (
          <button className="link-btn" onClick={() => go('grownups')}>Grown-ups</button>
        )}
      </div>
      <h1 className={`banner${bannerTone ? ' ' + bannerTone : ''}`}>{banner}</h1>
      {sub && <p className="band-sub">{sub}</p>}
      {children}
    </header>
  )
}

export function Nav({ current }: { current: 'tonight' | 'track' | 'shelf' }) {
  const items = [
    { id: 'tonight', label: 'Meal', Icon: IconCrate },
    { id: 'track', label: 'Track', Icon: IconTrack },
    { id: 'shelf', label: 'Shelf', Icon: IconShelf },
  ] as const
  return (
    <nav className="nav" aria-label="Main">
      {items.map(({ id, label, Icon }) => (
        <a key={id} href={`#/${id}`} aria-current={current === id ? 'page' : undefined}>
          <span className="nav-ico"><Icon /></span>
          {label}
        </a>
      ))}
    </nav>
  )
}
