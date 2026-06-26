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

  // ---- 新章 第1夜「皿洗い」の配信日時（JST）----
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

  // ---- 新章 ── 絵本シリーズ（配信後にここへ追記していく）----
  // status: "soon"（配信前） / "live"（配信中）
  episodes: [
    {
      num: "第 1 夜",
      // ↑ 絵本スタイル第1作「皿洗い」。本編の入口。
      titleJa: "皿洗い",
      titleEn: "Washing the Dishes",
      date: "2026.6.26 20:00",
      status: "soon",
      poster: "assets/img/皿洗い_poster.png",
      links: { youtube: "", spotify: "" }
    },
    {
      num: "第 0 夜",
      // 序章。2026.6.19 配信済み。個別URLが出たら links に追記。
      titleJa: "ほんとうの自分に出会う道",
      titleEn: "The Path to Meeting Your True Self",
      date: "2026.6.19",
      status: "live",
      poster: "assets/img/ep01_true_self.png",
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
