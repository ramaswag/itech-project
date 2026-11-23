import { Band } from '../components/Shell'
import { IconCamera } from '../components/Icons'
import { TRACK_LENGTH, useStore } from '../store'
import { useI18n } from '../i18n'
import { go } from '../router'

export default function Shelf() {
  const { character, state } = useStore()
  const { t, locale } = useI18n()
  const done = state.characters.filter((c) => c.finishedAt)
  const slots = Math.max(6, Math.ceil((done.length + 1) / 3) * 3)
  const planks: (typeof done[number] | null)[][] = []
  for (let i = 0; i < slots; i += 3) planks.push([0, 1, 2].map((j) => done[i + j] ?? null))

  const sub = done.length === 0 ? t('shelf.subNone') : done.length === 1 ? t('shelf.subOne') : t('shelf.subMany', { n: done.length })

  return (
    <>
      <Band banner={t('shelf.title')} sub={sub} />

      {character ? (
        <div className="current">
          <img src={character.sticker} alt="" />
          <div>
            <b>{character.name}</b>
            <span>{t('shelf.travelling', { pos: character.position, len: TRACK_LENGTH })}</span>
          </div>
        </div>
      ) : (
        <div className="section" style={{ marginTop: 20 }}>
          <button className="btn" onClick={() => go('capture')}><IconCamera /> {t('shelf.chooseNext')}</button>
        </div>
      )}

      <div className="shelf" aria-label={t('shelf.finishedAria')}>
        {planks.map((row, r) => (
          <div className="plank" key={r}>
            {row.map((c, j) =>
              c ? (
                <div className="trophy" key={c.id}>
                  <img src={c.sticker} alt="" />
                  <b>{c.name}</b>
                  <small>{new Date(c.finishedAt!).toLocaleDateString(locale, { day: 'numeric', month: 'short' })}</small>
                </div>
              ) : (
                <div className="slot-empty" key={`e${r}${j}`} aria-hidden="true" />
              ),
            )}
          </div>
        ))}
      </div>
      {done.length === 0 && (
        <p className="section muted" style={{ marginTop: 16 }}>{t('shelf.hint')}</p>
      )}
    </>
  )
}
