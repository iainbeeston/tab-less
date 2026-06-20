import { browser } from '#imports';
import type { Browser } from '#imports';

export function registerDetachNewTabs(): void {
  browser.runtime.onInstalled.addListener(detachAllTabs);
  browser.runtime.onStartup.addListener(detachAllTabs);
  browser.tabs.onCreated.addListener(detachTab);
}

async function detachAllTabs(): Promise<void> {
  const tabs = await browser.tabs.query({});
  for (const tab of tabs) {
    await detachTab(tab);
  }
}

async function detachTab(tab: Browser.tabs.Tab): Promise<void> {
  if (tab.index === 0 || tab.pinned || tab.windowId === undefined) {
    return;
  }

  const oldWindow = await browser.windows.get(tab.windowId);
  await browser.windows.create({
    tabId: tab.id,
    incognito: tab.incognito,
    state: oldWindow.state,
  });
}
