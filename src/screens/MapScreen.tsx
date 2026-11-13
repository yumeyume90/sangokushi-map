import { BottomNav, Flag, INK, StatusBar } from '../components/parts'
import { CHAPTER, EVENTS, POINTS_RIGHT } from '../data/events'
import { FACTION_COLOR, REGIONS, SNAPSHOTS } from '../data/map'
import { useStore } from '../store'

export function MapScreen() {
  const { cleared, nextIndex, cards } = useStore()
  const doneCount = Object.keys(cleared).length
  const next = nextIndex === null ? null : EVENTS[nextIndex]
  const snap = SNAPSHOTS[next ? next.snapshot : 'y208']
  const caption = next ? snap.caption : '208年 第1章クリア！'

  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0 }}>
      <StatusBar />

      {/* 章の進み具合 */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          top: 108,
          padding: 10,
          paddingLeft: 12,
          paddingRight: 12,
          background: '#FFF6EA',
          border: `3px solid ${INK}`,
          borderRadius: 22,
          boxShadow: `0 4px 0 ${INK}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: INK, color: '#FFF6EA', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 8 }}>第{CHAPTER.no}章</span>
          <span className="dela" style={{ fontSize: 18 }}>
            {CHAPTER.title}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 800 }}>
            {doneCount}
            <span style={{ fontSize: 11 }}>/{EVENTS.length}話</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${EVENTS.length}, minmax(0, 1fr))`, gap: 4 }} aria-hidden="true">
          {EVENTS.map((e) => (
            <span
              key={e.id}
              style={{
                height: 10,
                borderRadius: 5,
                background: e.id in cleared ? '#6DB592' : '#FFFFFF',
                border: `2px ${e.id in cleared ? 'solid' : 'dashed'} ${INK}`,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#FBE3D3', borderRadius: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" aria-hidden="true" style={{ flex: 'none' }}>
            <circle cx="12" cy="12" r="9" fill="#FFF6EA" />
            <circle cx="12" cy="12" r="5" fill="#E8735A" />
            <circle cx="12" cy="12" r="1.5" fill={INK} />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 800 }}>
            {next ? `ミニ目標：「${next.title}」の問題に答える` : `史実モードでもう一周して、カードを集めよう（${cards.length}枚）`}
          </span>
          {next && (
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 800, background: '#F4C152', border: `2px solid ${INK}`, borderRadius: 999, padding: '1px 7px', whiteSpace: 'nowrap' }}>
              +{POINTS_RIGHT}pt
            </span>
          )}
        </div>
      </div>

      {/* 地図 */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 232,
          width: 366,
          height: 480,
          border: `3px solid ${INK}`,
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: '#B4DCDA',
          backgroundImage: 'radial-gradient(circle at 6px 6px, rgba(255,255,255,0.55) 2px, transparent 2.5px)',
          backgroundSize: '22px 18px',
          boxShadow: `0 5px 0 ${INK}`,
        }}
      >
        <div style={{ position: 'absolute', left: -20, top: -10, width: 370, height: 500, background: '#F3E3C7', borderRadius: '40% 30% 46% 38% / 30% 26% 40% 46%' }} />

        {REGIONS.map((r) => {
          const st = snap.regions[r.id] ?? { f: 'other' }
          return (
            <div
              key={r.id}
              className="region"
              style={{
                position: 'absolute',
                left: r.x,
                top: r.y,
                width: r.w,
                height: r.h,
                background: FACTION_COLOR[st.f],
                border: `3px solid ${INK}`,
                borderRadius: r.radius,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1.15,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: r.small ? 11 : 13, fontWeight: 800 }}>{r.name}</span>
              {st.sub && <span style={{ fontSize: 10, fontWeight: 700 }}>{st.sub}</span>}
            </div>
          )
        })}

        <svg style={{ position: 'absolute', left: 0, top: 0 }} width="360" height="474" viewBox="0 0 360 474" aria-hidden="true">
          <path d="M20 168 C 56 160, 80 54, 118 42 C 156 30, 156 124, 192 150 C 230 176, 280 182, 360 176" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
          <path d="M20 168 C 56 160, 80 54, 118 42 C 156 30, 156 124, 192 150 C 230 176, 280 182, 360 176" fill="none" stroke="#E6C66A" strokeWidth="7" strokeLinecap="round" />
          <path d="M0 300 C 50 292, 88 350, 140 356 C 180 360, 200 376, 236 370 C 280 362, 300 372, 360 360" fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" />
          <path d="M0 300 C 50 292, 88 350, 140 356 C 180 360, 200 376, 236 370 C 280 362, 300 372, 360 360" fill="none" stroke="#7FB8DC" strokeWidth="8" strokeLinecap="round" />
          <path d="M30 236 l9 -14 l9 14 z M44 240 l7 -11 l7 11 z" fill="#C9B48F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 110 l9 -14 l9 14 z" fill="#C9B48F" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M300 444 q6 -6 12 0 q6 6 12 0 M318 458 q6 -6 12 0 q6 6 12 0" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <span style={{ position: 'absolute', left: 150, top: 92, fontSize: 10, fontWeight: 800, background: '#FFF6EA', border: `2px solid ${INK}`, borderRadius: 999, padding: '0 6px' }}>黄河</span>
        <span style={{ position: 'absolute', left: 58, top: 318, fontSize: 10, fontWeight: 800, background: '#FFF6EA', border: `2px solid ${INK}`, borderRadius: 999, padding: '0 6px' }}>長江</span>

        {snap.flags.map((f) => (
          <div key={f.char + f.x} style={{ position: 'absolute', left: f.x, top: f.y }}>
            <Flag char={f.char} color={f.color} label={f.label} />
          </div>
        ))}

        {/* クリア済みイベントの小さな判子 */}
        {EVENTS.filter((e) => e.id in cleared && e !== next).map((e) => (
          <a
            key={e.id}
            href={`#/event/${e.id}`}
            aria-label={`${e.title}（クリア済み）をもう一度見る`}
            style={{
              position: 'absolute',
              left: e.pin.x - 11,
              top: e.pin.y - 11,
              width: 22,
              height: 22,
              borderRadius: '50%',
              border: '2px solid #D8402E',
              background: 'rgba(255,246,234,0.7)',
              color: '#D8402E',
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-12deg)',
              textDecoration: 'none',
            }}
          >
            済
          </a>
        ))}

        <div style={{ position: 'absolute', left: 10, top: 10, background: INK, color: '#FFF6EA', borderRadius: 12, padding: '4px 10px', fontSize: 11, fontWeight: 800 }}>{caption}</div>

        {next && <NextPin x={next.pin.x} y={next.pin.y} id={next.id} title={next.title} year={next.year} />}

        <div
          style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            maxWidth: 230,
            gap: 4,
          }}
        >
          {snap.legend.map((l) => (
            <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF6EA', border: `2px solid ${INK}`, borderRadius: 10, padding: '2px 6px', fontSize: 10, fontWeight: 800 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: FACTION_COLOR[l.f], border: `1.5px solid ${INK}` }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <BottomNav active="map" badge={{ zukan: cards.length > 0 }} />
    </div>
  )
}

function NextPin({ x, y, id, title, year }: { x: number; y: number; id: string; title: string; year: number }) {
  const toLeft = x > 180
  const calloutW = 168
  const top = Math.min(Math.max(y - 64, 40), 380)
  const left = toLeft ? x - 22 - calloutW : x + 22
  return (
    <>
      <svg className="bounce" style={{ position: 'absolute', left: x - 20, top: y - 46 }} width="40" height="50" viewBox="0 0 40 50" aria-hidden="true">
        <ellipse cx="20" cy="46" rx="9" ry="3.5" fill={INK} opacity="0.35" />
        <path d="M20 46 C 8 32, 3 24, 3 17 A 17 17 0 0 1 37 17 C 37 24, 32 32, 20 46 Z" fill="#D8402E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="20" cy="17" r="9" fill="#FFF6EA" stroke={INK} strokeWidth="2.5" />
        <path d="M20 11 V18" stroke="#D8402E" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="20" cy="22.5" r="1.9" fill="#D8402E" />
      </svg>
      <a
        href={`#/event/${id}`}
        className="press"
        style={{
          position: 'absolute',
          left,
          top,
          width: calloutW,
          padding: '6px 10px',
          background: '#FFF6EA',
          border: `3px solid ${INK}`,
          borderRadius: 16,
          boxShadow: `0 4px 0 ${INK}`,
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.2,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 800, color: '#B23A28' }}>つぎのイベント ▶ タップ</span>
        <span style={{ fontSize: 15, fontWeight: 800 }}>
          {title} <span style={{ fontSize: 11 }}>{year}年</span>
        </span>
        <span
          style={{
            position: 'absolute',
            top: 10,
            width: 0,
            height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            ...(toLeft ? { right: -12, borderLeft: `12px solid ${INK}` } : { left: -12, borderRight: `12px solid ${INK}` }),
          }}
        />
      </a>
    </>
  )
}
