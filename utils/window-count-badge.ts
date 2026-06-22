import { browser } from '#imports';

export function registerWindowCountBadge(): void {
  browser.runtime.onInstalled.addListener(updateBadge);
  browser.runtime.onStartup.addListener(updateBadge);
  browser.windows.onCreated.addListener(updateBadge);
  browser.windows.onRemoved.addListener(updateBadge);
}

async function updateBadge(): Promise<void> {
  try {
    const windows = await browser.windows.getAll({ windowTypes: ['normal'] });
    await browser.action.setBadgeText({ text: windows.length.toString() });
    await browser.action.setBadgeBackgroundColor({ color: '#717171' });
  } catch (error) {
    console.error(error);
  }
}
