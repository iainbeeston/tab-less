import { browser } from '#imports';
import type { Browser } from '#imports';

export function registerDetachNewTabs(): void {
  browser.runtime.onInstalled.addListener(detachAllTabs);
  browser.runtime.onStartup.addListener(detachAllTabs);
  browser.tabs.onCreated.addListener(detachTab);
}

async function detachAllTabs(): Promise<void> {
  const tabs = await browser.tabs.query({});
  const detachable = tabs.filter(
    (tab) => tab.index !== 0 && !tab.pinned && tab.windowId !== undefined && tab.id !== undefined,
  );

  const windowIds = [...new Set(detachable.map((tab) => tab.windowId!))];
  const windows = new Map(
    await Promise.all(
      windowIds.map(async (windowId) => {
        try {
          return [windowId, await browser.windows.get(windowId)] as const;
        } catch (error) {
          console.error(error);
          return [windowId, undefined] as const;
        }
      }),
    ),
  );

  await Promise.all(
    detachable.map(async (tab) => {
      try {
        await browser.windows.create({
          tabId: tab.id,
          incognito: tab.incognito,
          state: windows.get(tab.windowId!)?.state,
        });
      } catch (error) {
        console.error(error);
      }
    }),
  );
}

async function detachTab(tab: Browser.tabs.Tab): Promise<void> {
  if (tab.index === 0 || tab.pinned || tab.windowId === undefined || tab.id === undefined) {
    return;
  }

  try {
    const oldWindow = await browser.windows.get(tab.windowId);
    await browser.windows.create({
      tabId: tab.id,
      incognito: tab.incognito,
      state: oldWindow.state,
    });
  } catch (error) {
    console.error(error);
  }
}
