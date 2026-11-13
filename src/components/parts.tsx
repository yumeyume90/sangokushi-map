import { Fragment, type ReactNode } from 'react'
import { CARD_KEYS } from '../data/characters'
import { go, useStore } from '../store'

export const INK = '#3B2F2A'

/** 案内役「まんとう先生」 */
export function Sensei({ width = 82 }: { width?: number }) {
  return (
    <svg viewBox="0 0 130 120" width={width} height={(width * 120) / 130} aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M14 86 Q12 42 65 32 Q118 42 116 86 Q114 106 65 106 Q16 106 14 86Z" fill="#FFF7EC" stroke={INK} strokeWidth="3.5" />
      <path d="M52 38 Q65 22 78 38" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <rect x="54" y="12" width="22" height="13" rx="3" fill={INK} />
      <rect x="47" y="23" width="36" height="6" rx="3" fill={INK} />
      <circle cx="49" cy="67" r="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <circle cx="81" cy="67" r="10" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <path d="M59 67 H71" stroke={INK} strokeWidth="2.5" />
      <circle cx="49" cy="68" r="3.2" fill={INK} />
      <circle cx="81" cy="68" r="3.2" fill={INK} />
      <ellipse cx="33" cy="82" rx="6" ry="3.6" fill="#F29C8F" opacity="0.8" />
      <ellipse cx="97" cy="82" rx="6" ry="3.6" fill="#F29C8F" opacity="0.8" />
      <path d="M58 84 Q65 92 72 84 Z" fill="#E8735A" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

/** 勢力の一文字旗 */
export function Flag({ char, color, size = 26, label }: { char: string; color: string; size?: number; label?: string }) {
  return (
    <svg
      width={size}
      height={(size * 30) / 26}
      viewBox="0 0 26 30"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <line x1="4" y1="2" x2="4" y2="28" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 3 H24 V19 H4 Z" fill={color} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="14" y="16" fontFamily="Dela Gothic One" fontSize="11" textAnchor="middle" fill="#FFF6EA">
        {char}
      </text>
    </svg>
  )
}

/** 一文字の旗ブロック（ボタンの中など） */
export function FlagBlock({ char, color, size = 44 }: { char: string; color: string; size?: number }) {
  return (
    <span
      className="dela"
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: color,
        border: `3px solid ${INK}`,
        color: '#FFF6EA',
        fontSize: size * 0.55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
      }}
    >
      {char}
    </span>
  )
}

/** **強調** を <mark> に、\n を改行にする */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <mark className="hl" key={i}>
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}

