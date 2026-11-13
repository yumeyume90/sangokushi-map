// 第1章「群雄割拠」7話ぶんのイベントデータ
// 解説文の **ことば** は強調表示になります。

export type Mode = 'engi' | 'seishi'

export interface Side {
  label: string
  note: string
  bg: string
  chars: string[]
}

export type Hero =
  | { kind: 'vs'; left: Side; right: Side }
  | { kind: 'cast'; bg: string; chars: string[]; caption: string }

export interface Option {
  id: string
  label: string
  /** ボタンに並べる旗（勢力の一文字） */
  flags?: { char: string; color: string }[]
  bg: string
}

export interface Explain {
  text: string
  note: string
}

export interface GameEvent {
  id: string
  no: number
  year: number
  title: string
  /** 年表に出す一行説明 */
  short: string
  engiOnly?: boolean
  /** 地図のピン位置（地図パネル内px） */
  pin: { x: number; y: number }
  snapshot: string
  hero: Hero
  senseiIntro: string
  senseiRight?: string
  senseiWrong?: string
  question: string
  options: [Option, Option]
  answer: string
  resultLead: string
  resultTitle: string
  explain: Record<Mode, Explain>
  card: Record<Mode, string>
}

export const CHAPTER = { no: 1, title: '群雄割拠', range: '184〜208年' }

