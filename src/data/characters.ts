// 登場人物（ちびキャラの見た目と、図鑑カードの説明）

export type CharVariant = 'cao' | 'sun' | 'liu' | 'beard' | 'plume' | 'scholar' | 'wild' | 'plain'

export interface Character {
  key: string
  name: string
  /** 旗に書く一文字 */
  flag: string
  robe: string
  hair: string
  flagColor: string
  variant: CharVariant
  /** 図鑑カードの一言紹介 */
  bio: string
}

export const CHARACTERS: Record<string, Character> = {
  cao: {
    key: 'cao', name: '曹操', flag: '曹', robe: '#6F8FD0', hair: '#4E6DAE', flagColor: '#4E6DAE', variant: 'cao',
    bio: '北をまとめあげた実力者。のちの「魏」の土台をつくる。',
  },
  sun: {
    key: 'sun', name: '孫権', flag: '孫', robe: '#E8735A', hair: '#C9533C', flagColor: '#C9533C', variant: 'sun',
    bio: '江南（長江の南）を治める若き君主。のちの「呉」の皇帝。',
  },
  liu: {
    key: 'liu', name: '劉備', flag: '劉', robe: '#6DB592', hair: '#4A3A33', flagColor: '#4C9271', variant: 'liu',
    bio: '人柄で人を集めた苦労人。のちの「蜀」の皇帝。耳が大きかったと伝わる。',
  },
  guanyu: {
    key: 'guanyu', name: '関羽', flag: '関', robe: '#4C9271', hair: '#3B2F2A', flagColor: '#2F6B50', variant: 'beard',
    bio: '劉備の義弟。長く美しいひげと、義理がたさで有名。',
  },
  zhangfei: {
    key: 'zhangfei', name: '張飛', flag: '張', robe: '#5E7F6E', hair: '#3B2F2A', flagColor: '#3E5A4B', variant: 'wild',
    bio: '劉備の義弟。豪快で力持ち。大声で敵をふるえあがらせた。',
  },
  zhangjiao: {
    key: 'zhangjiao', name: '張角', flag: '黄', robe: '#F4C152', hair: '#7A6A5C', flagColor: '#C9962B', variant: 'beard',
    bio: '黄巾の乱のリーダー。太平道という宗教の教祖。',
  },
  dongzhuo: {
    key: 'dongzhuo', name: '董卓', flag: '董', robe: '#9C7BC0', hair: '#3B2F2A', flagColor: '#7D5DA6', variant: 'beard',
    bio: '都を乗っとった暴君。皇帝を思いのままにあやつった。',
  },
  lubu: {
    key: 'lubu', name: '呂布', flag: '呂', robe: '#D8402E', hair: '#3B2F2A', flagColor: '#A8301F', variant: 'plume',
    bio: '三国志最強といわれる武将。でも主君を何度も裏切った。',
  },
  yuanshao: {
    key: 'yuanshao', name: '袁紹', flag: '袁', robe: '#B79AD1', hair: '#3B2F2A', flagColor: '#7D5DA6', variant: 'plain',
    bio: '名門出身の大勢力。反董卓連合の盟主。',
  },
  sunjian: {
    key: 'sunjian', name: '孫堅', flag: '孫', robe: '#E8735A', hair: '#3B2F2A', flagColor: '#C9533C', variant: 'plain',
    bio: '孫権の父。董卓軍の華雄を討った勇猛な武将。',
  },
  zhuge: {
    key: 'zhuge', name: '諸葛亮', flag: '亮', robe: '#FFF6EA', hair: '#3B2F2A', flagColor: '#4C9271', variant: 'scholar',
    bio: '劉備の軍師。字（あざな）は孔明。「天下三分の計」を説いた。',
  },
  zhouyu: {
    key: 'zhouyu', name: '周瑜', flag: '周', robe: '#F0907A', hair: '#3B2F2A', flagColor: '#C9533C', variant: 'plain',
    bio: '呉の総司令官。赤壁の戦いで曹操軍をやぶった立役者。',
  },
}

/** 図鑑に並ぶカード（集める対象） */
export const CARD_KEYS = ['zhangjiao', 'liu', 'zhangfei', 'guanyu', 'dongzhuo', 'lubu', 'sunjian', 'cao', 'zhuge', 'zhouyu']
