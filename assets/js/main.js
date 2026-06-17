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
  heroImgs.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
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
    }, 6500);
  }

  /* ---------- 日付・タイトルの差し込み（config / 言語連動） ---------- */
  function renderMeta() {
    const label = lang === "ja" ? CONFIG.premiereLabelJa : CONFIG.premiereLabelEn;
    const heroDate = document.getElementById("heroDate");
    const premiereDate = document.getElementById("premiereDate");
    if (heroDate) heroDate.textContent = label;
    if (premiereDate) premiereDate.textContent = label;

    const epTitle = document.getElementById("premiereEpTitle");
    const first = CONFIG.episodes && CONFIG.episodes[0];
    if (epTitle && first) epTitle.textContent = lang === "ja" ? first.titleJa : first.titleEn;
  }

  /* ---------- スクロール連動：昼 → 本を開く → 夜（眠りへ） ---------- */
  const COLORS = {
    cream: [247, 241, 230],
    dusk:  [110, 90, 116],
    night: [19, 26, 45]
  };
  const INK = {
    cream: [91, 76, 66],
    dusk:  [236, 228, 212],
    night: [236, 228, 212]
  };

  function lerp(a, b, f) { return a + (b - a) * f; }
  function mix(c1, c2, f) {
    return `rgb(${Math.round(lerp(c1[0], c2[0], f))},${Math.round(lerp(c1[1], c2[1], f))},${Math.round(lerp(c1[2], c2[2], f))})`;
  }

  const elConcept = document.getElementById("concept");
  const elOpenbook = document.getElementById("openbook");
  const elPremiere = document.getElementById("premiere");

  function updateBackground() {
    const vh = window.innerHeight;
    const probe = window.scrollY + vh * 0.6; // 視点の少し下を基準に

    const creamEnd = elConcept.offsetTop + elConcept.offsetHeight * 0.55;
    const duskMid  = elOpenbook.offsetTop + elOpenbook.offsetHeight * 0.5;
    const nightAt  = elPremiere.offsetTop;

    let bg, ink, night = 0;

    if (probe <= creamEnd) {
      bg = mix(COLORS.cream, COLORS.cream, 0);
      ink = mix(INK.cream, INK.cream, 0);
    } else if (probe <= duskMid) {
      const f = (probe - creamEnd) / (duskMid - creamEnd);
      bg = mix(COLORS.cream, COLORS.dusk, f);
      ink = mix(INK.cream, INK.dusk, Math.min(1, f * 1.6));
      night = f * 0.35;
    } else if (probe <= nightAt) {
      const f = (probe - duskMid) / (nightAt - duskMid);
      bg = mix(COLORS.dusk, COLORS.night, f);
      ink = mix(INK.dusk, INK.night, f);
      night = 0.35 + f * 0.65;
    } else {
      bg = mix(COLORS.night, COLORS.night, 0);
      ink = mix(INK.night, INK.night, 0);
      night = 1;
    }

    document.body.style.backgroundColor = bg;
    document.body.style.color = ink;
    document.documentElement.style.setProperty("--night-amount", night.toFixed(2));
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

  /* ---------- カウントダウン ---------- */
  const target = new Date(CONFIG.premiereDate).getTime();
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
      liveMsg.hidden = false;
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
  function renderEpisodes() {
    const grid = document.getElementById("episodeGrid");
    grid.innerHTML = "";
    CONFIG.episodes.forEach(ep => {
      const live = ep.status === "live";
      const epUrl = ep.links && (ep.links.youtube || ep.links.spotify);
      const tag = epUrl ? "a" : "div";
      const card = document.createElement(tag);
      card.className = "episode-card" + (live ? " is-live" : "");
      if (epUrl) { card.href = epUrl; card.target = "_blank"; card.rel = "noopener"; }
      card.innerHTML =
        '<div class="thumb"><img src="' + ep.poster + '" alt="" loading="lazy"></div>' +
        '<div class="episode-meta">' +
          '<p class="episode-num">' + ep.num + "</p>" +
          '<p class="episode-title">' + (lang === "ja" ? ep.titleJa : ep.titleEn) + "</p>" +
          '<p class="episode-date">' + ep.date + "</p>" +
          '<span class="episode-badge">' + (live ? t("episodes.live") : t("episodes.soon")) + "</span>" +
        "</div>";
      grid.appendChild(card);
    });
    // 次の一冊の「器」
    const ph = document.createElement("div");
    ph.className = "episode-card placeholder";
    ph.innerHTML = "<span>……</span>";
    grid.appendChild(ph);
  }

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
