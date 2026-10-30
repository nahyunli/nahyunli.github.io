/* Builds every page from content.js. You don't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE;
  var root = document.getElementById("app");
  if (!S) {
    root.innerHTML = '<main class="main"><div class="page"><h1>Something in content.js has a typo</h1>' +
      '<p>The site could not read <code>content.js</code>. Undo your last edit there and check for a missing quote mark, comma, or bracket.</p></div></main>';
    return;
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // **bold**, *italic*, [text](url)
  function md(s) {
    return esc(s)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
        var ext = /^https?:/.test(u);
        return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + t + "</a>";
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  }
  function boldName(authors) {
    var a = esc(authors), n = esc(S.authorName || "");
    return n ? a.split(n).join("<strong>" + n + "</strong>") : a;
  }
  function list(x) { return Array.isArray(x) ? x : []; }
  function linkBtns(links) {
    links = list(links).filter(function (l) { return l && l.url; });
    if (!links.length) return "";
    return '<div class="btns">' + links.map(function (l) {
      var ext = /^https?:/.test(l.url);
      return '<a class="btn" href="' + esc(l.url) + '"' + (ext || /\.pdf$/i.test(l.url) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
    }).join("") + "</div>";
  }

  var ICONS = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-7.4 5.6a1 1 0 0 1-1.2 0L4 7.4ZM5.6 7 12 11.8 18.4 7H5.6Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75ZM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 9l4 2.55V17c0 1.1 3.13 3 7 3s7-1.9 7-3v-5.45L23 9 12 2Zm0 2.37L19.3 9 12 13.63 4.7 9 12 4.37ZM7 12.82l5 3.18 5-3.18v3.86c-.6.6-2.5 1.32-5 1.32s-4.4-.72-5-1.32v-3.86Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A9 9 0 0 1 9.5 3a.6.6 0 0 0-.8-.7A10 10 0 1 0 21.7 15.3a.6.6 0 0 0-.7-.8Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM3 11h2a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Zm16 0h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5.6 4.2l1.4 1.4A1 1 0 0 1 5.6 7L4.2 5.6a1 1 0 0 1 1.4-1.4Zm12.8 12.8 1.4 1.4a1 1 0 0 1-1.4 1.4l-1.4-1.4a1 1 0 0 1 1.4-1.4ZM19.8 4.2a1 1 0 0 1 0 1.4L18.4 7A1 1 0 0 1 17 5.6l1.4-1.4a1 1 0 0 1 1.4 0ZM7 17a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 0 1-1.4-1.4L5.6 17A1 1 0 0 1 7 17Z"/></svg>'
  };

  var PAGES = [
    { id: "home", label: "Home" },
    { id: "publications", label: "Publications" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "portfolio", label: "Portfolio" },
    { id: "more", label: "More" },
    { id: "contact", label: "Contact" }
  ];

  /* ---------- sidebar ---------- */
  function sidebar() {
    var L = S.links || {};
    var socials = ["email", "linkedin", "scholar", "github", "instagram"].filter(function (k) { return L[k]; }).map(function (k) {
      var href = k === "email" ? "mailto:" + L[k] : L[k];
      var name = { email: "Email", linkedin: "LinkedIn", scholar: "Google Scholar", github: "GitHub", instagram: "Instagram" }[k];
      return '<a href="' + esc(href) + '"' + (k === "email" ? "" : ' target="_blank" rel="noopener"') + ' aria-label="' + name + '" title="' + name + '">' + ICONS[k] + "</a>";
    }).join("");
    return '<aside class="sidebar">' +
      '<div class="id"><img class="avatar" src="' + esc(S.photo) + '" alt="Photo of ' + esc(S.name) + '">' +
      '<div><p class="id-name">' + esc(S.name) + '</p><p class="id-title">' + esc(S.title) + "</p></div></div>" +
      '<nav class="nav" aria-label="Pages">' + PAGES.map(function (p) {
        return '<a href="#' + p.id + '" data-page="' + p.id + '">' + p.label + "</a>";
      }).join("") + "</nav>" +
      (S.cv ? '<a class="cv-btn" href="' + esc(S.cv) + '" target="_blank" rel="noopener">CV <span aria-hidden="true">↗</span></a>' : "") +
      '<div class="side-foot"><div class="socials">' + socials + "</div>" +
      '<button class="theme-btn" id="theme-btn" type="button"></button>' +
      '<p class="copyright">© ' + new Date().getFullYear() + " " + esc(S.name) + "</p></div></aside>";
  }

  /* ---------- page pieces ---------- */
  function pubEntry(p) {
    var img = p.image ? '<img class="entry-img" src="' + esc(p.image) + '" alt="" loading="lazy">' : "";
    return '<article class="entry' + (img ? "" : " no-img") + '">' + img +
      '<div class="entry-body"><p class="venue">' + esc(p.venue) + (p.year ? " · " + esc(p.year) : "") + "</p>" +
      "<h3>" + esc(p.title) + '</h3><p class="entry-meta">' + boldName(p.authors) + "</p>" + linkBtns(p.links) + "</div></article>";
  }

  function home() {
    var sel = list(S.publications).filter(function (p) { return p.selected; });
    return '<div class="page">' +
      '<header class="hero">' + (S.banner ? '<img class="banner" src="' + esc(S.banner) + '" alt="">' : '<div class="banner"></div>') +
      '<div class="hero-id"><img class="hero-photo" src="' + esc(S.photo) + '" alt="Photo of ' + esc(S.name) + '">' +
      '<div class="hero-text"><h1>' + esc(S.name) + '</h1><p class="sub">' + esc(S.title) + '</p><p class="hero-meta"><span>' + esc(S.affiliation) + "</span>" +
      (S.location ? '<span class="loc">' + ICONS.pin + esc(S.location) + "</span>" : "") + "</p></div></div></header>" +
      '<section class="section"><div class="prose">' + list(S.bio).map(function (p) { return "<p>" + md(p) + "</p>"; }).join("") + "</div></section>" +
      (list(S.news).length ? '<section class="section"><div class="section-head"><h2>News</h2></div><ul class="news">' +
        S.news.map(function (n) { return "<li><time>" + esc(n.date) + "</time><div>" + md(n.text) + "</div></li>"; }).join("") + "</ul></section>" : "") +
      (sel.length ? '<section class="section"><div class="section-head"><h2>Selected Publications</h2><a class="more" href="#publications">View all →</a></div><div class="entries">' +
        sel.map(pubEntry).join("") + "</div></section>" : "") +
      "</div>";
  }

  function publications() {
    var groups = {}, order = [];
    list(S.publications).forEach(function (p) {
      var y = p.year || "Other";
      if (!groups[y]) { groups[y] = []; order.push(y); }
      groups[y].push(p);
    });
    return '<div class="page"><header class="intro"><p class="eyebrow">Research</p><h1>Publications</h1></header>' +
      order.map(function (y) {
        return '<section class="year-group"><div class="section-head"><p class="year-label">' + esc(y) + '</p></div><div class="entries">' + groups[y].map(pubEntry).join("") + "</div></section>";
      }).join("") + "</div>";
  }

  function work() {
    return '<div class="page"><header class="intro"><p class="eyebrow">Career</p><h1>Work</h1></header>' +
      '<ol class="timeline">' + list(S.work || S.experience).map(function (e) {
        return '<li><span class="date">' + esc(e.start) + " – " + esc(e.end) + "</span><h3>" + esc(e.role) + "</h3>" +
          '<p class="org-line">' + esc(e.org) + (e.location ? " · " + esc(e.location) : "") + "</p>" +
          (list(e.points).length ? "<ul>" + e.points.map(function (pt) { return "<li>" + md(pt) + "</li>"; }).join("") + "</ul>" : "") + "</li>";
      }).join("") + "</ol></div>";
  }

  function projects() {
    var talks = list(S.talks);
    return '<div class="page"><header class="intro"><p class="eyebrow">Work</p><h1>Projects</h1></header>' +
      '<section class="section"><div class="entries">' + list(S.projects).map(function (p) {
        var img = p.image ? '<img class="entry-img" src="' + esc(p.image) + '" alt="" loading="lazy">' : "";
        return '<article class="entry' + (img ? "" : " no-img") + '">' + img + '<div class="entry-body"><span class="date">' + esc(p.date) + "</span><h3>" + esc(p.title) + "</h3>" +
          '<p class="entry-meta">' + md(p.description) + "</p>" +
          (list(p.tags).length ? '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
          linkBtns(p.links) + "</div></article>";
      }).join("") + "</div></section>" +
      (talks.length ? '<section class="section" id="talks"><div class="section-head"><h2>Talks &amp; Posters</h2>' +
        '<div class="filters" role="group" aria-label="Filter talks and posters">' +
        ["All", "Talk", "Poster"].map(function (f, i) { return '<button type="button" class="filter" data-filter="' + f + '" aria-pressed="' + (i === 0) + '">' + (f === "All" ? "All" : f + "s") + "</button>"; }).join("") +
        '</div></div><ul class="talks">' + talks.map(function (t, i) {
          var isPoster = String(t.type).toLowerCase() === "poster";
          return '<li class="talk" data-type="' + (isPoster ? "Poster" : "Talk") + '"><span class="badge ' + (isPoster ? "poster-t" : "talk-t") + '">' + (isPoster ? "Poster" : "Talk") + "</span>" +
            '<div class="talk-body"><h3>' + esc(t.title) + '</h3><p class="entry-meta">' + esc(t.event) + (t.location ? " · " + esc(t.location) : "") + (t.date ? " · " + esc(t.date) : "") + "</p></div>" +
            '<div class="btns">' + (t.file ? '<button type="button" class="btn" data-view="' + i + '">' + (isPoster ? "View poster" : "View slides") + "</button>" : "") + "</div></li>";
        }).join("") + "</ul></section>" : "") +
      "</div>";
  }

  function contact() {
    var L = S.links || {}, C = S.contact || {};
    var cards = [];
    if (L.email) cards.push('<div class="contact-card"><p class="eyebrow">Email</p><p><a href="mailto:' + esc(L.email) + '">' + esc(L.email) + '</a></p><div class="copy-row"><button type="button" class="btn" id="copy-email">Copy address</button><span class="entry-meta" id="copy-status" role="status"></span></div></div>');
    if (C.office || C.address) cards.push('<div class="contact-card"><p class="eyebrow">Office</p>' + (C.office ? "<p>" + esc(C.office) + "</p>" : "") + (C.address ? '<p class="entry-meta">' + esc(C.address) + "</p>" : "") + "</div>");
    var profiles = [["linkedin", "LinkedIn"], ["scholar", "Google Scholar"], ["github", "GitHub"], ["instagram", "Instagram"]].filter(function (p) { return L[p[0]]; });
    if (profiles.length) cards.push('<div class="contact-card"><p class="eyebrow">Profiles</p>' + profiles.map(function (p) { return '<p><a href="' + esc(L[p[0]]) + '" target="_blank" rel="noopener">' + p[1] + "</a></p>"; }).join("") + "</div>");
    return '<div class="page"><header class="intro"><p class="eyebrow">Get in touch</p><h1>Contact</h1></header>' +
      (C.note ? '<div class="prose"><p>' + md(C.note) + "</p></div>" : "") +
      '<div class="contact-grid">' + cards.join("") + "</div></div>";
  }

  function portfolio() {
    var items = list(S.portfolio);
    return '<div class="page"><header class="intro"><p class="eyebrow">Selected pieces</p><h1>Portfolio</h1></header>' +
      '<div class="tiles">' + items.map(function (it, i) {
        var inner = '<img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" loading="lazy">';
        var media = it.link ? '<a class="tile-media" href="' + esc(it.link) + '" target="_blank" rel="noopener">' + inner + "</a>"
          : '<button type="button" class="tile-media" data-zoom="portfolio:' + i + '" aria-label="Enlarge ' + esc(it.title) + '">' + inner + "</button>";
        return '<figure class="tile">' + media + '<figcaption><span class="date">' + esc(it.date) + "</span><h3>" +
          (it.link ? '<a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(it.title) + "</a>" : esc(it.title)) +
          '</h3><p class="entry-meta">' + md(it.caption) + "</p></figcaption></figure>";
      }).join("") + "</div></div>";
  }

  function more() {
    var M = S.more || {}, L = S.links || {};
    var acts = list(M.activities), gal = list(M.gallery);
    var ig = L.instagram ? L.instagram.replace(/\/+$/, "").split("/").pop() : "";
    return '<div class="page"><header class="intro"><p class="eyebrow">Beyond research</p><h1>More</h1></header>' +
      (M.intro ? '<div class="prose"><p>' + md(M.intro) + "</p></div>" : "") +
      (acts.length ? '<section class="section"><div class="section-head"><h2>Activities</h2></div><ul class="acts">' + acts.map(function (a) {
        return "<li><h3>" + esc(a.name) + '</h3><p class="entry-meta">' + md(a.text) + "</p></li>";
      }).join("") + "</ul></section>" : "") +
      (gal.length ? '<section class="section"><div class="section-head"><h2>Gallery</h2>' +
        (ig ? '<a class="more" href="' + esc(L.instagram) + '" target="_blank" rel="noopener">More on Instagram →</a>' : "") +
        '</div><div class="gallery">' + gal.map(function (g, i) {
          return '<figure><button type="button" class="tile-media" data-zoom="gallery:' + i + '" aria-label="Enlarge photo"><img src="' + esc(g.image) + '" alt="' + esc(g.caption) + '" loading="lazy"></button>' +
            (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>";
        }).join("") + "</div></section>" : "") +
      (ig ? '<a class="ig-card" href="' + esc(L.instagram) + '" target="_blank" rel="noopener">' + ICONS.instagram + '<span><strong>@' + esc(ig) + '</strong><span class="entry-meta">Follow along on Instagram</span></span></a>' : "") +
      "</div>";
  }

  var RENDER = { home: home, publications: publications, work: work, projects: projects, portfolio: portfolio, more: more, contact: contact };

  /* ---------- shell + routing ---------- */
  root.innerHTML = sidebar() + '<main class="main" id="main"></main>';
  var main = document.getElementById("main");

  function show() {
    var id = (location.hash || "#home").slice(1);
    if (id === "experience") id = "work";
    if (!RENDER[id]) id = "home";
    main.innerHTML = RENDER[id]();
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.getAttribute("data-page") === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var label = PAGES.filter(function (p) { return p.id === id; })[0].label;
    document.title = id === "home" ? S.name : label + " · " + S.name;
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);
  show();

  /* ---------- clicks ---------- */
  main.addEventListener("click", function (e) {
    var f = e.target.closest(".filter");
    if (f) {
      var type = f.getAttribute("data-filter");
      main.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b === f)); });
      main.querySelectorAll(".talk").forEach(function (li) { li.hidden = type !== "All" && li.getAttribute("data-type") !== type; });
      return;
    }
    var v = e.target.closest("[data-view]");
    if (v) { openViewer(list(S.talks)[+v.getAttribute("data-view")]); return; }
    var z = e.target.closest("[data-zoom]");
    if (z) {
      var parts = z.getAttribute("data-zoom").split(":");
      var src = parts[0] === "gallery" ? list((S.more || {}).gallery) : list(S.portfolio);
      var it = src[+parts[1]];
      if (it) openViewer({ type: "Poster", title: it.title || it.caption || "Photo", file: it.image, photo: true });
      return;
    }
    if (e.target.id === "copy-email") {
      var status = document.getElementById("copy-status");
      var addr = (S.links || {}).email;
      var done = function () { status.textContent = "Copied"; };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(main.querySelector(".contact-card a"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); status.textContent = "Selected. Press Ctrl+C or ⌘C to copy.";
      };
      try { navigator.clipboard.writeText(addr).then(done, fallback); } catch (err) { fallback(); }
    }
  });

  /* ---------- light / dark ---------- */
  var html = document.documentElement, btn = document.getElementById("theme-btn");
  function isDark() {
    var t = html.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintBtn() { btn.innerHTML = isDark() ? ICONS.sun + "Light mode" : ICONS.moon + "Dark mode"; }
  try { var saved = localStorage.getItem("theme"); if (saved) html.setAttribute("data-theme", saved); } catch (e) {}
  paintBtn();
  btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paintBtn();
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintBtn);

  /* ---------- slides & poster viewer ---------- */
  function openViewer(t) {
    if (!t || !t.file) return;
    var isPdf = /\.pdf$/i.test(t.file);
    var poster = String(t.type).toLowerCase() === "poster" && !t.photo;
    var box = document.createElement("div");
    box.className = "viewer"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", t.title);
    box.innerHTML = '<div class="viewer-bar"><span class="viewer-title">' + esc(t.title) + "</span>" +
      (isPdf && !poster ? '<button class="vbtn" data-act="prev" aria-label="Previous slide">←</button><span class="vcount" id="vcount">…</span><button class="vbtn" data-act="next" aria-label="Next slide">→</button>' : "") +
      '<button class="vbtn" data-act="out" aria-label="Zoom out">−</button><button class="vbtn" data-act="in" aria-label="Zoom in">+</button>' +
      '<a class="vbtn" href="' + esc(t.file) + '" target="_blank" rel="noopener">Open file</a>' +
      '<button class="vbtn" data-act="close" aria-label="Close">Close ✕</button></div>' +
      '<div class="viewer-stage" id="vstage"><p class="viewer-msg">Loading…</p></div>';
    document.body.appendChild(box);
    document.body.style.overflow = "hidden";
    var stage = box.querySelector("#vstage"), count = box.querySelector("#vcount");
    var zoom = 1, page = 1, doc = null, img = null, rendering = false;

    function fitScale(vw, vh) {
      var sw = stage.clientWidth - 8, sh = stage.clientHeight - 8;
      return poster ? sw / vw : Math.min(sw / vw, sh / vh);
    }
    function draw() {
      if (img) { img.style.width = (fitScale(img.naturalWidth, img.naturalHeight) * img.naturalWidth * zoom) + "px"; return; }
      if (!doc || rendering) return;
      rendering = true;
      doc.getPage(page).then(function (pg) {
        var base = pg.getViewport({ scale: 1 });
        var scale = fitScale(base.width, base.height) * zoom;
        var dpr = window.devicePixelRatio || 1;
        var vp = pg.getViewport({ scale: scale * dpr });
        var c = document.createElement("canvas");
        c.width = vp.width; c.height = vp.height;
        c.style.width = (vp.width / dpr) + "px"; c.style.height = (vp.height / dpr) + "px";
        return pg.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise.then(function () {
          stage.innerHTML = ""; stage.appendChild(c);
          if (count) count.textContent = page + " / " + doc.numPages;
          box.querySelectorAll('[data-act="prev"]').forEach(function (b) { b.disabled = page <= 1; });
          box.querySelectorAll('[data-act="next"]').forEach(function (b) { b.disabled = page >= doc.numPages; });
        });
      }).catch(fail).then(function () { rendering = false; });
    }
    function fail() {
      stage.innerHTML = '<p class="viewer-msg">This file could not be shown here. Check that the file name in content.js matches the file in the files folder, or use “Open file”.</p>';
    }
    function close() {
      box.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", draw);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight" && doc && page < doc.numPages) { page++; draw(); }
      else if (e.key === "ArrowLeft" && page > 1) { page--; draw(); }
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]"); if (!b) { if (e.target === box) close(); return; }
      var a = b.getAttribute("data-act");
      if (a === "close") close();
      if (a === "prev" && page > 1) { page--; draw(); }
      if (a === "next" && doc && page < doc.numPages) { page++; draw(); }
      if (a === "in") { zoom = Math.min(zoom * 1.25, 5); draw(); }
      if (a === "out") { zoom = Math.max(zoom / 1.25, 0.4); draw(); }
    });
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", draw);
    box.querySelector('[data-act="close"]').focus();

    if (!isPdf) {
      img = new Image(); img.alt = t.title;
      img.onload = function () { stage.innerHTML = ""; stage.appendChild(img); draw(); };
      img.onerror = fail; img.src = t.file;
      return;
    }
    if (!window.pdfjsLib) { fail(); return; }
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/lib/pdf.worker.min.js";
    window.pdfjsLib.getDocument(t.file).promise.then(function (d) { doc = d; draw(); }, fail);
  }
})();
