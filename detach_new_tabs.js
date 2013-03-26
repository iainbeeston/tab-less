function detachTab(tab) {
    // ignore the first tab in each window
    if (tab.index === 0) return;

    chrome.windows.create({'tabId': tab.id});
};

chrome.tabs.onCreated.addListener(detachTab);
