/* Shikhon Academy — shared behaviour (no dependencies)
   Everything here is front-end only: forms validate and redirect,
   but nothing is saved until a backend is connected. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- icons ---------- */
  var ICONS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="9"/><rect x="14" y="16" width="7" height="5"/><rect x="3" y="14" width="7" height="7"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    checksq: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="14.01"/><line x1="21" y1="14" x2="21" y2="14.01"/><line x1="14" y1="21" x2="17" y2="21"/><line x1="21" y1="17" x2="21" y2="21"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
  };

  function svg(name) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  function paintIcons(root) {
    $$('i[data-i]', root).forEach(function (el) {
      if (!ICONS[el.dataset.i]) return;
      var tmp = document.createElement('span');
      tmp.innerHTML = svg(el.dataset.i);
      var s = tmp.firstChild;
      if (el.className) el.className.split(/\s+/).forEach(function (c) { if (c) s.classList.add(c); });
      el.replaceWith(s);
    });
  }

  /* ---------- toast ---------- */
  function toast(msg, type) {
    var wrap = $('.toasts');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toasts';
      wrap.setAttribute('role', 'status');
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = svg(type === 'error' ? 'x' : 'check');
    var span = document.createElement('span');
    span.textContent = msg;
    t.appendChild(span);
    wrap.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 300);
    }, 3200);
  }
  window.toast = toast;

  /* ---------- theme ---------- */
  function currentTheme() { return document.documentElement.dataset.theme || 'light'; }
  function syncThemeButtons() {
    var dark = currentTheme() === 'dark';
    $$('[data-theme-toggle]').forEach(function (b) {
      b.innerHTML = svg(dark ? 'sun' : 'moon');
      b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      syncThemeButtons();
    });
  });

  /* ---------- public nav (mobile) ---------- */
  var navBtn = $('[data-nav-toggle]');
  var navLinks = $('#navLinks');
  if (navBtn && navLinks) {
    var setNav = function (open) {
      navLinks.classList.toggle('is-open', open);
      navBtn.setAttribute('aria-expanded', String(open));
    };
    navBtn.addEventListener('click', function () { setNav(!navLinks.classList.contains('is-open')); });
    navLinks.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
  }

  /* ---------- app sidebar (mobile) ---------- */
  var app = $('.app');
  if (app) {
    var setSide = function (open) {
      app.classList.toggle('sidebar-open', open);
      $$('[data-sidebar-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
    };
    $$('[data-sidebar-toggle]').forEach(function (b) {
      b.addEventListener('click', function () { setSide(!app.classList.contains('sidebar-open')); });
    });
    $$('[data-sidebar-close]').forEach(function (el) { el.addEventListener('click', function () { setSide(false); }); });
    $$('.sidebar a').forEach(function (a) { a.addEventListener('click', function () { setSide(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setSide(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1024) setSide(false); });
  }

  /* ---------- password show/hide + strength ---------- */
  $$('[data-toggle-pass]').forEach(function (btn) {
    btn.type = 'button';
    btn.innerHTML = svg('eye');
    btn.setAttribute('aria-label', 'Show password');
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.innerHTML = svg(show ? 'eyeoff' : 'eye');
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  $$('input[data-strength]').forEach(function (input) {
    var meter = $(input.dataset.strength);
    if (!meter) return;
    input.addEventListener('input', function () {
      var v = input.value, score = 0;
      if (v.length >= 8) score++;
      if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
      if (/\d/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      if (!v) score = 0;
      meter.dataset.level = String(score);
    });
  });

  /* ---------- auth: panel switch + role tabs ---------- */
  function showPanel(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    $$('.tab-panel').forEach(function (p) { p.hidden = p !== panel; });
    $$('[data-switch]').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.switch === id && b.classList.contains('tab'));
    });
    if (history.replaceState) history.replaceState(null, '', '#' + (id === 'panel-register' ? 'register' : 'login'));
  }
  $$('[data-switch]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); showPanel(b.dataset.switch); });
  });
  if ($('#panel-register') && location.hash === '#register') showPanel('panel-register');

  $$('[data-role]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.parentElement;
      $$('[data-role]', group).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      var panel = btn.closest('.tab-panel');
      var form = panel ? panel.querySelector('form') : btn.closest('form');
      if (form) form.dataset.redirect = btn.dataset.redirect;
    });
  });

  /* ---------- form validation ---------- */
  function validateField(field) {
    var input = $('input, select, textarea', field);
    if (!input) return true;
    var v = input.value.trim(), msg = '';
    if (input.type === 'checkbox') {
      if (input.required && !input.checked) msg = 'Please accept to continue';
    } else if (input.required && !v) {
      msg = 'This field is required';
    } else if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      msg = 'Enter a valid email address';
    } else if (v && input.dataset.match && v !== ($(input.dataset.match) || {}).value) {
      msg = 'Passwords do not match';
    } else if (v && input.minLength > 0 && v.length < input.minLength) {
      msg = 'Use at least ' + input.minLength + ' characters';
    } else if (v && input.pattern && !new RegExp('^(?:' + input.pattern + ')$').test(v)) {
      msg = input.title || 'Invalid format';
    }
    field.classList.toggle('is-invalid', !!msg);
    var m = $('.msg', field);
    if (m) m.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  $$('form[data-validate]').forEach(function (form) {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      $$('.field', form).forEach(function (f) {
        if (!validateField(f)) {
          ok = false;
          if (!first) first = $('input, select, textarea', f);
        }
      });
      if (!ok) { if (first) first.focus(); return; }

      form.dispatchEvent(new CustomEvent('valid', { bubbles: true }));
      if (form.dataset.redirect) {
        toast(form.dataset.success || 'Done');
        setTimeout(function () { location.href = form.dataset.redirect; }, 700);
      }
    });

    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field');
      if (f && f.classList.contains('is-invalid')) validateField(f);
      $$('input[data-match]', form).forEach(function (m) {
        if (m.value) validateField(m.closest('.field'));
      });
    });

    form.addEventListener('focusout', function (e) {
      var f = e.target.closest && e.target.closest('.field');
      if (f && e.target.value && e.target.type !== 'checkbox') validateField(f);
    });
  });

  /* ---------- generic search / chips / select filter ---------- */
  $$('[data-filter-scope]').forEach(function (scope) {
    var state = { q: '', f: {} };
    var empty = $('.empty', scope);

    function apply() {
      var n = 0;
      $$('[data-item]', scope).forEach(function (it) {
        var show = true;
        if (state.q && it.textContent.toLowerCase().indexOf(state.q) === -1) show = false;
        Object.keys(state.f).forEach(function (k) {
          if (state.f[k] !== 'all' && it.dataset[k] !== state.f[k]) show = false;
        });
        it.hidden = !show;
        if (show) n++;
      });
      if (empty) empty.classList.toggle('show', n === 0);
      $$('[data-result-count]', scope).forEach(function (c) { c.textContent = n; });
      scope.dispatchEvent(new CustomEvent('filtered', { bubbles: true }));
    }

    scope.addEventListener('input', function (e) {
      if (e.target.matches('[data-filter-search]')) { state.q = e.target.value.trim().toLowerCase(); apply(); }
    });
    scope.addEventListener('change', function (e) {
      if (e.target.matches('[data-filter-select]')) { state.f[e.target.dataset.filterSelect] = e.target.value; apply(); }
    });
    scope.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-filter-chip]');
      if (!chip) return;
      var key = chip.dataset.filterChip;
      state.f[key] = chip.dataset.value;
      $$('[data-filter-chip="' + key + '"]', scope).forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-pressed', String(c === chip));
      });
      apply();
    });
    scope.addEventListener('refilter', apply);
    apply();
  });

  /* ---------- attendance ---------- */
  var att = $('[data-attendance]');
  if (att) {
    var recount = function () {
      var c = { P: 0, A: 0, L: 0 }, rows = 0;
      $$('tbody tr', att).forEach(function (r) {
        if (r.hidden) return;
        rows++;
        var ch = $('input:checked', r);
        if (ch) c[ch.value]++;
      });
      var set = function (sel, val) { $$(sel).forEach(function (el) { el.textContent = val; }); };
      set('[data-count-p]', c.P);
      set('[data-count-a]', c.A);
      set('[data-count-l]', c.L);
      set('[data-count-total]', rows);
      set('[data-count-rate]', rows ? Math.round(((c.P + c.L) / rows) * 100) + '%' : '0%');
    };
    att.addEventListener('change', recount);
    document.addEventListener('filtered', recount);
    $$('[data-mark-all]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('tbody tr', att).forEach(function (r) {
          if (r.hidden) return;
          var p = $('input[value="P"]', r);
          if (p) p.checked = true;
        });
        recount();
        toast('All visible students marked present');
      });
    });
    $$('[data-save-attendance]').forEach(function (b) {
      b.addEventListener('click', function () {
        var rows = $$('tbody tr', att).filter(function (r) { return !r.hidden; }).length;
        toast('Attendance recorded for ' + rows + ' students (demo — not stored yet)');
      });
    });
    recount();
  }

  /* ---------- dialogs ---------- */
  $$('[data-open-dialog]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.dataset.openDialog);
      if (!d) return;
      if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    });
  });
  $$('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $$('[data-close-dialog]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });

  /* add-student (client-side only) */
  var addForm = $('#addStudentForm');
  var rowsBody = $('#studentRows');
  if (addForm && rowsBody) {
    addForm.addEventListener('valid', function () {
      var fd = new FormData(addForm);
      var name = String(fd.get('name')).trim();
      var course = String(fd.get('course'));
      var batch = String(fd.get('batch'));
      var phone = String(fd.get('phone')).trim();
      var initials = name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
      var id = 'SA-' + (2600 + rowsBody.children.length + 1);

      var tr = document.createElement('tr');
      tr.setAttribute('data-item', '');
      tr.dataset.batch = batch.toLowerCase();
      tr.dataset.fees = 'due';

      function td(child) {
        var cell = document.createElement('td');
        if (typeof child === 'string') cell.textContent = child; else cell.appendChild(child);
        return cell;
      }

      var user = document.createElement('div');
      user.className = 'cell-user';
      var av = document.createElement('span');
      av.className = 'avatar av' + (1 + (rowsBody.children.length % 5));
      av.textContent = initials;
      var info = document.createElement('div');
      var strong = document.createElement('strong');
      strong.textContent = name;
      var idEl = document.createElement('span');
      idEl.textContent = id;
      info.appendChild(strong);
      info.appendChild(idEl);
      user.appendChild(av);
      user.appendChild(info);

      var badge = document.createElement('span');
      badge.className = 'badge badge-danger';
      badge.textContent = 'Due';

      tr.appendChild(td(user));
      tr.appendChild(td(course + ' · ' + batch));
      tr.appendChild(td(phone));
      tr.appendChild(td(badge));
      tr.appendChild(td('—'));
      rowsBody.insertBefore(tr, rowsBody.firstChild);

      addForm.reset();
      $$('.field', addForm).forEach(function (f) { f.classList.remove('is-invalid'); });
      var dlg = addForm.closest('dialog');
      if (dlg) dlg.close();
      var scope = rowsBody.closest('[data-filter-scope]');
      if (scope) scope.dispatchEvent(new CustomEvent('refilter'));
      toast(name + ' added (demo — not stored yet)');
    });
  }

  /* ---------- placeholder actions ---------- */
  $$('[data-toast]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      toast(b.dataset.toast);
    });
  });

  /* ---------- counters + reveal ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function format(el, n) {
    el.textContent = (el.dataset.prefix || '') + Math.round(n).toLocaleString('en-IN') + (el.dataset.suffix || '');
  }
  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    if (reduce || isNaN(target)) { format(el, target); return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      format(el, target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = $$('[data-count]');
  var reveals = $$('.reveal');
  if (hasIO) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        if (en.target.hasAttribute('data-count')) runCounter(en.target);
        if (en.target.classList.contains('reveal')) en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    counters.forEach(function (el) { io.observe(el); });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    counters.forEach(function (el) { format(el, parseFloat(el.dataset.count)); });
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- small bits ---------- */
  $$('[data-day]').forEach(function (el) {
    if (Number(el.dataset.day) === new Date().getDay()) el.classList.add('today');
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $$('[data-today]').forEach(function (el) {
    el.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  });

  paintIcons(document);
  syncThemeButtons();
})();
