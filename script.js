// ============ COUNTDOWN ============
(function () {
  var target = new Date('2026-12-31T17:00:00').getTime();
  var els = ['cdDays', 'cdHours', 'cdMins', 'cdSecs'].map(function (id) { return document.getElementById(id); });
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) { els.forEach(function (e) { e.textContent = '00'; }); return; }
    els[0].textContent = pad(Math.floor(diff / 86400000));
    els[1].textContent = pad(Math.floor(diff / 3600000) % 24);
    els[2].textContent = pad(Math.floor(diff / 60000) % 60);
    els[3].textContent = pad(Math.floor(diff / 1000) % 60);
  }
  tick();
  setInterval(tick, 1000);
})();

// ============ NAV ============
(function () {
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 50); });
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  btn.addEventListener('click', function () { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); }); });
})();

// ============ PETALS ============
(function () {
  var container = document.getElementById('petals');
  if (!container) return;
  for (var i = 0; i < 16; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (10 + Math.random() * 10) + 's';
    p.style.animationDelay = (-Math.random() * 18) + 's';
    p.style.opacity = (0.25 + Math.random() * 0.4).toString();
    p.style.transform = 'scale(' + (0.6 + Math.random() * 0.7) + ')';
    container.appendChild(p);
  }
})();

// ============ MUSIC (gentle generated melody) ============
(function () {
  var btn = document.getElementById('musicToggle');
  var label = document.getElementById('musicLabel');
  var ctx = null, master = null, timer = null, playing = false;
  var notes = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88]; // soft pentatonic-ish
  var step = 0;

  function note(freq, when, dur) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(0.06, when + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
    osc.connect(gain); gain.connect(master);
    osc.start(when); osc.stop(when + dur + 0.1);
  }

  function schedule() {
    var now = ctx.currentTime;
    notes.forEach(function (f, i) { note(f, now + i * 0.55, 1.4); });
    // gentle low harmony
    [261.63, 329.63, 392.00].forEach(function (f) { note(f, now, 4.4); });
    step++;
  }

  btn.addEventListener('click', function () {
    if (!playing) {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
      }
      ctx.resume();
      schedule();
      timer = setInterval(schedule, 4400);
      playing = true;
      btn.classList.add('playing');
      btn.setAttribute('aria-pressed', 'true');
      label.textContent = 'Music Off';
    } else {
      clearInterval(timer);
      if (master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      setTimeout(function () { if (!playing && master) master.gain.value = 0.5; }, 700);
      playing = false;
      btn.classList.remove('playing');
      btn.setAttribute('aria-pressed', 'false');
      label.textContent = 'Music On';
    }
  });
})();

// ============ INVITATION MODALS ============
(function () {
  var cards = document.querySelectorAll('.invite-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var modal = document.getElementById(card.getAttribute('data-target'));
      if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    });
  });
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      el.closest('.modal').classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(function (m) { m.classList.remove('open'); });
      document.body.style.overflow = '';
    }
  });
})();

// ============ SCROLL REVEAL ============
(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('active'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  targets.forEach(function (t) { observer.observe(t); });
})();
