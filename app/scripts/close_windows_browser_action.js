'use strict';

var CLOSABLE_STATES = [undefined, 'normal']

var closeOtherWindows = function(tab) {
  chrome.windows.getAll(function(windows) {
    windows.forEach(function(window) {
      if (window.id !== tab.windowId && CLOSABLE_STATES.includes(window.state)) {
        chrome.windows.remove(window.id);
      }
    })
  });
};

chrome.browserAction.onClicked.addListener(closeOtherWindows);
