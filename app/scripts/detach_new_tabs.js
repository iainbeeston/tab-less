'use strict';

var NEW_TAB_POPUP = true;

var detachTab = function(tab, tabType) {
  if (tab.url === 'chrome://newtab/' || tab.pinned) {
    return;
  }

  chrome.windows.get(tab.windowId, function(oldWindow) {
    chrome.windows.create({tabId: tab.id, incognito: tab.incognito, state: oldWindow.state, type: tabType});
  });
};

var detachAllTabs = function() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function (tab) {
      var tabType = NEW_TAB_POPUP ? 'popup' : 'normal';
      detachTab(tab, tabType);
    });
  });
};

var toggleActiveTab = function() {
  chrome.windows.getCurrent(function(win) {
    var windowType = win.type;
    chrome.tabs.getAllInWindow(function(tabs) {
      var tab = tabs.filter(function(tab) { return tab.active; })[0];
      var tabType = windowType === 'normal' ? 'popup' : 'normal';
      detachTab(tab, tabType);
    });
  });
};

chrome.runtime.onInstalled.addListener(detachAllTabs);
chrome.runtime.onStartup.addListener(detachAllTabs);
chrome.tabs.onCreated.addListener(function () {
  chrome.windows.getCurrent(function(win) {
    var windowType = win.type;
    chrome.tabs.getAllInWindow(function(tabs) {
      var tab = tabs.filter(function(tab) { return tab.active; })[0];
      detachTab(tab, 'popup');
    });
  });
});
chrome.commands.onCommand.addListener(function (command){
  if (command === 'toggle-popup-mode') {
    toggleActiveTab();
  }
});
