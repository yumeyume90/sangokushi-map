import { Chibi } from '../components/Chibi'
import { INK, Sensei } from '../components/parts'
import type { Mode } from '../data/events'
import { go, useStore } from '../store'

export function Top() {
  const { mode, setMode, cleared } = useStore()
  const started = Object.keys(cleared).length > 0

  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0 }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 390,
          height: 132,
          backgroundColor: '#FBE9DC',
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(216,64,46,0.32) 0 10px, transparent 10px 20px), repeating-linear-gradient(90deg, rgba(216,64,46,0.32) 0 10px, transparent 10px 20px)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 122,
          width: 390,
          height: 20,
          backgroundImage: 'radial-gradient(circle at 10px 0, transparent 10px, #F7D6C4 10.5px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div style={{ position: 'absolute', left: 16, top: 54, right: 16, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 999, padding: '6px 16px', fontWeight: 800, fontSize: 13, boxShadow: `0 3px 0 ${INK}` }}>
          ゼロから遊べる 歴史マップゲーム
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="dela" style={{ margin: 0, fontSize: 66, lineHeight: 1, letterSpacing: 2, textShadow: '5px 5px 0 #E8A58D' }}>
          三国志
        </h1>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'block', width: 34, height: 3, background: INK, borderRadius: 2 }} />
          <span className="dela" style={{ fontSize: 34, letterSpacing: 8, textShadow: '3px 3px 0 #FFF6EA' }}>
            マップ
          </span>
          <span style={{ display: 'block', width: 34, height: 3, background: INK, borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', left: 22, top: 282, width: 346, height: 186 }}>
        <div style={{ position: 'absolute', left: 6, top: 120, width: 334, height: 64, background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: '50%', boxShadow: '0 6px 0 #E8A58D' }} />
        <Chibi charKey="cao" style={{ position: 'absolute', left: 0, top: 18 }} />
        <Chibi charKey="liu" style={{ position: 'absolute', left: 242, top: 18 }} />
        <Chibi charKey="sun" style={{ position: 'absolute', left: 121, top: 0 }} />
        <div className="bounce" style={{ position: 'absolute', left: 118, top: 104 }}>
          <Sensei width={110} />
        </div>
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, top: 484, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>遊び方をえらぼう</h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 8h13l-3-3" />
              <path d="M20 16H7l3 3" />
            </svg>
            あとから切り替えOK
          </span>
        </div>
        <ModeButton
          value="engi"
          current={mode}
          onPick={setMode}
          title="物語モード"
          tag="（演義）"
          desc="名場面たっぷりのドラマ版"
          iconBg="#E8735A"
          icon={
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 7 Q11 4 16 8 Q21 4 27 7 V25 Q21 22 16 26 Q11 22 5 25 Z" fill="#FFF6EA" />
              <path d="M16 8 V26" />
              <path d="M22 2 L23.4 5.2 L27 5.6 L24.3 7.8 L25 11 L22 9.4 L19 11 L19.7 7.8 L17 5.6 L20.6 5.2 Z" fill="#F4C152" strokeWidth="1.8" />
            </svg>
          }
        />
        <ModeButton
          value="seishi"
          current={mode}
          onPick={setMode}
          title="史実モード"
          tag="（正史）"
          desc="歴史書に残る ほんとの記録"
          iconBg="#6F8FD0"
          icon={
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
              <rect x="7" y="5" width="18" height="22" rx="2" fill="#FFF6EA" />
              <path d="M5 5 H27" />
              <path d="M5 27 H27" />
              <path d="M12 11 V21" />
              <path d="M16 11 V21" />
              <path d="M20 11 V17" />
            </svg>
          }
        />
      </div>

      <button
        type="button"
        onClick={() => go('map')}
        className="press dela"
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 714,
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: '#D9573F',
          color: '#FFF6EA',
          border: `3px solid ${INK}`,
          borderRadius: 999,
          boxShadow: `0 7px 0 ${INK}`,
          fontSize: 26,
          letterSpacing: 4,
        }}
      >
        {started ? 'つづきから' : 'はじめる'}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFF6EA" aria-hidden="true">
          <path d="M7 4 L20 12 L7 20 Z" />
        </svg>
      </button>
      <p style={{ position: 'absolute', left: 0, right: 0, top: 798, margin: 0, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#5C4A42' }}>
        第1章 184年 黄巾の乱 〜 208年 赤壁の戦い
      </p>
    </div>
  )
}

function ModeButton(props: {
  value: Mode
  current: Mode
  onPick: (m: Mode) => void
  title: string
  tag: string
  desc: string
  icon: React.ReactNode
  iconBg: string
}) {
  const on = props.value === props.current
  return (
    <button
      type="button"
      onClick={() => props.onPick(props.value)}
      aria-pressed={on}
      className="press"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '12px 14px',
        textAlign: 'left',
        background: on ? '#F4C152' : '#FFF6EA',
        border: `3px solid ${INK}`,
        borderRadius: 20,
        boxShadow: `0 5px 0 ${INK}`,
      }}
    >
      <span style={{ flex: 'none', width: 52, height: 52, borderRadius: 16, background: props.iconBg, border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {props.icon}
      </span>
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 17, fontWeight: 800 }}>
          {props.title} <span style={{ fontSize: 13 }}>{props.tag}</span>
        </span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{props.desc}</span>
      </span>
      <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '50%', border: `3px solid ${INK}`, background: on ? INK : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#FFF6EA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8.5 L6.5 12 L13 4.5" />
        </svg>
      </span>
    </button>
  )
}
