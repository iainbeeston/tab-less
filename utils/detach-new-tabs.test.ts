import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import { registerDetachNewTabs } from '@/utils/detach-new-tabs';

type FakeWindow = Awaited<ReturnType<typeof fakeBrowser.windows.get>>;
type FakeTab = Awaited<ReturnType<typeof fakeBrowser.tabs.get>>;

const fakeTab = (properties: Partial<FakeTab> = {}): FakeTab => properties as FakeTab;
const fakeWindow = (properties: Partial<FakeWindow> = {}): FakeWindow => properties as FakeWindow;

describe('when a new tab is created', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    registerDetachNewTabs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('moves the tab to a new window', async () => {
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ id: 12_345, windowId: 100 }));

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ tabId: 12_345 }));
  });

  it('does nothing if the tab is the first tab in that window', async () => {
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ index: 0 }));

    expect(create).not.toHaveBeenCalled();
  });

  it('does nothing if the tab is pinned', async () => {
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ pinned: true }));

    expect(create).not.toHaveBeenCalled();
  });

  it('does nothing if the tab has no id', async () => {
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ windowId: 100 }));

    expect(create).not.toHaveBeenCalled();
  });

  it('reuses the incognito status from the original tab', async () => {
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ id: 1, incognito: true, windowId: 100 }));

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ incognito: true }));
  });

  it('reuses the state from the original window', async () => {
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow({ state: 'minimized' }));
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.tabs.onCreated.trigger(fakeTab({ id: 1, windowId: 12_345 }));

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ state: 'minimized' }));
  });
});

describe('when the extension is installed', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    registerDetachNewTabs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('queries all tabs and moves them to new windows', async () => {
    vi.spyOn(fakeBrowser.tabs, 'query').mockResolvedValue([
      fakeTab({ id: 1, windowId: 100 }),
      fakeTab({ id: 2, windowId: 100 }),
    ]);
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install', temporary: false });

    expect(create.mock.calls.map((call) => call[0]?.tabId)).toEqual([1, 2]);
  });

  it('still detaches the remaining tabs when one creation fails', async () => {
    vi.spyOn(fakeBrowser.tabs, 'query').mockResolvedValue([
      fakeTab({ id: 1, windowId: 100 }),
      fakeTab({ id: 2, windowId: 200 }),
    ]);
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    const create = vi
      .spyOn(fakeBrowser.windows, 'create')
      .mockRejectedValueOnce(new Error('No tab with id: 1.'))
      .mockResolvedValue(fakeWindow());

    await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install', temporary: false });

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ tabId: 2 }));
  });

  it('still detaches a tab when looking up its window fails', async () => {
    vi.spyOn(fakeBrowser.tabs, 'query').mockResolvedValue([
      fakeTab({ id: 1, windowId: 100 }),
      fakeTab({ id: 2, windowId: 200 }),
    ]);
    vi.spyOn(fakeBrowser.windows, 'get')
      .mockRejectedValueOnce(new Error('No window with id: 100.'))
      .mockResolvedValue(fakeWindow());
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install', temporary: false });

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ tabId: 1 }));
  });

  it('fetches each distinct window only once', async () => {
    vi.spyOn(fakeBrowser.tabs, 'query').mockResolvedValue([
      fakeTab({ id: 1, windowId: 100 }),
      fakeTab({ id: 2, windowId: 100 }),
    ]);
    const get = vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install', temporary: false });

    expect(get).toHaveBeenCalledTimes(1);
  });
});

describe('when the browser is started', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    registerDetachNewTabs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('queries all tabs and moves them to new windows', async () => {
    vi.spyOn(fakeBrowser.tabs, 'query').mockResolvedValue([
      fakeTab({ id: 1, windowId: 100 }),
      fakeTab({ id: 2, windowId: 100 }),
    ]);
    vi.spyOn(fakeBrowser.windows, 'get').mockResolvedValue(fakeWindow());
    const create = vi.spyOn(fakeBrowser.windows, 'create').mockResolvedValue(fakeWindow());

    await fakeBrowser.runtime.onStartup.trigger();

    expect(create.mock.calls.map((call) => call[0]?.tabId)).toEqual([1, 2]);
  });
});
