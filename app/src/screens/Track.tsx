import { Band } from '../components/Shell'
import { IconCamera, IconCheck } from '../components/Icons'
import { TRACK_LENGTH, useStore } from '../store'
import { go } from '../router'

const COLS = 4

/**
 * The tablecloth runs the challenges and senses the toy on every square.
 * Each finished meal moves the toy one square along the track.
 */
export default function Track() {
  const { character, recordPosition, shelveCharacter } = useStore()

  if (!character) {
    return (
      <>
        <Band banner="The track" sub="Our toy travels along the tablecloth" />
        <div className="empty">
          <p>No toy yet. Take a photo of a toy and it will start on the first square.</p>
        </div>
        <div className="dock"><button className="btn" onClick={() => go('capture')}><IconCamera /> Choose our toy</button></div>
      </>
    )
  }

  const len = TRACK_LENGTH
  const pos = Math.min(character.position, len)
  const finished = pos >= len
  const last = character.log[character.log.length - 1]

  // Meal finished: the toy moves one square along the track.
  const mealFinished = () => recordPosition(Math.min(len, pos + 1), false)

  // Board laid out like a snake: rows alternate direction, square 0 is the start.
  const cells = Array.from({ length: len + 1 }, (_, n) => n)
  const rows: number[][] = []
  for (let r = 0; r * COLS < cells.length; r++) {
    const row = cells.slice(r * COLS, r * COLS + COLS)
    rows.push(r % 2 ? row.reverse() : row)
  }

  return (
    <>
      <Band banner={`${character.name}’s trip`} bannerTone="leaf" sub="Finish a meal to move one square." />

      <div className="where">
        <b aria-label={`Square ${pos}`}>{pos}</b>
        <span>{finished ? 'Made it to the end!' : `of ${len} · ${len - pos} to go`}</span>
      </div>

      <div className="trackboard">
        <div className="track-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }} role="img" aria-label={`Track with ${len} squares. ${character.name} is on square ${pos}.`}>
          {rows.flatMap((row, r) => {
            const padded = r % 2 && row.length < COLS ? [...Array(COLS - row.length).fill(-1), ...row] : row
            return padded.map((n, j) => {
              if (n < 0) return <span key={`p${r}-${j}`} />
              const cls = n === 0 ? 'start' : n === len ? 'goal' : `c${n % 4}`
              return (
                <span key={n} className={`sq ${cls}${n < pos && n > 0 ? ' passed' : ''}${n === pos ? ' here' : ''}`}>
                  {n === 0 ? 'START' : n === len ? 'END' : n}
                  {n === pos && <span className="token" key={`${pos}-${character.log.length}`}><img src={character.sticker} alt="" /></span>}
                </span>
              )
            })
          })}
        </div>
      </div>

      {finished && (
        <div className="finish">
          <h2>{character.name} finished the track!</h2>
          <p>Put {character.name} on the shelf, then choose a new toy to play with.</p>
          <button className="btn" onClick={() => { shelveCharacter(); go('capture') }}>
            <IconCheck /> Put on our shelf
          </button>
        </div>
      )}

      <div className="section" style={{ marginTop: 22 }}>
        <p className="muted">
          {last
            ? <>Last meal finished {formatWhen(last.at)}{last.demo && <> · <span className="demo-tag">Demo</span></>}</>
            : 'No meals finished yet. Press “Meal finished” after each meal to move our toy along.'}
        </p>

        {character.log.length > 0 && (
          <>
            <h2 className="h2" style={{ marginTop: 24 }}>Trip so far</h2>
            <ul className="log">
              {character.log.slice(-6).reverse().map((s, i, arr) => {
                const prev = arr[i + 1]?.position
                const d = prev === undefined ? null : s.position - prev
                return (
                  <li key={s.at + i}>
                    <span>{formatWhen(s.at)}</span>
                    <b className={d === null || d === 0 ? '' : d > 0 ? 'up' : 'down'}>
                      Square {s.position}{d ? ` (${d > 0 ? '+' : '−'}${Math.abs(d)})` : ''}
                    </b>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>

      {!finished && (
        <div className="dock">
          <button className="btn ink" onClick={mealFinished}>
            <IconCheck /> Meal finished
          </button>
        </div>
      )}
    </>
  )
}

export function formatWhen(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
