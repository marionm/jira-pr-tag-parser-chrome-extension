(() => {
  const $title = document.querySelector('.js-issue-title');
  if (!$title) {
    return;
  }

  chrome.storage.local.get('inlineLinks', (options) => {
    let title = $title.innerHTML.replace(/(<a[^>]+>|⬆︎|<\/a>)/g, '');
    // TODO: Bring back multiple matches for the new format
    // TODO: Format settings in options page? (Also, domain option?)
    let matches = title.match(/^\s*(\w+-\d+):?/);

    if (matches) {
      let tag = matches[1];
      const url = `https://buildout.atlassian.net/browse/${tag}`;
      const attrs = `href="${url}" target="_blank"`;

      const replacement = options.inlineLinks === false ?
        `${tag}<a ${attrs}>⬆︎</a>` :
        `<a ${attrs}>${tag}</a>`;

      title = title.replace(tag, replacement);
    }

    $title.innerHTML = title;
  });
})();
