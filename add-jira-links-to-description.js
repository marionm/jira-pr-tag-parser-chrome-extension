chrome.storage.local.get({ tagRegex: "" }, (options) => {
  if (options.tagRegex === "") {
    return;
  }

  const $title = document.querySelector('#pull_request_title');
  const $description = document.querySelector('#pull_request_body');
  if (!$title || !$description) {
    return;
  }

  const idSet = new Set();
  document.querySelectorAll('.TimelineItem .Details').forEach((commitMessage) => {
    match = commitMessage.textContent.match(new RegExp(options.tagRegex, 'g'));
    if (match) {
      match.forEach((id) => idSet.add(id));
    }
  });

  if (idSet.size > 0) {
    const ids = [];

    let anyIdsInTitle = false;
    let description = "";

    idSet.forEach((id) => {
      ids.push(id);
      description += `[${id}](https://buildout.atlassian.net/browse/${id})\n`;

      if ($title.value.indexOf(id) > -1) {
        anyIdsInTitle = true;
      }
    });

    if (!anyIdsInTitle) {
      $title.value = `${ids.join(", ")}: `;
    }

    if ($description.textLength === 0) {
      $description.value = `${description}\n`;
    }
  }
});
