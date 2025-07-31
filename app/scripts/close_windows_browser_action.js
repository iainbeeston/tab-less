'use strict';

var closeOtherWindows = function(tab) {
  chrome.windows.getAll(function(windows) {
    for(var window of windows) {
      if (window.id !== tab.windowId && window.state !== 'minimized') {
        chrome.windows.remove(window.id);
      }
    }
  });
};

chrome.browserAction.onClicked.addListener(closeOtherWindows);
