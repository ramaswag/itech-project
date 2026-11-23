import { useState } from 'react'
import { Band } from '../components/Shell'
import { IconCheck } from '../components/Icons'
import { TRACK_LENGTH, useStore } from '../store'
import { useI18n } from '../i18n'
import { go } from '../router'

/**
 * After dinner the family says which square the toy ended on.
 * Stand-in until the tablecloth reports the square itself over NFC (see `readPosition` in lib/nfc.ts).
 */
export default function Result() {
  const { character, recordPosition, shelveCharacter } = useStore()
  const { t } = useI18n()
  const [pick, setPick] = useState<number>(() => Math.min(TRACK_LENGTH, (character?.position ?? 0) + 1))
  const [saved, setSaved] = useState<number | null>(null)

  if (!character) {
    return (
      <>
        <Band banner={t('result.title')} back="tonight" onBack={() => go('tonight')} />
        <div className="empty"><p>{t('result.noToy')}</p></div>
      </>
    )
  }

  const squares = Array.from({ length: TRACK_LENGTH + 1 }, (_, n) => n)
  const finished = saved !== null && saved >= TRACK_LENGTH

  const confirm = () => {
    recordPosition(pick, false)
    setSaved(pick)
  }

  if (saved !== null) {
    return (
      <>
        <Band banner={finished ? t('result.finished', { name: character.name }) : t('result.title')} bannerTone="leaf" />
        <div className="section stack" style={{ marginTop: 20 }}>
          <div className="current">
            <img src={character.sticker} alt="" />
            <div>
              <b>{character.name}</b>
              <span>{finished ? t('result.finishedText', { name: character.name }) : t('result.saved', { name: character.name, n: saved })}</span>
            </div>
          </div>
        </div>
        <div className="dock">
          {finished ? (
            <button className="btn red" onClick={() => { shelveCharacter(); go('shelf') }}>
              <IconCheck /> {t('result.toShelf')}
            </button>
          ) : (
            <button className="btn red" onClick={() => go('tonight')}>{t('result.backToStart')}</button>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Band banner={t('result.title')} bannerTone="leaf" back="tap" onBack={() => go('tap')} sub={t('result.sub', { name: character.name })} />
      <div className="section" style={{ marginTop: 20 }}>
        <div className="pick-grid" role="radiogroup" aria-label={t('result.groupAria')}>
          {squares.map((n) => (
            <button key={n} role="radio" aria-checked={pick === n} onClick={() => setPick(n)} className={n === 0 || n === TRACK_LENGTH ? 'edge' : undefined}>
              <b>{n}</b>
              {n === 0 && <small>{t('result.startSquare')}</small>}
              {n === TRACK_LENGTH && <small>{t('result.endSquare')}</small>}
            </button>
          ))}
        </div>
      </div>
      <div className="dock">
        <button className="btn red" onClick={confirm}><IconCheck /> {t('result.confirm')} · {t('result.square')} {pick}</button>
      </div>
    </>
  )
}
