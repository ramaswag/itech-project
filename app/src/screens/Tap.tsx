import { MEAL_LABEL } from '../data/meals'
import { useEffect, useRef, useState } from 'react'
import { Band } from '../components/Shell'
import { Art, itemView } from '../components/FoodLabel'
import { IconCheck, IconTap } from '../components/Icons'
import { useStore } from '../store'
import { nfcSupported, writeMenu, type MenuPayload } from '../lib/nfc'
import { go } from '../router'

type Phase = 'ready' | 'holding' | 'sent' | 'error'

export default function Tap() {
  const { menu, kids, character, markSent } = useStore()
  const supported = nfcSupported()
  const [phase, setPhase] = useState<Phase>(menu.sentAt ? 'sent' : 'ready')
  const [error, setError] = useState('')
  const abort = useRef<AbortController | null>(null)

  useEffect(() => () => abort.current?.abort(), [])

  if (!menu.items.length) {
    go('tonight')
    return null
  }

  const payload: MenuPayload = {
    type: 'menu',
    date: menu.date,
    meal: menu.meal,
    kids: kids.map((k) => k.name),
    character: character?.name,
    foods: menu.items.map((it) => ({ id: it.foodId ?? 'custom', name: itemView(it).name })),
  }

  const send = async () => {
    setPhase('holding')
    setError('')
    if (!supported) {
      // Labelled demo: pretend the tablecloth answered after a moment.
      window.setTimeout(() => { markSent('demo'); setPhase('sent') }, 1400)
      return
    }
    abort.current = new AbortController()
    const timer = window.setTimeout(() => abort.current?.abort(), 20000)
    try {
      await writeMenu(payload, abort.current.signal)
      markSent('nfc')
      setPhase('sent')
    } catch (e) {
      const name = (e as Error).name
      setError(
        name === 'NotAllowedError' ? 'The phone didn’t allow NFC. Ask a grown-up to turn on NFC and allow it for this site.'
          : name === 'AbortError' ? 'Nothing was found. Hold the phone flat on the crate square of the tablecloth and try again.'
            : 'That didn’t work. Hold the phone still on the crate square and try again.',
      )
      setPhase('error')
    } finally {
      window.clearTimeout(timer)
    }
  }

  const cancel = () => { abort.current?.abort(); setPhase('ready') }

  return (
    <>
      <Band banner="Tap the tablecloth" back="tonight" sub={`The ${MEAL_LABEL[menu.meal].toLowerCase()} menu goes to the table`} />

      <div className="cloth" aria-hidden="true"><ClothArt holding={phase === 'holding'} sent={phase === 'sent'} /></div>

      {phase === 'ready' && (
        <div className="section" style={{ marginTop: 18 }}>
          <p className="lead">Put the phone flat on the <b>crate square</b> of the tablecloth, then press the button.</p>
          <ul className="mini-list" aria-label="Foods being sent">
            {menu.items.map((it) => { const v = itemView(it); return <li key={it.key}><Art panel={v.panel} size={22}>{v.art}</Art>{v.name}</li> })}
          </ul>
          {!supported && (
            <p className="note" style={{ marginTop: 16 }}>
              <span className="demo-tag">Demo</span>{' '}
              NFC isn’t switched on yet, so sending is pretend here.
            </p>
          )}
        </div>
      )}

      {phase === 'holding' && (
        <p className="status wait" role="status"><IconTap /> {supported ? 'Hold still… looking for the tablecloth' : 'Demo: sending…'}</p>
      )}
      {phase === 'sent' && (
        <p className="status ok" role="status"><IconCheck /> {menu.sentVia === 'demo' ? `Demo: the tablecloth would now know the ${MEAL_LABEL[menu.meal].toLowerCase()} menu.` : `Sent! The tablecloth knows the ${MEAL_LABEL[menu.meal].toLowerCase()} menu.`}</p>
      )}
      {phase === 'error' && <p className="status err" role="alert">{error}</p>}

      <div className="dock">
        {phase === 'ready' && <button className="btn red" onClick={send}><IconTap /> {supported ? 'Start sending' : 'Send (demo)'}</button>}
        {phase === 'holding' && <button className="btn plain" onClick={cancel}>Stop</button>}
        {phase === 'error' && <button className="btn red" onClick={send}>Try again</button>}
        {phase === 'sent' && (
          <>
            <button className="btn" onClick={() => go('track')}>See my track</button>
            <button className="btn-text" onClick={() => setPhase('ready')}>Send again</button>
          </>
        )}
      </div>
    </>
  )
}

function ClothArt({ holding, sent }: { holding: boolean; sent: boolean }) {
  const colors = ['#e2401c', '#f2b01e', '#2f7d3a', '#dfe9f5']
  const squares = []
  for (let i = 0; i < 9; i++) {
    squares.push(<rect key={i} x={18 + i * 38} y={150} width={38} height={38} fill={colors[i % 4]} stroke="#16285e" strokeWidth={2} />)
  }
  return (
    <svg viewBox="0 0 380 230">
      <rect width="380" height="230" fill="#fffdf8" />
      <g opacity="0.18" stroke="#16285e" strokeWidth="10">
        {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x) => <path key={x} d={`M${x} 0v230`} />)}
        {[20, 60, 100, 140, 180, 220].map((y) => <path key={y} d={`M0 ${y}h380`} />)}
      </g>
      {squares}
      <rect x="150" y="62" width="80" height="62" fill="#16285e" />
      <path d="M150 62l10-16h60l10 16" fill="#f2b01e" stroke="#16285e" strokeWidth="3" strokeLinejoin="round" />
      <text x="190" y="100" textAnchor="middle" fontFamily="Alfa Slab One, serif" fontSize="15" fill="#f2b01e">TAP</text>
      <g className={holding ? 'phone-hover' : undefined} transform={sent ? 'translate(0 8)' : undefined}>
        {holding && <>
          <circle className="phone-wave" cx="190" cy="93" r="56" fill="none" stroke="#e2401c" strokeWidth="4" />
          <circle className="phone-wave w2" cx="190" cy="93" r="56" fill="none" stroke="#e2401c" strokeWidth="4" />
        </>}
        <rect x="236" y="22" width="56" height="104" rx="8" fill={sent ? '#2f7d3a' : '#16285e'} transform="rotate(14 264 74)" />
        <rect x="243" y="32" width="42" height="80" rx="3" fill="#fffdf8" transform="rotate(14 264 74)" />
        {sent && <path d="M252 72l9 9 17-20" stroke="#2f7d3a" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      </g>
    </svg>
  )
}
