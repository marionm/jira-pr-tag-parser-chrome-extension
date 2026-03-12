chrome.storage.local.get({ labels: "" }, (options) => {
  const newPrTitle = document.querySelector('[name="pull_request[title]"]');
  const labelsMenu = document.querySelector('#labels-select-menu');
  const detailsMenu = labelsMenu?.querySelector('details-menu');
  const labelNames = options?.labels?.split(',')?.map(name => name.trim())?.filter(Boolean);

  if (!newPrTitle || !labelsMenu || !detailsMenu || !labelNames?.length) {
    return;
  }

  function openMenu() {
    detailsMenu.style.visibility = 'hidden';
    labelsMenu.setAttribute('open', '');
  }

  function closeMenu() {
    labelsMenu.removeAttribute('open');
    detailsMenu.style.visibility = '';
  }

  function addLabels() {
    for (const labelName of labelNames) {
      const checkbox = document.querySelector(`input[data-label-name="${labelName}"]`);
      if (checkbox && !checkbox.checked) {
        checkbox.click();
      }
    }
  }

  let attempts = 0;
  const maxAttempts = 30;
  function checkForLabels() {
    attempts++;

    let added;
    if (document.querySelector('input[name="issue[labels][]"]')) {
      addLabels();
      added = true;
    }

    if (added || attempts >= maxAttempts) {
      closeMenu();
    } else {
      setTimeout(checkForLabels, 100);
    }
  }

  openMenu();
  checkForLabels();
});
