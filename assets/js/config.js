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

  // ---- ヒーロー背景（カバー未設定のときに使う既存画像。順に切り替わる）----
  heroSlides: [
    "assets/img/hero_cosmos.jpg",
    "assets/img/hero_dusk.jpg",
    "assets/img/hero_torii.jpg"
  ],

  // ---- 新章 第1夜の配信日時（JST）----
  premiereDate: "2026-06-19T20:00:00+09:00",
  premiereLabelJa: "2026.6.19 20:00",
  premiereLabelEn: "June 19, 2026 20:00 JST",

  // ---- 観られる場所（URLを入れると自動でボタンが有効になります）----
  // YouTube / Spotify のURLを入れてください。空のあいだは「準備中」表示。
  listen: {
    youtube: "",   // 例: "https://www.youtube.com/@xxxx"  または該当動画URL
    spotify: ""    // 例: "https://open.spotify.com/show/xxxx"
  },

  // ---- ポートフォリオサイト（連携できたらURLを入れる。空なら非表示）----
  portfolioUrl: "",

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

  // ---- 新章 ── 絵本シリーズ（配信後にここへ追記していく）----
  // status: "soon"（配信前） / "live"（配信中）
  episodes: [
    {
      num: "第 1 夜",
      titleJa: "ほんとうの自分に出会う道",
      titleEn: "The Path to Meeting Your True Self",
      date: "2026.6.19 20:00",
      status: "soon",
      // ↓ カバー写真.png を置いたら "assets/img/カバー写真.png" に差し替え
      poster: "assets/img/hero_cosmos.jpg",
      links: { youtube: "", spotify: "" }
    }
    /* 追加例：
    ,{
      num: "第 2 夜",
      titleJa: "（タイトル）",
      titleEn: "(Title)",
      date: "2026.7.x",
      status: "live",
      poster: "assets/img/ep_xx_poster.jpg",
      links: { youtube: "https://...", spotify: "https://..." }
    }
    */
  ],

  // ---- これまでの作品（アーカイブ）----
  archive: [
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
