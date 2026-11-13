// 簡略マップ：州のブロック配置と、年ごとの勢力図
// 座標は地図パネル内（360×474）のpx。実際の地形ではありません。

export type Faction = 'cao' | 'sun' | 'liu' | 'rival' | 'other'

export const FACTION_COLOR: Record<Faction, string> = {
  cao: '#8FA9DF',
  sun: '#F0907A',
  liu: '#88C6A6',
  rival: '#C3ABDB',
  other: '#E9D5B4',
}

export interface Region {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
  radius: string
  small?: boolean
}

export const REGIONS: Region[] = [
  { id: 'liang', name: '涼州', x: 8, y: 70, w: 92, h: 122, radius: '34px 16px 22px 40px' },
  { id: 'bing', name: '并州', x: 110, y: 34, w: 78, h: 100, radius: '26px 30px 18px 22px' },
  { id: 'you', name: '幽州', x: 198, y: 10, w: 132, h: 72, radius: '20px 40px 26px 18px' },
  { id: 'ji', name: '冀州', x: 196, y: 90, w: 90, h: 88, radius: '18px 22px 28px 20px' },
  { id: 'qing', name: '青州', x: 294, y: 108, w: 54, h: 72, radius: '16px 30px 30px 16px' },
  { id: 'sili', name: '司隷', x: 104, y: 144, w: 86, h: 72, radius: '20px 18px 24px 26px' },
  { id: 'yan', name: '兗州', x: 204, y: 186, w: 76, h: 52, radius: '18px' },
  { id: 'xu', name: '徐州', x: 288, y: 188, w: 58, h: 80, radius: '18px 28px 22px 18px' },
  { id: 'yu', name: '豫州', x: 204, y: 246, w: 78, h: 52, radius: '20px 16px 20px 24px' },
  { id: 'yi', name: '益州', x: 8, y: 202, w: 106, h: 150, radius: '26px 20px 30px 44px' },
  { id: 'jing', name: '荊州', x: 122, y: 226, w: 76, h: 120, radius: '22px 18px 30px 24px' },
  { id: 'jiangxia', name: '江夏', x: 204, y: 306, w: 48, h: 46, radius: '16px 20px 18px 14px', small: true },
  { id: 'yang', name: '揚州', x: 262, y: 278, w: 86, h: 140, radius: '20px 34px 40px 22px' },
  { id: 'jiao', name: '交州', x: 160, y: 412, w: 120, h: 52, radius: '18px 24px 30px 30px' },
]

export interface RegionState {
  f: Faction
  sub?: string
}

export interface MapFlag {
  char: string
  color: string
  x: number
  y: number
  label: string
}

export interface Snapshot {
  caption: string
  regions: Record<string, RegionState>
  flags: MapFlag[]
  legend: { f: Faction; label: string }[]
}

const allOther = (): Record<string, RegionState> =>
  Object.fromEntries(REGIONS.map((r) => [r.id, { f: 'other' as Faction }]))

export const SNAPSHOTS: Record<string, Snapshot> = {
  han: {
    caption: '184年 ゆらぐ漢の国',
    regions: allOther(),
    flags: [],
    legend: [{ f: 'other', label: '漢の国' }],
  },
  dong: {
    caption: '189年 董卓が都をにぎる',
    regions: { ...allOther(), sili: { f: 'rival', sub: '董卓' } },
    flags: [{ char: '董', color: '#7D5DA6', x: 150, y: 120, label: '董卓のいる都' }],
    legend: [
      { f: 'rival', label: '董卓' },
      { f: 'other', label: '各地の群雄' },
    ],
  },
  y200: {
    caption: '200年 北で2強がぶつかる',
    regions: {
      liang: { f: 'other', sub: '馬騰・韓遂' },
      bing: { f: 'rival' },
      you: { f: 'rival', sub: '袁紹' },
      ji: { f: 'rival', sub: '袁紹' },
      qing: { f: 'rival' },
      sili: { f: 'cao', sub: '洛陽・長安' },
      yan: { f: 'cao' },
      xu: { f: 'cao' },
      yu: { f: 'cao', sub: '許（都）' },
      yi: { f: 'other', sub: '劉璋' },
      jing: { f: 'other', sub: '劉表' },
      jiangxia: { f: 'other' },
      yang: { f: 'sun', sub: '孫権' },
      jiao: { f: 'other', sub: '士燮' },
    },
    flags: [
      { char: '袁', color: '#7D5DA6', x: 214, y: 96, label: '袁紹の本拠地' },
      { char: '曹', color: '#4E6DAE', x: 230, y: 222, label: '曹操の本拠地' },
      { char: '孫', color: '#C9533C', x: 300, y: 256, label: '孫権の本拠地' },
    ],
    legend: [
      { f: 'cao', label: '曹操' },
      { f: 'rival', label: '袁紹' },
      { f: 'sun', label: '孫権' },
      { f: 'other', label: 'その他' },
    ],
  },
  y207: {
    caption: '207年 曹操が北を統一',
    regions: {
      liang: { f: 'other', sub: '馬騰・韓遂' },
      bing: { f: 'cao' },
      you: { f: 'cao' },
      ji: { f: 'cao' },
      qing: { f: 'cao' },
      sili: { f: 'cao', sub: '洛陽・長安' },
      yan: { f: 'cao' },
      xu: { f: 'cao' },
      yu: { f: 'cao', sub: '許（都）' },
      yi: { f: 'other', sub: '劉璋' },
      jing: { f: 'other', sub: '劉表' },
      jiangxia: { f: 'other' },
      yang: { f: 'sun', sub: '孫権' },
      jiao: { f: 'other', sub: '士燮' },
    },
    flags: [
      { char: '曹', color: '#4E6DAE', x: 230, y: 222, label: '曹操の本拠地' },
      { char: '孫', color: '#C9533C', x: 300, y: 256, label: '孫権の本拠地' },
      { char: '劉', color: '#4C9271', x: 132, y: 232, label: '劉備が身を寄せる荊州' },
    ],
    legend: [
      { f: 'cao', label: '曹操' },
      { f: 'sun', label: '孫権' },
      { f: 'other', label: 'その他' },
    ],
  },
  y208: {
    caption: '208年 赤壁の直前',
    regions: {
      liang: { f: 'other', sub: '馬騰・韓遂' },
      bing: { f: 'cao' },
      you: { f: 'cao' },
      ji: { f: 'cao' },
      qing: { f: 'cao' },
      sili: { f: 'cao', sub: '洛陽・長安' },
      yan: { f: 'cao' },
      xu: { f: 'cao' },
      yu: { f: 'cao', sub: '許（都）' },
      yi: { f: 'other', sub: '劉璋' },
      jing: { f: 'cao', sub: '襄陽' },
      jiangxia: { f: 'liu' },
      yang: { f: 'sun', sub: '柴桑' },
      jiao: { f: 'other', sub: '士燮' },
    },
    flags: [
      { char: '曹', color: '#4E6DAE', x: 230, y: 222, label: '曹操の本拠地' },
      { char: '孫', color: '#C9533C', x: 300, y: 256, label: '孫権の本拠地' },
      { char: '劉', color: '#4C9271', x: 226, y: 286, label: '劉備のいる場所' },
    ],
    legend: [
      { f: 'cao', label: '曹操' },
      { f: 'sun', label: '孫権' },
      { f: 'liu', label: '劉備' },
      { f: 'other', label: 'その他' },
    ],
  },
}
