// Privacy & Terms page: show one language (from ?lang= or the buttons) and a Back that returns to the game.
(function () {
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') === 'he' || location.hash.indexOf('#he') === 0 ? 'he' : 'en';
  var back = document.getElementById('back');

  function show(l) {
    lang = l;
    document.body.className = 'only-' + l;
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
    document.getElementById('btn-en').classList.toggle('on', l === 'en');
    document.getElementById('btn-he').classList.toggle('on', l === 'he');
    back.textContent = back.getAttribute('data-' + l);
  }

  ['en', 'he'].forEach(function (l) {
    document.getElementById('btn-' + l).addEventListener('click', function (e) {
      e.preventDefault();
      show(l);
      window.scrollTo(0, 0);
    });
  });

  // Back: return to the previous screen of the app when we came from it, otherwise open the game.
  back.addEventListener('click', function (e) {
    if (params.get('from') === 'app' && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });

  show(lang);
})();
