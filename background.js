chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == "complete") {
    chrome.tabs.executeScript(tabId, { file: 'add-jira-links-to-title.js' });
    chrome.tabs.executeScript(tabId, { file: 'add-jira-links-to-description.js' });
  }
});
