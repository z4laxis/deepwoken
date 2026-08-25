(() => {
  if (!['localhost', '127.0.0.1'].includes(location.hostname)) return;

  const routes = {
    '/talent-creator': '/src/pages/tools/talent-creator.html',
    '/item-creator': '/src/pages/tools/item-creator.html',
    '/buildplanner': '/src/pages/tools/buildplanner.html',
    '/builder': '/src/pages/tools/buildplanner.html',
    '/guild-emblem': '/src/pages/tools/guild-emblem.html',
    '/drip-designer': '/src/pages/tools/drip-designer.html',
    '/dialogue': '/src/pages/tools/dialogue.html',
    '/blacksmith': '/src/pages/tools/blacksmith.html',
    '/credits': '/src/pages/site/credits.html',
    '/glossary': '/src/pages/site/glossary.html',
    '/library': '/src/pages/site/library.html',
    '/settings': '/src/pages/site/settings.html',
    '/socials': '/src/pages/site/socials.html',
    '/server-list': '/src/pages/site/server-list.html',
    '/updates': '/src/pages/site/updates.html',
    '/menu': '/src/pages/site/menu.html',
    '/oldindex': '/src/pages/site/oldindex.html',
    '/echoes-checklist': '/src/pages/game/echoes-checklist.html',
    '/mathtextbook': '/src/pages/game/mathtextbook.html',
    '/vowofiron': '/src/pages/game/vowofiron.html',
    '/game': '/src/pages/legacy/game/index.html',
    '/game/credits': '/src/pages/legacy/game/credits.html',
    '/map/eastern': '/src/pages/world/map/eastern.html',
    '/map/etrean': '/src/pages/world/map/etrean.html',
    '/map/ironvow': '/src/pages/world/map/ironvow.html',
    '/map/depths': '/src/pages/world/map/depths.html',
    '/market/naan': '/src/pages/world/market/naan.html',
    '/market/traan': '/src/pages/world/market/traan.html',
    '/stock/naan': '/src/pages/world/stock/naan.html',
    '/stock/traan': '/src/pages/world/stock/traan.html'
  };

  const resolve = (href) => {
    if (!href || !href.startsWith('/')) return href;
    const [path, suffix = ''] = href.split(/([?#].*)/, 2);
    return `${routes[path] || path}${suffix}`;
  };

  document.querySelectorAll('a[href^="/"] , button[href^="/"]').forEach((element) => {
    element.setAttribute('href', resolve(element.getAttribute('href')));
  });
})();
