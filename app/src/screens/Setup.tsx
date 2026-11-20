import { useState } from 'react'
import { menuTitle, useStore } from '../store'
import { joinNames } from '../data/meals'
import { go } from '../router'
import { IconCamera, IconCrate, IconNext, IconPlus, IconTap, IconX } from '../components/Icons'

const STEPS = [
  { Icon: IconCamera, panel: 'var(--red)', title: 'Pick a toy', text: 'The kids photograph one toy. It walks the tablecloth track.' },
  { Icon: IconCrate, panel: 'var(--gold)', title: 'Fill the menu', text: 'Before each meal they add the foods and learn about them.' },
  { Icon: IconTap, panel: 'var(--leaf)', title: 'Tap the cloth', text: 'They send the menu, then play challenges at the table.' },
]

/** First run, for a grown-up: family name and kids' names, then hand the phone over. */
export default function Setup() {
  const { finishSetup } = useStore()
  const [family, setFamily] = useState('')
  const [names, setNames] = useState<string[]>([''])
  const [handoff, setHandoff] = useState<string[] | null>(null)

  const clean = names.map((n) => n.trim()).filter(Boolean)
  const ready = clean.length > 0

  if (handoff) {
    return (
      <div className="app">
        <main className="main no-nav welcome">
          <header className="band">
            <h1 className="banner gold">All set!</h1>
            <p className="band-sub">{menuTitle(family)}</p>
          </header>
          <div className="section handoff">
            <p className="handoff-big">Give the phone to {joinNames(handoff)}.</p>
            <p className="lead">Next they’ll choose a toy to play with and take its photo.</p>
          </div>
          <div className="section welcome-form">
            <button className="btn red" onClick={() => { finishSetup(family, handoff); go('capture') }}>
              We’re ready! <IconNext />
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <main className="main no-nav welcome">
        <header className="band">
          <h1 className="banner">Hello, grown-up!</h1>
          <p className="band-sub">Set up the tablecloth game for your family. It takes a minute, then you hand the phone to your kids before a meal.</p>
        </header>

        <ol className="labels welcome-steps" aria-label="How it works">
          {STEPS.map(({ Icon, panel, title, text }) => (
            <li key={title} className="label small">
              <div className="label-art" style={{ background: panel }}><span className="step-ico"><Icon /></span></div>
              <div className="label-body">
                <h2 className="label-name">{title}</h2>
                <p className="step-text">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <form className="section stack welcome-form" onSubmit={(e) => { e.preventDefault(); if (ready) setHandoff(clean) }}>
          <label className="field">
            Family name
            <input value={family} onChange={(e) => setFamily(e.target.value)} maxLength={28} placeholder="Rossi" autoComplete="family-name" />
          </label>
          <p className="muted" style={{ marginTop: -6 }}>The kids will see “{menuTitle(family)}”.</p>

          <fieldset className="field names">
            <legend>Your kids’ names</legend>
            {names.map((n, i) => (
              <div className="row name-row" key={i}>
                <label className="sr-only" htmlFor={`kid-${i}`}>Child {i + 1}</label>
                <input
                  id={`kid-${i}`} value={n} maxLength={20} autoComplete="off" placeholder={i === 0 ? 'Mila' : 'Luca'}
                  onChange={(e) => setNames(names.map((x, j) => (j === i ? e.target.value : x)))}
                />
                {names.length > 1 && (
                  <button type="button" className="icon-btn" aria-label={`Remove child ${i + 1}`} onClick={() => setNames(names.filter((_, j) => j !== i))}>
                    <IconX />
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn-text" onClick={() => setNames([...names, ''])}>
              <IconPlus /> Add another child
            </button>
          </fieldset>

          <button className={`btn${ready ? ' red' : ''}`} disabled={!ready}>Next <IconNext /></button>
        </form>
      </main>
    </div>
  )
}
