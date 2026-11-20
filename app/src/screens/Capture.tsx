import { useEffect, useRef, useState } from 'react'
import { Band } from '../components/Shell'
import { IconCamera, IconCheck, IconRedo, IconUpload } from '../components/Icons'
import { ACCENTS, makeSticker, type Accent } from '../lib/stylize'
import { useStore } from '../store'
import { go } from '../router'

type CamState = 'starting' | 'live' | 'blocked'

export default function Capture() {
  const { character, addCharacter } = useStore()
  const video = useRef<HTMLVideoElement>(null)
  const stream = useRef<MediaStream | null>(null)
  const [cam, setCam] = useState<CamState>('starting')
  const [shot, setShot] = useState<HTMLCanvasElement | null>(null)
  const [accent, setAccent] = useState<Accent>('red')
  const [sticker, setSticker] = useState<{ dataUrl: string; cutout: boolean } | null>(null)
  const [name, setName] = useState('')

  const stop = () => { stream.current?.getTracks().forEach((t) => t.stop()); stream.current = null }

  useEffect(() => {
    if (shot) return
    let cancelled = false
    setCam('starting')
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false })
      .then((s) => {
        if (cancelled) { s.getTracks().forEach((t) => t.stop()); return }
        stream.current = s
        if (video.current) { video.current.srcObject = s; video.current.play().catch(() => {}) }
        setCam('live')
      })
      .catch(() => !cancelled && setCam('blocked'))
    if (!navigator.mediaDevices?.getUserMedia) setCam('blocked')
    return () => { cancelled = true; stop() }
  }, [shot])

  useEffect(() => {
    if (!shot) return
    setSticker(makeSticker(shot, shot.width, shot.height, accent))
  }, [shot, accent])

  const snap = () => {
    const v = video.current
    if (!v || !v.videoWidth) return
    const c = document.createElement('canvas')
    c.width = v.videoWidth; c.height = v.videoHeight
    c.getContext('2d')!.drawImage(v, 0, 0)
    stop()
    setShot(c)
  }

  const fromFile = (file: File | undefined) => {
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth; c.height = img.naturalHeight
      c.getContext('2d')!.drawImage(img, 0, 0)
      URL.revokeObjectURL(img.src)
      stop()
      setShot(c)
    }
    img.src = URL.createObjectURL(file)
  }

  const save = () => {
    if (!sticker || !name.trim()) return
    addCharacter(name.trim(), sticker.dataUrl)
    go('add')
  }

  const fileInput = (
    <label className="btn plain" style={{ cursor: 'pointer' }}>
      <IconUpload /> Use a photo instead
      <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => fromFile(e.target.files?.[0])} />
    </label>
  )

  if (!shot) {
    return (
      <>
        <Band banner="Choose our toy" back={character ? 'track' : 'tonight'} sub="Take a photo of the toy you’ll play with" />
        <div className="viewfinder">
          <video ref={video} playsInline muted aria-label="Camera preview" />
          {cam !== 'live' && (
            <div className="vf-msg">
              {cam === 'starting' ? 'Starting the camera…' : 'The camera isn’t available. You can choose a photo instead.'}
            </div>
          )}
          <div className="corners" aria-hidden="true" />
        </div>
        <p className="section lead">Put your toy on a plain table or a sheet of paper, close up and in the middle.</p>
        <div className="dock">
          {cam === 'live' && <button className="btn red" onClick={snap}><IconCamera /> Take the photo</button>}
          {fileInput}
        </div>
      </>
    )
  }

  return (
    <>
      <Band banner="Our player" bannerTone="gold" back="tonight" onBack={() => { setShot(null); setSticker(null) }} sub="The toy, printed as a game piece" />
      <div className="sticker-stage">
        {sticker && <img key={sticker.dataUrl.length + accent} src={sticker.dataUrl} alt={`Printed sticker of ${name || 'your toy'}`} />}
      </div>
      {sticker && !sticker.cutout && (
        <p className="section muted" style={{ marginBottom: 12 }}>We couldn’t cut your toy out from the background, so the whole photo is printed. A plain background works better.</p>
      )}
      <div className="section stack">
        <div className="field" role="group" aria-labelledby="ink-label">
          <span id="ink-label">Pick its ink</span>
          <div className="swatches">
            {(Object.keys(ACCENTS) as Accent[]).map((a) => (
              <button
                key={a} className="swatch" aria-pressed={accent === a} aria-label={{ red: 'Red', gold: 'Yellow', leaf: 'Green' }[a]}
                style={{ background: `rgb(${ACCENTS[a].join(',')})` }} onClick={() => setAccent(a)}
              />
            ))}
          </div>
        </div>
        <label className="field">
          What’s its name?
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="Captain Banana" autoComplete="off" enterKeyHint="done" />
        </label>
      </div>
      <div className="dock">
        <button className="btn red" onClick={save} disabled={!name.trim()}>
          <IconCheck /> {name.trim() ? 'Start on square one' : 'Give it a name first'}
        </button>
        <button className="btn-text" onClick={() => { setShot(null); setSticker(null) }}><IconRedo /> Take another photo</button>
      </div>
    </>
  )
}
