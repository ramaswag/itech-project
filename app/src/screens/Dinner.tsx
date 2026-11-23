import { Band } from '../components/Shell'
import { IconCheck } from '../components/Icons'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import { go } from '../router'

/** The game happens on the paper board at the table; this screen just waits until dinner is over. */
export default function Dinner() {
  const { character, menu, markSent } = useStore()
  const { t } = useI18n()

  if (!menu.items.length) {
    go('tonight')
    return null
  }

  const finish = () => {
    markSent('demo')
    go('result')
  }

  return (
    <>
      <Band banner={t('dinner.title')} bannerTone="leaf" back="tonight" onBack={() => go('tonight')} sub={t('dinner.sub')} />
      {character && (
        <div className="sticker-stage">
          <img src={character.sticker} alt={character.name} />
        </div>
      )}
      <p className="section lead">{t('dinner.text', { name: character?.name ?? '' })}</p>
      <div className="dock">
        <button className="btn red" onClick={finish}><IconCheck /> {t('dinner.done')}</button>
      </div>
    </>
  )
}
