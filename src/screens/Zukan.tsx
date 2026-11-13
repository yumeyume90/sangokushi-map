import { Chibi } from '../components/Chibi'
import { BottomNav, Gingham, INK } from '../components/parts'
import { CARD_KEYS, CHARACTERS } from '../data/characters'
import { useStore } from '../store'

export function Zukan() {
  const { cards } = useStore()
  return (
    <div className="screen-enter" style={{ position: 'absolute', inset: 0 }}>
      <Gingham height={40} />
      <div style={{ position: 'absolute', left: 12, right: 12, top: 50, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontSize: 11, fontWeight: 800 }}>イベントをクリアして集めよう</span>
          <h1 className="dela" style={{ margin: 0, fontSize: 26, textShadow: '3px 3px 0 #FFF6EA' }}>
            武将図鑑
          </h1>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 800, background: '#FFF6EA', border: `3px solid ${INK}`, borderRadius: 999, padding: '5px 12px', boxShadow: `0 3px 0 ${INK}` }}>
          {cards.length} / {CARD_KEYS.length}枚
        </span>
      </div>

      <div className="scroll-y" style={{ position: 'absolute', left: 0, right: 0, top: 118, bottom: 108, padding: '4px 12px 24px' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          {CARD_KEYS.map((k) => {
            const c = CHARACTERS[k]
            const has = cards.includes(k)
            return (
              <li
                key={k}
                style={{
                  background: has ? '#FFF6EA' : '#EFE4DA',
                  border: `3px solid ${INK}`,
                  borderRadius: 20,
                  boxShadow: `0 4px 0 ${INK}`,
                  padding: '8px 10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div style={{ width: '100%', height: 104, borderRadius: 14, background: has ? c.robe + '55' : '#E3D6CA', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                  <Chibi charKey={k} width={90} silhouette={!has} />
                </div>
                <span className="dela" style={{ fontSize: 17 }}>
                  {has ? c.name : '？？？'}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.5, textAlign: 'center', color: has ? INK : '#7A6A5C' }}>
                  {has ? c.bio : 'まだ出会っていない武将'}
                </span>
              </li>
            )
          })}
        </ul>
        <p style={{ margin: '14px 4px 0', fontSize: 11, fontWeight: 700, color: '#5C4A42' }}>
          物語モードと史実モードで、もらえるカードがちがうイベントもあります。
        </p>
      </div>

      <BottomNav active="zukan" />
    </div>
  )
}
