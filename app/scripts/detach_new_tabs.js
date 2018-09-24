'use strict';

var detachTab = function(tab) {
  if (tab.index === 0 || tab.pinned) {
    return;
  }

  chrome.windows.get(tab.windowId, function(oldWindow) {
    chrome.windows.create({tabId: tab.id, incognito: tab.incognito, state: oldWindow.state});
  });
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(detachTab);
  });
});

chrome.tabs.onCreated.addListener(detachTab);
