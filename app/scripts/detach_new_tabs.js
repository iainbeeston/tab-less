'use strict';

var detachTab = function(tab) {
  // ignore the first tab in each window
  if (tab.index === 0) {
    return;
  }

  chrome.windows.get(tab.windowId, function(oldWindow) {
    chrome.windows.create({'tabId': tab.id, 'incognito': oldWindow.incognito}, function(newWindow) {
      chrome.windows.update(newWindow.id, {'state': oldWindow.state});
    });
  });
};

chrome.tabs.onCreated.addListener(detachTab);
