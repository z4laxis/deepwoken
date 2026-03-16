(function () {
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocal) return;

  function toLocalHtmlPath(rawHref) {
    if (!rawHref || !rawHref.startsWith('/')) return rawHref;
    if (rawHref === '/') return rawHref;

    const [path, suffix = ''] = rawHref.split(/([?#].*)/, 2);
    const lastSegment = path.substring(path.lastIndexOf('/') + 1);
    if (!lastSegment || lastSegment.includes('.')) return rawHref;
    return `${path}.html${suffix}`;
  }

  document.querySelectorAll('a[href^="/"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    anchor.setAttribute('href', toLocalHtmlPath(href));
  });

  document.querySelectorAll('button[href^="/"]').forEach(button => {
    const href = button.getAttribute('href');
    button.setAttribute('href', toLocalHtmlPath(href));
  });
})();
