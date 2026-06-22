import { browser } from '#imports';
import type { Browser } from '#imports';

export function registerCloseWindowsAction(): void {
  browser.action.onClicked.addListener(closeOtherWindows);
}

async function closeOtherWindows(tab: Browser.tabs.Tab): Promise<void> {
  const windows = await browser.windows.getAll({ windowTypes: ['normal'] });
  await Promise.all(
    windows
      .filter(
        (window) =>
          window.id !== undefined &&
          window.id !== tab.windowId &&
          window.state !== 'minimized',
      )
      .map(async (window) => {
        try {
          await browser.windows.remove(window.id!);
        } catch (error) {
          console.error(error);
        }
      }),
  );
}
