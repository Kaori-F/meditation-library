/* =========================================================
   瞑想図書館 ── 眠る前の小さな絵本
   日英テキスト辞書
   data-i18n="キー" の要素に流し込まれます。
   ========================================================= */

const I18N = {
  ja: {
    // メタ・ナビ
    "nav.concept": "図書館について",
    "nav.luna": "ルナすろーす",
    "nav.shincho": "新章",
    "nav.archive": "アーカイブ",
    "lang.toggle": "EN",

    // ヒーロー
    "hero.kicker": "ビデオポッドキャスト",
    "hero.title": "瞑想図書館",
    "hero.subtitle": "眠る前の小さな絵本",
    "hero.tagline": "今日を閉じる前に、一冊だけ。",
    "hero.scroll": "下へ — 本を開く",
    "hero.ep": "新章 第1夜 配信",

    // 図書館について（入り口）
    "concept.kicker": "図書館について",
    "concept.line1": "一日のおわり。",
    "concept.line2": "灯りをひとつ落として、ページをめくる。",
    "concept.line3": "ここは、眠りの前にひらく小さな図書館。",
    "concept.line4": "絵本のかたちをした、瞑想の時間です。",
    "concept.line5": "目に見えるものだけが、世界のすべてじゃない。",
    "concept.line6": "ナマケモノの歩く速さで、",
    "concept.line7": "「見えない世界」のページを、いっしょにめくっていきます。",

    // 本を開く（演出）
    "openbook.line": "それでは、本を開きましょう",
    "openbook.sub": "ゆっくり、ひと呼吸おいて",

    // ルナすろーす（紹介）
    "luna.kicker": "",
    "luna.name": "ルナすろーす",
    "luna.note": "（なまえは、まだ仮のもの）",
    "luna.body1": "ルナすろーすは、導き手でも先生でもありません。あなたの分身であり、かつての——いまも途上の——わたし自身です。",
    "luna.body3": "夜ごと、ひとつずつ。道の途中を、ただ歩いています。",

    // 新章 ── 絵本シリーズ
    "premiere.kicker": "新章 ── 絵本シリーズ",
    "premiere.lead": "第1夜、はじまります。",
    "premiere.note": "皿を洗うように、心の濁りも、すこしずつ。今夜、絵本シリーズの第1夜がひらきます。",
    "premiere.live": "新章が、はじまりました",
    "cd.days": "日",
    "cd.hours": "時間",
    "cd.mins": "分",
    "cd.secs": "秒",

    // 観られる場所
    "listen.kicker": "観られる場所",
    "listen.soon": "準備中",
    "listen.open": "ひらく",

    // 絵本だな
    "episodes.kicker": "絵本だな",
    "episodes.note": "夜ごとに、一冊ずつ増えていきます。",
    "episodes.soon": "配信予定",
    "episodes.live": "配信中",
    "episodes.more": "これまでの夜を、ひらく",
    "episodes.less": "とじる",

    // これまでの作品（アーカイブ）
    "archive.kicker": "これまでの作品",
    "archive.note": "この図書館にたどり着くまでの、小さな映像たち。",

    // クリエイター
    "creator.kicker": "つくっているひと",
    "creator.name": "Kaori",
    "creator.body1": "アートを通じて「目に見えない世界の法則」を表現する探求者。",
    "creator.body2": "イラスト・アニメーション・NFT。すべての制作は、精神世界への理解を深めるための旅です。",
    "creator.portfolio": "ポートフォリオを見る",

    // しおりを贈る（制作支援）
    "support.kicker": "しおりを贈る",
    "support.lead1": "もし、この夜がすこし心に残ったら。",
    "support.lead2": "次の一冊をつくる灯りを、そっと分けてもらえたら嬉しいです。",
    "support.card": "カードで贈る",
    "support.crypto": "暗号資産で贈る",
    "support.free": "自由な金額で",
    "support.cryptoNote": "ETH・JPYC・USDC など",
    "support.copy": "コピー",
    "support.copied": "コピーしました",
    "support.note": "送り手の情報は決済サービス側で守られ、わたしには届きません。",

    // 通知
    "notify.kicker": "新章のはじまりを、お知らせします",
    "notify.body": "6.26の配信を、静かにお知らせします。",
    "notify.placeholder": "メールアドレス",
    "notify.submit": "登録する",
    "notify.soon": "登録フォームは準備中です。Xのフォローでお知らせを受け取れます。",
    "notify.done": "ありがとうございます。お知らせします。",

    // フッター
    "footer.note": "「ルナすろーす」は仮の名前です。ほんとうの名前は、まだ見えない世界で眠っています。"
  },

  en: {
    "nav.concept": "The Library",
    "nav.luna": "Luna Sloth",
    "nav.shincho": "New Chapter",
    "nav.archive": "Archive",
    "lang.toggle": "日本語",

    "hero.kicker": "A Video Podcast",
    "hero.title": "The Meditation Library",
    "hero.subtitle": "A Little Picture Book Before Sleep",
    "hero.tagline": "Before you close the day — just one book.",
    "hero.scroll": "Scroll — open the book",
    "hero.ep": "New Chapter, Night 1",

    "concept.kicker": "The Library",
    "concept.line1": "The end of a day.",
    "concept.line2": "Dim one light, and turn a page.",
    "concept.line3": "This is a little library you open before sleep.",
    "concept.line4": "A quiet meditation, in the shape of a picture book.",
    "concept.line5": "What you can see is not all there is.",
    "concept.line6": "At the walking pace of a sloth,",
    "concept.line7": "we turn the pages of the unseen world together.",

    "openbook.line": "Now, let us open the book",
    "openbook.sub": "Slowly — take one breath",

    "luna.kicker": "",
    "luna.name": "Luna Sloth",
    "luna.note": "(a provisional name)",
    "luna.body1": "Luna Sloth is not a guide, nor a teacher. She is your other self — and the author as she once was, and still is, somewhere along the way.",
    "luna.body3": "Night after night, one thing at a time. She is simply walking the path.",

    "premiere.kicker": "New Chapter ── The Picture Book Series",
    "premiere.lead": "Night 1 begins.",
    "premiere.note": "Like washing the dishes, the heart clears little by little. Tonight, Night 1 of the picture-book series opens.",
    "premiere.live": "The new chapter has begun",
    "cd.days": "days",
    "cd.hours": "hrs",
    "cd.mins": "min",
    "cd.secs": "sec",

    "listen.kicker": "Where to watch",
    "listen.soon": "Coming soon",
    "listen.open": "Open",

    "episodes.kicker": "The Bookshelf",
    "episodes.note": "Night by night, one book at a time.",
    "episodes.soon": "Coming soon",
    "episodes.live": "Now streaming",
    "episodes.more": "Open the earlier nights",
    "episodes.less": "Close",

    "archive.kicker": "Earlier Works",
    "archive.note": "Small films from the road that led to this library.",

    "creator.kicker": "The creator",
    "creator.name": "Kaori",
    "creator.body1": "An artist exploring the invisible laws of the world through art.",
    "creator.body2": "Illustration, animation, NFT — every work is a journey deeper into the spiritual world.",
    "creator.portfolio": "View portfolio",

    // Send a Bookmark (support)
    "support.kicker": "Send a Bookmark",
    "support.lead1": "If this night lingered with you, even a little —",
    "support.lead2": "I'd be grateful for a small light toward the next book.",
    "support.card": "With a card",
    "support.crypto": "With crypto",
    "support.free": "Choose your amount",
    "support.cryptoNote": "ETH, JPYC, USDC and more",
    "support.copy": "Copy",
    "support.copied": "Copied",
    "support.note": "Your details stay with the payment service — they never reach me.",

    "notify.kicker": "Be notified when the chapter opens",
    "notify.body": "A quiet note when Night 1 arrives on June 26.",
    "notify.placeholder": "Email address",
    "notify.submit": "Notify me",
    "notify.soon": "The form is being prepared. Follow on X for updates.",
    "notify.done": "Thank you. We will let you know.",

    "footer.note": "“Luna Sloth” is a provisional name. Her true name still sleeps in the unseen world."
  }
};
