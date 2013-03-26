function openWindow() {
    chrome.windows.create();
};

// only one command defined for now, so don't
// check which is being triggered
chrome.commands.onCommand.addListener(openWindow);
