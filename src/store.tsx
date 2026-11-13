import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { EVENTS, POINTS_RIGHT, POINTS_WRONG, type Mode } from './data/events'

// 画面の切り替え（URLの # で管理するので、ブラウザの戻るも効く）
export type Route =
  | { name: 'top' }
  | { name: 'map' }
  | { name: 'timeline' }
  | { name: 'zukan' }
  | { name: 'settings' }
  | { name: 'event'; id: string }

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '')
  if (h.startsWith('event/')) return { name: 'event', id: h.slice(6) }
  if (h === 'map' || h === 'timeline' || h === 'zukan' || h === 'settings') return { name: h }
  return { name: 'top' }
}

export function go(path: string) {
  window.location.hash = '/' + path
}

interface Progress {
  mode: Mode
  points: number
  /** クリアしたイベントID → 予想が当たったか */
  cleared: Record<string, boolean>
  cards: string[]
}

const KEY = 'sangokushi-map:v1'
const initial: Progress = { mode: 'engi', points: 0, cleared: {}, cards: [] }

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initial
    return { ...initial, ...JSON.parse(raw) }
  } catch {
    return initial
  }
}

export interface ClearResult {
  right: boolean
  gained: number
  card: string
  newCard: boolean
  firstClear: boolean
}

interface Store extends Progress {
  setMode: (m: Mode) => void
  toggleMode: () => void
  clearEvent: (id: string, picked: string) => ClearResult
  reset: () => void
  /** 次に挑戦するイベント（全部クリアなら null） */
  nextIndex: number | null
  isUnlocked: (index: number) => boolean
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<Progress>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p))
    } catch {
      /* 保存できない環境では何もしない */
    }
  }, [p])

  const setMode = useCallback((mode: Mode) => setP((s) => ({ ...s, mode })), [])
  const toggleMode = useCallback(() => setP((s) => ({ ...s, mode: s.mode === 'engi' ? 'seishi' : 'engi' })), [])
  const reset = useCallback(() => setP((s) => ({ ...initial, mode: s.mode })), [])

  const clearEvent = useCallback(
    (id: string, picked: string): ClearResult => {
      const ev = EVENTS.find((e) => e.id === id)!
      const right = picked === ev.answer
      const card = ev.card[p.mode]
      const firstClear = !(id in p.cleared)
      const gained = firstClear ? (right ? POINTS_RIGHT : POINTS_WRONG) : 0
      const newCard = !p.cards.includes(card)
      setP((s) => ({
        ...s,
        points: s.points + gained,
        cleared: { ...s.cleared, [id]: firstClear ? right : s.cleared[id] || right },
        cards: s.cards.includes(card) ? s.cards : [...s.cards, card],
      }))
      return { right, gained, card, newCard, firstClear }
    },
    [p],
  )

  const nextIndex = useMemo(() => {
    const i = EVENTS.findIndex((e) => !(e.id in p.cleared))
    return i === -1 ? null : i
  }, [p.cleared])

  const isUnlocked = useCallback(
    (index: number) => index === 0 || EVENTS[index - 1].id in p.cleared,
    [p.cleared],
  )

  const value: Store = { ...p, setMode, toggleMode, clearEvent, reset, nextIndex, isUnlocked }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('StoreProvider がありません')
  return s
}
