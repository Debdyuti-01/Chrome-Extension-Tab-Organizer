chrome.runtime.onInstalled.addListener(() => {
  console.log('Tab Savvy installed');
});

function groupTabsByDomain() {
  chrome.tabs.query({}, (tabs) => {
    const tabGroups = {};
    tabs.forEach((tab) => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname;
        if (!tabGroups[domain]) {
          tabGroups[domain] = [];
        }
        tabGroups[domain].push(tab);
      } catch (e) {
        console.error(`Invalid URL: ${tab.url}`);
      }
    });

    const sortedDomains = Object.keys(tabGroups).sort();
    let index = 0;

    sortedDomains.forEach((domain) => {
      tabGroups[domain].forEach((tab) => {
        chrome.tabs.move(tab.id, { index: index++ });
      });
    });
  });
}

function groupTabsByContent() {
  chrome.tabs.query({}, (tabs) => {
    const tabGroups = {};

    tabs.forEach((tab) => {
      const titleWords = tab.title.split(' ').slice(0, 3).join(' ');
      if (!tabGroups[titleWords]) {
        tabGroups[titleWords] = [];
      }
      tabGroups[titleWords].push(tab);
    });

    const sortedGroups = Object.keys(tabGroups).sort();
    let index = 0;

    sortedGroups.forEach((group) => {
      tabGroups[group].forEach((tab) => {
        chrome.tabs.move(tab.id, { index: index++ });
      });
    });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'groupByDomain') {
    groupTabsByDomain();
  } else if (message.action === 'groupByContent') {
    groupTabsByContent();
  }
});

chrome.tabs.onCreated.addListener(groupTabsByDomain);
chrome.tabs.onUpdated.addListener(groupTabsByDomain);
chrome.tabs.onRemoved.addListener(groupTabsByDomain);
