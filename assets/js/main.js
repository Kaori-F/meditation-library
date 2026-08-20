/* =========================================================
   瞑想図書館 ── メインスクリプト
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 言語 ---------- */
  let lang = localStorage.getItem("library-lang") || "ja";

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.ja[key] || key;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    renderMeta();
    renderListen();
    renderEpisodes();
    renderArchive();
    renderCreatorLinks();
    renderSupport();
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "ja" ? "en" : "ja";
    localStorage.setItem("library-lang", lang);
    applyLang();
  });

  /* ---------- ヒーロー背景（カバー画像 or 既存画像） ---------- */
  const heroBg = document.getElementById("heroBg");
  const heroImgs = (CONFIG.coverImage ? [CONFIG.coverImage] : (CONFIG.heroSlides || []));
  heroBg.innerHTML = "";
  heroImgs.forEach((item, i) => {
    const src = (typeof item === "string") ? item : item.src;
    const pos = (typeof item === "string") ? "center" : (item.pos || "center");
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.style.objectPosition = pos;
    img.className = "hero-slide" + (i === 0 ? " is-active" : "");
    heroBg.appendChild(img);
  });

  /* ---------- ヒーロー：クロスフェード ---------- */
  const slides = heroBg.querySelectorAll(".hero-slide");
  let slideIdx = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[slideIdx].classList.remove("is-active");
      slideIdx = (slideIdx + 1) % slides.length;
      slides[slideIdx].classList.add("is-active");
    }, 8000); // 8秒ごと（瞑想的な間）。リロード時は必ず先頭(index 0)から
  }

  /* ---------- エピソードが公開済みかどうか ---------- */
  // status が "live" か、dateISO を過ぎていれば true。
  // これにより、配信のたびに config.js を soon → live に手で書き換える必要がなくなる。
  function isLive(ep) {
    if (!ep) return false;
    if (ep.status === "live") return true;
    return ep.dateISO ? Date.now() >= new Date(ep.dateISO).getTime() : false;
  }

  /* ---------- 日付・タイトルの差し込み（最新エピソード＝episodes先頭から自動生成） ---------- */
  function renderMeta() {
    const latest = CONFIG.episodes && CONFIG.episodes[0];
    if (!latest) return;
    const live = isLive(latest);
    const numJa = (latest.num || "").replace(/\s+/g, "");        // "第2夜"
    const nightNum = (latest.num || "").replace(/[^0-9]/g, "");  // "2"

    const heroDate = document.getElementById("heroDate");
    const premiereDate = document.getElementById("premiereDate");
    if (heroDate) heroDate.textContent = latest.date || "";
    if (premiereDate) premiereDate.textContent = latest.date || "";

    const heroEp = document.getElementById("heroEp");
    if (heroEp) heroEp.textContent = lang === "ja"
      ? "新章 " + numJa + (live ? " 配信中" : " 配信予定")
      : "New Chapter ── Night " + nightNum + (live ? " now open" : " coming soon");

    const lead = document.getElementById("premiereLead");
    if (lead) lead.textContent = lang === "ja"
      ? numJa + (live ? "、ひらきました。" : "、はじまります。")
      : "Night " + nightNum + (live ? " is open." : " begins.");

    const note = document.getElementById("premiereNote");
    if (note) {
      const txt = lang === "ja" ? (latest.noteJa || "") : (latest.noteEn || latest.noteJa || "");
      note.textContent = txt;
      note.hidden = !txt;
    }

    const epTitle = document.getElementById("premiereEpTitle");
    if (epTitle) epTitle.textContent = lang === "ja" ? latest.titleJa : latest.titleEn;
  }

  /* ---------- スクロール連動：夜が、下へ行くほど深くなる ---------- */
  // 2026-08-20の並べ替えまでは「生成り（昼）→ 夕暮れ → 夜」だった。
  // 新章を上へ、図書館についてを下へ移したことで昼の区間が下に来てしまい、
  // 途中で明るくなる道のりになるため廃止した。いまは夜のなかだけで深くなる。
  const COLORS = {
    nightTop: [27, 36, 64],   // ヒーロー直下。すこし明るい夜
    night:    [19, 26, 45]    // 絵本だな以降。深い夜
  };
  const INK = { night: [236, 228, 212] };

  function lerp(a, b, f) { return a + (b - a) * f; }
  function mix(c1, c2, f) {
    return `rgb(${Math.round(lerp(c1[0], c2[0], f))},${Math.round(lerp(c1[1], c2[1], f))},${Math.round(lerp(c1[2], c2[2], f))})`;
  }
  function clamp01(f) { return f < 0 ? 0 : (f > 1 ? 1 : f); }

  const elPremiere = document.getElementById("premiere");
  const elEpisodes = document.getElementById("episodes");

  function updateBackground() {
    const vh = window.innerHeight;
    const probe = window.scrollY + vh * 0.6; // 視点の少し下を基準に

    const from = elPremiere.offsetTop;
    const to   = elEpisodes.offsetTop + elEpisodes.offsetHeight * 0.5;
    const f = clamp01((probe - from) / Math.max(1, to - from));

    document.body.style.backgroundColor = mix(COLORS.nightTop, COLORS.night, f);
    document.body.style.color = mix(INK.night, INK.night, 0);
    // 星は最初からうっすら見えていて、深まるほど濃くなる
    document.documentElement.style.setProperty("--night-amount", (0.45 + f * 0.55).toFixed(2));
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateBackground(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateBackground);

  /* ---------- スクロール出現 ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- カウントダウン（最新エピソードの dateISO へ向けて） ---------- */
  const cdLatest = CONFIG.episodes && CONFIG.episodes[0];
  const target = new Date((cdLatest && cdLatest.dateISO) || CONFIG.premiereDate).getTime();
  const elD = document.getElementById("cdDays");
  const elH = document.getElementById("cdHours");
  const elM = document.getElementById("cdMins");
  const elS = document.getElementById("cdSecs");
  const cdWrap = document.getElementById("countdown");
  const liveMsg = document.getElementById("premiereLive");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      cdWrap.hidden = true;
      // 「新章が、はじまりました」は出さない（2026-08-03）。
      // #premiereLive の要素と i18n の premiere.live は、今後別の文言を入れる可能性があるため残してある。
      // liveMsg.hidden = false;
      renderMeta();   // 開いたまま配信時刻をまたいだときも「配信予定」→「配信中」に切り替わるように
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff % 86400000 / 3600000);
    const m = Math.floor(diff % 3600000 / 60000);
    const s = Math.floor(diff % 60000 / 1000);
    elD.textContent = d;
    elH.textContent = pad(h);
    elM.textContent = pad(m);
    elS.textContent = pad(s);
    cdTimeout();
  }
  let cdTimer;
  function cdTimeout() {
    clearTimeout(cdTimer);
    cdTimer = setTimeout(tick, 1000);
  }
  tick();

  /* ---------- 観られる場所 ---------- */
  const ICONS = {
    spotify: '<svg class="icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6"/><path d="M7 9.5c3.4-1 7-.6 9.6 1M7.5 12.4c2.8-.8 5.6-.4 7.8.9M8 15.2c2.2-.6 4.4-.3 6.2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    youtube: '<svg class="icon" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M10.2 9.3l5 2.7-5 2.7V9.3z" fill="currentColor"/></svg>'
  };
  const PLATFORM_NAMES = { youtube: "YouTube", spotify: "Spotify" };

  function renderListen() {
    const grid = document.getElementById("listenGrid");
    grid.innerHTML = "";
    Object.keys(CONFIG.listen).forEach(key => {
      const url = CONFIG.listen[key];
      const live = !!url;
      const tag = live ? "a" : "div";
      const el = document.createElement(tag);
      el.className = "listen-card" + (live ? " is-live" : "");
      if (live) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
      el.innerHTML = (ICONS[key] || "") +
        '<span class="listen-name">' + (PLATFORM_NAMES[key] || key) + "</span>" +
        '<span class="listen-status">' + (live ? t("listen.open") : t("listen.soon")) + "</span>";
      grid.appendChild(el);
    });
  }

  /* ---------- 絵本だな（エピソード） ---------- */
  // 棚に出しておく冊数。超えた分は畳んでおき、ボタンひとつで出てくる（消さない）
  const SHELF_LIMIT = CONFIG.shelfLimit || 8;
  let shelfOpen = false;

  function renderEpisodes() {
    const grid = document.getElementById("episodeGrid");
    grid.innerHTML = "";
    CONFIG.episodes.forEach((ep, i) => {
      const tucked = !shelfOpen && i >= SHELF_LIMIT;
      const live = isLive(ep);
      const epUrl = ep.links && (ep.links.youtube || ep.links.spotify);
      const tag = epUrl ? "a" : "div";
      const card = document.createElement(tag);
      card.className = "episode-card" + (live ? " is-live" : "") + (tucked ? " is-tucked" : "");
      if (tucked) card.hidden = true;
      if (epUrl) { card.href = epUrl; card.target = "_blank"; card.rel = "noopener"; }
      card.innerHTML =
        '<div class="thumb"><img src="' + ep.poster + '" alt="" loading="lazy"></div>' +
        '<div class="episode-meta">' +
          '<p class="episode-num">' + ep.num + "</p>" +
          '<p class="episode-title">' + (lang === "ja" ? ep.titleJa : ep.titleEn) + "</p>" +
          '<p class="episode-date">' + ep.date + "</p>" +
          (live ? "" : '<span class="episode-badge">' + t("episodes.soon") + "</span>") +
        "</div>";
      grid.appendChild(card);
    });
    renderShelfToggle();
  }

  // しまってある夜があるときだけボタンを出す
  function renderShelfToggle() {
    const wrap = document.getElementById("shelfMore");
    const btn = document.getElementById("shelfToggle");
    if (!wrap || !btn) return;
    const tuckedCount = CONFIG.episodes.length - SHELF_LIMIT;
    if (tuckedCount <= 0) { wrap.hidden = true; return; }
    wrap.hidden = false;
    btn.textContent = shelfOpen ? t("episodes.less") : t("episodes.more");
    btn.setAttribute("aria-expanded", String(shelfOpen));
  }

  document.getElementById("shelfToggle").addEventListener("click", () => {
    shelfOpen = !shelfOpen;
    renderEpisodes();
    if (!shelfOpen) {
      // 畳んだときは棚の頭に戻す（畳んだ分だけ画面が飛ぶのを防ぐ）
      document.getElementById("episodes").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* ---------- これまでの作品（アーカイブ） ---------- */
  function renderArchive() {
    const grid = document.getElementById("reelGrid");
    grid.innerHTML = "";
    (CONFIG.archive || []).forEach(item => {
      const card = document.createElement("div");
      card.className = "reel-card" + (item.vertical ? " vertical" : "");
      card.innerHTML =
        '<div class="reel-media">' +
          '<video controls preload="none" playsinline poster="' + item.poster + '" src="' + item.src + '"></video>' +
        "</div>" +
        '<div class="reel-meta">' +
          '<span class="reel-title">' + (lang === "ja" ? item.titleJa : item.titleEn) + "</span>" +
          '<span class="reel-note">' + (lang === "ja" ? item.noteJa : item.noteEn) + "</span>" +
          '<span class="reel-dur">' + item.duration + "</span>" +
        "</div>";
      grid.appendChild(card);
    });
    // 再生は同時に1本だけ
    grid.querySelectorAll("video").forEach(v => {
      v.addEventListener("play", () => {
        grid.querySelectorAll("video").forEach(o => { if (o !== v) o.pause(); });
      });
    });
  }

  /* ---------- クリエイターリンク＋ポートフォリオ ---------- */
  function renderCreatorLinks() {
    const wrap = document.getElementById("creatorLinks");
    wrap.innerHTML = "";
    const links = CONFIG.creatorLinks.filter(l => l.url);
    if (!links.length) {
      const note = document.createElement("span");
      note.className = "links-note";
      note.textContent = lang === "ja" ? "リンクは順次ひらいていきます" : "Links opening soon";
      wrap.appendChild(note);
    } else {
      links.forEach(l => {
        const a = document.createElement("a");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = l.label;
        wrap.appendChild(a);
      });
    }
    // ポートフォリオ
    const pf = document.getElementById("portfolioLink");
    if (pf) {
      if (CONFIG.portfolioUrl) { pf.href = CONFIG.portfolioUrl; pf.hidden = false; }
      else { pf.hidden = true; }
    }
  }

  /* ---------- しおりを贈る（制作支援） ---------- */
  function renderSupport() {
    const sec = document.getElementById("support");
    const wrap = document.getElementById("supportMethods");
    if (!sec || !wrap) return;
    const s = (CONFIG.support || {});
    const card = s.card || {};
    const crypto = s.crypto || {};
    const presets = (card.presets || []).filter(p => p.url);
    const hasCard = presets.length > 0 || !!card.freeUrl;
    const hasCrypto = !!(crypto.address);

    if (!hasCard && !hasCrypto) { sec.hidden = true; wrap.innerHTML = ""; return; }
    sec.hidden = false;
    wrap.innerHTML = "";

    // --- カード ---
    if (hasCard) {
      const block = document.createElement("div");
      block.className = "support-block";
      let html = '<p class="support-method-label">' + t("support.card") + "</p>";
      html += '<div class="support-amounts">';
      presets.forEach(p => {
        html += '<a class="support-amount" href="' + p.url + '" target="_blank" rel="noopener">' + p.label + "</a>";
      });
      if (card.freeUrl) {
        html += '<a class="support-amount support-free" href="' + card.freeUrl + '" target="_blank" rel="noopener">' + t("support.free") + "</a>";
      }
      html += "</div>";
      block.innerHTML = html;
      wrap.appendChild(block);
    }

    // --- 暗号資産・JPYC ---
    if (hasCrypto) {
      const block = document.createElement("div");
      block.className = "support-block";
      const note = t("support.cryptoNote") + (crypto.chains ? "（" + crypto.chains + "）" : "");
      const ensLine = crypto.ens ? '<p class="support-ens">' + crypto.ens + "</p>" : "";
      block.innerHTML =
        '<p class="support-method-label">' + t("support.crypto") + "</p>" +
        ensLine +
        '<div class="support-wallet">' +
          '<code class="support-addr" id="supportAddr">' + crypto.address + "</code>" +
          '<button type="button" class="support-copy" id="supportCopy">' + t("support.copy") + "</button>" +
        "</div>" +
        '<p class="support-chains">' + note + "</p>";
      wrap.appendChild(block);

      const btn = block.querySelector("#supportCopy");
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(crypto.address);
          btn.textContent = t("support.copied");
          setTimeout(() => { btn.textContent = t("support.copy"); }, 1800);
        } catch (e) {
          const r = document.createRange(); r.selectNode(block.querySelector("#supportAddr"));
          const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        }
      });
    }
  }

  /* ---------- 通知フォーム ---------- */
  const form = document.getElementById("notifyForm");
  const msg = document.getElementById("notifyMsg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!CONFIG.formAction) {
      msg.textContent = t("notify.soon");
      msg.hidden = false;
      return;
    }
    try {
      const res = await fetch(CONFIG.formAction, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      msg.textContent = res.ok ? t("notify.done") : t("notify.soon");
    } catch {
      msg.textContent = t("notify.soon");
    }
    msg.hidden = false;
    if (msg.textContent === t("notify.done")) form.reset();
  });

  /* ---------- 初期化 ---------- */
  applyLang();
  updateBackground();
})();
