(function () {
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (q) { return document.querySelector(q); };
  var $$ = function (q) { return Array.prototype.slice.call(document.querySelectorAll(q)); };


  function confete(x, y) {
    return; 
    if (rm) return;
    var cores = ['#FF6FB5', '#E6007E', '#ffffff', '#FF8CC8'];
    for (var i = 0; i < 24; i++) {
      var el = document.createElement('i');
      el.className = 'conf';
      el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.background = cores[i % 4];
      document.body.appendChild(el);
      var a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 100;
      var an = el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d + 70) + 'px) rotate(' + Math.random() * 720 + 'deg)', opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' });
      (function (n) { an.onfinish = function () { n.remove(); }; })(el);
    }
  }


  $$('.cab > *, #projetos .wrap > *').forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.setProperty('--d', (i % 2 ? .06 : 0) + 's');
  });
  var els = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('vis'); }); }


  var prog = $('#prog'), subir = $('#subir');
  function onScroll() {
    var max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    subir.classList.toggle('vis', scrollY > 600);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  subir.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'auto' }); });


  var links = $$('.menu a');
  var so = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var t = $(a.getAttribute('href')); if (t) so.observe(t); });


  var pre = $('.codigo pre');
  pre.innerHTML = pre.innerHTML.split('\n').map(function (l, i) {
    return '<span class="ln" style="animation-delay:' + (.3 + i * .05) + 's">' + l + '</span>';
  }).join('');


  var tipo = $('#tipo'), pal = ['Java', 'Spring Boot', 'bancos de dados relacionais', 'estruturas de dados', 'arquitetura de sistemas'];
  if (true) { tipo.textContent = pal[0]; } else {
    var pi = 0, ci = 0, del = false;
    (function tick() {
      var w = pal[pi];
      ci += del ? -1 : 1;
      tipo.textContent = w.slice(0, ci);
      var t = del ? 40 : 90;
      if (!del && ci === w.length) { del = true; t = 1400; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % pal.length; t = 350; }
      setTimeout(tick, t);
    })();
  }


  var hero = $('.hero');
  if (false) hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });


  var tr = $('#trilho'); tr.innerHTML += tr.innerHTML;


  $$('.w').forEach(function (w) {
    w.innerHTML = w.textContent.split('').map(function (ch) { return '<span class="l">' + ch + '</span>'; }).join('');
  });

 
  if (false) $$('.btn').forEach(function (b) {
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX - r.left) / r.width - .5) * 12 + 'px,' + ((e.clientY - r.top) / r.height - .5) * 8 + 'px)';
    });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });


  var zoom = $('#zoom'), zimg = zoom.querySelector('img'), pimg = $('.print img');
  function abrir() { zimg.src = pimg.src; zimg.alt = pimg.alt; zoom.classList.add('on'); zoom.setAttribute('aria-hidden', 'false'); }
  function fechar() { zoom.classList.remove('on'); zoom.setAttribute('aria-hidden', 'true'); }
  pimg.addEventListener('click', abrir);
  pimg.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } });
  zoom.addEventListener('click', fechar);
  addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });


  var bg = $('#burger'), mn = $('#menu');
  bg.addEventListener('click', function () {
    var on = mn.classList.toggle('on');
    bg.classList.toggle('on', on); bg.setAttribute('aria-expanded', on);
  });
  mn.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { mn.classList.remove('on'); bg.classList.remove('on'); bg.setAttribute('aria-expanded', 'false'); }
  });


  var tema = $('#tema'), root = document.documentElement;
  function aplicar(t) {
    if (t === 'dark') root.dataset.theme = 'dark'; else root.removeAttribute('data-theme');
    tema.querySelector('span').textContent = t === 'dark' ? '☀' : '☾';
  }
  aplicar(root.dataset.theme === 'dark' ? 'dark' : 'light');
  tema.addEventListener('click', function () {
    var n = root.dataset.theme === 'dark' ? 'light' : 'dark';
    aplicar(n);
    try { localStorage.setItem('tema', n); } catch (err) {}
  });


  var proj = {
    api: { t: 'Sistema Backend Java', d: 'Desenvolvimento de API RESTful com foco em regras de negócio e estrutura de dados.', tags: ['Java', 'API REST'], pts: ['Regras de negócio como ponto central do sistema', 'Estrutura de dados aplicada ao backend'] },
    renda: { t: 'Renda Verde', d: 'Conectando catadores, empresas e cidades.', tags: ['HTML', 'CSS'], img: true }
  };
  var modal = $('#modal'), mb = $('#mbody'), ultimo;
  function abrirM(k) {
    var d = proj[k]; ultimo = document.activeElement;
    mb.innerHTML = '<h3 id="mt">' + d.t + '</h3><p>' + d.d + '</p>' +
      (d.pts ? '<ul class="pts">' + d.pts.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '') +
      (d.img ? '<img src="' + $('.print img').src + '" alt="Apresentação do projeto Renda Verde">' : '') +
      '<ul class="tags">' + d.tags.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<a class="btn btn-principal" href="https://github.com/Gustavo1097" target="_blank" rel="noopener noreferrer">Ver meu GitHub</a>';
    modal.classList.add('on'); modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-x').focus();
  }
  function fecharM() { modal.classList.remove('on'); modal.setAttribute('aria-hidden', 'true'); if (ultimo) ultimo.focus(); }
  $$('.det').forEach(function (b) { b.addEventListener('click', function () { abrirM(b.dataset.p); }); });
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('modal-x')) fecharM(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('on')) fecharM(); });


  var chips = $$('.estudo button');
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
      $('#desc').textContent = b.dataset.d;
    });
  });


  if (false) $$('.card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty('--cx', (e.clientX - r.left) + 'px'); c.style.setProperty('--cy', (e.clientY - r.top) + 'px');
      c.style.transform = 'perspective(900px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg) translateY(-4px)';
    });
    c.addEventListener('mouseleave', function () { c.style.transform = ''; });
  });


  var resp = { GET: '200 OK\n[{"id":1,"nome":"Exemplo"}]', POST: '201 Created\n{"id":2,"nome":"Novo"}', PUT: '200 OK\n{"id":1,"atualizado":true}' };
  var out = $('#resp'), timer;
  function mostrar(m) {
    clearTimeout(timer);
    var txt = resp[m], n = 0;
    if (true) { out.textContent = txt; return; }
    (function t() { out.textContent = txt.slice(0, ++n); if (n < txt.length) timer = setTimeout(t, 14); })();
  }
  var bts = $$('.rota-bt button');
  bts.forEach(function (b) {
    b.addEventListener('click', function () {
      bts.forEach(function (x) { x.classList.toggle('on', x === b); });
      mostrar(b.dataset.m);
    });
  });
  mostrar('GET');


  var cp = $('#copiar');
  cp.addEventListener('click', function () {
    function ok() { var r = cp.getBoundingClientRect(); confete(r.left + r.width / 2, r.top + r.height / 2); cp.textContent = 'Copiado!'; cp.classList.add('ok'); setTimeout(function () { cp.textContent = 'Copiar e-mail'; cp.classList.remove('ok'); }, 1800); }
    try { navigator.clipboard.writeText('gu.oliveira009@gmail.com').then(ok, function () { cp.textContent = 'Selecione e copie'; }); }
    catch (err) { cp.textContent = 'Selecione e copie'; }
  });

  
  $('#form-contato').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = this, btn = f.querySelector('button[type=submit]');
    var nome = f.nome.value.trim(), email = f.email.value.trim(), msg = f.mensagem.value.trim();
    var br = btn.getBoundingClientRect(); confete(br.left + br.width / 2, br.top + br.height / 2); btn.classList.add('carregando'); btn.textContent = 'Abrindo e-mail…';
    $('#aviso').textContent = 'Abrindo seu aplicativo de e-mail com a mensagem pronta.';
    setTimeout(function () { btn.classList.remove('carregando'); btn.textContent = 'Enviar mensagem'; }, 2500);
    location.href = 'mailto:gu.oliveira009@gmail.com?subject=' + encodeURIComponent('Contato pelo portfólio: ' + nome) +
      '&body=' + encodeURIComponent(msg + '\n\n' + nome + '\n' + email);
  });
})();