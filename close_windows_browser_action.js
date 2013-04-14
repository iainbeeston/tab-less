function closeOtherWindows(tab) {
    chrome.windows.getAll(function(windows) {
        for (var i=0, windowsLength=windows.length; i < windowsLength; i++) {
            var window = windows[i];
            if (window.id !== tab.windowId) {
                chrome.windows.remove(window.id);
            }
        }
    });
}

chrome.browserAction.onClicked.addListener(closeOtherWindows);
