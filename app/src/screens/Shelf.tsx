import { Band } from '../components/Shell'
import { IconCamera } from '../components/Icons'
import { TRACK_LENGTH, useStore } from '../store'
import { go } from '../router'

export default function Shelf() {
  const { character, state } = useStore()
  const done = state.characters.filter((c) => c.finishedAt)
  const slots = Math.max(6, Math.ceil((done.length + 1) / 3) * 3)
  const planks: (typeof done[number] | null)[][] = []
  for (let i = 0; i < slots; i += 3) planks.push([0, 1, 2].map((j) => done[i + j] ?? null))

  return (
    <>
      <Band banner="Our shelf" sub={done.length ? `${done.length} ${done.length === 1 ? 'toy has' : 'toys have'} finished the track` : 'Toys that finish the track live here'} />

      {character ? (
        <div className="current">
          <img src={character.sticker} alt="" />
          <div>
            <b>{character.name}</b>
            <span>Still travelling · square {character.position} of {TRACK_LENGTH}</span>
          </div>
        </div>
      ) : (
        <div className="section" style={{ marginTop: 20 }}>
          <button className="btn" onClick={() => go('capture')}><IconCamera /> Choose our next toy</button>
        </div>
      )}

      <div className="shelf" aria-label="Finished toys">
        {planks.map((row, r) => (
          <div className="plank" key={r}>
            {row.map((c, j) =>
              c ? (
                <div className="trophy" key={c.id}>
                  <img src={c.sticker} alt="" />
                  <b>{c.name}</b>
                  <small>{new Date(c.finishedAt!).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</small>
                </div>
              ) : (
                <div className="slot-empty" key={`e${r}${j}`} aria-hidden="true" />
              ),
            )}
          </div>
        ))}
      </div>
      {done.length === 0 && (
        <p className="section muted" style={{ marginTop: 16 }}>When your toy reaches the end of the tablecloth track, it comes here and you choose a new one.</p>
      )}
    </>
  )
}
