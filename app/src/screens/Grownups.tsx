import { useState } from 'react'
import { Band } from '../components/Shell'
import { menuTitle, useStore } from '../store'
import { nfcSupported } from '../lib/nfc'
import { go } from '../router'
import { IconX } from '../components/Icons'

export default function Grownups() {
  const { state, addKid, renameKid, removeKid, resetAll, setFamilyName } = useStore()
  const [family, setFamily] = useState(state.familyName ?? '')
  const [newKid, setNewKid] = useState('')
  const [armed, setArmed] = useState<string | null>(null)

  const arm = (id: string, act: () => void) => {
    if (armed === id) { act(); setArmed(null) } else setArmed(id)
  }

  return (
    <>
      <Band banner="Grown-ups" bannerTone="gold" back="tonight" sub="Set up the family and the tablecloth" />

      <section className="section" style={{ marginTop: 24 }}>
        <h2 className="h2">Menu title</h2>
        <form className="stack" onSubmit={(e) => { e.preventDefault(); setFamilyName(family) }}>
          <label className="field">
            Family name
            <input
              value={family} maxLength={28} placeholder="Rossi" autoComplete="family-name"
              onChange={(e) => setFamily(e.target.value)} onBlur={() => setFamilyName(family)}
            />
          </label>
          <p className="muted">
            The kids will see: <b className="title-preview">{menuTitle(family)}</b>. Or type a whole title, like “Rossi kitchen”.
          </p>
        </form>
      </section>

      <section className="section">
        <h2 className="h2">Kids</h2>
        <p className="muted" style={{ marginBottom: 12 }}>Their names are used to greet them. All kids share one menu and one toy.</p>
        <ul className="list">
          {state.kids.map((k) => (
            <li key={k.id}>
              <label className="sr-only" htmlFor={`kid-${k.id}`}>Name</label>
              <input id={`kid-${k.id}`} defaultValue={k.name} maxLength={20} onBlur={(e) => e.target.value.trim() && renameKid(k.id, e.target.value.trim())} />
              {state.kids.length > 1 && (
                <button className="icon-btn" aria-label={`Remove ${k.name}`} onClick={() => removeKid(k.id)}><IconX /></button>
              )}
            </li>
          ))}
        </ul>
        <form className="row" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); if (newKid.trim()) { addKid(newKid.trim()); setNewKid('') } }}>
          <label className="sr-only" htmlFor="new-kid">New child’s name</label>
          <input id="new-kid" className="search" style={{ flex: 1, minWidth: 0 }} placeholder="Add a child’s name" value={newKid} onChange={(e) => setNewKid(e.target.value)} maxLength={20} />
          <button className="btn small" disabled={!newKid.trim()}>Add</button>
        </form>
      </section>

      <section className="section">
        <h2 className="h2">NFC on this phone</h2>
        <p className="note">
          {nfcSupported()
            ? 'This browser supports Web NFC. Turn on NFC in the phone’s settings, then allow it when the app asks.'
            : 'NFC isn’t switched on yet, so sending the menu and checking the track are demos, marked as such.'}
        </p>
      </section>

      <section className="section">
        <h2 className="h2">Where things are saved</h2>
        <p className="muted">Everything stays on this phone, in this browser. Nothing is uploaded, including the toy photos.</p>
      </section>

      <div className="danger-zone section">
        <h2 className="h2">Remove</h2>
        <div className="stack">
          <button className={`btn danger${armed === 'all' ? ' armed' : ''}`} onClick={() => arm('all', () => { resetAll(); go('') })}>
            {armed === 'all' ? 'Tap again to erase everything' : 'Erase everything on this phone'}
          </button>
        </div>
      </div>
    </>
  )
}
