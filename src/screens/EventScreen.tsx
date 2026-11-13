import { useState } from 'react'
import { Chibi } from '../components/Chibi'
import { FlagBlock, INK, Lines, Rich, Sensei } from '../components/parts'
import { CHARACTERS } from '../data/characters'
import { CHAPTER, EVENTS, type GameEvent, type Hero } from '../data/events'
import { go, useStore, type ClearResult } from '../store'

export function EventScreen({ id }: { id: string }) {
  const index = EVENTS.findIndex((e) => e.id === id)
  const ev = EVENTS[index]
  const { mode, setMode, clearEvent, isUnlocked } = useStore()
  const [result, setResult] = useState<ClearResult | null>(null)

  if (!ev) {
    return <Missing text="このイベントは見つかりませんでした。" />
  }
  if (!isUnlocked(index)) {
    return <Missing text="このイベントはまだ遊べません。前の話をクリアしよう。" />
  }

  const pick = (optId: string) => {
    setResult(clearEvent(ev.id, optId))
  }
  const right = result?.right ?? false
  const engi = mode === 'engi'
  const ex = ev.explain[mode]
  const card = result ? CHARACTERS[result.card] : null

  const senseiLine = !result
    ? ev.senseiIntro
    : right
      ? (ev.senseiRight ?? 'お見事！ よく知ってたね。くわしい話を見てみよう。')
      : (ev.senseiWrong ?? 'おしい！ でも大丈夫。解説を読めばバッチリだよ。')

  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* ヘッダー */}
      <div style={{ flex: 'none', padding: '48px 12px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          type="button"
          onClick={() => go('map')}
          aria-label="地図にもどる"
          className="press"
          style={{ flex: 'none', width: 44, height: 44, borderRadius: '50%', background: '#FFF6EA', border: `3px solid ${INK}`, boxShadow: `0 3px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5 L8 12 L15 19" />
          </svg>
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 800 }}>
            第{CHAPTER.no}章 第{ev.no}話・{ev.year}年
          </span>
          <span className="dela" style={{ fontSize: 20 }}>
            {ev.title}
          </span>
        </div>
        <div role="group" aria-label="解説のモード" style={{ marginLeft: 'auto', display: 'flex', padding: 3, gap: 2, background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 999, flex: 'none' }}>
          <button type="button" onClick={() => setMode('engi')} aria-pressed={engi} style={segStyle(engi, '#F4C152')}>
            物語
          </button>
          <button type="button" onClick={() => setMode('seishi')} aria-pressed={!engi} style={segStyle(!engi, '#8FA9DF')}>
            史実
          </button>
        </div>
      </div>

      {/* 本文（はみ出したらスクロール） */}
      <div className="scroll-y" style={{ flex: 1, padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <HeroCard hero={ev.hero} />

        {ev.engiOnly && !engi && (
          <div style={{ alignSelf: 'center', fontSize: 12, fontWeight: 800, background: '#FFF6EA', border: `2px dashed ${INK}`, borderRadius: 999, padding: '4px 12px' }}>
            この話は「演義のみ」の名場面です
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <Sensei width={82} />
          <div style={{ position: 'relative', flex: 1, background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 20, padding: '8px 12px', marginBottom: 8 }}>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#9A4B2E' }}>まんとう先生</span>
            <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, lineHeight: 1.5 }} aria-live="polite">
              {senseiLine}
            </p>
          </div>
        </div>

        {!result ? (
          <Question ev={ev} onPick={pick} />
        ) : (
          <div
            style={{
              position: 'relative',
              marginTop: 10,
              padding: '16px 16px 14px',
              background: '#FFF6EA',
              border: `3px solid ${INK}`,
              borderRadius: 26,
              boxShadow: `0 5px 0 ${INK}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ paddingRight: 104, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 64 }}>
              <span style={{ fontSize: 12, fontWeight: 800 }}>{ev.resultLead}</span>
              <span className="dela" style={{ fontSize: 22, lineHeight: 1.25 }}>
                <Lines text={ev.resultTitle} />
              </span>
            </div>
            <div
              role="img"
              aria-label={right ? '的中' : '残念'}
              className="stamp-in dela"
              style={
                {
                  '--rot': right ? '-14deg' : '10deg',
                  position: 'absolute',
                  right: 16,
                  top: -14,
                  width: 100,
                  height: 100,
                  borderRadius: right ? '50%' : 22,
                  border: `5px solid ${right ? '#D8402E' : '#4E6DAE'}`,
                  boxShadow: `inset 0 0 0 3px #FFF6EA, inset 0 0 0 6px ${right ? '#D8402E' : '#4E6DAE'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: right ? '#D8402E' : '#4E6DAE',
                  fontSize: 30,
                  background: 'rgba(255,246,234,0.6)',
                } as React.CSSProperties
              }
            >
              {right ? '的中' : '残念'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 800, background: engi ? '#F4C152' : '#8FA9DF', border: `2px solid ${INK}`, borderRadius: 999, padding: '2px 10px' }}>
                {engi ? '物語モード（演義）の解説' : '史実モード（正史）の解説'}
              </span>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: 1.65 }}>
                <Rich text={ex.text} />
              </p>
              <p style={{ margin: 0, padding: '8px 10px', background: '#FBE3D3', borderRadius: 12, fontSize: 12, fontWeight: 700, lineHeight: 1.5 }}>{ex.note}</p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40, background: '#F4C152', border: `3px solid ${INK}`, borderRadius: 14, fontSize: 13, fontWeight: 800 }}>
                {result.firstClear ? `知識pt +${result.gained}` : 'クリア済み'}
              </span>
              <button
                type="button"
                onClick={() => go('zukan')}
                className="press"
                style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40, background: '#F0907A', border: `3px solid ${INK}`, borderRadius: 14, fontSize: 13, fontWeight: 800, boxShadow: `0 3px 0 ${INK}` }}
              >
                {card?.name}カード {result.newCard ? 'GET！' : '（入手済み）'}
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div style={{ flex: 'none', padding: '6px 12px 28px', display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => {
              setResult(null)
            }}
            className="press"
            style={{ flex: 'none', height: 56, padding: '0 16px', fontSize: 14, fontWeight: 800, background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 999, boxShadow: `0 5px 0 ${INK}` }}
          >
            もう一度
          </button>
          <button
            type="button"
            onClick={() => go(index === EVENTS.length - 1 ? 'map' : 'timeline')}
            className="press dela"
            style={{ flex: 1, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#D9573F', color: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 999, boxShadow: `0 5px 0 ${INK}`, fontSize: 19, letterSpacing: 2 }}
          >
            {index === EVENTS.length - 1 ? '地図で結果を見る' : '年表に記録する'}
          </button>
        </div>
      )}
    </div>
  )
}

function segStyle(on: boolean, color: string): React.CSSProperties {
  return {
    height: 34,
    padding: '0 12px',
    border: 'none',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background: on ? color : 'transparent',
    cursor: 'pointer',
  }
}

function HeroCard({ hero }: { hero: Hero }) {
  const frame: React.CSSProperties = {
    position: 'relative',
    flex: 'none',
    height: 172,
    border: `3px solid ${INK}`,
    borderRadius: 26,
    overflow: 'hidden',
    boxShadow: `0 5px 0 ${INK}`,
  }
  if (hero.kind === 'cast') {
    const w = hero.chars.length >= 3 ? 84 : hero.chars.length === 2 ? 96 : 110
    return (
      <div style={{ ...frame, background: hero.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          {hero.chars.map((c) => (
            <Chibi key={c} charKey={c} width={w} />
          ))}
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, background: '#FFF6EA', border: `2px solid ${INK}`, borderRadius: 999, padding: '2px 12px', marginTop: 2 }}>{hero.caption}</span>
      </div>
    )
  }
  const side = (s: typeof hero.left) => (
    <div style={{ position: 'relative', background: s.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
      <div style={{ display: 'flex', height: 100, alignItems: 'flex-end' }}>
        {s.chars.map((c, i) => (
          <Chibi key={c} charKey={c} width={s.chars.length > 1 ? 74 : 92} style={i < s.chars.length - 1 ? { marginRight: -12 } : undefined} />
        ))}
      </div>
      <span style={{ fontSize: 15, fontWeight: 800 }}>{s.label}</span>
      <span style={{ fontSize: 11, fontWeight: 800 }}>{s.note}</span>
    </div>
  )
  return (
    <div style={{ ...frame, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
      {side(hero.left)}
      {side(hero.right)}
      <div
        className="dela"
        style={{ position: 'absolute', left: '50%', top: 52, marginLeft: -30, width: 60, height: 60, borderRadius: '50%', background: '#F4C152', border: `3px solid ${INK}`, boxShadow: `0 4px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, transform: 'rotate(-8deg)' }}
      >
        VS
      </div>
    </div>
  )
}

