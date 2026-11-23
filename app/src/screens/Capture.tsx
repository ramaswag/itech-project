import { useEffect, useRef, useState } from 'react'
import { Band } from '../components/Shell'
import { IconCamera, IconCheck, IconRedo, IconUpload } from '../components/Icons'
import { ACCENTS, makeSticker, type Accent } from '../lib/stylize'
import { useStore } from '../store'
import { useI18n } from '../i18n'
import type { Key } from '../i18n/en'
import { go } from '../router'

type CamState = 'starting' | 'live' | 'blocked'

/** Choosing the toy comes after the meal is entered: the toy is for the tablecloth, not the menu. */
export default function Capture() {
  const { menu, addCharacter } = useStore()
  const { t } = useI18n()
  const video = useRef<HTMLVideoElement>(null)
  const stream = useRef<MediaStream | null>(null)
  const [cam, setCam] = useState<CamState>('starting')
  const [shot, setShot] = useState<HTMLCanvasElement | null>(null)
  const [accent, setAccent] = useState<Accent>('red')
  const [sticker, setSticker] = useState<{ dataUrl: string; cutout: boolean } | null>(null)
  const [name, setName] = useState('')

  const stop = () => { stream.current?.getTracks().forEach((tr) => tr.stop()); stream.current = null }

  useEffect(() => {
    if (shot) return
    let cancelled = false
    setCam('starting')
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false })
      .then((s) => {
        if (cancelled) { s.getTracks().forEach((tr) => tr.stop()); return }
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

  // With a menu on the plate the next step is dinner; from the shelf with no menu, start a meal.
  const save = () => {
    if (!sticker || !name.trim()) return
    addCharacter(name.trim(), sticker.dataUrl)
    go(menu.items.length ? 'dinner' : 'add')
  }

  const back = menu.items.length ? 'story' : 'shelf'

  const fileInput = (
    <label className="btn plain" style={{ cursor: 'pointer' }}>
      <IconUpload /> {t('capture.upload')}
      <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => fromFile(e.target.files?.[0])} />
    </label>
  )

  if (!shot) {
    return (
      <>
        <Band banner={t('capture.title')} back={back} onBack={() => go(back)} sub={t('capture.sub')} />
        <div className="viewfinder">
          <video ref={video} playsInline muted aria-label={t('capture.cameraAria')} />
          {cam !== 'live' && (
            <div className="vf-msg">
              {cam === 'starting' ? t('capture.cam.starting') : t('capture.cam.blocked')}
            </div>
          )}
          <div className="corners" aria-hidden="true" />
        </div>
        <p className="section lead">{t('capture.tip')}</p>
        <div className="dock">
          {cam === 'live' && <button className="btn red" onClick={snap}><IconCamera /> {t('capture.take')}</button>}
          {fileInput}
        </div>
      </>
    )
  }

  return (
    <>
      <Band banner={t('capture.player')} bannerTone="gold" back={back} onBack={() => { setShot(null); setSticker(null) }} sub={t('capture.playerSub')} />
      <div className="sticker-stage">
        {sticker && <img key={sticker.dataUrl.length + accent} src={sticker.dataUrl} alt={t('capture.stickerAlt', { name: name || t('capture.yourToy') })} />}
      </div>
      {sticker && !sticker.cutout && (
        <p className="section muted" style={{ marginBottom: 12 }}>{t('capture.noCutout')}</p>
      )}
      <div className="section stack">
        <div className="field" role="group" aria-labelledby="ink-label">
          <span id="ink-label">{t('capture.ink')}</span>
          <div className="swatches">
            {(Object.keys(ACCENTS) as Accent[]).map((a) => (
              <button
                key={a} className="swatch" aria-pressed={accent === a} aria-label={t(`capture.ink.${a}` as Key)}
                style={{ background: `rgb(${ACCENTS[a].join(',')})` }} onClick={() => setAccent(a)}
              />
            ))}
          </div>
        </div>
        <label className="field">
          {t('capture.nameLabel')}
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder={t('capture.namePlaceholder')} autoComplete="off" enterKeyHint="done" />
        </label>
      </div>
      <div className="dock">
        <button className="btn red" onClick={save} disabled={!name.trim()}>
          <IconCheck /> {name.trim() ? t('capture.save') : t('capture.nameFirst')}
        </button>
        <button className="btn-text" onClick={() => { setShot(null); setSticker(null) }}><IconRedo /> {t('capture.again')}</button>
      </div>
    </>
  )
}
