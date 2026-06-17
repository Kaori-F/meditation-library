# 瞑想図書館 ── 眠る前の小さな絵本 | The Meditation Library

ビデオポッドキャスト『瞑想図書館』のホーム拠点サイト。
静的サイト（HTML/CSS/JS のみ、ビルド不要）。

- 番組名：瞑想図書館 / サブタイトル：眠る前の小さな絵本
- 新章 第1夜「ほんとうの自分に出会う道」配信：2026.6.19 20:00 → サイト上で自動カウントダウン
- 世界観：昼の図書館 →「本を開く」→ 眠りの夜へ（スクロールで背景が生成り→夕暮れ→夜に変化）

## 構成（ページの流れ）

1. ヒーロー（瞑想図書館 / 眠る前の小さな絵本 ＋ 配信日）
2. 図書館について（コンセプト）
3. 本を開く（演出）
4. 夜の司書 ── ルナすろーす
5. **新章 ── 絵本シリーズ**（第1夜 ＋ カウントダウン ＋ 観られる場所）
6. **絵本だな**（エピソード一覧。夜ごとに増える）
7. **これまでの作品（アーカイブ）**（過去の映像4本）
8. つくっているひと（Kaori ＋ ポートフォリオ ＋ お知らせ登録）

```
06_website/
├── index.html              … 本体（1ページ）
├── assets/
│   ├── css/style.css       … スタイル（本を開く演出・スクロール演出含む）
│   ├── js/config.js        … ★更新はほぼここだけ（カバー画像・リンク・エピソード・日付）
│   ├── js/i18n.js          … 日英テキスト辞書
│   ├── js/main.js          … カウントダウン・言語切替・描画
│   ├── img/                … Web用に圧縮済みの画像
│   └── video/              … Web用に圧縮済みの動画（mp4）
├── _backup_unseen-world/   … 旧「見えない世界」版のバックアップ
└── README.md
```

## よくある更新（config.js を編集するだけ）

| やりたいこと | 場所 |
|---|---|
| カバー写真を表紙にする | `カバー写真.png` を `assets/img/` に置き、`CONFIG.coverImage` に `"assets/img/カバー写真.png"` を入れる |
| YouTube/Spotifyリンクを有効化 | `CONFIG.listen.youtube` / `.spotify` にURLを入れる → 自動で「ひらく」ボタンに |
| 第1夜にも視聴リンクを付ける | `CONFIG.episodes[0].links.youtube` / `.spotify` にURL |
| ポートフォリオ連携 | `CONFIG.portfolioUrl` にURLを入れる → ボタンが出現 |
| X・RedbubbleなどのリンクON | `CONFIG.creatorLinks` の `url` を入れる |
| 絵本（エピソード）追加 | `CONFIG.episodes` に1ブロック追記（コメントに例あり） |
| 第1夜を「配信中」に | `status: "soon"` → `"live"` |
| メール登録フォーム有効化 | Formspree等で作ったURLを `CONFIG.formAction` へ |

## 残タスク（ローンチ前）

- [ ] `カバー写真.png` を `assets/img/` に配置し `CONFIG.coverImage` を設定
- [ ] YouTube・Spotify のURLを `CONFIG.listen` に投入
- [ ] （任意）第1夜のポスター画像をカバー写真に差し替え（`CONFIG.episodes[0].poster`）

## ローカル確認

フォルダ内で:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

（index.html のダブルクリックでも概ね動きますが、http経由が確実です）

## 公開手順（GitHub → Cloudflare Pages）

1. GitHubに新規リポジトリを作成（例: `meditation-library`、Privateで可）
2. この `06_website` フォルダの中身を push
   ```sh
   cd 06_website
   git init && git add -A && git commit -m "open the book"
   git remote add origin https://github.com/＜ユーザー名＞/meditation-library.git
   git push -u origin main
   ```
3. [Cloudflare Pages](https://pages.cloudflare.com/) → 「Create a project」→ GitHub連携でリポジトリを選択
4. Build設定は **すべて空欄のまま**（ビルドコマンド不要・出力ディレクトリ `/`）でDeploy
5. `https://meditation-library.pages.dev` のようなURLが即発行されます（独自ドメインも後から設定可）

以後は git push するだけで自動的に再公開されます。

## メモ

- 動画はffmpegで H.264/1280px/CRF26 に再エンコード済み（原本は `03_animation/` に保持）
- 言語切替（日/EN）はヘッダー右上。選択はブラウザに記憶されます
- `prefers-reduced-motion` 対応済み（アニメーション抑制環境では演出を停止）
- 旧「見えない世界」版は `_backup_unseen-world/` に保存（戻したいときはこの中身を上書き）
