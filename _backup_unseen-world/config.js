/* =========================================================
   見えない世界 — サイト設定ファイル
   ここを書き換えるだけで、リンク・エピソード・日付を更新できます。
   ========================================================= */

const CONFIG = {

  // ---- 配信開始日時（JST）----
  premiereDate: "2026-06-19T00:00:00+09:00",
  premiereLabelJa: "2026.6.19（甲子の日）",
  premiereLabelEn: "June 19, 2026",

  // ---- 視聴先リンク（URLを入れると自動でボタンが有効になります）----
  listen: {
    spotify: "https://open.spotify.com/show/033zGykrc4Mk8SeoOTz0yK",
    youtube: "https://www.youtube.com/playlist?list=PLEEecFQkYP2s",
    apple:   ""    // 例: "https://podcasts.apple.com/podcast/xxxx"
  },

  // ---- クリエイターリンク（URLを入れたものだけ表示されます）----
  creatorLinks: [
    { label: "X (Twitter)",   url: "" },   // 例: "https://x.com/xxxx"
    { label: "Redbubble",     url: "" },
    { label: "BOOTH",         url: "" },
    { label: "NFT Marketplace", url: "" },
    { label: "イラストAC",     url: "" }
  ],

  // ---- メール登録フォーム ----
  // Formspree等のエンドポイントを入れると有効化されます（空なら「準備中」表示）
  // 例: "https://formspree.io/f/xxxxxxxx"
  formAction: "",

  // ---- エピソード（配信後にここへ追記していく）----
  // status: "soon"（配信前） / "live"（配信中）
  episodes: [
    {
      num: "Ep. 1",
      titleJa: "—（タイトルは配信日に）",
      titleEn: "— (Title revealed on release day)",
      date: "2026.6.19",
      status: "soon",
      poster: "assets/img/world_elements.jpg",
      links: { spotify: "", youtube: "", apple: "" }
    }
    /* 追加例：
    ,{
      num: "Ep. 2",
      titleJa: "神社と五大元素",
      titleEn: "The Shrine and the Five Elements",
      date: "2026.7.x",
      status: "live",
      poster: "assets/img/ep05_poster.jpg",
      links: { spotify: "https://...", youtube: "", apple: "" }
    }
    */
  ],

  // ---- ショーリール（過去のAI動画）----
  showreel: [
    {
      titleJa: "How to Walk", titleEn: "How to Walk",
      noteJa: "歩く、ということ", noteEn: "On walking",
      src: "assets/video/ep01_how_to_walk.mp4",
      poster: "assets/img/world_light.jpg",
      vertical: false, duration: "0:49"
    },
    {
      titleJa: "食事は護摩焚き", titleEn: "Eating as Sacred Fire",
      noteJa: "食べることは、祈ること", noteEn: "Eating as a quiet ritual",
      src: "assets/video/ep02_gomataki.mp4",
      poster: "assets/img/ep02_poster.jpg",
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