export const EVENTS: GameEvent[] = [
  {
    id: 'kokin',
    no: 1,
    year: 184,
    title: '黄巾の乱',
    short: '黄色い頭巾の反乱軍。漢の国がゆらぎだす',
    pin: { x: 241, y: 128 },
    snapshot: 'han',
    hero: { kind: 'cast', bg: '#F4C152', chars: ['zhangjiao'], caption: '黄色い頭巾の反乱軍が いっせいに蜂起！' },
    senseiIntro: '漢の国はゆらいでいた。そこへ黄色い頭巾をつけた人たちが、各地でいっせいに立ちあがったよ。',
    question: 'リーダーの張角は、どうやって仲間を集めた？',
    options: [
      { id: 'a', label: '病気を治す\n宗教の教え', bg: '#FFF6EA' },
      { id: 'b', label: '大金を\nばらまいた', bg: '#FFF6EA' },
    ],
    answer: 'a',
    resultLead: '正解は…',
    resultTitle: '病気を治す\n宗教の教え',
    explain: {
      engi: {
        text: '張角は仙人から授かった不思議な書で**妖術**を使い、病人を治して信者を集めました。この乱をしずめる戦いの中で、劉備・関羽・張飛が世に出ていきます。',
        note: '史実モードにすると、張角の正体がもう少し現実的に…？',
      },
      seishi: {
        text: '張角は**太平道**という宗教の教祖。病人に罪をざんげさせ、お札を浸した水を飲ませて治すと説き、数十万の信者を集めて184年に蜂起しました。',
        note: '張角はこの年のうちに病死。乱はしずまっても、討伐で力をつけた群雄が各地に生まれます。',
      },
    },
    card: { engi: 'zhangjiao', seishi: 'zhangjiao' },
  },
  {
    id: 'touen',
    no: 2,
    year: 184,
    title: '桃園の誓い',
    short: '劉備・関羽・張飛が 桃の下で兄弟の契り',
    engiOnly: true,
    pin: { x: 264, y: 42 },
    snapshot: 'han',
    hero: { kind: 'cast', bg: '#F7C6CF', chars: ['guanyu', 'liu', 'zhangfei'], caption: '満開の桃の花の下で…' },
    senseiIntro: '黄巾の乱のさなか、義勇兵をつのる立て札の前で、3人の男が出会ったよ。',
    question: '劉備・関羽・張飛は、どんな関係になった？',
    options: [
      { id: 'a', label: '義兄弟の\n契りを結んだ', bg: '#FFF6EA' },
      { id: 'b', label: 'その場で\nケンカ別れ', bg: '#FFF6EA' },
    ],
    answer: 'a',
    resultLead: '正解は…',
    resultTitle: '義兄弟の\n契り！',
    explain: {
      engi: {
        text: '桃の花が満開の庭で、3人は「生まれた日はちがっても、死ぬときは同じ日に」と誓い、**義兄弟**になりました。長兄が劉備、次が関羽、末っ子が張飛です。',
        note: '史実モードに切り替えると…この名場面、実は…？',
      },
      seishi: {
        text: '実はこの名場面、正史には出てきません。ただ「劉備は関羽・張飛と同じ寝床で眠り、**兄弟のように**親しかった」という記録は残っています。',
        note: '演義は、この記録をふくらませて名場面にしたんだね。',
      },
    },
    card: { engi: 'zhangfei', seishi: 'liu' },
  },
  {
    id: 'tokutaku',
    no: 3,
    year: 189,
    title: '董卓の専横',
    short: '董卓が都を乗っとり やりたい放題',
    pin: { x: 147, y: 176 },
    snapshot: 'dong',
    hero: { kind: 'cast', bg: '#C9B6DE', chars: ['dongzhuo', 'lubu'], caption: '都を乗っとった暴君と 最強の武将' },
    senseiIntro: '都の洛陽が大混乱。そのすきに、西の将軍・董卓が大軍をつれて乗りこんできたよ。',
    question: '都に入った董卓は、何をした？',
    options: [
      { id: 'a', label: '皇帝を\n勝手に入れかえた', bg: '#FFF6EA' },
      { id: 'b', label: 'みんなに慕われる\n名君になった', bg: '#FFF6EA' },
    ],
    answer: 'a',
    resultLead: '正解は…',
    resultTitle: '皇帝を\n入れかえた！',
    explain: {
      engi: {
        text: '董卓は名馬・赤兎馬などを贈って最強の武将**呂布**を味方に引き入れ、少帝をやめさせて献帝を立てました。都はやりたい放題の恐怖政治に。',
        note: '呂布が赤兎馬につられて寝返る話は、演義の名場面です。',
      },
      seishi: {
        text: '189年、董卓は洛陽に入って少帝を廃し、**献帝**を立てて実権をにぎりました。呂布が元の主君・丁原を殺して董卓についたのも史実です。',
        note: '赤兎馬で呂布を釣った、という話は演義の脚色です。',
      },
    },
    card: { engi: 'lubu', seishi: 'dongzhuo' },
  },
  {
    id: 'hantoku',
    no: 4,
    year: 190,
    title: '反董卓連合',
    short: '各地の群雄が手を組み 董卓に挑む',
    pin: { x: 242, y: 206 },
    snapshot: 'dong',
    hero: {
      kind: 'vs',
      left: { label: '反董卓連合', note: '各地の群雄', bg: '#E9D5B4', chars: ['yuanshao', 'sunjian'] },
      right: { label: '董卓軍', note: '都をにぎる', bg: '#C9B6DE', chars: ['dongzhuo'] },
    },
    senseiIntro: '「董卓をたおせ！」と、各地の群雄が手を組んだよ。でも、まとめ役はだれだろう？',
    question: '連合軍のリーダー（盟主）になったのは？',
    options: [
      { id: 'a', label: '名門の袁紹', flags: [{ char: '袁', color: '#7D5DA6' }], bg: '#FFF6EA' },
      { id: 'b', label: 'まだ無名の劉備', flags: [{ char: '劉', color: '#4C9271' }], bg: '#FFF6EA' },
    ],
    answer: 'a',
    resultLead: '正解は…',
    resultTitle: '名門の\n袁紹！',
    explain: {
      engi: {
        text: '連合軍では、関羽が董卓軍の猛将・華雄を「酒が冷めないうちに」討ち取る大活躍。虎牢関では劉備・関羽・張飛の3人が最強の**呂布**と戦います。',
        note: '史実モードにすると、華雄を討った人が別人に…？',
      },
      seishi: {
        text: '華雄を討ったのは、実は**孫堅**（孫権の父）。連合軍は足並みがそろわず、董卓は洛陽を焼きはらって長安へ移りました。',
        note: '虎牢関で三兄弟が呂布と戦う場面も、演義の創作です。',
      },
    },
    card: { engi: 'guanyu', seishi: 'sunjian' },
  },
  {
    id: 'kanto',
    no: 5,
    year: 200,
    title: '官渡の戦い',
    short: '曹操が袁紹をやぶり 北の覇者に',
    pin: { x: 196, y: 196 },
    snapshot: 'y200',
    hero: {
      kind: 'vs',
      left: { label: '曹操軍', note: '兵は少なめ', bg: '#8FA9DF', chars: ['cao'] },
      right: { label: '袁紹軍', note: '北の大勢力', bg: '#C9B6DE', chars: ['yuanshao'] },
    },
    senseiIntro: '北の覇者を決める大決戦！ 兵の数では、袁紹のほうがずっと多かったんだ。',
    question: '勝つのはどっちだと思う？',
    options: [
      { id: 'a', label: '曹操軍', flags: [{ char: '曹', color: '#4E6DAE' }], bg: '#8FA9DF' },
      { id: 'b', label: '袁紹軍', flags: [{ char: '袁', color: '#7D5DA6' }], bg: '#C9B6DE' },
    ],
    answer: 'a',
    resultLead: '勝ったのは…',
    resultTitle: '曹操軍！',
    senseiRight: 'お見事！ 少ない兵で大軍に勝つ、曹操の名勝負だよ。',
    explain: {
      engi: {
        text: '曹操のもとに身を寄せていた**関羽**が、袁紹軍の猛将・顔良と文醜を討ち取る大活躍。最後は寝返った許攸の情報で、曹操が袁紹軍の兵糧を焼きはらいます。',
        note: '史実モードで、関羽の手がらを見くらべてみよう。',
      },
      seishi: {
        text: '曹操は、袁紹の部下だった**許攸**の寝返りで兵糧の置き場（烏巣）を知り、焼きはらって大逆転。関羽が顔良を討ったのは史実です。',
        note: '文醜まで関羽が討つのは、演義の脚色です。',
      },
    },
    card: { engi: 'cao', seishi: 'cao' },
  },
  {
    id: 'sanko',
    no: 6,
    year: 207,
    title: '三顧の礼',
    short: '劉備が3回たずねて 諸葛亮を仲間に',
    pin: { x: 160, y: 280 },
    snapshot: 'y207',
    hero: { kind: 'cast', bg: '#BFE0C9', chars: ['liu', 'zhuge'], caption: '「伏龍」とよばれた天才をさがして' },
    senseiIntro: '荊州に身を寄せていた劉備。近くに天才がいると聞いて、会いに行くことにしたよ。',
    question: '諸葛亮を仲間にするため、劉備は何回たずねた？',
    options: [
      { id: 'a', label: '1回', bg: '#FFF6EA' },
      { id: 'b', label: '3回', bg: '#FFF6EA' },
    ],
    answer: 'b',
    resultLead: '正解は…',
    resultTitle: '3回！',
    explain: {
      engi: {
        text: '1回目と2回目は留守。3回目は昼寝中で、劉備は起きるまで外でじっと待ちました。感激した諸葛亮は「**天下三分の計**」を語り、仲間になります。',
        note: '待たされた張飛が「家に火をつけて起こそう」と怒るのも見どころ。',
      },
      seishi: {
        text: '諸葛亮自身が、のちに書いた「**出師表**」で「先帝（劉備）は三度、わたしの草ぶきの家を訪ねてくれた」とふり返っています。',
        note: '留守や昼寝のくわしい話は、演義の脚色です。',
      },
    },
    card: { engi: 'zhuge', seishi: 'zhuge' },
  },
  {
    id: 'sekiheki',
    no: 7,
    year: 208,
    title: '赤壁の戦い',
    short: '曹操 VS 孫権・劉備',
    pin: { x: 198, y: 370 },
    snapshot: 'y208',
    hero: {
      kind: 'vs',
      left: { label: '曹操軍', note: '号して 80万の大軍', bg: '#8FA9DF', chars: ['cao'] },
      right: { label: '孫権・劉備 連合', note: '約5万', bg: 'linear-gradient(90deg, #F0907A 50%, #88C6A6 50%)', chars: ['sun', 'liu'] },
    },
    senseiIntro: '北をまとめた曹操が、大軍で南へ！ 長江のほとりで孫権と劉備が手を組んで迎え撃つよ。',
    senseiRight: 'お見事！ 少ない軍が大軍に勝った、三国志でいちばん有名な逆転劇だよ。',
    senseiWrong: 'おしい！ 80万の大軍でも負けることがあるんだ。理由を見てみよう。',
    question: '勝つのはどっちだと思う？',
    options: [
      { id: 'a', label: '曹操軍', flags: [{ char: '曹', color: '#4E6DAE' }], bg: '#8FA9DF' },
      { id: 'b', label: '孫権・劉備 連合', flags: [{ char: '孫', color: '#C9533C' }, { char: '劉', color: '#4C9271' }], bg: '#FFF6EA' },
    ],
    answer: 'b',
    resultLead: '勝ったのは…',
    resultTitle: '孫権・劉備\n連合！',
    explain: {
      engi: {
        text: '諸葛亮（孔明）が祭壇で祈ると、冬なのに**東南の風**が吹きはじめた！ その風に乗った火の船が突っこみ、曹操の大船団は炎に包まれました。',
        note: '史実モードに切り替えると、主役が別の人に…？',
      },
      seishi: {
        text: '連合軍を指揮したのは呉の**周瑜**。部下の黄蓋の火攻めで曹操軍の船を焼き、疫病にも苦しんだ曹操は北へ引き返しました。',
        note: '諸葛亮が風を呼ぶ話は、演義の脚色です。',
      },
    },
    card: { engi: 'zhuge', seishi: 'zhouyu' },
  },
]

export const POINTS_RIGHT = 30
export const POINTS_WRONG = 10
