import { CHARACTERS } from '../data/characters'

const INK = '#3B2F2A'
const SKIN = '#FDE7D4'
const CHEEK = '#F29C8F'

interface Props {
  charKey: string
  width?: number
  showFlag?: boolean
  /** 図鑑の未入手カード用：シルエット表示 */
  silhouette?: boolean
  style?: React.CSSProperties
}

/** オリジナルのちびキャラ武将（旗つき） */
export function Chibi({ charKey, width = 104, showFlag = true, silhouette = false, style }: Props) {
  const c = CHARACTERS[charKey]
  if (!c) return null
  const height = (width * 130) / 120
  const robe = silhouette ? '#CDB9A8' : c.robe
  const hair = silhouette ? '#B6A190' : c.hair
  const skin = silhouette ? '#D8C6B6' : SKIN
  const v = c.variant

  return (
    <svg viewBox="0 0 120 130" width={width} height={height} aria-hidden="true" style={style}>
      {showFlag && (
        <>
          <line x1="92" y1="6" x2="92" y2="120" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M92 8 H118 V44 L111 39 L105 44 L99 39 L92 44 Z" fill={silhouette ? '#B6A190' : c.flagColor} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <text x="105" y="33" fontFamily="Dela Gothic One" fontSize="17" textAnchor="middle" fill="#FFF6EA">
            {silhouette ? '？' : c.flag}
          </text>
        </>
      )}
      {v === 'plume' && !silhouette && (
        <>
          <path d="M46 24 Q30 -2 8 6" fill="none" stroke="#D8402E" strokeWidth="5" strokeLinecap="round" />
          <path d="M64 24 Q80 0 98 -2" fill="none" stroke="#D8402E" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="42" cy="124" rx="10" ry="5" fill={INK} />
      <ellipse cx="68" cy="124" rx="10" ry="5" fill={INK} />
      <path d="M22 96 Q22 78 46 78 H64 Q86 78 86 96 V112 Q86 121 78 121 H30 Q22 121 22 112 Z" fill={robe} stroke={INK} strokeWidth="3.5" />
      <path d="M46 78 L55 92 L64 78" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {v === 'scholar' && !silhouette && (
        <path d="M88 98 L100 66 Q112 56 117 70 Z" fill="#FFF6EA" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      )}
      <circle cx="90" cy="96" r="8" fill={skin} stroke={INK} strokeWidth="3" />

      {v === 'liu' && (
        <>
          <ellipse cx="25" cy="56" rx="5" ry="9" fill={skin} stroke={INK} strokeWidth="3" />
          <ellipse cx="85" cy="56" rx="5" ry="9" fill={skin} stroke={INK} strokeWidth="3" />
        </>
      )}

      <circle cx="55" cy="50" r="30" fill={skin} stroke={INK} strokeWidth="3.5" />

      {v === 'liu' ? (
        <>
          <circle cx="55" cy="16" r="8" fill={hair} stroke={INK} strokeWidth="3" />
          <path d="M25 48 Q26 20 55 20 Q84 20 85 48 Q72 33 55 35 Q38 33 25 48Z" fill={hair} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {!silhouette && <path d="M45 22 Q55 26 65 22" fill="none" stroke="#6DB592" strokeWidth="5" strokeLinecap="round" />}
        </>
      ) : (
        <path d="M24 50 Q24 18 55 18 Q86 18 86 50 Q70 38 55 38 Q40 38 24 50Z" fill={hair} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      )}
      {v === 'cao' && !silhouette && (
        <path d="M55 19 Q50 4 62 2 Q59 10 67 13" fill="#D8402E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      )}
      {v === 'sun' && !silhouette && <circle cx="55" cy="15" r="6" fill="#F4C152" stroke={INK} strokeWidth="3" />}
      {v === 'scholar' && (
        <>
          <rect x="44" y="6" width="22" height="13" rx="3" fill={silhouette ? hair : INK} />
          <rect x="37" y="17" width="36" height="6" rx="3" fill={silhouette ? hair : INK} />
        </>
      )}

      {silhouette ? (
        <text x="55" y="62" fontFamily="Dela Gothic One" fontSize="22" textAnchor="middle" fill="#FFF6EA">？</text>
      ) : (
        <>
          {v === 'liu' ? (
            <>
              <path d="M40 57 Q44 53 48 57" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
              <path d="M62 57 Q66 53 70 57" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {(v === 'cao' || v === 'wild' || v === 'plume') && (
                <path d="M38 50 L49 53 M72 50 L61 53" stroke={INK} strokeWidth="3" strokeLinecap="round" />
              )}
              <ellipse cx="44" cy="56" rx="3.6" ry="4.6" fill={INK} />
              <ellipse cx="66" cy="56" rx="3.6" ry="4.6" fill={INK} />
              <circle cx="45.2" cy="54.4" r="1.3" fill="#fff" />
              <circle cx="67.2" cy="54.4" r="1.3" fill="#fff" />
            </>
          )}
          <ellipse cx="36" cy="64" rx="5" ry="3.2" fill={CHEEK} opacity="0.8" />
          <ellipse cx="74" cy="64" rx="5" ry="3.2" fill={CHEEK} opacity="0.8" />
          {v === 'beard' ? (
            <path d="M40 67 Q55 104 70 67 Q63 74 55 74 Q47 74 40 67Z" fill={hair} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          ) : v === 'wild' ? (
            <path d="M33 62 L37 74 L43 68 L48 79 L55 71 L62 79 L67 68 L73 74 L77 62 Q70 72 55 72 Q40 72 33 62Z" fill={hair} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          ) : (
            <path d="M50 64 Q55 69 60 64" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          )}
        </>
      )}
    </svg>
  )
}
