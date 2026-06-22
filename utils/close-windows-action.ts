import { browser } from '#imports';
import type { Browser } from '#imports';

export function registerCloseWindowsAction(): void {
  browser.action.onClicked.addListener(closeOtherWindows);
}

async function closeOtherWindows(tab: Browser.tabs.Tab): Promise<void> {
  const windows = await browser.windows.getAll();
  for (const window of windows) {
    if (window.id !== undefined && window.id !== tab.windowId && window.state !== 'minimized') {
      await browser.windows.remove(window.id);
    }
  }
}
