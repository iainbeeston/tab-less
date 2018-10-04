'use strict';

var detachTab = function(tab) {
  if (tab.index === 0 || tab.pinned) {
    return;
  }

  chrome.windows.get(tab.windowId, function(oldWindow) {
    chrome.windows.create({tabId: tab.id, incognito: tab.incognito, state: oldWindow.state});
  });
};

var detachAllTabs = function() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(detachTab);
  });
};

chrome.runtime.onInstalled.addListener(detachAllTabs);
chrome.runtime.onStartup.addListener(detachAllTabs);
chrome.tabs.onCreated.addListener(detachTab);
