import { useState } from 'react'
import { Band } from '../components/Shell'
import { useStore } from '../store'
import { LangToggle, useI18n } from '../i18n'
import { nfcSupported } from '../lib/nfc'
import { go } from '../router'
import { IconX } from '../components/Icons'

export default function Grownups() {
  const { state, addKid, renameKid, removeKid, resetAll } = useStore()
  const { t } = useI18n()
  const [newKid, setNewKid] = useState('')
  const [armed, setArmed] = useState<string | null>(null)

  const arm = (id: string, act: () => void) => {
    if (armed === id) { act(); setArmed(null) } else setArmed(id)
  }

  return (
    <>
      <Band banner={t('grownups.title')} bannerTone="gold" back="tonight" sub={t('grownups.sub')} />

      <section className="section" style={{ marginTop: 24 }}>
        <h2 className="h2">{t('common.language')}</h2>
        <LangToggle />
      </section>

      <section className="section">
        <h2 className="h2">{t('grownups.kids')}</h2>
        <p className="muted" style={{ marginBottom: 12 }}>{t('grownups.kidsText')}</p>
        <ul className="list">
          {state.kids.map((k) => (
            <li key={k.id}>
              <label className="sr-only" htmlFor={`kid-${k.id}`}>{t('grownups.name')}</label>
              <input id={`kid-${k.id}`} defaultValue={k.name} maxLength={20} onBlur={(e) => e.target.value.trim() && renameKid(k.id, e.target.value.trim())} />
              {state.kids.length > 1 && (
                <button className="icon-btn" aria-label={t('grownups.remove', { name: k.name })} onClick={() => removeKid(k.id)}><IconX /></button>
              )}
            </li>
          ))}
        </ul>
        <form className="row" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); if (newKid.trim()) { addKid(newKid.trim()); setNewKid('') } }}>
          <label className="sr-only" htmlFor="new-kid">{t('grownups.newKidLabel')}</label>
          <input id="new-kid" className="search" style={{ flex: 1, minWidth: 0 }} placeholder={t('grownups.newKidPlaceholder')} value={newKid} onChange={(e) => setNewKid(e.target.value)} maxLength={20} />
          <button className="btn small" disabled={!newKid.trim()}>{t('grownups.add')}</button>
        </form>
      </section>

      <section className="section">
        <h2 className="h2">{t('grownups.nfc')}</h2>
        <p className="note">{nfcSupported() ? t('grownups.nfcOn') : t('grownups.nfcOff')}</p>
      </section>

      <section className="section">
        <h2 className="h2">{t('grownups.saved')}</h2>
        <p className="muted">{t('grownups.savedText')}</p>
      </section>

      <div className="danger-zone section">
        <h2 className="h2">{t('grownups.removeHeading')}</h2>
        <div className="stack">
          <button className={`btn danger${armed === 'all' ? ' armed' : ''}`} onClick={() => arm('all', () => { resetAll(); go('') })}>
            {armed === 'all' ? t('grownups.eraseAgain') : t('grownups.erase')}
          </button>
        </div>
      </div>
    </>
  )
}
