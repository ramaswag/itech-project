/**
 * Web NFC bridge to the tablecloth. Web NFC exists only in Chrome on Android;
 * everywhere else the UI offers a clearly labelled demo instead.
 *
 * Assumed protocol (the tablecloth firmware is not defined yet):
 * - phone -> cloth: one MIME record, application/json, the menu payload below
 * - cloth -> phone: one MIME record, application/json, { position: number } (the toy's square, 0-10)
 */

interface NdefRecordInit { recordType: string; mediaType?: string; data?: BufferSource | string }
interface NdefReaderLike {
  write(message: { records: NdefRecordInit[] }, options?: { signal?: AbortSignal }): Promise<void>
  scan(options?: { signal?: AbortSignal }): Promise<void>
  onreading: ((e: { message: { records: { mediaType?: string; data?: DataView }[] } }) => void) | null
  onreadingerror: (() => void) | null
}

declare global {
  interface Window { NDEFReader?: new () => NdefReaderLike }
}

/**
 * NFC is deliberately disabled: always false, so every screen takes its labelled demo path
 * and no NDEFReader call is ever made. To re-enable real scanning, restore:
 *   typeof window !== 'undefined' && 'NDEFReader' in window
 */
export const nfcSupported = () => false

export interface MenuPayload {
  type: 'menu'
  date: string
  meal: string
  kids: string[]
  character?: string
  foods: { id: string; name: string }[]
}

export async function writeMenu(payload: MenuPayload, signal: AbortSignal) {
  const Reader = window.NDEFReader!
  const r = new Reader()
  await r.write(
    { records: [{ recordType: 'mime', mediaType: 'application/json', data: new TextEncoder().encode(JSON.stringify(payload)) }] },
    { signal },
  )
}

/** Read the toy's square from the tablecloth. Not used yet: until NFC is on, the Result screen asks the family for the square.  The cloth runs the challenges and detects the toy on each square. */
export function readPosition(signal: AbortSignal): Promise<number> {
  return new Promise((resolve, reject) => {
    const r = new window.NDEFReader!()
    r.onreading = (e) => {
      for (const rec of e.message.records) {
        if (rec.mediaType === 'application/json' && rec.data) {
          try {
            const body = JSON.parse(new TextDecoder().decode(rec.data))
            if (typeof body.position === 'number') return resolve(body.position)
          } catch { /* keep scanning */ }
        }
      }
    }
    r.onreadingerror = () => reject(new Error('unreadable'))
    signal.addEventListener('abort', () => reject(new Error('aborted')))
    r.scan({ signal }).catch(reject)
  })
}
