(() => {
  const $title = document.querySelector('.js-issue-title');
  if (!$title) {
    return;
  }

  chrome.storage.local.get({ inlineLinks: false, subdomain: "", tagRegex: "" }, (options) => {
    if (options.subdomain == "" || options.tagRegex === "") {
      return;
    }

    let title = $title.innerHTML.replace(/(<a[^>]+>|⬆︎|<\/a>)/g, '');
    title.match(new RegExp(options.tagRegex, 'g')).forEach((tag) => {
      const url = `https://${options.subdomain}.atlassian.net/browse/${tag}`;
      const attrs = `href="${url}" target="_blank"`;

      const replacement = options.inlineLinks === false ?
        `${tag}<a ${attrs}>⬆︎</a>` :
        `<a ${attrs}>${tag}</a>`;

      title = title.replace(tag, replacement);
    })

    $title.innerHTML = title;
  });
})();
