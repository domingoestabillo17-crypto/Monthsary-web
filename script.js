/* =========================================================================
   ❤️  MONTHSARY SURPRISE — SCRIPT
   Everything here runs automatically. You should not need to edit this file
   to personalize the website — use config.js instead.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Tiny helpers
     --------------------------------------------------------------------- */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  // A pretty inline placeholder used whenever a photo file can't be found.
  const PLACEHOLDER =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#ffd9ec"/><stop offset="1" stop-color="#e4d3ff"/>' +
        "</linearGradient></defs>" +
        '<rect width="500" height="500" fill="url(#g)"/>' +
        '<text x="250" y="230" font-size="120" text-anchor="middle" fill="#ff5fa2">\u2665</text>' +
        '<text x="250" y="310" font-size="30" text-anchor="middle" fill="#a86bb5"' +
        ' font-family="Poppins,Arial,sans-serif">Add your photo</text>' +
        '<text x="250" y="350" font-size="19" text-anchor="middle" fill="#c39ad0"' +
        ' font-family="Poppins,Arial,sans-serif">assets/images/</text>' +
      "</svg>"
    );

  // Tries each source in order (e.g. .jpg -> .svg backup -> inline placeholder)
  // so a missing photo never shows a broken image and never breaks the page.
  function applyImageFallbacks(img, sources) {
    const list = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
    if (!list.length) list.push(PLACEHOLDER);
    if (list[list.length - 1] !== PLACEHOLDER) list.push(PLACEHOLDER);
    let i = 0;
    img.src = list[0];
    img.addEventListener("error", function handler() {
      i++;
      if (i < list.length) {
        img.src = list[i];
      } else {
        img.removeEventListener("error", handler);
      }
    });
  }

  /* ---------------------------------------------------------------------
     BACKGROUND — floating hearts, sparkles, petals, star field
     --------------------------------------------------------------------- */
  function buildBackground() {
    if (reduceMotion) return;
    const bg = $("#bgLayer");
    const petalLayer = $("#petalLayer");
    const hearts = ["❤", "💗", "💕", "♥", "💖", "💓"];

    if (bg) {
      const heartCount = window.innerWidth < 640 ? 10 : 18;
      for (let i = 0; i < heartCount; i++) {
        const h = document.createElement("span");
        h.className = "bh-heart";
        h.textContent = hearts[i % hearts.length];
        h.style.left = rand(0, 100) + "%";
        h.style.fontSize = rand(12, 30) + "px";
        h.style.animationDuration = rand(12, 26) + "s";
        h.style.animationDelay = rand(0, 20) + "s";
        h.style.setProperty("--op", rand(0.25, 0.75).toFixed(2));
        bg.appendChild(h);
      }

      const sparkleCount = window.innerWidth < 640 ? 14 : 26;
      for (let i = 0; i < sparkleCount; i++) {
        const s = document.createElement("span");
        s.className = "sparkle";
        s.style.left = rand(0, 100) + "%";
        s.style.top = rand(0, 100) + "%";
        s.style.animationDelay = rand(0, 3) + "s";
        s.style.animationDuration = rand(2, 4) + "s";
        const size = rand(3, 7);
        s.style.width = size + "px";
        s.style.height = size + "px";
        bg.appendChild(s);
      }
    }

    if (petalLayer) {
      const petalCount = window.innerWidth < 640 ? 8 : 16;
      for (let i = 0; i < petalCount; i++) {
        const p = document.createElement("span");
        p.className = "petal";
        p.style.left = rand(0, 100) + "%";
        const size = rand(10, 20);
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.animationDuration = rand(9, 18) + "s";
        p.style.animationDelay = rand(0, 14) + "s";
        petalLayer.appendChild(p);
      }
    }
  }

  function buildStarCanvas() {
    const canvas = $("#starCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let stars = [];

    function makeStars() {
      const count = Math.round((window.innerWidth * window.innerHeight) / 12000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: rand(0.3, 1.6),
          ph: rand(0, Math.PI * 2),
          sp: rand(0.4, 1.6)
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      makeStars();
      if (reduceMotion) draw(0);
    }

    let t = 0;
    function draw(time) {
      t = time * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = reduceMotion ? 0.6 : 0.3 + 0.6 * Math.abs(Math.sin(s.ph + t * s.sp));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      draw(0);
    } else {
      setInterval(function () {
        draw(performance.now());
      }, 90);
    }
  }

  /* ---------------------------------------------------------------------
     HEART BURST on button click
     --------------------------------------------------------------------- */
  function heartBurst(x, y) {
    if (reduceMotion) return;
    const chars = ["❤", "💗", "💖", "♥", "💞", "💘"];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.textContent = chars[i % chars.length];
      const ang = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
      const dist = rand(60, 150);
      h.style.left = x + "px";
      h.style.top = y + "px";
      h.style.fontSize = rand(16, 34) + "px";
      h.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      h.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      h.style.setProperty("--sc", rand(0.7, 1.5).toFixed(2));
      h.style.setProperty("--rz", rand(-180, 180) + "deg");
      document.body.appendChild(h);
      (function (el) {
        setTimeout(function () {
          el.remove();
        }, 1200);
      })(h);
    }
  }

  function bindBursts() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(
        ".btn, .ctrl, .mini-ctrl, .dot, .lb-slide-toggle, .envelope"
      );
      if (btn) heartBurst(e.clientX, e.clientY);
    });
  }

  /* ---------------------------------------------------------------------
     TYPEWRITER
     --------------------------------------------------------------------- */
  function typeWriter(el, text, opts) {
    opts = opts || {};
    const speed = opts.speed || 26;
    const onDone = opts.onDone;

    if (reduceMotion) {
      el.textContent = text;
      if (onDone) onDone();
      return { finish: function () {}, isDone: function () { return true; } };
    }

    el.textContent = "";
    const caret = document.createElement("span");
    caret.className = "caret";
    el.appendChild(caret);

    let i = 0;
    let done = false;
    let timer = null;

    function finish() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      el.textContent = text;
      if (onDone) onDone();
    }

    function step() {
      if (i >= text.length) {
        finish();
        return;
      }
      const ch = text.charAt(i++);
      el.textContent = text.slice(0, i);
      el.appendChild(caret);
      let d = speed;
      if (".!?".indexOf(ch) !== -1) d = speed * 9;
      else if (",;:".indexOf(ch) !== -1) d = speed * 4;
      else if (ch === "\n") d = speed * 3;
      timer = setTimeout(step, d);
    }

    timer = setTimeout(step, opts.startDelay || 0);
    return { finish: finish, isDone: function () { return done; } };
  }

  /* ---------------------------------------------------------------------
     CONTENT — welcome text, gallery, playlist
     --------------------------------------------------------------------- */
  function applyWelcome() {
    const g = $("#greetingText");
    const s = $("#welcomeSubtitle");
    const b = $("#openSurpriseBtn");
    const brand = $("#brandName");
    if (g) g.textContent = CONFIG.greeting;
    if (s) s.textContent = CONFIG.welcomeSubtitle;
    if (b) b.textContent = CONFIG.openButtonText;
    if (brand) brand.textContent = CONFIG.girlfriendName || "Our Story";
    document.title = CONFIG.greeting || document.title;

    const letterName = $("#letterSignName");
    if (letterName) letterName.textContent = CONFIG.girlfriendName || "My Love";
  }

  function buildGallery() {
    const grid = $("#galleryGrid");
    if (!grid || !Array.isArray(CONFIG.gallery)) return;
    grid.innerHTML = "";
    CONFIG.gallery.forEach(function (item, i) {
      const fig = document.createElement("figure");
      fig.className = "polaroid reveal zoom-in";
      fig.style.transitionDelay = (i * 70) + "ms";
      fig.setAttribute("data-index", i);
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("aria-label", "View photo: " + (item.caption || ""));

      const tape = document.createElement("span");
      tape.className = "tape";

      const mh = document.createElement("span");
      mh.className = "mini-heart";
      mh.textContent = "❤";

      const img = document.createElement("img");
      img.className = "polaroid-img";
      img.alt = item.caption || "our photo";
      img.loading = "lazy";
      applyImageFallbacks(img, [item.file, item.fallback]);

      const cap = document.createElement("figcaption");
      cap.className = "polaroid-caption";
      cap.textContent = item.caption || "";

      fig.appendChild(tape);
      fig.appendChild(mh);
      fig.appendChild(img);
      fig.appendChild(cap);

      fig.addEventListener("click", function () { openLightbox(i); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(i);
        }
      });

      grid.appendChild(fig);
    });
  }

  /* ---------------------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------------------- */
  function bindReveals() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });

    // Re-run for elements added later (the gallery uses .reveal)
    const mo = new MutationObserver(function () {
      $$(".reveal:not(.in-view)").forEach(function (el) { io.observe(el); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ---------------------------------------------------------------------
     WELCOME → OPEN SURPRISE
     --------------------------------------------------------------------- */
  function bindOpenSurprise() {
    const btn = $("#openSurpriseBtn");
    const welcome = $("#welcome");
    if (!btn) return;

    function open() {
      heartBurst(window.innerWidth / 2, window.innerHeight / 2);
      if (welcome && !reduceMotion) welcome.classList.add("opening");
      showMiniPlayer();

      const delay = reduceMotion ? 0 : 900;
      setTimeout(function () {
        const next = $("#gallery");
        if (next) next.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        // Start our song once she opens the surprise (a real user gesture).
        if (typeof player !== "undefined" && player.tracks.length) {
          player.play();
        }
      }, delay);
    }

    btn.addEventListener("click", open);
  }

  /* =====================================================================
     MUSIC PLAYER ENGINE
     ===================================================================== */
  const player = {
    audio: new Audio(),
    tracks: [],
    index: 0,
    shuffle: false,
    ready: false,
    playing: false,
    sources: [],
    srcIndex: 0
  };

  // Every track may have a fallback path, so a song still plays whether the
  // file sits next to index.html or inside assets/music/.
  function trackSources(t) {
    return [t && t.file, t && t.fallback].filter(Boolean);
  }

  var errorStreak = 0;

  function buildPlaylist() {
    const list = $("#playlistEl");
    const empty = $("#playlistEmpty");
    player.tracks = (Array.isArray(CONFIG.playlist) ? CONFIG.playlist : []).filter(
      function (t) {
        return t && t.file;
      }
    );

    if (list) list.innerHTML = "";
    if (empty) empty.style.display = player.tracks.length ? "none" : "block";

    player.tracks.forEach(function (t, i) {
      const li = document.createElement("li");
      li.setAttribute("data-index", i);
      li.innerHTML =
        '<span class="pli-num">' + (i + 1) + "</span>" +
        '<span class="pli-title"></span>';
      li.querySelector(".pli-title").textContent = t.title || t.file;
      li.addEventListener("click", function () {
        loadTrack(i, true);
      });
      if (list) list.appendChild(li);
    });
  }

  function loadTrack(i, play) {
    if (!player.tracks.length) {
      renderPlayer();
      return;
    }
    player.index = (i + player.tracks.length) % player.tracks.length;
    const t = player.tracks[player.index];
    player.sources = trackSources(t);
    player.srcIndex = 0;
    player.playing = false;
    player.audio.src = player.sources[0] || t.file;
    player.audio.load();
    renderPlayer();
    if (play) {
      const p = player.audio.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  player.play = function () {
    if (!player.tracks.length) return;
    if (!player.audio.src) {
      loadTrack(player.index, true);
      return;
    }
    const p = player.audio.play();
    if (p && p.catch) p.catch(function () {});
  };

  player.pause = function () { player.audio.pause(); };

  player.toggle = function () {
    if (!player.tracks.length) return;
    if (player.audio.paused) player.play();
    else player.pause();
  };

  player.next = function () {
    if (!player.tracks.length) return;
    if (player.shuffle && player.tracks.length > 1) {
      let n = player.index;
      while (n === player.index) n = Math.floor(Math.random() * player.tracks.length);
      loadTrack(n, true);
    } else {
      loadTrack(player.index + 1, true);
    }
  };

  player.prev = function () {
    if (!player.tracks.length) return;
    if (player.audio.currentTime > 3) {
      player.audio.currentTime = 0;
      return;
    }
    loadTrack(player.index - 1, true);
  };

  function setVolume(v) {
    v = Math.max(0, Math.min(1, v));
    player.audio.volume = v;
    if (v > 0) player.audio.muted = false;
    try {
      localStorage.setItem("monthsary_volume", String(v));
    } catch (e) {}
    renderPlayer();
  }

  function initVolume() {
    let v = typeof CONFIG.startVolume === "number" ? CONFIG.startVolume : 0.7;
    try {
      const saved = localStorage.getItem("monthsary_volume");
      if (saved !== null) v = parseFloat(saved);
    } catch (e) {}
    player.audio.volume = Math.max(0, Math.min(1, v));
  }

  /* ---- player UI wiring ------------------------------------------------ */
  function bindPlayerUI() {
    const audio = player.audio;

    $$(".js-play").forEach(function (b) {
      b.addEventListener("click", function () { player.toggle(); });
    });
    $$(".js-prev").forEach(function (b) {
      b.addEventListener("click", function () { player.prev(); });
    });
    $$(".js-next").forEach(function (b) {
      b.addEventListener("click", function () { player.next(); });
    });
    $$(".js-mute").forEach(function (b) {
      b.addEventListener("click", function () {
        audio.muted = !audio.muted;
        renderPlayer();
      });
    });
    $$(".js-seek").forEach(function (r) {
      r.addEventListener("input", function () {
        const dur = audio.duration || 0;
        if (dur) {
          audio.currentTime = (parseFloat(r.value) / 1000) * dur;
          const fill = $("#miniProgressFill");
          if (fill) fill.style.width = (parseFloat(r.value) / 10) + "%";
        }
      });
      r.addEventListener("change", renderPlayer);
    });
    $$(".js-volume").forEach(function (r) {
      r.addEventListener("input", function () {
        setVolume(parseFloat(r.value) / 100);
      });
    });

    const shuf = $("#shuffleBtn");
    if (shuf) {
      shuf.addEventListener("click", function () {
        player.shuffle = !player.shuffle;
        shuf.classList.toggle("active", player.shuffle);
      });
    }
    const loop = $("#loopBtn");
    if (loop) {
      loop.addEventListener("click", function () {
        audio.loop = !audio.loop;
        loop.classList.toggle("active", audio.loop);
        renderPlayer();
      });
    }

    audio.addEventListener("timeupdate", renderPlayer);
    audio.addEventListener("loadedmetadata", function () {
      errorStreak = 0;
      player.ready = true;
      renderPlayer();
    });
    audio.addEventListener("canplay", function () {
      errorStreak = 0;
    });
    audio.addEventListener("play", function () {
      renderPlayer();
    });
    audio.addEventListener("playing", function () {
      player.playing = true;
      const vinyl = $("#vinylDisc");
      if (vinyl && !reduceMotion) vinyl.classList.add("spinning");
      renderPlayer();
    });
    audio.addEventListener("pause", function () {
      player.playing = false;
      const vinyl = $("#vinylDisc");
      if (vinyl) vinyl.classList.remove("spinning");
      renderPlayer();
    });
    audio.addEventListener("ended", function () {
      player.playing = false;
      if (audio.loop) return;
      player.next();
    });
    audio.addEventListener("error", function () {
      if (!audio.src || !player.tracks.length) return;
      // Try the current track's next candidate path before skipping it.
      if (player.srcIndex < player.sources.length - 1) {
        player.srcIndex++;
        audio.src = player.sources[player.srcIndex];
        audio.load();
        return;
      }
      player.playing = false;
      errorStreak++;
      if (errorStreak < player.tracks.length) {
        player.next();
      } else {
        // Every file seems missing — stop gracefully, keep the site alive.
        renderPlayer();
      }
    });

    audio.loop = !!CONFIG.loopMusic;
    const loopBtn = $("#loopBtn");
    if (loopBtn) loopBtn.classList.toggle("active", audio.loop);

    initVolume();
    if (player.tracks.length) loadTrack(0, false);
    renderPlayer();
  }

  function renderPlayer() {
    const audio = player.audio;
    const t = player.tracks[player.index];
    const has = !!t;

    $$(".js-title").forEach(function (el) {
      el.textContent = has ? (t.title || t.file) : "No song selected";
    });

    const cur = audio.currentTime || 0;
    const dur = audio.duration || 0;

    $$(".js-time-current").forEach(function (el) { el.textContent = fmtTime(cur); });
    $$(".js-time-duration").forEach(function (el) { el.textContent = fmtTime(dur); });

    const val = dur ? (cur / dur) * 1000 : 0;
    $$(".js-seek").forEach(function (el) {
      if (document.activeElement !== el) el.value = val;
    });
    const fill = $("#miniProgressFill");
    if (fill) fill.style.width = (dur ? (cur / dur) * 100 : 0) + "%";

    const playing = player.playing;
    $$(".js-play .play-icon").forEach(function (el) {
      el.textContent = playing ? "❚❚" : "▶";
    });
    $$(".js-play").forEach(function (el) {
      el.setAttribute("aria-label", playing ? "Pause" : "Play");
    });
    $$(".js-mute").forEach(function (el) {
      el.textContent = audio.muted || audio.volume === 0 ? "🔇" : "🔊";
    });

    const vol = $("#volumeBar");
    if (vol && document.activeElement !== vol) {
      vol.value = audio.muted ? 0 : Math.round(audio.volume * 100);
    }

    const shuf = $("#shuffleBtn");
    if (shuf) shuf.classList.toggle("active", player.shuffle);
    const loop = $("#loopBtn");
    if (loop) loop.classList.toggle("active", audio.loop);

    $$("#playlistEl li").forEach(function (li, i) {
      li.classList.toggle("playing", i === player.index);
    });
  }

  /* ---- visualizer bars ------------------------------------------------- */
  function buildVisualizers() {
    $$(".js-visualizer").forEach(function (v) {
      const count = v.classList.contains("mini-visualizer") ? 10 : 22;
      v.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const b = document.createElement("span");
        b.className = "bar";
        b.style.height = "8%";
        v.appendChild(b);
      }
    });
  }

  function startVisualizerLoop() {
    if (reduceMotion) return;
    let phase = 0;
    function tick() {
      phase += 0.14;
      const playing = player.playing;
      $$(".js-visualizer").forEach(function (v) {
        const isMini = v.classList.contains("mini-visualizer");
        const bars = v.querySelectorAll(".bar");
        for (let i = 0; i < bars.length; i++) {
          let h;
          if (playing) {
            const wave = Math.abs(Math.sin(phase + i * 0.6)) * 0.7 + Math.random() * 0.3;
            h = 14 + wave * (isMini ? 70 : 92);
          } else {
            h = 8 + Math.abs(Math.sin(phase * 0.4 + i)) * 4;
          }
          bars[i].style.height = h + "%";
        }
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------------
     MINI PLAYER visibility
     --------------------------------------------------------------------- */
  function showMiniPlayer() {
    const mp = $("#miniPlayer");
    if (!mp) return;
    mp.classList.remove("dismissed");
    mp.classList.add("visible");
  }

  function bindMiniPlayer() {
    const close = $("#miniCloseBtn");
    if (close) {
      close.addEventListener("click", function () {
        const mp = $("#miniPlayer");
        mp.classList.remove("visible");
        mp.classList.add("dismissed");
      });
    }
    // Show the player as soon as she scrolls away from the welcome screen.
    let shown = false;
    window.addEventListener("scroll", function () {
      if (!shown && window.scrollY > window.innerHeight * 0.4) {
        shown = true;
        showMiniPlayer();
      }
    }, { passive: true });
  }

  /* =====================================================================
     GALLERY LIGHTBOX + SLIDESHOW
     ===================================================================== */
  const lightbox = {
    el: null,
    img: null,
    cap: null,
    counter: null,
    toggleBtn: null,
    index: 0,
    slideshow: false,
    timer: null,
    sources: [],
    si: 0
  };

  function photoFor(index) {
    const item = (CONFIG.gallery || [])[index] || {};
    return {
      file: item.file || PLACEHOLDER,
      fallback: item.fallback || "",
      caption: item.caption || ""
    };
  }

  function openLightbox(index) {
    if (!lightbox.el) return;
    lightbox.index = index;
    updateLightbox();
    lightbox.el.classList.add("open");
    lightbox.el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    heartBurst(window.innerWidth / 2, window.innerHeight / 2);
  }

  function closeLightbox() {
    if (!lightbox.el) return;
    lightbox.el.classList.remove("open");
    lightbox.el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    stopSlideshow();
  }

  function setLightboxImage(item) {
    lightbox.sources = [item.file, item.fallback, PLACEHOLDER].filter(Boolean);
    lightbox.si = 0;
    lightbox.img.src = lightbox.sources[0];
  }

  function updateLightbox() {
    const total = (CONFIG.gallery || []).length || 1;
    lightbox.index = (lightbox.index + total) % total;
    const p = photoFor(lightbox.index);
    setLightboxImage(p);
    lightbox.img.alt = p.caption || "our photo";
    lightbox.cap.textContent = p.caption;
    lightbox.counter.textContent = (lightbox.index + 1) + " / " + total;
  }

  function lbNext() { lightbox.index += 1; updateLightbox(); }
  function lbPrev() { lightbox.index -= 1; updateLightbox(); }

  function startSlideshow() {
    if (!lightbox.el) return;
    lightbox.slideshow = true;
    if (lightbox.toggleBtn) lightbox.toggleBtn.textContent = "❚❚ Pause";
    clearInterval(lightbox.timer);
    lightbox.timer = setInterval(function () {
      lightbox.index += 1;
      updateLightbox();
    }, 3500);
  }

  function stopSlideshow() {
    lightbox.slideshow = false;
    if (lightbox.toggleBtn) lightbox.toggleBtn.textContent = "▶ Slideshow";
    clearInterval(lightbox.timer);
  }

  function bindLightbox() {
    lightbox.el = $("#lightbox");
    lightbox.img = $("#lbImg");
    lightbox.cap = $("#lbCaption");
    lightbox.counter = $("#lbCounter");
    lightbox.toggleBtn = $("#lbSlideToggle");
    if (!lightbox.el) return;

    // Walks the fallback chain (.jpg -> .svg backup -> inline placeholder)
    // whenever the current lightbox image fails to load.
    lightbox.img.addEventListener("error", function () {
      lightbox.si++;
      if (lightbox.si < lightbox.sources.length) {
        lightbox.img.src = lightbox.sources[lightbox.si];
      }
    });

    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbNext").addEventListener("click", lbNext);
    $("#lbPrev").addEventListener("click", lbPrev);
    lightbox.toggleBtn.addEventListener("click", function () {
      if (lightbox.slideshow) stopSlideshow();
      else startSlideshow();
    });

    lightbox.el.addEventListener("click", function (e) {
      if (e.target === lightbox.el) closeLightbox();
    });

    const startBtn = $("#startSlideshowBtn");
    if (startBtn) {
      startBtn.addEventListener("click", function () {
        openLightbox(0);
        startSlideshow();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!lightbox.el.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") lbNext();
      else if (e.key === "ArrowLeft") lbPrev();
    });
  }

  /* ---------------------------------------------------------------------
     LOVE LETTER — envelope + typewriter
     --------------------------------------------------------------------- */
  function buildLetterSparkles() {
    const wrap = $("#letterSparkles");
    if (!wrap || reduceMotion) return;
    wrap.innerHTML = "";
    const count = 16;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "s";
      s.style.left = rand(5, 95) + "%";
      s.style.top = rand(5, 95) + "%";
      s.style.animationDelay = rand(0, 2.4) + "s";
      s.style.transform = "scale(" + rand(0.6, 1.4).toFixed(2) + ")";
      wrap.appendChild(s);
    }
  }

  function bindLetter() {
    const env = $("#envelope");
    const wrap = $("#envelopeWrap");
    const card = $("#letterCard");
    const body = $("#letterText");
    const revealBtn = $("#revealLetterBtn");
    const hint = $("#envelopeHint");
    if (!env || !card) return;

    let opened = false;
    let controller = null;

    function openLetter() {
      if (opened) return;
      opened = true;
      env.classList.add("open");
      if (hint) hint.textContent = "❤";
      buildLetterSparkles();

      const delay = reduceMotion ? 0 : 850;
      setTimeout(function () {
        card.classList.add("show");
        card.setAttribute("aria-hidden", "false");
        controller = typeWriter(body, CONFIG.letter || "", { speed: 24 });
      }, delay);
    }

    env.addEventListener("click", openLetter);
    env.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLetter();
      }
    });
    if (revealBtn) {
      revealBtn.addEventListener("click", function () {
        if (!opened) {
          openLetter();
          return;
        }
        if (controller) controller.finish();
        else body.textContent = CONFIG.letter || "";
      });
    }

    if (wrap) wrap.classList.remove("hidden");
  }

  /* ---------------------------------------------------------------------
     FINAL SURPRISE
     --------------------------------------------------------------------- */
  const finalState = { hasRun: false, controller: null };

  function buildFinalFloatingHearts() {
    const wrap = $("#finalHearts");
    if (!wrap || reduceMotion) return;
    wrap.innerHTML = "";
    const hearts = ["❤", "💗", "💕", "♥"];
    for (let i = 0; i < 14; i++) {
      const h = document.createElement("span");
      h.className = "fh";
      h.textContent = hearts[i % hearts.length];
      h.style.left = rand(0, 100) + "%";
      h.style.fontSize = rand(12, 26) + "px";
      h.style.animationDuration = rand(10, 20) + "s";
      h.style.animationDelay = rand(0, 12) + "s";
      h.style.setProperty("--op", rand(0.3, 0.8).toFixed(2));
      wrap.appendChild(h);
    }
  }

  function buildShootingStars() {
    const wrap = $("#shootingStars");
    if (!wrap || reduceMotion) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const s = document.createElement("span");
      s.className = "shooting-star";
      s.style.top = rand(5, 45) + "%";
      s.style.left = rand(50, 100) + "%";
      s.style.animationDelay = rand(0, 6) + "s";
      s.style.animationDuration = rand(4, 8) + "s";
      wrap.appendChild(s);
    }
  }

  function runFinalSequence() {
    if (finalState.hasRun) return;
    finalState.hasRun = true;

    const intro = $("#finalIntroText");
    const heading = $("#finalHeadingText");
    const message = $("#finalMessageText");
    const tagline = $("#finalTaglineText");
    const replay = $("#replayBtn");

    if (intro) intro.textContent = CONFIG.finalIntro || "";
    if (heading) heading.textContent = CONFIG.finalHeading || "";
    if (tagline) tagline.textContent = CONFIG.finalTagline || "";

    if (reduceMotion) {
      if (intro) intro.classList.add("show");
      if (heading) heading.classList.add("show");
      if (message) message.classList.add("show");
      if (message) message.textContent = CONFIG.finalMessage || "";
      if (tagline) tagline.classList.add("show");
      if (replay) replay.classList.add("show");
      heartBurst(window.innerWidth / 2, window.innerHeight / 2);
      return;
    }

    // 1. Soft intro line
    setTimeout(function () { if (intro) intro.classList.add("show"); }, 300);

    // 2. Cinematic heading
    setTimeout(function () {
      if (heading) heading.classList.add("show");
      heartBurst(window.innerWidth / 2, window.innerHeight * 0.4);
    }, 2800);

    // 3. The heartfelt message, typed out
    setTimeout(function () {
      if (message) message.classList.add("show");
      finalState.controller = typeWriter(message, CONFIG.finalMessage || "", {
        speed: 20,
        onDone: function () {
          if (tagline) tagline.classList.add("show");
          if (replay) replay.classList.add("show");
          heartBurst(window.innerWidth / 2, window.innerHeight * 0.5);
          setTimeout(function () { heartBurst(window.innerWidth / 2, window.innerHeight * 0.6); }, 250);
        }
      });
    }, 4600);
  }

  function bindFinal() {
    const section = $("#final");
    if (!section) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      runFinalSequence();
      if (reduceMotion) {
        // runFinalSequence handles reduced motion itself
      }
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runFinalSequence();
          io.disconnect();
        }
      });
    }, { threshold: 0.45 });
    io.observe(section);
  }

  function bindReplay() {
    const btn = $("#replayBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      heartBurst(window.innerWidth / 2, window.innerHeight / 2);
      resetAll();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function resetAll() {
    // Welcome
    const welcome = $("#welcome");
    if (welcome) welcome.classList.remove("opening");

    // Final section
    finalState.hasRun = false;
    finalState.controller = null;
    ["#finalIntroText", "#finalHeadingText", "#finalMessageText", "#finalTaglineText", "#replayBtn"].forEach(function (sel) {
      const el = $(sel);
      if (el) el.classList.remove("show");
    });
    const msg = $("#finalMessageText");
    if (msg) msg.textContent = "";

    // Letter (leave it open so she can re-read it)
  }

  /* ---------------------------------------------------------------------
     REVEAL re-trigger helper for dynamically added reveal elements
     --------------------------------------------------------------------- */
  function refreshReveals() {
    if (!("IntersectionObserver" in window) || reduceMotion) return;
    $$(".reveal:not(.in-view)").forEach(function (el) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("in-view");
    });
  }

  /* ---------------------------------------------------------------------
     NAVIGATION DOTS + TOP BAR
     --------------------------------------------------------------------- */
  function buildNav() {
    const nav = $("#sectionNav");
    const sections = $$(".section[data-title]");
    if (!nav) return;
    nav.innerHTML = "";
    sections.forEach(function (sec) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", sec.getAttribute("data-title"));
      dot.setAttribute("data-target", sec.id);
      dot.addEventListener("click", function () {
        sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
      nav.appendChild(dot);
    });

    const dots = $$(".dot", nav);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            dots.forEach(function (d) {
              d.classList.toggle("active", d.getAttribute("data-target") === entry.target.id);
            });
          }
        });
      }, { threshold: 0.5 });
      sections.forEach(function (sec) { io.observe(sec); });
    }

    const topbar = $(".topbar");
    if (topbar) {
      let shown = false;
      window.addEventListener("scroll", function () {
        if (!shown && window.scrollY > window.innerHeight * 0.4) {
          shown = true;
          topbar.classList.add("visible");
          refreshReveals();
        }
      }, { passive: true });
    }
  }

  /* ---------------------------------------------------------------------
     BOOT
     --------------------------------------------------------------------- */
  function init() {
    if (typeof CONFIG === "undefined") {
      console.error("config.js is missing — please make sure it is loaded before script.js");
      return;
    }

    buildBackground();
    buildStarCanvas();

    applyWelcome();
    buildGallery();

    buildVisualizers();
    buildPlaylist();
    bindPlayerUI();
    startVisualizerLoop();
    bindMiniPlayer();

    bindReveals();
    bindOpenSurprise();
    bindLightbox();
    bindLetter();
    bindFinal();
    bindReplay();
    buildFinalFloatingHearts();
    buildShootingStars();

    bindBursts();
    buildNav();

    // Make sure anything already in view fades in on load.
    setTimeout(refreshReveals, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
