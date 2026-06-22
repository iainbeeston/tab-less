import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import { registerWindowCountBadge } from '@/utils/window-count-badge';

type FakeWindow = Awaited<ReturnType<typeof fakeBrowser.windows.get>>;

const fakeWindow = (properties: Partial<FakeWindow> = {}): FakeWindow => properties as FakeWindow;

describe('window count badge', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    registerWindowCountBadge();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets the badge text to the number of open windows', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow(),
      fakeWindow(),
      fakeWindow(),
    ]);
    const setBadgeText = vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.windows.onCreated.trigger(fakeWindow());

    expect(setBadgeText).toHaveBeenCalledWith({ text: '3' });
  });

  it('sets the badge text to 1 when there is a single window', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    const setBadgeText = vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.windows.onCreated.trigger(fakeWindow());

    expect(setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('sets the badge colour to a grey slightly lighter than the icon', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([]);
    const setBadgeBackgroundColor = vi
      .spyOn(fakeBrowser.action, 'setBadgeBackgroundColor')
      .mockResolvedValue(undefined);

    await fakeBrowser.windows.onCreated.trigger(fakeWindow());

    expect(setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#717171' });
  });

  it('updates the badge when a window is closed', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    const setBadgeText = vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.windows.onRemoved.trigger(1);

    expect(setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('updates the badge when the extension is installed', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    const setBadgeText = vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install', temporary: false });

    expect(setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('updates the badge when the browser is started', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    const setBadgeText = vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.runtime.onStartup.trigger();

    expect(setBadgeText).toHaveBeenCalledWith({ text: '1' });
  });

  it('only counts normal windows', async () => {
    const getAll = vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    vi.spyOn(fakeBrowser.action, 'setBadgeText').mockResolvedValue(undefined);

    await fakeBrowser.windows.onCreated.trigger(fakeWindow());

    expect(getAll).toHaveBeenCalledWith({ windowTypes: ['normal'] });
  });
});