export function Lines({ text }: { text: string }) {
  const ls = text.split('\n')
  return (
    <>
      {ls.map((l, i) => (
        <Fragment key={i}>
          {l}
          {i < ls.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  )
}

/** 上部のポイント・カード・モード表示 */
export function StatusBar() {
  const { points, cards, mode, toggleMode } = useStore()
  const pill: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 40,
    padding: '0 10px 0 4px',
    background: '#FFF6EA',
    border: `3px solid ${INK}`,
    borderRadius: 999,
    boxShadow: `0 3px 0 ${INK}`,
  }
  const icon = (bg: string): React.CSSProperties => ({
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: bg,
    border: `2.5px solid ${INK}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
  })
  return (
    <div style={{ position: 'absolute', left: 12, right: 12, top: 50, display: 'flex', gap: 6, alignItems: 'center' }}>
      <div style={pill}>
        <span style={icon('#F4C152')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3 L21 9 L10 20 L4 20 L4 14 Z" fill="#FFF6EA" />
            <path d="M13 5 L19 11" />
          </svg>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontSize: 10, fontWeight: 700 }}>知識pt</span>
          <span style={{ fontSize: 16, fontWeight: 800 }}>{points.toLocaleString()}</span>
        </span>
      </div>
      <button type="button" onClick={() => go('zukan')} className="press" style={{ ...pill, cursor: 'pointer', textAlign: 'left' }} aria-label={`武将カード ${cards.length}枚。図鑑を開く`}>
        <span style={icon('#E8735A')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="6" width="11" height="15" rx="2" fill="#E9D5B4" transform="rotate(-10 9 13)" />
            <rect x="9" y="3" width="11" height="15" rx="2" fill="#FFF6EA" />
          </svg>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontSize: 10, fontWeight: 700 }}>武将カード</span>
          <span style={{ fontSize: 16, fontWeight: 800 }}>
            {cards.length}
            <span style={{ fontSize: 11 }}>/{CARD_KEYS.length}</span>
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={toggleMode}
        className="press"
        aria-label={`モード切り替え：いまは${mode === 'engi' ? '物語モード' : '史実モード'}`}
        style={{
          flex: 'none',
          height: 46,
          padding: '0 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: 1.1,
          background: mode === 'engi' ? '#F4C152' : '#8FA9DF',
          border: `3px solid ${INK}`,
          borderRadius: 16,
          boxShadow: `0 3px 0 ${INK}`,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700 }}>いまのモード ⇄</span>
        <span style={{ fontSize: 14, fontWeight: 800 }}>{mode === 'engi' ? '物語（演義）' : '史実（正史）'}</span>
      </button>
    </div>
  )
}

type Tab = 'map' | 'timeline' | 'zukan' | 'settings'

/** 下部メニュー */
export function BottomNav({ active, badge }: { active: Tab; badge?: Partial<Record<Tab, boolean>> }) {
  const items: { id: Tab; label: string; icon: ReactNode }[] = [
    {
      id: 'map',
      label: '地図',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8 L11 5 L21 8 L29 5 V24 L21 27 L11 24 L3 27 Z" fill="#FFF6EA" />
          <path d="M11 5 V24 M21 8 V27" />
          <circle cx="16" cy="14" r="3" fill="#D8402E" />
        </svg>
      ),
    },
    {
      id: 'timeline',
      label: '年表',
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="4" width="22" height="24" rx="4" fill="#E8735A" />
          <path d="M10 11 H22 M10 16 H22 M10 21 H17" />
        </svg>
      ),
    },
    {
      id: 'zukan',
      label: '図鑑',
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="7" width="15" height="21" rx="3" fill="#8FA9DF" transform="rotate(-8 11 17)" />
          <rect x="13" y="4" width="15" height="21" rx="3" fill="#88C6A6" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: '設定',
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 3 L19 7 L24 6 L25 11 L29 14 L26 18 L27 23 L22 24 L19 29 L16 26 L13 29 L10 24 L5 23 L6 18 L3 14 L7 11 L8 6 L13 7 Z" fill="#E9D5B4" />
          <circle cx="16" cy="16" r="4.5" fill="#FFF6EA" />
        </svg>
      ),
    },
  ]
  return (
    <nav
      aria-label="メインメニュー"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 108,
        background: '#FFF1DE',
        borderTop: `3px solid ${INK}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 8,
        padding: '10px 12px 26px',
        zIndex: 5,
      }}
    >
      {items.map((it) => {
        const on = it.id === active
        return (
          <a
            key={it.id}
            href={`#/${it.id}`}
            aria-current={on ? 'page' : undefined}
            className="press"
            style={{
              position: 'relative',
              marginTop: on ? -22 : 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              background: on ? '#F4C152' : '#FFFFFF',
              border: `3px solid ${INK}`,
              borderRadius: 20,
              boxShadow: `0 ${on ? 5 : 4}px 0 ${INK}`,
              textDecoration: 'none',
              fontSize: on ? 13 : 12,
              fontWeight: 800,
            }}
          >
            {it.icon}
            {it.label}
            {badge?.[it.id] && (
              <span
                aria-label="新しいお知らせあり"
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -6,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#D8402E',
                  border: `2.5px solid ${INK}`,
                  color: '#FFF6EA',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                !
              </span>
            )}
          </a>
        )
      })}
    </nav>
  )
}

/** 上のギンガムチェック帯 */
export function Gingham({ height }: { height: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 390,
        height,
        backgroundColor: '#FBE9DC',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(216,64,46,0.3) 0 9px, transparent 9px 18px), repeating-linear-gradient(90deg, rgba(216,64,46,0.3) 0 9px, transparent 9px 18px)',
      }}
    />
  )
}
