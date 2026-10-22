/* ELEVATOR: указатель этажей как в лифте, этаж меняется по прокрутке */
(function () {
  var F = [['.hero', 'вход'], ['#loty', 'зерно'], ['.ranges', 'кухня'], ['#shkola', 'школа'], ['.stores', 'адреса']];
  var secs = F.map(function (f) { return document.querySelector(f[0]); });
  if (!secs[0] || secs.some(function (s) { return !s; })) return;
  var box = document.createElement('nav'); box.className = 'lift'; box.setAttribute('aria-label', 'Этажи');
  box.innerHTML = '<p class="disp"><i>▲</i><b>1</b><span>вход</span></p>' + F.map(function (f, i) {
    return '<button type="button" data-fl="' + i + '">' + (i + 1) + '</button>'; }).reverse().join('');
  document.body.appendChild(box);
  var d = box.querySelector('.disp'), cur = -1;
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fl]'); if (!b) return;
    secs[+b.dataset.fl].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  function upd() {
    var y = innerHeight * .45, n = 0;
    secs.forEach(function (s, i) { if (s.getBoundingClientRect().top < y) n = i; });
    if (n === cur) return;
    d.querySelector('i').textContent = n > cur ? '▲' : '▼'; cur = n;
    d.querySelector('b').textContent = n + 1; d.querySelector('span').textContent = F[n][1];
    box.querySelectorAll('[data-fl]').forEach(function (b) { b.classList.toggle('on', +b.dataset.fl === n); });
    box.classList.toggle('show', scrollY > innerHeight * .5);
  }
  addEventListener('scroll', upd, { passive: true }); upd();
})();
