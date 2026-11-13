import { useState } from 'react'
import { BottomNav, Gingham, INK, Sensei } from '../components/parts'
import { go, useStore } from '../store'

export function Settings() {
  const { mode, setMode, reset, points, cards, cleared } = useStore()
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const card: React.CSSProperties = {
    background: '#FFF6EA',
    border: `3px solid ${INK}`,
    borderRadius: 22,
    boxShadow: `0 4px 0 ${INK}`,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }
  const seg = (on: boolean, color: string): React.CSSProperties => ({
    flex: 1,
    height: 48,
    borderRadius: 14,
    border: `3px solid ${INK}`,
    background: on ? color : '#FFFFFF',
    boxShadow: on ? `0 1px 0 ${INK}` : `0 4px 0 ${INK}`,
    transform: on ? 'translateY(3px)' : undefined,
    fontSize: 14,
    fontWeight: 800,
    cursor: 'pointer',
  })

  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0 }}>
      <Gingham height={40} />
      <h1 className="dela" style={{ position: 'absolute', left: 12, top: 56, margin: 0, fontSize: 26, textShadow: '3px 3px 0 #FFF6EA' }}>
        設定
      </h1>

      <div style={{ position: 'absolute', left: 12, right: 12, top: 110, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <section style={card}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>遊び方（モード）</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" aria-pressed={mode === 'engi'} onClick={() => setMode('engi')} style={seg(mode === 'engi', '#F4C152')}>
              物語（演義）
            </button>
            <button type="button" aria-pressed={mode === 'seishi'} onClick={() => setMode('seishi')} style={seg(mode === 'seishi', '#8FA9DF')}>
              史実（正史）
            </button>
          </div>
        </section>

        <section style={card}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>きろく</h2>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, lineHeight: 1.7 }}>
            クリアした話：{Object.keys(cleared).length}話
            <br />
            知識pt：{points.toLocaleString()}
            <br />
            武将カード：{cards.length}枚
          </p>
          {!confirming ? (
            <button
              type="button"
              onClick={() => {
                setConfirming(true)
                setDone(false)
              }}
              className="press"
              style={{ height: 46, borderRadius: 999, border: `3px solid ${INK}`, background: '#FFFFFF', boxShadow: `0 4px 0 ${INK}`, fontSize: 14, fontWeight: 800 }}
            >
              きろくを最初からにする
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, background: '#FBE3D3', borderRadius: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>本当に消しますか？ もとには戻せません。</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => setConfirming(false)} className="press" style={{ flex: 1, height: 44, borderRadius: 999, border: `3px solid ${INK}`, background: '#FFFFFF', boxShadow: `0 3px 0 ${INK}`, fontSize: 13, fontWeight: 800 }}>
                  やめる
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset()
                    setConfirming(false)
                    setDone(true)
                  }}
                  className="press"
                  style={{ flex: 1, height: 44, borderRadius: 999, border: `3px solid ${INK}`, background: '#D9573F', color: '#FFF6EA', boxShadow: `0 3px 0 ${INK}`, fontSize: 13, fontWeight: 800 }}
                >
                  消す
                </button>
              </div>
            </div>
          )}
          {done && (
            <span role="status" style={{ fontSize: 12, fontWeight: 800, color: '#4C9271' }}>
              きろくを最初からにしました。
            </span>
          )}
        </section>

        <button
          type="button"
          onClick={() => go('')}
          className="press"
          style={{ height: 52, borderRadius: 999, border: `3px solid ${INK}`, background: '#F4C152', boxShadow: `0 5px 0 ${INK}`, fontSize: 15, fontWeight: 800 }}
        >
          タイトル画面へ
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <Sensei width={64} />
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, lineHeight: 1.6, color: '#5C4A42' }}>
            地図は州ごとの簡略マップで、実際の地形ではありません。登場人物の絵はオリジナルです。
          </p>
        </div>
      </div>

      <BottomNav active="settings" />
    </div>
  )
}
