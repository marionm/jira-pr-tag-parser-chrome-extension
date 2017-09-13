(() => {
  const $input = document.querySelector('#pull_request_body');
  if (!$input || $input.textLength > 0) {
    return;
  }

  jiraLinks = [];
  document.querySelectorAll('.commit-message').forEach((commitMessage) => {
    commitMessage.textContent.match(/BSD-\d+/g).forEach((jiraId) => {
      jiraLinks.push(`[${jiraId}](https://buildout.atlassian.net/browse/${jiraId})`);
    })
  });

  if (jiraLinks.length > 0) {
    $input.value = jiraLinks.join("\n") + "\n\n"
  }
})();
