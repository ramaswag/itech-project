import { useEffect, useState } from 'react'
import { Band } from '../components/Shell'
import { IconNext } from '../components/Icons'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/en'
import { go } from '../router'

const PARAGRAPHS: Key[] = ['story.p1', 'story.p2', 'story.p3', 'story.p4']
const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'

/** A short story the kids read, or listen to, before dinner. Placeholder copy lives in the i18n dictionaries. */
export default function Story() {
  const { character } = useStore()
  const { t, locale } = useI18n()
  const [speaking, setSpeaking] = useState(false)

  // Stop reading aloud when leaving the screen or switching language.
  useEffect(() => () => { if (canSpeak()) window.speechSynthesis.cancel() }, [])

  const listen = () => {
    if (!canSpeak()) return
    const synth = window.speechSynthesis
    if (speaking) { synth.cancel(); setSpeaking(false); return }
    const u = new SpeechSynthesisUtterance(PARAGRAPHS.map((k) => t(k)).join(' '))
    u.lang = locale
    u.rate = 0.9
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    synth.speak(u)
  }

  const next = () => {
    if (canSpeak()) window.speechSynthesis.cancel()
    go(character ? 'tap' : 'capture')
  }

  return (
    <>
      <Band banner={t('story.title')} back="tonight" onBack={() => go('tonight')} sub={t('story.sub')} />
      <article className="section story">
        {PARAGRAPHS.map((k) => <p key={k}>{t(k)}</p>)}
      </article>
      <div className="dock">
        <button className="btn red" onClick={next}>{character ? t('story.nextTap') : t('story.next')} <IconNext /></button>
        {canSpeak() && (
          <button className="btn plain" onClick={listen} aria-pressed={speaking}>{speaking ? t('story.stop') : t('story.listen')}</button>
        )}
      </div>
    </>
  )
}
