import type { ReactNode } from 'react'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import { IconBack, IconCrate, IconShelf } from './Icons'
import { go } from '../router'

export function Band({
  banner, bannerTone, sub, back, onBack, children,
}: { banner: string; bannerTone?: 'gold' | 'leaf'; sub?: ReactNode; back?: string; onBack?: () => void; children?: ReactNode }) {
  const { character } = useStore()
  const { t } = useI18n()
  return (
    <header className="band">
      <div className="band-top">
        {back ? (
          <button className="back" onClick={onBack ?? (() => (history.length > 1 ? history.back() : go(back)))}>
            <IconBack /> {t('common.back')}
          </button>
        ) : (
          <button className="who" onClick={() => go('shelf')} aria-label={character ? t('band.whoAria', { name: character.name }) : t('nav.shelf')}>
            <span className="who-badge">{character && <img src={character.sticker} alt="" />}</span>
            <span>{character ? character.name : t('common.noToy')}</span>
          </button>
        )}
        {!back && (
          <button className="link-btn" onClick={() => go('grownups')}>{t('common.grownups')}</button>
        )}
      </div>
      <h1 className={`banner${bannerTone ? ' ' + bannerTone : ''}`}>{banner}</h1>
      {sub && <p className="band-sub">{sub}</p>}
      {children}
    </header>
  )
}

export function Nav({ current }: { current: 'tonight' | 'shelf' }) {
  const { t } = useI18n()
  const items = [
    { id: 'tonight', label: t('nav.meal'), Icon: IconCrate },
    { id: 'shelf', label: t('nav.shelf'), Icon: IconShelf },
  ] as const
  return (
    <nav className="nav" aria-label={t('nav.main')}>
      {items.map(({ id, label, Icon }) => (
        <a key={id} href={`#/${id}`} aria-current={current === id ? 'page' : undefined}>
          <span className="nav-ico"><Icon /></span>
          {label}
        </a>
      ))}
    </nav>
  )
}
