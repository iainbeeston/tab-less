'use strict';

var closeOtherWindows = function(tab) {
  chrome.windows.getAll(function(windows) {
    windows.forEach(function(window) {
      if (window.id !== tab.windowId && window.state !== 'minimized') {
        chrome.windows.remove(window.id);
      }
    });
  });
};

chrome.browserAction.onClicked.addListener(closeOtherWindows);
