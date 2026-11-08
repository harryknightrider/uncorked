/* ==========================================================================
   Uncorked: game engine
   Plain JavaScript, no build step. Content comes from js/data.js.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Setup & helpers ---------- */
  const KEY = 'uncorked.v1';
  const app = document.getElementById('app');
  const GRAPE = Object.fromEntries(GRAPES.map(g => [g.id, g]));
  const CELLAR = Object.fromEntries(CELLARS.map(c => [c.id, c]));
  const PLAYABLE = CELLARS.filter(c => !c.comingSoon);
  const CORE = GRAPES.filter(g => !g.bonus), BONUS = GRAPES.filter(g => g.bonus);
  const CHEERS = ['Spot on!', 'Cheers to that! 🥂', 'Nailed it!', 'Bang on!', 'Lovely stuff!', 'Top marks!'];
  const OOPS = ['Not quite!', 'Close, but no cork.', 'Ooh, not this time.'];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const $ = (sel, root = app) => root.querySelector(sel);
  const $$ = (sel, root = app) => Array.from(root.querySelectorAll(sel));
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  /* ---------- Saved progress (on this device only) ---------- */
  function freshState() {
    return { ageOk: false, corks: 0, cellars: {}, missed: [], palate: null, test: { best: null, passed: false, name: '', last: null } };
  }
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved) return Object.assign(freshState(), saved);
    } catch (e) { /* storage unavailable: play without saving */ }
    return freshState();
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

  const isDone = id => !!(state.cellars[id] && state.cellars[id].done);
  const isUnlocked = c => PLAYABLE.slice(0, PLAYABLE.indexOf(c)).every(p => isDone(p.id));
  const discoveredGrapes = () => GRAPES.filter(g => isDone(g.cellar)).map(g => g.id);

  function noteMissed(id, ok) {
    const i = state.missed.indexOf(id);
    if (ok && i > -1) state.missed.splice(i, 1);
    if (!ok && i === -1) state.missed.push(id);
  }

  /* ---------- Rendering ---------- */
  function render(html, keepScroll) {
    app.innerHTML = html;
    if (!keepScroll) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
    updateChrome();
  }
  function updateChrome() {
    document.getElementById('topbar').hidden = !state.ageOk;
    document.getElementById('footer').hidden = !state.ageOk;
    document.getElementById('corks').textContent = `🍾 ${state.corks}`;
    document.getElementById('corks').title = `${plural(state.corks, 'cork')} earned`;
  }
  function on(sel, fn, root) { $$(sel, root).forEach(el => el.addEventListener('click', fn)); }

  /* ---------- Router ---------- */
  function route() {
    if (!state.ageOk) return viewGate();
    const [name, arg] = (location.hash.replace('#', '') || 'home').split('/');
    const routes = { home: viewHome, map: viewMap, cheat: viewCheat, test: startTest, results: viewResults, cellar: () => startCellar(arg),
      homescreen: viewHomescreen, move: viewMove, import: () => viewImport(arg), eat: () => viewEat(arg), palate: viewPalate };
    (routes[name] || viewHome)();
  }
  function go(hash) { if (location.hash === '#' + hash) route(); else location.hash = hash; }
  window.addEventListener('hashchange', route);
  // A link to the page's own address (e.g. "#home" while the address already says #home)
  // doesn't fire hashchange, so handle it here. Skips in-page jump links, which cancel the click.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && !e.defaultPrevented && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
  });

  /* ======================================================================
     VIEWS
     ====================================================================== */

  /* ---------- Age gate ---------- */
  function viewGate() {
    render(`
      <section class="gate">
        <div class="card">
          <span class="bottle" aria-hidden="true">🍾</span>
          <h1>Uncorked</h1>
          <p class="muted">Learn wine the fun way, then order like you know what you're doing.</p>
          <h2 style="font-size:1.3rem">Are you 18 or over?</h2>
          <div class="btn-row" style="justify-content:center">
            <button class="btn" id="yes">Yes, let's go</button>
            <button class="btn secondary" id="no">No</button>
          </div>
          <p class="small muted" style="margin-top:18px">This game is about wine, so it's for adults of legal drinking age only.</p>
        </div>
      </section>`);
    on('#yes', () => { state.ageOk = true; save(); location.hash.startsWith('#import/') ? route() : go('home'); });
    on('#no', () => {
      $('.card').innerHTML = `<span class="bottle" aria-hidden="true">🧃</span><h2>Come back when you're 18!</h2><p class="muted">In the meantime, grape juice is pretty delicious too. 🍇</p>`;
    });
  }

  /* ---------- Home: the vineyard path ---------- */
  function viewHome() {
    const started = Object.keys(state.cellars).length > 0;
    const nextCellar = PLAYABLE.find(c => !isDone(c.id));
    const stops = CELLARS.map(c => {
      if (c.comingSoon) {
        return `<li class="stop locked"><div class="dot" aria-hidden="true">${c.emoji}</div>
          <div class="info"><span class="num">Cellar ${c.num}</span><h3>${esc(c.title)}<span class="pill soon">Coming soon</span></h3><p>${esc(c.blurb)}</p></div></li>`;
      }
      const done = isDone(c.id), unlocked = isUnlocked(c);
      const cls = done ? 'done' : unlocked ? 'open' : 'locked';
      const pill = done ? '<span class="pill done">✓ Done</span>' : unlocked ? '<span class="pill go">Play</span>' : '<span class="pill soon">🔒 Locked</span>';
      const inner = `<span class="num">Cellar ${c.num}</span><h3>${esc(c.title)}${pill}</h3><p>${esc(c.blurb)}</p>`;
      return `<li class="stop ${cls}"><div class="dot" aria-hidden="true">${done ? '✅' : c.emoji}</div>
        ${unlocked ? `<a class="info" href="#cellar/${c.id}">${inner}</a>` : `<div class="info" aria-disabled="true">${inner}</div>`}</li>`;
    }).join('');

    const t = state.test;
    const testPill = t.passed ? `<span class="pill done">Best ${t.best}%</span>` : t.best !== null ? `<span class="pill go">Best ${t.best}%</span>` : '<span class="pill go">Open</span>';
    const badges = PLAYABLE.filter(c => isDone(c.id)).map(c => `<span class="badge">${c.badge.emoji} ${esc(c.badge.name)}</span>`);
    if (t.passed) { const r = rankFor(t.best); badges.push(`<span class="badge">${r.emoji} ${esc(r.title)}</span>`); }

    render(`
      <section class="hero">
        <h1>Uncorked</h1>
        <p class="tag">Know your Merlot from your Malbec. Short, playful rounds that help you pick wine with confidence.</p>
        <div class="btn-row" style="justify-content:center">
          ${nextCellar ? `<a class="btn" href="#cellar/${nextCellar.id}">${started ? 'Carry on' : 'Start playing'}: Cellar ${nextCellar.num} →</a>` : `<a class="btn gold" href="#test">Take the Sommelier Challenge ★</a>`}
        </div>
        ${badges.length ? `<div class="badges" aria-label="Your badges">${badges.join('')}</div>` : ''}
      </section>

      <div class="quick-links">
        <a class="quick-link" href="#map"><b>🗺️ Flavour Map</b><span>See where every grape sits.</span></a>
        <a class="quick-link" href="#cheat"><b>📱 At the Table</b><span>Your cheat sheet for ordering.</span></a>
        <a class="quick-link" href="#eat"><b>🍽️ What am I eating?</b><span>Pick your dish, get the wine.</span></a>
        <a class="quick-link" href="#palate"><b>${state.palate && PALATE_TYPES[state.palate] ? `${PALATE_TYPES[state.palate].emoji} My Palate` : '👅 My Palate'}</b>
          <span>${state.palate && PALATE_TYPES[state.palate] ? `You're ${esc(PALATE_TYPES[state.palate].title)}.` : 'A 1-minute quiz to find your wines.'}</span></a>
      </div>

      <h2>The vineyard path</h2>
      <ol class="path">
        ${stops}
        <li class="stop final"><div class="dot" aria-hidden="true">🏆</div>
          <a class="info" href="#test"><span class="num">Final test</span><h3>The Sommelier Challenge${testPill}</h3>
          <p>20 questions, including real ordering situations. Ready? You can skip straight here whenever you like.</p></a></li>
      </ol>`);
  }

  /* ---------- Flavour Map (SVG) ---------- */
  function flavourMapSVG(showIds, highlightIds = []) {
    const W = 400, H = 330, L = 44, R = 16, T = 18, B = 40;
    const px = x => L + (x / 100) * (W - L - R);
    const py = y => T + (y / 100) * (H - T - B);
    const dots = GRAPES.map(g => {
      const x = px(g.map.x), y = py(g.map.y);
      if (!showIds.includes(g.id)) {
        return `<g opacity=".5"><circle cx="${x}" cy="${y}" r="9" fill="#eadfd3"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="lbl" fill="#6e5b61">?</text></g>`;
      }
      const fill = g.colour === 'white' ? '#e7c55a' : '#7a1f3d';
      const left = !!g.labelLeft;
      const hl = highlightIds.includes(g.id);
      return `<g>
        ${hl ? `<circle cx="${x}" cy="${y}" r="16" fill="${fill}" opacity=".18"><animate attributeName="r" values="11;18;11" dur="1.8s" repeatCount="indefinite"/></circle>` : ''}
        <circle cx="${x}" cy="${y}" r="9" fill="${fill}" stroke="#fff" stroke-width="2.5"/>
        <text x="${left ? x - 14 : x + 14}" y="${y + 4.5}" text-anchor="${left ? 'end' : 'start'}" class="lbl">${esc(g.name)}</text>
      </g>`;
    }).join('');
    return `
      <svg class="flavour-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Flavour Map: grapes plotted from light to full body and from fruity to savoury. Shown: ${showIds.map(id => GRAPE[id].name).join(', ') || 'none yet'}.">
        <rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" rx="14" fill="#fffaf3" stroke="#eadfd3"/>
        <line x1="${(L + W - R) / 2}" y1="${T + 8}" x2="${(L + W - R) / 2}" y2="${H - B - 8}" stroke="#eadfd3" stroke-dasharray="4 5"/>
        <line x1="${L + 8}" y1="${(T + H - B) / 2}" x2="${W - R - 8}" y2="${(T + H - B) / 2}" stroke="#eadfd3" stroke-dasharray="4 5"/>
        <text class="axis" x="${L}" y="${H - 14}">← Light</text>
        <text class="axis" x="${(L + W - R) / 2}" y="${H - 14}" text-anchor="middle">Body</text>
        <text class="axis" x="${W - R}" y="${H - 14}" text-anchor="end">Full →</text>
        <text class="axis" transform="translate(16 ${T + 4}) rotate(90)">Fruity</text>
        <text class="axis" transform="translate(16 ${H - B}) rotate(90)" text-anchor="end">Savoury</text>
        ${dots}
      </svg>
      <div class="map-legend"><span><i style="background:#e7c55a"></i>White</span><span><i style="background:#7a1f3d"></i>Red</span></div>`;
  }

  function viewMap() {
    const found = discoveredGrapes();
    render(`
      <h1>Your Flavour Map</h1>
      <p class="muted">Every grape you meet lands here. <b>Left to right</b> = light to full body. <b>Top to bottom</b> = fruity to savoury. Like one? Try its neighbours!</p>
      <div class="card">${flavourMapSVG(found)}</div>
      <p class="center"><b>${found.length} of ${GRAPES.length}</b> grapes discovered.
      ${found.length < GRAPES.length ? 'Play the Cellars to reveal the rest.' : 'Full house! 🎉'}</p>
      <div class="btn-row" style="justify-content:center">
        <a class="btn secondary" href="#home">← Back to the path</a>
        <a class="btn" href="#cheat">Open the cheat sheet</a>
      </div>`);
  }

  /* ---------- Grape character card ---------- */
  function meter(level, max = 5) {
    return `<span class="meter" aria-hidden="true">${Array.from({ length: max }, (_, i) => `<i class="${i < level ? 'on' : ''}"></i>`).join('')}</span>`;
  }
  function grapeCardInner(g) {
    const bodyLevel = Math.max(1, Math.round(g.map.x / 20));
    return `
      <div class="grape-card">
        <div class="head"><div class="face ${g.colour}" aria-hidden="true">${g.emoji}</div>
          <div><h3 style="margin:0">${esc(g.name)}</h3><div class="nick">${esc(g.nickname)}</div></div></div>
        <p class="persona">${esc(g.personality)}</p>
        <div class="chips">${g.flavours.map(f => `<span class="chip">${esc(f)}</span>`).join('')}</div>
        <div class="facts">
          <div class="fact"><b>Body</b>${esc(g.body)}${meter(bodyLevel)}</div>
          <div class="fact"><b>Acidity</b>${esc(g.acidity)}</div>
          ${g.tannin ? `<div class="fact"><b>Tannin</b>${esc(g.tannin)}</div>` : ''}
          <div class="fact"><b>Oak</b>${esc(g.oak)}</div>
        </div>
        <p class="where" style="margin:0"><b>📍 Where:</b> ${esc(g.places)}<br><b>🍽️ Great with:</b> ${esc(g.food)}</p>
      </div>`;
  }

  /* ======================================================================
     CELLAR RUNNER
     ====================================================================== */
  let run = null;

  function startCellar(id) {
    const c = CELLAR[id];
    if (!c || c.comingSoon || !isUnlocked(c)) return go('home');
    run = { cellar: c, step: 0, corks: 0 };
    nextStep();
  }
  function nextStep() {
    const s = run.cellar.steps[run.step];
    if (!s) return finishCellar();
    GAMES[s.type](s, () => { run.step++; nextStep(); });
  }
  function header(title, sub) {
    const c = run.cellar, n = c.steps.length;
    return `
      <div class="stepper"><span class="label">Cellar ${c.num} · ${esc(c.title)}</span><span class="label">Step ${run.step + 1} of ${n}</span></div>
      <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${run.step}"><i style="width:${(run.step / n) * 100}%"></i></div>
      <h2>${esc(title)}</h2>${sub ? `<p class="muted">${esc(sub)}</p>` : ''}`;
  }
  function award(n) { run.corks += n; }

  function feedbackHTML(ok, why, extra) {
    return `<div class="feedback ${ok ? 'good' : 'bad'}"><b>${ok ? pick(CHEERS) : pick(OOPS)}</b>${extra ? esc(extra) + ' ' : ''}${esc(why)}</div>
      <div class="btn-row"><button class="btn" id="next">Next →</button></div>`;
  }
  function focusNext(onNext) {
    const b = $('#next');
    b.addEventListener('click', onNext);
    b.focus({ preventScroll: true });
    b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- Shared question player (used by mcq, recall and the final test) ---------- */
  function playQuestions(ids, opts) {
    let i = 0;
    const show = () => {
      if (i >= ids.length) return opts.onDone();
      const id = ids[i], q = QUESTIONS[id];
      const order = q.fixed ? q.options.map((_, k) => k) : shuffle(q.options.map((_, k) => k));
      const rowStyle = q.options.length <= 3 && q.options.every(o => o.length <= 14);
      render(`${opts.header(i, ids.length)}
        <div class="card">
          ${opts.comeback && opts.comeback.includes(id) ? '<span class="comeback">🔁 Comeback question: you missed this one earlier</span>' : ''}
          <div class="q-text" id="qtext">${esc(q.q)}</div>
          <div class="options ${rowStyle ? 'row' : ''}" role="group" aria-labelledby="qtext">
            ${order.map(k => `<button class="option" data-k="${k}">${esc(q.options[k])}</button>`).join('')}
          </div>
          <div id="fb" aria-live="polite"></div>
        </div>`);
      on('.option', e => {
        const k = +e.currentTarget.dataset.k, ok = k === q.answer;
        $$('.option').forEach(o => {
          o.disabled = true;
          const kk = +o.dataset.k;
          o.classList.add(kk === q.answer ? 'right' : kk === k ? 'wrong' : 'faded');
        });
        noteMissed(id, ok);
        opts.onAnswer(id, ok);
        save();
        $('#fb').innerHTML = feedbackHTML(ok, q.why, ok ? '' : `It's "${q.options[q.answer]}".`);
        focusNext(() => { i++; show(); });
      });
    };
    show();
  }

  const GAMES = {
    /* ---------- Learn: flashcard story ---------- */
    learn(s, done) {
      const cards = s.cards.map(c => ({ html: `<span class="big-emoji" aria-hidden="true">${c.emoji}</span><h3>${esc(c.title)}</h3><p>${c.text}</p>`, cls: 'learn-card' }))
        .concat((s.grapeCards || []).map(id => ({ html: grapeCardInner(GRAPE[id]), cls: '' })));
      let i = 0;
      const show = () => {
        const last = i === cards.length - 1;
        render(`${header(s.title)}
          <div class="card ${cards[i].cls}">${cards[i].html}</div>
          <div class="dots" aria-label="Card ${i + 1} of ${cards.length}">${cards.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
          <div class="btn-row" style="justify-content:space-between">
            <button class="btn secondary" id="prev" ${i === 0 ? 'disabled' : ''}>← Back</button>
            <button class="btn" id="fwd">${last ? "Let's play →" : 'Next →'}</button>
          </div>`);
        on('#prev', () => { i--; show(); });
        on('#fwd', () => { if (last) done(); else { i++; show(); } });
      };
      show();
    },

    /* ---------- Sort: put each item on the right shelf ---------- */
    sort(s, done) {
      const items = shuffle(s.items);
      const shelves = Object.fromEntries(s.categories.map(c => [c, []]));
      let i = 0;
      const shelvesHTML = () => `<div class="shelves">${s.categories.map(c => `<div class="shelf"><b>${esc(c)}</b>${shelves[c].map(x => `<span class="mini">${esc(x)}</span>`).join('')}</div>`).join('')}</div>`;
      const show = () => {
        if (i >= items.length) return done();
        const it = items[i];
        render(`${header(s.title, s.intro)}
          <div class="card">
            <p class="small muted center" style="margin-bottom:6px">${i + 1} of ${items.length}</p>
            <div class="sort-item">${esc(it.label)}</div>
            <div class="options row">${s.categories.map(c => `<button class="option" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
            <div id="fb" aria-live="polite"></div>
            ${shelvesHTML()}
          </div>`, i > 0);
        on('.option', e => {
          const choice = e.currentTarget.dataset.c, ok = choice === it.answer;
          $$('.option').forEach(o => {
            o.disabled = true;
            o.classList.add(o.dataset.c === it.answer ? 'right' : o.dataset.c === choice ? 'wrong' : 'faded');
          });
          if (ok) award(1);
          shelves[it.answer].push(it.label);
          $('.shelves').outerHTML = shelvesHTML();
          $('#fb').innerHTML = feedbackHTML(ok, it.why, ok ? '' : `It's ${it.answer}.`);
          focusNext(() => { i++; show(); });
        });
      };
      show();
    },

    /* ---------- Multiple choice ---------- */
    mcq(s, done) {
      playQuestions(s.questions, {
        header: (i, n) => header(s.title, s.intro) + `<p class="small muted">Question ${i + 1} of ${n}</p>`,
        onAnswer: (id, ok) => { if (ok) award(1); },
        onDone: done
      });
    },

    /* ---------- Who Am I? Guess the grape from clues ---------- */
    whoami(s, done) {
      const rounds = shuffle(s.rounds);
      let r = 0;
      const playRound = () => {
        if (r >= rounds.length) return done();
        const round = rounds[r];
        let shown = 1, solved = false;
        const wrong = [];
        const pot = () => Math.max(1, 4 - shown);
        const show = (keep) => {
          render(`${header(s.title, s.intro)}
            <div class="card">
              <p class="small muted" style="margin-bottom:6px">Mystery grape ${r + 1} of ${rounds.length}</p>
              <ul class="clues">${round.clues.slice(0, shown).map(c => `<li>${esc(c)}</li>`).join('')}</ul>
              ${solved ? '' : `<p class="cork-pot">🍾 Guess now for ${plural(shown > round.clues.length ? 0 : pot(), 'cork')}</p>`}
              <div class="options">${s.choices.map(id => {
                const g = GRAPE[id];
                const cls = solved && id === round.answer ? 'right' : wrong.includes(id) ? 'wrong' : solved ? 'faded' : '';
                return `<button class="option ${cls}" data-id="${id}" ${solved || wrong.includes(id) ? 'disabled' : ''}>${g.emoji} ${esc(g.name)}</button>`;
              }).join('')}</div>
              ${!solved && shown < round.clues.length ? '<div class="btn-row"><button class="btn secondary" id="clue">🔍 Another clue</button></div>' : ''}
              <div id="fb" aria-live="polite"></div>
            </div>`, keep);
          on('#clue', () => { shown++; show(true); });
          on('.option', e => {
            const id = e.currentTarget.dataset.id;
            if (id === round.answer) {
              solved = true;
              const won = shown > round.clues.length ? 0 : pot();
              award(won);
              const g = GRAPE[id];
              show(true);
              $('#fb').innerHTML = `<div class="feedback good"><b>It's ${esc(g.name)}! ${won ? `+${plural(won, 'cork')}` : ''}</b>${esc(g.oneLiner)}</div>
                <div class="btn-row"><button class="btn" id="next">Next →</button></div>`;
              focusNext(() => { r++; playRound(); });
            } else {
              wrong.push(id);
              if (shown < round.clues.length) shown++; else shown = round.clues.length + 1;
              show(true);
              $('#fb').innerHTML = `<div class="feedback bad"><b>${pick(OOPS)}</b>${shown <= round.clues.length ? "Here's another clue." : 'Have another guess.'}</div>`;
            }
          });
        };
        show(r > 0);
      };
      playRound();
    },

    /* ---------- Perfect Match: pick a wine for a dish, watch the Taste-o-Meter ---------- */
    pair(s, done) {
      const rounds = shuffle(s.rounds);
      let r = 0;
      const show = () => {
        if (r >= rounds.length) return done();
        const rd = rounds[r];
        const opts = shuffle(rd.options);
        const best = opts.reduce((a, b) => (b.score > a.score ? b : a));
        render(`${header(s.title, s.intro)}
          <div class="card">
            <p class="small muted center" style="margin-bottom:6px">Dish ${r + 1} of ${rounds.length}</p>
            <div class="sort-item"><span class="big-emoji" aria-hidden="true">${rd.emoji}</span>${esc(rd.dish)}</div>
            <p class="center muted" style="margin-bottom:10px">Which wine makes the best match?</p>
            <div class="options">${opts.map((o, k) => `<button class="option" data-k="${k}">${esc(o.wine)}</button>`).join('')}</div>
            <div id="fb" aria-live="polite"></div>
          </div>`, r > 0);
        on('.option', e => {
          const o = opts[+e.currentTarget.dataset.k], ok = o === best;
          $$('.option').forEach(b => {
            b.disabled = true;
            const ob = opts[+b.dataset.k];
            b.classList.add(ob === best ? 'right' : ob === o ? 'wrong' : 'faded');
          });
          if (ok) award(2);
          $('#fb').innerHTML = `
            <div class="tasteo" role="img" aria-label="Taste-o-Meter: ${o.score} out of 100">
              <div class="tasteo-label"><span>😖 Clash</span><span>Taste-o-Meter</span><span>Heaven 😍</span></div>
              <div class="tasteo-track"><i aria-hidden="true">🍷</i></div>
            </div>
            <div class="feedback ${ok ? 'good' : 'bad'}"><b>${ok ? pick(CHEERS) + ' +2 corks' : pick(OOPS)}</b>${esc(o.reaction)}
              ${ok ? '' : `<br><br><b style="display:inline">Best match: ${esc(best.wine)}.</b> ${esc(best.reaction)}`}</div>
            <div class="btn-row"><button class="btn" id="next">Next →</button></div>`;
          const marker = $('.tasteo-track i');
          requestAnimationFrame(() => requestAnimationFrame(() => { marker.style.left = o.score + '%'; }));
          focusNext(() => { r++; show(); });
        });
      };
      show();
    },

    /* ---------- Line Up: tap items in the right order ---------- */
    order(s, done) {
      const pool = shuffle(s.items);
      let picked = [];
      let checked = false;
      const show = () => {
        const n = s.items.length;
        render(`${header(s.title, s.intro)}
          <div class="card">
            <div class="scale-label"><span>Lightest</span><span>Fullest</span></div>
            <div class="order-slots">${Array.from({ length: n }, (_, k) => {
              const v = picked[k];
              const cls = !v ? '' : checked ? (v === s.items[k] ? 'filled right-slot' : 'filled wrong-slot') : 'filled';
              return `<div class="slot ${cls}"><span class="n">${k + 1}</span>${v ? esc(v) : 'Tap a wine below'}${checked && v ? (v === s.items[k] ? ' ✓' : ' ✗') : ''}</div>`;
            }).join('')}</div>
            <div class="options">${pool.map(x => `<button class="option ${picked.includes(x) ? 'faded' : ''}" data-x="${esc(x)}" ${picked.includes(x) || checked ? 'disabled' : ''}>${esc(x)}</button>`).join('')}</div>
            <div class="btn-row">
              ${checked ? '' : `<button class="btn" id="check" ${picked.length < n ? 'disabled' : ''}>Check my order</button>
              <button class="btn secondary" id="reset" ${picked.length ? '' : 'disabled'}>Start again</button>`}
            </div>
            <div id="fb" aria-live="polite"></div>
          </div>`, true);
        on('.option', e => { picked.push(e.currentTarget.dataset.x); show(); });
        on('#reset', () => { picked = []; show(); });
        on('#check', () => {
          checked = true;
          const ok = picked.every((x, k) => x === s.items[k]);
          if (ok) award(3);
          show();
          $('#fb').innerHTML = feedbackHTML(ok, s.why, ok ? '+3 corks! ' : `The right order is: ${s.items.join(' → ')}.`);
          focusNext(done);
        });
      };
      show();
    }
  };

  /* ---------- Recall: plus up to 2 "comeback" questions you missed before ---------- */
  GAMES.recall = function (s, done) {
    const comeback = state.missed.filter(id => !s.questions.includes(id) && QUESTIONS[id]).slice(0, 2);
    const intro = comeback.length ? `${s.intro} Plus ${comeback.length === 1 ? 'one' : 'a couple'} you missed earlier.` : s.intro;
    playQuestions(s.questions.concat(comeback), {
      header: (i, n) => header(s.title, intro) + `<p class="small muted">Question ${i + 1} of ${n}</p>`,
      onAnswer: (id, ok) => { if (ok) award(1); },
      onDone: done,
      comeback
    });
  };

  function finishCellar() {
    const c = run.cellar;
    const prev = state.cellars[c.id] || { done: false, corks: 0 };
    const firstTime = !prev.done;
    const gained = Math.max(0, run.corks - prev.corks);
    state.corks += gained;
    state.cellars[c.id] = { done: true, corks: Math.max(prev.corks, run.corks) };
    save();
    const next = PLAYABLE.find(p => !isDone(p.id));
    const newGrapes = c.grapes || [];
    render(`
      <div class="card center">
        <div class="confetti" aria-hidden="true">🎉 🍾 🎉</div>
        <h1>Cellar ${c.num} complete!</h1>
        <p class="muted">${esc(c.title)}: ticked off.</p>
        <p class="score-big">+${run.corks}</p>
        <p><b>corks this round</b>${!firstTime && gained === 0 ? ' (no new personal best this time)' : ''}</p>
        ${firstTime ? `<p>You earned a badge:</p><div class="badges"><span class="badge" style="font-size:1.1rem">${c.badge.emoji} ${esc(c.badge.name)}</span></div>` : ''}
      </div>
      ${newGrapes.length ? `<div class="card"><h3 class="center">New on your Flavour Map</h3>${flavourMapSVG(discoveredGrapes(), newGrapes)}</div>` : ''}
      <div class="btn-row" style="justify-content:center">
        ${next ? `<a class="btn" href="#cellar/${next.id}">Next: Cellar ${next.num}, ${esc(next.title)} →</a>` : `<a class="btn gold" href="#test">Take the Sommelier Challenge ★</a>`}
        <a class="btn secondary" href="#home">Back to the path</a>
      </div>`);
    run = null;
  }

  /* ======================================================================
     FINAL TEST: THE SOMMELIER CHALLENGE
     ====================================================================== */
  const rankFor = pct => FINAL_TEST.ranks.find(r => pct >= r.min);

  // Draw the test: the right number from each topic, never two questions on the
  // same idea (FINAL_TEST.sameIdea), and never two from the same topic in a row.
  function pickTestQuestions() {
    const groupOf = {};
    (FINAL_TEST.sameIdea || []).forEach((g, i) => g.forEach(id => { groupOf[id] = i; }));
    const usedGroups = new Set();
    const picked = [];
    // Biggest pools first, so scenarios get first choice of ideas
    [...FINAL_TEST.pools].sort((a, b) => b.take - a.take).forEach(pool => {
      const chosen = [], spare = [];
      shuffle(pool.ids).forEach(id => {
        const clash = id in groupOf && usedGroups.has(groupOf[id]);
        if (chosen.length < pool.take && !clash) {
          chosen.push(id);
          if (id in groupOf) usedGroups.add(groupOf[id]);
        } else spare.push(id);
      });
      // Only if a topic runs out of fresh ideas, top up with whatever is left
      picked.push(...chosen, ...spare.slice(0, pool.take - chosen.length));
    });
    // Order them so the same topic never comes up twice in a row
    let best = shuffle(picked), bestClashes = Infinity;
    for (let tries = 0; tries < 200 && bestClashes > 0; tries++) {
      const order = shuffle(picked);
      const clashes = order.filter((id, i) => i && QUESTIONS[id].topic === QUESTIONS[order[i - 1]].topic).length;
      if (clashes < bestClashes) { best = order; bestClashes = clashes; }
    }
    return best;
  }

  function startTest() {
    const ids = pickTestQuestions();
    const results = {};
    // Intro screen
    render(`
      <div class="card center">
        <span class="big-emoji" aria-hidden="true">🏆</span>
        <h1>The Sommelier Challenge</h1>
        <p>${ids.length} questions on grapes, styles, food, serving and <b>real-life ordering</b>. Score ${FINAL_TEST.passMark}% or more to earn your certificate.</p>
        ${PLAYABLE.some(c => !isDone(c.id)) ? '<p class="small muted">You haven\'t finished every Cellar yet. That\'s fine! Have a go anyway, or warm up first.</p>' : ''}
        <div class="btn-row" style="justify-content:center">
          <button class="btn gold" id="begin">I'm ready →</button>
          <a class="btn secondary" href="#home">Not yet</a>
        </div>
      </div>`);
    on('#begin', () => {
      playQuestions(ids, {
        header: (i, n) => `
          <div class="stepper"><span class="label">Sommelier Challenge</span><span class="label">${i + 1} / ${n}</span></div>
          <div class="bar"><i style="width:${(i / n) * 100}%"></i></div>`,
        onAnswer: (id, ok) => { results[id] = ok; },
        onDone: () => finishTest(ids, results)
      });
    });
  }

  function finishTest(ids, results) {
    const correct = ids.filter(id => results[id]).length;
    const pct = Math.round((correct / ids.length) * 100);
    const byTopic = {};
    ids.forEach(id => {
      const t = QUESTIONS[id].topic;
      byTopic[t] = byTopic[t] || { right: 0, total: 0 };
      byTopic[t].total++;
      if (results[id]) byTopic[t].right++;
    });
    const passed = pct >= FINAL_TEST.passMark;
    state.test.last = { pct, correct, total: ids.length, byTopic, passed, date: new Date().toISOString() };
    if (state.test.best === null || pct > state.test.best) state.test.best = pct;
    if (passed && !state.test.passed) state.corks += 10;
    if (passed) state.test.passed = true;
    save();
    go('results');
  }

  function viewResults() {
    const last = state.test.last;
    if (!last) return go('test');
    const rank = rankFor(last.pct);
    const rows = Object.keys(FINAL_TEST.topicNames).filter(t => last.byTopic[t]).map(t => {
      const b = last.byTopic[t];
      const strong = b.right / b.total >= .75;
      const link = FINAL_TEST.topicLinks[t];
      return `<li><span>${strong ? '💪' : '🔁'} ${esc(FINAL_TEST.topicNames[t])}
        ${strong ? '' : `<br><a class="small" href="#${link === 'cheat' ? 'cheat' : 'cellar/' + link}">${link === 'cheat' ? 'Brush up with the cheat sheet' : 'Replay this Cellar'}</a>`}</span>
        <span class="score">${b.right}/${b.total}</span></li>`;
    }).join('');

    render(`
      <div class="card center">
        <div class="confetti" aria-hidden="true">${last.passed ? '🎉 🥂 🎉' : '🍇'}</div>
        <p class="score-big">${last.pct}%</p>
        <p>${last.correct} out of ${last.total} correct</p>
        <h1 style="font-size:2rem">${rank.emoji} ${esc(rank.title)}</h1>
        <p class="muted">${last.passed
          ? "You passed! You're officially ready to take on a wine list."
          : `So close. You need ${FINAL_TEST.passMark}% to pass. Have a look at the 🔁 topics below and try again. The questions change every time.`}</p>
      </div>
      <div class="card">
        <h3>How you did</h3>
        <ul class="breakdown">${rows}</ul>
      </div>
      ${last.passed ? `
      <div class="card">
        <h3>🎓 Get your certificate</h3>
        <label for="name" class="small muted">Your name, as it should appear on the certificate</label>
        <input type="text" id="name" maxlength="40" autocomplete="name" value="${esc(state.test.name || '')}" placeholder="e.g. Claire Smith">
        <div class="btn-row"><button class="btn gold" id="makeCert">Make my certificate</button></div>
        <div id="certArea"></div>
      </div>` : ''}
      <div class="btn-row" style="justify-content:center">
        <a class="btn ${last.passed ? 'secondary' : ''}" href="#test">${last.passed ? 'Play again' : 'Try again'}</a>
        <a class="btn secondary" href="#cheat">Open the cheat sheet</a>
        <a class="btn secondary" href="#home">Home</a>
      </div>`);

    on('#makeCert', async () => {
      const name = $('#name').value.trim();
      if (!name) { $('#name').focus(); $('#name').placeholder = 'Please type your name first'; return; }
      state.test.name = name; save();
      const canvas = await drawCertificate(name, last.pct, rank, last.date);
      const url = canvas.toDataURL('image/png');
      $('#certArea').innerHTML = `
        <img class="cert-preview" src="${url}" alt="Certificate for ${esc(name)}: passed the Sommelier Challenge with ${last.pct}%">
        <div class="btn-row">
          <a class="btn" href="${url}" download="uncorked-certificate.png">⬇️ Download</a>
          ${navigator.share ? '<button class="btn secondary" id="shareCert">📤 Share</button>' : ''}
        </div>`;
      on('#shareCert', async () => {
        try {
          const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
          const file = new File([blob], 'uncorked-certificate.png', { type: 'image/png' });
          const data = { title: 'Uncorked certificate', text: `I passed the Uncorked Sommelier Challenge with ${last.pct}%! 🍷` };
          if (navigator.canShare && navigator.canShare({ files: [file] })) data.files = [file];
          await navigator.share(data);
        } catch (e) { /* share cancelled */ }
      });
    });
  }

  /* ---------- Certificate (drawn on a canvas, saved as PNG) ---------- */
  async function drawCertificate(name, pct, rank, dateISO) {
    try { await Promise.all([document.fonts.load('800 80px Fraunces'), document.fonts.load('600 40px Fraunces'), document.fonts.load('700 30px Nunito')]); } catch (e) { /* fall back to system fonts */ }
    const W = 1600, H = 1130;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    const head = '"Fraunces", Georgia, serif', body = '"Nunito", system-ui, sans-serif';

    x.fillStyle = '#fbf5ec'; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#7a1f3d'; x.lineWidth = 14; x.strokeRect(40, 40, W - 80, H - 80);
    x.strokeStyle = '#d9a441'; x.lineWidth = 4; x.strokeRect(70, 70, W - 140, H - 140);
    // corner grapes
    x.font = '56px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    [[120, 120], [W - 120, 120], [120, H - 120], [W - 120, H - 120]].forEach(([a, b]) => x.fillText('🍇', a, b));

    x.textBaseline = 'alphabetic';
    x.fillStyle = '#6e5b61'; x.font = `800 30px ${body}`;
    x.fillText('CERTIFICATE OF COMPLETION', W / 2, 220);
    x.fillStyle = '#5a1229'; x.font = `800 110px ${head}`;
    x.fillText('Uncorked', W / 2, 340);
    x.fillStyle = '#2b1d22'; x.font = `600 34px ${body}`;
    x.fillText('This is to certify that', W / 2, 440);

    // Name, shrink to fit
    let size = 96;
    do { x.font = `600 ${size}px ${head}`; size -= 4; } while (x.measureText(name).width > W - 360 && size > 40);
    x.fillStyle = '#7a1f3d';
    x.fillText(name, W / 2, 570);
    x.strokeStyle = '#d9a441'; x.lineWidth = 3;
    x.beginPath(); x.moveTo(W / 2 - 420, 605); x.lineTo(W / 2 + 420, 605); x.stroke();

    x.fillStyle = '#2b1d22'; x.font = `600 36px ${body}`;
    x.fillText('has passed The Sommelier Challenge, learning the basics of wine:', W / 2, 690);
    x.fillText('styles, key grapes and how to choose with confidence.', W / 2, 740);

    x.fillStyle = '#5a1229'; x.font = `800 48px ${head}`;
    x.fillText(`${pct}%  ·  ${rank.title}`, W / 2, 850);

    const date = new Date(dateISO).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    x.fillStyle = '#6e5b61'; x.font = `700 28px ${body}`;
    x.fillText(date, W / 2, 940);
    x.font = `600 22px ${body}`;
    x.fillText('Uncorked · learn wine the fun way · Please drink responsibly', W / 2, 1010);
    return cv;
  }

  /* ======================================================================
     AT THE TABLE: the cheat sheet
     ====================================================================== */
  function viewCheat() {
    const pal = state.palate && PALATE_TYPES[state.palate];
    const section = (id, emoji, title, inner) => `<section class="card" id="${id}"><h2 class="section-title"><span aria-hidden="true">${emoji}</span>${title}</h2>${inner}</section>`;
    const grapeRow = g => `<div class="mini-grape"><div class="face ${g.colour}" aria-hidden="true">${g.emoji}</div><div><b>${esc(g.name)}</b><span>${esc(g.oneLiner)}</span></div></div>`;
    render(`
      <h1>At the Table</h1>
      <p class="muted">Your pocket cheat sheet. Pull it up at the restaurant or in the supermarket.</p>
      <div class="quick-links" style="margin:14px 0 18px">
        <a class="quick-link" href="#eat"><b>🍽️ What am I eating?</b><span>Pick your dish, get the wine.</span></a>
        ${pal ? `<a class="quick-link" href="#palate"><b>${pal.emoji} Your wines</b><span>${esc(GRAPE[pal.white.id].name)}, ${esc(GRAPE[pal.red.id].name)} or ${esc(GRAPE[pal.dare.id].name)}. Say: ${esc(pal.say)}</span></a>`
              : '<a class="quick-link" href="#palate"><b>👅 My Palate</b><span>A 1-minute quiz to find your wines.</span></a>'}
      </div>
      <nav class="toc" aria-label="Jump to">
        ${[['c-map', '🗺️ Map'], ['c-grapes', '🍇 Grapes'], ['c-bonus', '🌟 Bonus grapes'], ['c-finder', '🔄 If you like…'], ['c-food', '🍽️ Food'], ['c-say', '💬 What to say'], ['c-temp', '🌡️ Serving'], ['c-tips', '👃 Corked?']]
          .map(([id, l]) => `<a href="#cheat" data-jump="${id}">${l}</a>`).join('')}
      </nav>
      ${section('c-map', '🗺️', 'The Flavour Map', `<p class="small muted">Left to right = light to full. Top to bottom = fruity to savoury. Like one? Try a neighbour.</p>${flavourMapSVG(GRAPES.map(g => g.id))}`)}
      ${section('c-grapes', '🍇', 'The 8 grapes in a sentence', `
        <h3>Whites</h3><div class="cheat-grid">${CORE.filter(g => g.colour === 'white').map(grapeRow).join('')}</div>
        <h3 style="margin-top:14px">Reds</h3><div class="cheat-grid">${CORE.filter(g => g.colour === 'red').map(grapeRow).join('')}</div>`)}
      ${section('c-bonus', '🌟', 'Bonus grapes', `
        <p class="small muted">Labels often name the place: <b>Rioja</b> = Tempranillo, <b>Chianti</b> = Sangiovese, <b>Côtes du Rhône</b> = Grenache.</p>
        <div class="cheat-grid">${BONUS.map(grapeRow).join('')}</div>`)}
      ${section('c-finder', '🔄', 'If you like… try…', `
        <label for="likeSel" class="small muted">I usually drink…</label>
        <select id="likeSel"><option value="">Choose a wine</option>
          <optgroup label="The 8 grapes">${CORE.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</optgroup>
          <optgroup label="Bonus grapes">${BONUS.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</optgroup>
          ${FINDER_EXTRAS.length ? `<optgroup label="Popular favourites">${FINDER_EXTRAS.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</optgroup>` : ''}</select>
        <div class="try-box" id="tryBox" aria-live="polite"></div>`)}
      ${section('c-food', '🍽️', 'Food matches', `
        <div class="cheat-grid">${DISHES.map(d => `<div class="mini-grape"><div class="face" aria-hidden="true" style="background:#fff">${d.emoji}</div><div><b>${esc(d.dish)}</b><span>${esc(d.wines)}</span></div></div>`).join('')}</div>
        <h3 style="margin-top:16px">Golden rules</h3>
        <ul class="rules">${PAIRING_RULES.map(r => `<li><b>${r.emoji} ${esc(r.rule)}</b><span>${esc(r.detail)}</span></li>`).join('')}</ul>`)}
      ${section('c-say', '💬', 'What to say to the waiter', `<ul class="phrases">${ORDERING_PHRASES.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`)}
      ${section('c-temp', '🌡️', 'Serving temperatures', `<table class="temps"><tbody>${SERVING_TEMPS.map(t => `<tr><td>${esc(t.style)}<br><span class="small muted">${esc(t.temp)}</span></td><td>${esc(t.c)}</td></tr>`).join('')}</tbody></table>
        <p class="small muted" style="margin-top:10px">Rule of thumb: whites often get served too cold, and reds too warm. 20 minutes in the fridge helps a light red!</p>`)}
      ${section('c-tips', '👃', 'Corked wine, fizz & leftovers', `<ul class="rules">${SERVICE_TIPS.map(t => `<li><b>${t.emoji} ${esc(t.tip)}</b><span>${esc(t.detail)}</span></li>`).join('')}</ul>`)}
      <div class="btn-row" style="justify-content:center"><a class="btn secondary" href="#home">← Back to the game</a></div>`);

    on('[data-jump]', e => { e.preventDefault(); document.getElementById(e.currentTarget.dataset.jump).scrollIntoView({ behavior: 'smooth' }); });
    $('#likeSel').addEventListener('change', e => {
      const g = GRAPE[e.target.value] || FINDER_EXTRAS.find(x => x.id === e.target.value);
      $('#tryBox').innerHTML = g ? g.tryNext.map(t => `<div class="try"><b>Try ${esc(t.name)}</b><br><span class="small">${esc(t.why)}</span></div>`).join('') : '';
    });
  }

  /* ---------- What am I eating? ---------- */
  function viewEat(pickIdx) {
    const cats = [...new Set(DISH_FINDER.map(d => d.cat))];
    const chip = (d, i) => `<button class="dish-chip" data-i="${i}" aria-pressed="false"><span aria-hidden="true">${d.emoji}</span> ${esc(d.name)}</button>`;
    render(`
      <h1>What am I eating?</h1>
      <p class="muted">Pick your dish and we'll tell you what to order, and what to steer clear of.</p>
      <label class="sr-only" for="dishSearch">Search dishes</label>
      <input id="dishSearch" class="dish-search" type="search" placeholder="🔍 Search: curry, pizza, salmon…" autocomplete="off">
      <div class="card">
        ${cats.map(c => `<div class="dish-cat" data-cat="${esc(c)}"><h3>${esc(c)}</h3><div class="dish-chips">${DISH_FINDER.map((d, i) => d.cat === c ? chip(d, i) : '').join('')}</div></div>`).join('')}
        <p class="small muted" id="noDish" hidden>No match. Try a simpler word, like "fish" or "spicy".</p>
      </div>
      <div id="dishResult" aria-live="polite"></div>
      <div class="btn-row" style="justify-content:center"><a class="btn secondary" href="#cheat">📱 Back to At the Table</a></div>`);
    const show = i => {
      const d = DISH_FINDER[i];
      $$('.dish-chip').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
      $('#dishResult').innerHTML = `
        <div class="card dish-card">
          <h2><span aria-hidden="true">${d.emoji}</span> ${esc(d.name)}</h2>
          <ol class="dish-picks">${d.picks.map((p, n) => `<li><b>${n === 0 ? '🥇 ' : ''}${esc(p.wine)}</b><span>${esc(p.why)}</span></li>`).join('')}</ol>
          ${d.avoid ? `<p class="dish-avoid"><b>🙅 Steer clear of:</b> ${esc(d.avoid.wine)}. ${esc(d.avoid.why)}</p>` : ''}
          <p class="small muted" style="margin:0"><b>The rule:</b> ${esc(d.rule)}</p>
        </div>`;
      $('#dishResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    on('.dish-chip', e => show(+e.currentTarget.dataset.i));
    $('#dishSearch').addEventListener('input', e => {
      const words = e.target.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      let any = false;
      $$('.dish-cat').forEach(cat => {
        let catAny = false;
        $$('.dish-chip', cat).forEach(b => {
          const d = DISH_FINDER[+b.dataset.i];
          const hay = `${d.name} ${d.cat} ${d.picks.map(p => p.wine).join(' ')}`.toLowerCase();
          const hit = words.every(w => hay.includes(w));
          b.hidden = !hit; catAny = catAny || hit;
        });
        cat.hidden = !catAny; any = any || catAny;
      });
      $('#noDish').hidden = any;
    });
    if (pickIdx !== undefined && DISH_FINDER[+pickIdx]) show(+pickIdx);
  }

  /* ---------- My Palate quiz ---------- */
  function viewPalate() {
    if (state.palate && PALATE_TYPES[state.palate]) return showPalate(state.palate, false);
    const scores = {};
    let i = 0;
    const ask = () => {
      const q = PALATE_QUIZ[i];
      render(`
        <div class="card">
          <p class="small muted center" style="margin-bottom:4px">👅 My Palate · ${i + 1} of ${PALATE_QUIZ.length}</p>
          <div class="progress" aria-hidden="true"><i style="width:${(i / PALATE_QUIZ.length) * 100}%"></i></div>
          <h2 class="center" style="margin-top:14px">${esc(q.q)}</h2>
          <p class="small muted center">No wrong answers. Just go with your gut.</p>
          <div class="options">${q.options.map((o, n) => `<button class="option" data-n="${n}">${esc(o.label)}</button>`).join('')}</div>
        </div>`, i > 0);
      on('.option', e => {
        const o = q.options[+e.currentTarget.dataset.n];
        Object.entries(o.pts).forEach(([t, n]) => { scores[t] = (scores[t] || 0) + n; });
        i++;
        if (i < PALATE_QUIZ.length) return ask();
        const type = Object.keys(PALATE_TYPES).reduce((best, t) => (scores[t] || 0) > (scores[best] || 0) ? t : best);
        state.palate = type; save();
        showPalate(type, true);
      });
    };
    render(`
      <div class="card center">
        <span class="big-emoji" aria-hidden="true">👅</span>
        <h1>My Palate</h1>
        <p>Seven quick questions about coffee, chocolate and what you love to eat. No wine knowledge needed! We'll match you with a white, a red and one to dare yourself with.</p>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="go">Let's find out →</button><a class="btn secondary" href="#home">Not now</a></div>
      </div>`);
    on('#go', ask);
  }
  function showPalate(type, fresh) {
    const p = PALATE_TYPES[type];
    const card = (label, pick) => {
      const g = GRAPE[pick.id];
      return `<div class="palate-pick"><div class="face ${g.colour}" aria-hidden="true">${g.emoji}</div>
        <div><span class="small muted">${label}</span><b>${esc(g.name)}</b><span>${esc(pick.why)}</span></div></div>`;
    };
    const ids = [p.white.id, p.red.id, p.dare.id];
    render(`
      <div class="card center">
        ${fresh ? '<div class="confetti" aria-hidden="true">🎉 🍷 🎉</div>' : ''}
        <p class="small muted" style="margin:0">Your palate</p>
        <span class="big-emoji" aria-hidden="true">${p.emoji}</span>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.text)}</p>
      </div>
      <div class="card">
        <h2 class="section-title">Your wines</h2>
        ${card('🥂 Your white', p.white)}${card('🍷 Your red', p.red)}${card('🎲 Dare yourself', p.dare)}
        <p class="say-this"><b>💬 At the restaurant, say:</b> ${esc(p.say)}</p>
      </div>
      <div class="card">
        <h2 class="section-title">Where they sit</h2>
        <p class="small muted">Your wines glow on the map. Like them? Try their neighbours.</p>
        ${flavourMapSVG([...new Set([...discoveredGrapes(), ...ids])], ids)}
      </div>
      <div class="btn-row" style="justify-content:center">
        <a class="btn" href="#cheat">📱 At the Table</a>
        <button class="btn secondary" id="redo">Take the quiz again</button>
      </div>`);
    on('#redo', () => { state.palate = null; save(); viewPalate(); });
  }

  /* ---------- How to add Uncorked to your home screen ---------- */
  function viewHomescreen() {
    render(`
      <div class="card howto">
        <div class="center"><span class="big-emoji" aria-hidden="true">📲</span>
        <h1>Add to your home screen</h1></div>
        <p class="small">One tap to your cheat sheet, and it works offline too.</p>
        <h3>iPhone (Safari)</h3>
        <ol>
          <li>Tap <b>Share</b> (the square with an arrow pointing up) or the <b>⋯</b> menu.</li>
          <li>Tap <b>Add to Home Screen</b>.</li>
          <li>Turn <b>"Open as Web App" off</b>, then tap <b>Add</b>.</li>
        </ol>
        <p class="small muted">Why switch it off? If it's on, your iPhone keeps a separate copy of your progress for the icon, so your Cellars won't show. If you've already added it with the switch on, delete the icon and add it again.</p>
        <h3>Android (Chrome)</h3>
        <ol>
          <li>Tap the <b>⋮</b> menu at the top right.</li>
          <li>Tap <b>Add to Home screen</b>, then <b>Add</b>.</li>
        </ol>
      </div>
      <div class="btn-row" style="justify-content:center"><a class="btn" href="#cheat">📱 At the Table</a><a class="btn secondary" href="#home">Back to the game</a></div>`);
  }

  /* ---------- Move my progress to another device ----------
     Progress lives on each device, so we pack it into a link. It travels in the
     part of the address after #, which browsers never send to the server. */
  const MOVE_VERSION = 1;
  // Kept short so the link survives emails and messages: just the finished Cellars
  // (with best corks), best test score, pass, and certificate name.
  function packProgress() {
    const c = {};
    Object.keys(state.cellars).forEach(id => { if (state.cellars[id].done) c[id] = state.cellars[id].corks || 0; });
    const t = state.test;
    const bytes = new TextEncoder().encode(JSON.stringify({ v: MOVE_VERSION, c, b: t.best, p: t.passed ? 1 : 0, n: t.name || '', q: state.palate || '' }));
    let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unpackProgress(code) {
    try {
      const bin = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
      const d = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0))));
      if (!d || d.v !== MOVE_VERSION || typeof d.c !== 'object') return null;
      const s = freshState();
      PLAYABLE.forEach(cl => { if (cl.id in d.c) s.cellars[cl.id] = { done: true, corks: Math.max(0, +d.c[cl.id] || 0) }; });
      s.test = { best: typeof d.b === 'number' ? Math.max(0, Math.min(100, d.b)) : null, passed: !!d.p, name: String(d.n || '').slice(0, 60), last: null };
      s.corks = Object.values(s.cellars).reduce((n, x) => n + x.corks, 0) + (s.test.passed ? 10 : 0);
      s.palate = PALATE_TYPES[d.q] ? d.q : null;
      return s;
    } catch (e) { return null; }
  }
  function summarise(s) {
    const done = PLAYABLE.filter(c => s.cellars && s.cellars[c.id] && s.cellars[c.id].done).length;
    const t = s.test || {};
    const test = t.passed ? `passed the Sommelier Challenge (best ${t.best}%)` : t.best != null ? `best test score ${t.best}%` : 'not taken the final test yet';
    return { done, text: `${done} of ${PLAYABLE.length} Cellars done, ${plural(s.corks || 0, 'cork')}, ${test}` };
  }
  // Combine two sets of progress, keeping the best of each, so nothing is ever lost.
  function mergeProgress(mine, theirs) {
    const out = freshState();
    out.ageOk = true;
    PLAYABLE.forEach(c => {
      const a = mine.cellars[c.id], b = theirs.cellars[c.id];
      if (!a && !b) return;
      out.cellars[c.id] = { done: !!((a && a.done) || (b && b.done)), corks: Math.max((a && +a.corks) || 0, (b && +b.corks) || 0) };
    });
    const ta = mine.test || {}, tb = theirs.test || {};
    const bests = [ta.best, tb.best].filter(x => typeof x === 'number');
    const lasts = [ta.last, tb.last].filter(Boolean).sort((x, y) => String(y.date).localeCompare(String(x.date)));
    out.test = {
      best: bests.length ? Math.max(...bests) : null,
      passed: !!(ta.passed || tb.passed),
      name: ta.name || tb.name || '',
      last: lasts[0] || null
    };
    out.palate = mine.palate || theirs.palate || null;
    out.missed = Array.from(new Set([...(mine.missed || []), ...(theirs.missed || [])])).filter(id => QUESTIONS[id]);
    // Corks are the sum of your best score in each Cellar, plus 10 for passing the test
    out.corks = Object.values(out.cellars).reduce((n, c) => n + c.corks, 0) + (out.test.passed ? 10 : 0);
    return out;
  }

  function viewMove() {
    const link = `${location.origin}${location.pathname}#import/${packProgress()}`;
    const sum = summarise(state);
    render(`
      <div class="card center">
        <span class="big-emoji" aria-hidden="true">📲</span>
        <h1>Move my progress</h1>
        <p>Your progress is saved on this device only. To carry on somewhere else, send yourself this link and open it on your other phone or computer.</p>
        <p class="small muted">This link holds: <b>${esc(sum.text)}</b>${state.test.name ? `, and the name <b>${esc(state.test.name)}</b> for your certificate` : ''}.</p>
        <label class="sr-only" for="moveLink">Your progress link</label>
        <input id="moveLink" class="move-link" type="text" readonly value="${esc(link)}">
        <div class="btn-row" style="justify-content:center">
          ${navigator.share ? '<button class="btn" id="shareLink">Send it…</button>' : ''}
          <button class="btn ${navigator.share ? 'secondary' : ''}" id="copyLink">Copy link</button>
          <a class="btn secondary" href="mailto:?subject=${encodeURIComponent('My Uncorked progress')}&body=${encodeURIComponent('Open this on my other device to carry on where I left off:\n\n' + link)}">Email it to myself</a>
        </div>
        <p class="small muted" id="copyMsg" aria-live="polite"></p>
        <p class="small muted">Nothing is uploaded or stored online. The link is a snapshot, so if you play on both devices, send a new one now and then. Opening it keeps the best of both, so you never lose anything.</p>
        <div class="paste-box">
          <h2 style="font-size:1.2rem;margin:0 0 4px">Got a link from another device?</h2>
          <p class="small muted" style="margin:0 0 8px">Paste it here, or just tap the link wherever you sent it.</p>
          <label class="sr-only" for="pasteLink">Paste your progress link</label>
          <input id="pasteLink" class="move-link" type="text" placeholder="Paste your link here" autocomplete="off" autocapitalize="off" spellcheck="false">
          <button class="btn" id="usePasted">Bring it across</button>
          <p class="small" id="pasteMsg" aria-live="polite" style="color:var(--oops)"></p>
        </div>
        <div class="btn-row" style="justify-content:center"><a class="btn secondary" href="#home">← Back to the game</a></div>
      </div>`);
    const input = $('#moveLink');
    on('#moveLink', () => input.select());
    on('#copyLink', async () => {
      try { await navigator.clipboard.writeText(link); }
      catch (e) { input.select(); document.execCommand('copy'); }
      $('#copyMsg').textContent = 'Copied! Paste it into a message or note to yourself.';
    });
    on('#usePasted', () => {
      const text = $('#pasteLink').value.trim();
      const m = text.match(/#import\/([A-Za-z0-9_-]+)/);
      const code = m ? m[1] : (/^[A-Za-z0-9_-]{20,}$/.test(text) ? text : '');
      if (!code || !unpackProgress(code)) { $('#pasteMsg').textContent = "That doesn't look like a progress link. Copy the whole link and try again."; return; }
      go('import/' + code);
    });
        on('#shareLink', () => { navigator.share({ title: 'My Uncorked progress', text: 'Open this to carry on where I left off in Uncorked:', url: link }).catch(() => {}); });
  }

  function viewImport(code) {
    const theirs = unpackProgress(code || '');
    const back = () => history.replaceState(null, '', location.pathname + '#home');
    if (!theirs) {
      render(`<div class="card center"><span class="big-emoji" aria-hidden="true">🤔</span><h1>Hmm, that link didn't work</h1>
        <p>It might have been cut short when it was copied. Try sending it again from your other device, using <b>Move my progress</b> at the bottom of the page.</p>
        <div class="btn-row" style="justify-content:center"><a class="btn" href="#home">Go to the game</a></div></div>`);
      return;
    }
    const merged = mergeProgress(state, theirs);
    const a = summarise(theirs), now = summarise(state), after = summarise(merged);
    render(`
      <div class="card center">
        <span class="big-emoji" aria-hidden="true">📲</span>
        <h1>Bring your progress across?</h1>
        <p><b>From the link:</b> ${esc(a.text)}.</p>
        <p class="muted"><b>On this device now:</b> ${esc(now.text)}.</p>
        <p>We'll keep the best of both, so you'll have <b>${esc(after.text)}</b>.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn" id="doImport">Yes, bring it across</button>
          <button class="btn secondary" id="noImport">No thanks</button>
        </div>
      </div>`);
    on('#doImport', () => {
      state = merged; save(); back();
      render(`<div class="card center"><div class="confetti" aria-hidden="true">🎉 🍾 🎉</div><h1>All moved across!</h1>
        <p>${esc(after.text)}. Carry on where you left off.</p>
        <div class="btn-row" style="justify-content:center"><a class="btn" href="#home">Back to the game</a><a class="btn secondary" href="#cheat">At the Table</a></div></div>`);
    });
    on('#noImport', () => { back(); route(); });
  }

  /* ---------- Reset ---------- */
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Reset all your progress, corks and badges? This can\'t be undone.')) {
      state = freshState(); state.ageOk = true; save(); go('home');
    }
  });

  /* ---------- Offline support ---------- */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })
        .then(reg => reg.update()).catch(() => {});
    });
    // When a newer version takes over, reload once so the player sees it straight away
    // (skipped on a first-ever visit, when there was no older version).
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      location.reload();
    });
  }

  route();
})();
