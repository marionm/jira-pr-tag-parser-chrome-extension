const subdomainInput = document.querySelector('#subdomain');

chrome.storage.local.get('subdomain', (options) => {
  if (options.subdomain) {
    subdomainInput.value = options.subdomain;
  }
});

subdomainInput.addEventListener('change', () => {
  chrome.storage.local.set({ subdomain: subdomainInput.value });
});

const tagRegexInput = document.querySelector('#tag-regex');

chrome.storage.local.get('tagRegex', (options) => {
  if (options.tagRegex) {
    tagRegexInput.value = options.tagRegex;
  }
});

tagRegexInput.addEventListener('change', () => {
  chrome.storage.local.set({ tagRegex: tagRegexInput.value });
});

const inlineLinksInput = document.querySelector('#inline-links');

chrome.storage.local.get('inlineLinks', (options) => {
  if (options.inlineLinks !== false) {
    inlineLinksInput.setAttribute('checked', 'checked');
  }
});

inlineLinksInput.addEventListener('change', () => {
  chrome.storage.local.set({ inlineLinks: inlineLinksInput.checked });
});
