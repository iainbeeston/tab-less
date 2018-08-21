'use strict';

var updateBadge = function() {
  chrome.windows.getAll({}, function(windows) {
    var windowCount = windows.length;
    chrome.browserAction.setBadgeText({text: windowCount.toString()});
    chrome.browserAction.setBadgeBackgroundColor({color: '#717171'});
  });
};

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.windows.onCreated.addListener(updateBadge);
chrome.windows.onRemoved.addListener(updateBadge);