function Question({ ev, onPick }: { ev: GameEvent; onPick: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 className="dela" style={{ margin: 0, textAlign: 'center', fontSize: 22, lineHeight: 1.35, textShadow: '3px 3px 0 #FFF6EA' }}>
        {ev.question}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {ev.options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className="press"
            style={{
              minHeight: 120,
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: o.bg,
              border: `3px solid ${INK}`,
              borderRadius: 24,
              boxShadow: `0 6px 0 ${INK}`,
            }}
          >
            {o.flags && (
              <span style={{ display: 'flex', gap: 4 }}>
                {o.flags.map((f) => (
                  <FlagBlock key={f.char} char={f.char} color={f.color} />
                ))}
              </span>
            )}
            <span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.35 }}>
              <Lines text={o.label} />
            </span>
          </button>
        ))}
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#5C4A42' }}>当たると 知識pt +30 と 武将カード</p>
    </div>
  )
}

function Missing({ text }: { text: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
      <Sensei width={110} />
      <p style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>{text}</p>
      <button type="button" onClick={() => go('timeline')} className="press" style={{ height: 52, padding: '0 22px', background: '#F4C152', border: `3px solid ${INK}`, borderRadius: 999, boxShadow: `0 5px 0 ${INK}`, fontSize: 15, fontWeight: 800 }}>
        年表へ
      </button>
    </div>
  )
}
