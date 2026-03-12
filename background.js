chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == "complete") {
    chrome.scripting.executeScript({
      files: [
        'add-jira-links-to-title.js',
        'add-jira-links-to-description.js',
        'add-labels.js',
      ],
      target: { tabId },
    });
  }
});
