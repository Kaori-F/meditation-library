/* =========================================================
   瞑想図書館 ── 眠る前の小さな絵本
   サイト設定ファイル
   ここを書き換えるだけで、リンク・エピソード・日付を更新できます。
   ========================================================= */

const CONFIG = {

  // ---- カバー画像（ヒーローの中心に置く絵本の表紙）----
  // カバー写真.png を assets/img/ に置いて、ここにファイル名を書くだけ。
  // 例: "assets/img/カバー写真.png"
  // 空のあいだは、下の heroSlides（既存画像）が表示されます。
  coverImage: "",

  // ---- ヒーロー背景（この順にゆっくりフェードで切り替わる。先頭が必ず最初に表示）----
  // pos はスマホ等で切り取られるときの表示位置（主役が切れないよう調整）
  heroSlides: [
    { src: "assets/img/hero_01.jpg", pos: "center" },     // 1. ランタンのトンネル（先頭・最初に必ず表示）
    { src: "assets/img/hero_02.jpg", pos: "center" },     // 2. 大聖堂の窓と星空を見上げる
    { src: "assets/img/hero_03.jpg", pos: "72% center" }, // 3. 朝の光が差す窓辺（主役が右寄り）
    { src: "assets/img/hero_04.jpg", pos: "center" },     // 4. 本が宙に浮かぶ幻想的な図書館
    { src: "assets/img/hero_05.jpg", pos: "center" },     // 5. 書棚の前に立つ親密な情景
    { src: "assets/img/hero_06.jpg", pos: "34% center" }  // 6. 草原で満月の下、本を読む（主役が左寄り）
  ],

  // ---- （旧設定・フォールバック用に残置。今はepisodes先頭の dateISO を使う）----
  premiereDate: "2026-06-26T20:00:00+09:00",
  premiereLabelJa: "2026.6.26 20:00",
  premiereLabelEn: "June 26, 2026 20:00 JST",

  // ---- 観られる場所（URLを入れると自動でボタンが有効になります）----
  // YouTube / Spotify のURLを入れてください。空のあいだは「準備中」表示。
  listen: {
    youtube: "https://www.youtube.com/playlist?list=PLEEecFQkYP2s",
    spotify: "https://open.spotify.com/show/033zGykrc4Mk8SeoOTz0yK"
  },

  // ---- ポートフォリオサイト（連携できたらURLを入れる。空なら非表示）----
  portfolioUrl: "https://portfolio-kappa-virid-29.vercel.app/",

  // ---- クリエイターリンク（URLを入れたものだけ表示されます）----
  creatorLinks: [
    { label: "X (Twitter)",     url: "" },
    { label: "Redbubble",       url: "" },
    { label: "BOOTH",           url: "" },
    { label: "NFT Marketplace", url: "" },
    { label: "イラストAC",       url: "" }
  ],

  // ---- メール登録フォーム ----
  // Formspree等のエンドポイントを入れると有効化されます（空なら「準備中」表示）
  // 例: "https://formspree.io/f/xxxxxxxx"
  formAction: "",

  // ---- しおりを贈る（制作支援）----
  // URLやアドレスを入れたものだけ表示されます。すべて空ならセクションごと自動で非表示。
  support: {
    // カード（Stripe Payment Link）
    // presets = 固定額リンク（金額ごとに作る）／ freeUrl = 「金額おまかせ」リンク
    // ※日本のStripeは「デジタルしおりの購入」など商品の体裁で登録するのが安全
    card: {
      presets: [
        { label: "¥500",   url: "" },
        { label: "¥1,000", url: "" },
        { label: "¥3,000", url: "" }
      ],
      freeUrl: ""   // 例: "https://buy.stripe.com/xxxx"（金額おまかせ）
    },
    // 暗号資産・JPYC（EVMウォレット1つで ETH / JPYC / USDC などを受け取り）
    crypto: {
      address: "",                 // 例: "0x...."（受け取り専用アドレス推奨）
      ens: "",                     // 例: "name.eth"（あれば）
      chains: "Ethereum / Polygon" // 受け取れるチェーンの表示
    }
  },

  // ---- 絵本だなに並べる冊数 ----
  // 絵本だなに出しておく数。これを超えた分は「これまでの夜を、ひらく」の中にしまわれる
  //（消えるわけではなく、ボタンひとつで全部出てくる）。数を変えたいときはここだけ書き換える。
  shelfLimit: 8,

  // ---- 新章 ── 絵本シリーズ ----
  // 【重要】新エピソードは必ずこの配列の「先頭」に追加する。
  // トップの文言・「始まります」枠・カウントダウンは、すべて先頭のエピソードから自動生成される。
  //   status: "soon"（予約中→dateISOへ向けてカウントダウン表示）/ "live"（配信中）
  //   dateISO: 配信日時（JST）。カウントダウンと自動live切り替えに使う。
  //     ※dateISO を過ぎたエピソードは status が "soon" のままでも自動で「配信中」表示になる。
  //       手で "live" に書き換える必要はない（書いてもよい。その場合は日時に関係なく常に配信中）。
  //   noteJa/noteEn: 「始まります」枠に出る紹介ひとこと（1〜2文・キャラ名は書かない）
  episodes: [
    {
      num: "第 9 夜",
      titleJa: "形のないもの",
      titleEn: "What Has No Shape",
      date: "2026.8.21 20:00",
      dateISO: "2026-08-21T20:00:00+09:00",
      status: "soon",   // 予約中。dateISO を過ぎれば自動で「配信中」表示になる（手で live にしなくてよい）
      poster: "assets/img/形のないもの_poster.png",
      noteJa: "風にも、時間にも、安心にも、かたちはない。形のないものは、形のあるものを通して、この世界に現れている。",
      noteEn: "Wind, time, ease — none of them have a shape. What has no form still arrives, through the things that do.",
      links: {
        youtube: "https://www.youtube.com/watch?v=pLDvGH-xvlU",
        spotify: ""
      }
    },
    {
      num: "第 8 夜",
      titleJa: "罪状：ひと休み",
      titleEn: "The Crime of Resting",
      date: "2026.8.14 20:00",
      dateISO: "2026-08-14T20:00:00+09:00",
      status: "live",   // 2026-08-14 配信済み。Spotify個別URLは取得後に追記
      poster: "assets/img/罪状：ひと休み_poster.png",
      noteJa: "ひと休みしただけで、なぜか罪悪感に襲われる。責める声や、かばう声は、どこから聞こえているのだろう。",
      noteEn: "You only stopped to rest, and still the guilt arrives. The voice that accuses, the voice that defends — where are they coming from?",
      links: {
        youtube: "https://www.youtube.com/watch?v=FKNc_hmrNzk",
        spotify: "https://open.spotify.com/episode/6h6eW29KkdUCOTr6GH5yT2"
      }
    },
    {
      num: "第 7 夜",
      titleJa: "問われるまで",
      titleEn: "Until You Ask",
      date: "2026.8.7 20:00",
      dateISO: "2026-08-07T20:00:00+09:00",
      status: "live",   // 2026-08-07 配信済み。Spotify個別URLは取得後に追記
      poster: "assets/img/問われるまで_poster.png",
      noteJa: "どうしたらいいのか、わからなくなる夜がある。それはまだ、問いが言葉になっていないだけ。",
      noteEn: "There are nights when you no longer know what to do. It only means the question hasn't found its words yet.",
      links: {
        youtube: "https://www.youtube.com/watch?v=1qm7Yz85BKw",
        spotify: "https://open.spotify.com/episode/1T2wnAbkqaSsI1gdcwYcLk"
      }
    },
    {
      num: "第 6 夜",
      titleJa: "川の選ぶ道",
      titleEn: "Let the River Choose",
      date: "2026.7.31 20:00",
      dateISO: "2026-07-31T20:00:00+09:00",
      status: "live",   // 2026-07-31 配信済み。Spotify個別URLは取得後に追記
      poster: "assets/img/川の選ぶ道_poster.png",
      noteJa: "行き先だけ決めて、道筋は川にまかせる。いちばん力のいらない方へ、流れは道をひらいている。",
      noteEn: "Choose only the destination, and let the river choose the way. The current is already opening the path that needs the least effort.",
      links: {
        youtube: "https://www.youtube.com/watch?v=Q7TBwL6EhMk",
        spotify: "https://open.spotify.com/episode/4Lk63laaJakF0hbsUlaE9w"
      }
    },
    {
      num: "第 5 夜",
      titleJa: "売り切れのない棚",
      titleEn: "The Never-Empty Shelf",
      date: "2026.7.24 20:00",
      dateISO: "2026-07-24T20:00:00+09:00",
      status: "live",   // 2026-07-24 配信済み。Spotify個別URLは取得後に追記
      poster: "assets/img/売り切れのない棚_poster.png",
      noteJa: "その一冊を選ぶのに、誰かの許可はいらない。わたしには、その価値がある。",
      noteEn: "Choosing your story needs no one's permission. You are already worth it.",
      links: {
        youtube: "https://www.youtube.com/watch?v=V3r1ewH2F8M",
        spotify: "https://open.spotify.com/episode/5PS1osFAg2T69qThJTuw2T"
      }
    },
    {
      num: "第 4 夜",
      titleJa: "未読の未来",
      titleEn: "Unread Futures",
      date: "2026.7.17 20:00",
      dateISO: "2026-07-17T20:00:00+09:00",
      status: "live",
      poster: "assets/img/未読の未来_poster.png",
      noteJa: "起きていない未来さえ、もう、そこにある。読むのは、これから。",
      noteEn: "Even the futures that haven't happened yet are already there. All that's left is to read them.",
      links: {
        youtube: "https://www.youtube.com/watch?v=yntzAahG6zw",
        spotify: "https://open.spotify.com/episode/2dHbP97Y9zH5z8odowYDUV"
      }
    },
    {
      num: "第 3 夜",
      titleJa: "境目",
      titleEn: "The Boundary",
      date: "2026.7.10 20:00",
      dateISO: "2026-07-10T20:00:00+09:00",
      status: "live",
      poster: "assets/img/境目_poster.png",
      noteJa: "低くかがんで、近づくほど、見えてくる世界がある。境目は、いつのまにか薄くなる。",
      noteEn: "The lower you crouch, the closer you draw, the more the world reveals. The boundary quietly fades.",
      links: {
        youtube: "https://www.youtube.com/watch?v=i8rELgYDdaw",
        spotify: ""
      }
    },
    {
      num: "第 2 夜",
      titleJa: "淡味",
      titleEn: "The Subtle Taste",
      date: "2026.7.3 20:00",
      dateISO: "2026-07-03T20:00:00+09:00",
      status: "live",
      poster: "assets/img/淡味_poster.png",
      noteJa: "うすい、と思ったその味は、ほんとうに、なにもなかったのでしょうか。今夜も一冊、そっと置いていきます。",
      noteEn: "Was that faint taste really nothing at all? Tonight, another little book is quietly placed.",
      links: {
        youtube: "https://www.youtube.com/watch?v=IPiHmzuTPwA",
        spotify: "https://open.spotify.com/episode/6HjNXRZlikDBt10NspFhkK"
      }
    },
    {
      num: "第 1 夜",
      titleJa: "皿洗い",
      titleEn: "Washing the Dishes",
      date: "2026.6.26 20:00",
      dateISO: "2026-06-26T20:00:00+09:00",
      status: "live",
      poster: "assets/img/皿洗い_poster.png",
      noteJa: "皿を洗うように、心の濁りも、すこしずつ。",
      noteEn: "Like washing the dishes, the heart clears little by little.",
      links: {
        youtube: "https://www.youtube.com/watch?v=Ir_riNbuaUU",
        spotify: "https://open.spotify.com/episode/3iI0etzaUFyDZlqmtlKifx"
      }
    },
    {
      num: "第 0 夜",
      titleJa: "ほんとうの自分に出会う道",
      titleEn: "The Path to Meeting Your True Self",
      date: "2026.6.19",
      dateISO: "2026-06-19T20:00:00+09:00",
      status: "live",
      poster: "assets/img/ep01_true_self.png",
      links: {
        youtube: "https://www.youtube.com/watch?v=J_7NGNCLyXA",
        spotify: "https://open.spotify.com/episode/0jM89IkRBKRCm1HIKn6RAu"
      }
    }
    /* 追加例（新しい夜はこの形で配列の先頭に）：
    {
      num: "第 3 夜",
      titleJa: "（タイトル）",
      titleEn: "(Title)",
      date: "2026.7.10 20:00",
      dateISO: "2026-07-10T20:00:00+09:00",
      status: "soon",   // 予約中はsoon（カウントダウンが出る）。dateISOを過ぎたら自動で配信中になる
      poster: "assets/img/◯◯_poster.png",
      noteJa: "（紹介ひとこと）",
      noteEn: "(One-line note)",
      links: { youtube: "https://...", spotify: "" } // Spotify個別URLは配信後に追記
    },
    */
  ],

  // ---- これまでの作品（アーカイブ）----
  archive: [
    {
      titleJa: "How to Walk", titleEn: "How to Walk",
      noteJa: "歩く、ということ", noteEn: "On walking",
      src: "assets/video/ep01_how_to_walk.mp4",
      poster: "assets/img/how_to_walk_cover.jpeg",
      vertical: false, duration: "0:49"
    },
    {
      titleJa: "食事は護摩焚き", titleEn: "Eating as Sacred Fire",
      noteJa: "食べることは、祈ること", noteEn: "Eating as a quiet ritual",
      src: "assets/video/ep02_gomataki.mp4",
      poster: "assets/img/gomataki_cover.jpeg",
      vertical: true, duration: "1:22"
    },
    {
      titleJa: "矢と的", titleEn: "The Arrow and the Target",
      noteJa: "届けたい誰かが、的になる", noteEn: "Someone to receive it — that is the target",
      src: "assets/video/ep03_ya_to_mato.mp4",
      poster: "assets/img/ep03_poster.jpg",
      vertical: false, duration: "1:04"
    },
    {
      titleJa: "How to Eat", titleEn: "How to Eat",
      noteJa: "一粒の米の中に、宇宙がある", noteEn: "In a single grain of rice, a universe",
      src: "assets/video/ep04_how_to_eat.mp4",
      poster: "assets/img/ep04_poster.jpg",
      vertical: false, duration: "2:52"
    }
  ]
};
