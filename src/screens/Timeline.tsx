import { BottomNav, Gingham, INK } from '../components/parts'
import { CHAPTER, EVENTS } from '../data/events'
import { go, useStore } from '../store'

const ROAD =
  'M50 140 L50 166 C 50 206, 78 206, 78 246 C 78 286, 50 286, 50 326 C 50 366, 78 366, 78 406 C 78 446, 50 446, 50 486 C 50 526, 78 526, 78 566 C 78 608, 50 608, 50 650'

const NODE_COLORS = ['#E9D5B4', '#88C6A6', '#C3ABDB', '#E9D5B4', '#8FA9DF', '#88C6A6', '#E8735A']

export function Timeline() {
  const { cleared, nextIndex, mode, toggleMode, cards, isUnlocked } = useStore()

  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0 }}>
      <Gingham height={40} />

      <div style={{ position: 'absolute', left: 12, right: 12, top: 50, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontSize: 11, fontWeight: 800 }}>
            第{CHAPTER.no}章 {CHAPTER.title}・{CHAPTER.range}
          </span>
          <h1 className="dela" style={{ margin: 0, fontSize: 26, textShadow: '3px 3px 0 #FFF6EA' }}>
            年表
          </h1>
        </div>
        <button
          type="button"
          onClick={toggleMode}
          className="press"
          aria-label="モードを切り替える"
          style={{
            marginLeft: 'auto',
            fontSize: 12,
            fontWeight: 800,
            background: mode === 'engi' ? '#F4C152' : '#8FA9DF',
            border: `3px solid ${INK}`,
            borderRadius: 999,
            padding: '8px 12px',
            boxShadow: `0 3px 0 ${INK}`,
          }}
        >
          {mode === 'engi' ? '物語（演義）' : '史実（正史）'} ⇄
        </button>
      </div>

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width="140" height="720" viewBox="0 0 140 720" aria-hidden="true">
        <path d={ROAD} fill="none" stroke={INK} strokeWidth="24" strokeLinecap="round" />
        <path d={ROAD} fill="none" stroke="#E9D5B4" strokeWidth="17" strokeLinecap="round" />
        <path d={ROAD} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 9" strokeLinecap="round" />
      </svg>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {EVENTS.map((e, i) => {
          const done = e.id in cleared
          const current = nextIndex === i
          const locked = !isUnlocked(i)
          const top = 134 + i * 80
          const nodeLeft = i % 2 === 0 ? 22 : 50
          const cardLeft = i % 2 === 0 ? 112 : 116
          return (
            <li key={e.id}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: nodeLeft,
                  top: top + 4,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: locked ? '#D9CFC4' : NODE_COLORS[i],
                  border: `3px solid ${INK}`,
                  boxShadow: current ? `0 0 0 5px #FFF6EA, 0 0 0 8px ${INK}` : `0 4px 0 ${INK}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 800 }}>{e.year}</span>
                <span style={{ fontSize: 9, fontWeight: 800 }}>年</span>
              </div>
              <button
                type="button"
                disabled={locked}
                onClick={() => go(`event/${e.id}`)}
                className={locked ? undefined : 'press'}
                aria-label={`${e.year}年 ${e.title}${done ? '（クリア済み）' : current ? '（挑戦する）' : locked ? '（まだ遊べません）' : ''}`}
                style={{
                  position: 'absolute',
                  left: cardLeft,
                  right: 12,
                  top,
                  height: 64,
                  padding: '8px 46px 8px 12px',
                  background: current ? '#F4C152' : locked ? '#EFE4DA' : '#FFF6EA',
                  border: `3px ${e.engiOnly ? 'dashed' : 'solid'} ${INK}`,
                  borderRadius: 18,
                  boxShadow: `0 4px 0 ${INK}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: 2,
                  textAlign: 'left',
                  cursor: locked ? 'default' : 'pointer',
                  opacity: locked ? 0.75 : 1,
                }}
              >
                {current && <span style={{ fontSize: 10, fontWeight: 800, color: '#8A2A1A' }}>いまここ・次のイベント</span>}
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800 }}>{e.title}</span>
                  {e.engiOnly && (
                    <span style={{ fontSize: 10, fontWeight: 800, background: '#F4C152', border: `2px solid ${INK}`, borderRadius: 999, padding: '0 7px' }}>演義のみ</span>
                  )}
                </span>
                {!current && <span style={{ fontSize: 11, fontWeight: 700 }}>{locked ? '？？？' : e.short}</span>}
                {done && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 13,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2.5px solid #D8402E',
                      color: '#D8402E',
                      fontFamily: "'Dela Gothic One', sans-serif",
                      fontSize: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `rotate(${[-12, 8, -6, 10, -14, 6, -8][i]}deg)`,
                    }}
                  >
                    済
                  </span>
                )}
                {current && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 12,
                      height: 34,
                      padding: '0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      background: '#D9573F',
                      color: '#FFF6EA',
                      border: `3px solid ${INK}`,
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    挑戦
                  </span>
                )}
                {locked && (
                  <svg aria-hidden="true" style={{ position: 'absolute', right: 12, top: 17 }} width="22" height="24" viewBox="0 0 22 24" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
                    <rect x="3" y="10" width="16" height="12" rx="3" fill="#FFF6EA" />
                    <path d="M7 10 V7 a4 4 0 0 1 8 0 V10" />
                  </svg>
                )}
              </button>
            </li>
          )
        })}
      </ol>

      <p style={{ position: 'absolute', left: 12, right: 12, top: 704, margin: 0, fontSize: 10, fontWeight: 700, color: '#5C4A42', textAlign: 'right' }}>
        <span style={{ background: '#F4C152', border: `1.5px solid ${INK}`, borderRadius: 999, padding: '0 5px' }}>演義のみ</span> ＝ 物語だけの名場面。歴史書には出てこない
      </p>

      <BottomNav active="timeline" badge={{ zukan: cards.length > 0 }} />
    </div>
  )
}
