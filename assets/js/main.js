/* Odonto Vip — interações da landing
   Padrão herdado das interfaces CINCO: reveal on scroll, header com estado
   ao rolar, nav mobile e destaque da seção ativa. */
(function () {
  'use strict';

  /* ---------- ano no rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- header: sombra ao rolar ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- nav mobile ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.querySelector('use').setAttribute('href', '#i-menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* ---------- seletores de unidade ----------
     O <details> já abre e fecha sozinho. Aqui só cuidamos do que ele não faz:
     fechar ao clicar fora, fechar no Esc e nunca deixar dois abertos ao mesmo
     tempo. Sem JS, o menu continua abrindo e os links continuam funcionando. */
  var pickers = Array.prototype.slice.call(document.querySelectorAll('details.picker'));

  // a seção que hospeda o seletor aberto precisa subir no empilhamento: todas as
  // seções têm z-index 1, então a seguinte no DOM pintava por cima do menu
  function lift(d, on) {
    ['section, footer', '.svc'].forEach(function (sel) {
      var host = d.closest(sel);
      if (host) host.classList.toggle('picker-open', on);
    });
  }

  function closePickers(except) {
    pickers.forEach(function (d) {
      if (d !== except) { d.open = false; lift(d, false); }
    });
  }

  pickers.forEach(function (d) {
    var summary = d.querySelector('summary');
    // fechamos os outros no clique do summary, não no evento `toggle`: `toggle` é
    // assíncrono, e com dois cliques no mesmo turno a ordem se invertia e o menu
    // errado ficava aberto. No clique é síncrono, antes do browser alternar.
    if (summary) {
      summary.addEventListener('click', function () { closePickers(d); });
    }
    d.addEventListener('toggle', function () { lift(d, d.open); });
    // escolher uma unidade abre o WhatsApp em outra aba: fecha o menu atrás
    d.addEventListener('click', function (e) {
      if (e.target.closest('.picker-menu a')) d.open = false;
    });
  });

  if (pickers.length) {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('details.picker')) closePickers(null);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = pickers.filter(function (d) { return d.open; });
      if (!open.length) return;
      open.forEach(function (d) {
        d.open = false;
        var sum = d.querySelector('summary');
        if (sum) sum.focus();
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // escalona irmãos dentro do mesmo grupo para um efeito em cascata
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        var i = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- seção ativa na navegação ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
