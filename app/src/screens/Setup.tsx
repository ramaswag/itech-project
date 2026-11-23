import { useState } from 'react'
import { useStore } from '../store'
import { joinNames } from '../data/meals'
import { go } from '../router'
import { LangToggle, useI18n } from '../i18n'
import { IconCamera, IconCrate, IconNext, IconPlus, IconTap, IconX } from '../components/Icons'

/** First run, for a grown-up: language and kids' names, then hand the phone over. */
export default function Setup() {
  const { finishSetup } = useStore()
  const { t } = useI18n()
  const [names, setNames] = useState<string[]>([''])
  const [handoff, setHandoff] = useState<string[] | null>(null)

  const steps = [
    { Icon: IconCrate, panel: 'var(--gold)', title: t('setup.step1.title'), text: t('setup.step1.text') },
    { Icon: IconCamera, panel: 'var(--red)', title: t('setup.step2.title'), text: t('setup.step2.text') },
    { Icon: IconTap, panel: 'var(--leaf)', title: t('setup.step3.title'), text: t('setup.step3.text') },
  ]

  const clean = names.map((n) => n.trim()).filter(Boolean)
  const ready = clean.length > 0

  if (handoff) {
    return (
      <div className="app">
        <main className="main no-nav welcome">
          <header className="band">
            <h1 className="banner gold">{t('setup.allSet')}</h1>
          </header>
          <div className="section handoff">
            <p className="handoff-big">{t('setup.giveTo', { names: joinNames(handoff) })}</p>
            <p className="lead">{t('setup.thenFood')}</p>
          </div>
          <div className="section welcome-form">
            <button className="btn red" onClick={() => { finishSetup(handoff); go('add') }}>
              {t('setup.ready')} <IconNext />
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
          <h1 className="banner">{t('setup.hello')}</h1>
          <p className="band-sub">{t('setup.intro')}</p>
          <LangToggle />
        </header>

        <ol className="labels welcome-steps" aria-label={t('setup.howItWorks')}>
          {steps.map(({ Icon, panel, title, text }) => (
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
          <fieldset className="field names">
            <legend>{t('setup.kidsLegend')}</legend>
            {names.map((n, i) => (
              <div className="row name-row" key={i}>
                <label className="sr-only" htmlFor={`kid-${i}`}>{t('setup.child', { n: i + 1 })}</label>
                <input
                  id={`kid-${i}`} value={n} maxLength={20} autoComplete="off" placeholder={i === 0 ? t('setup.placeholder1') : t('setup.placeholder2')}
                  onChange={(e) => setNames(names.map((x, j) => (j === i ? e.target.value : x)))}
                />
                {names.length > 1 && (
                  <button type="button" className="icon-btn" aria-label={t('setup.removeChild', { n: i + 1 })} onClick={() => setNames(names.filter((_, j) => j !== i))}>
                    <IconX />
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn-text" onClick={() => setNames([...names, ''])}>
              <IconPlus /> {t('setup.addChild')}
            </button>
          </fieldset>

          <button className={`btn${ready ? ' red' : ''}`} disabled={!ready}>{t('setup.next')} <IconNext /></button>
        </form>
      </main>
    </div>
  )
}
