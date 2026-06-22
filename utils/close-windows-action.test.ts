import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import type { Browser } from '#imports';
import { registerCloseWindowsAction } from '@/utils/close-windows-action';

type FakeWindow = Browser.windows.Window;
type FakeTab = Browser.tabs.Tab;
type FakeBrowserWindow = Awaited<ReturnType<typeof fakeBrowser.windows.get>>;
type FakeBrowserTab = Awaited<ReturnType<typeof fakeBrowser.tabs.get>>;

const fakeTab = (properties: Partial<FakeTab> = {}): FakeBrowserTab =>
  properties as FakeBrowserTab;
const fakeWindow = (properties: Partial<FakeWindow> = {}): FakeBrowserWindow =>
  properties as FakeBrowserWindow;

describe('when the browser action is clicked', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    registerCloseWindowsAction();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('closes every other window', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow({ id: 1 }),
      fakeWindow({ id: 2 }),
    ]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(remove.mock.calls.flat()).toEqual([1, 2]);
  });

  it('does not close the window for the current tab', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow({ id: 3 })]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab({ windowId: 3 }), undefined);

    expect(remove).not.toHaveBeenCalled();
  });

  it('does not close minimised windows', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow({ id: 4, state: 'minimized' }),
    ]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(remove).not.toHaveBeenCalled();
  });

  it('closes full screen windows', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow({ id: 5, state: 'fullscreen' }),
    ]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(remove).toHaveBeenCalledWith(5);
  });

  it('closes maximised windows', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow({ id: 6, state: 'maximized' }),
    ]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(remove).toHaveBeenCalledWith(6);
  });

  it('only requests normal windows', async () => {
    const getAll = vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([]);
    vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(getAll).toHaveBeenCalledWith({ windowTypes: ['normal'] });
  });

  it('does not close a window without an id', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([fakeWindow()]);
    const remove = vi.spyOn(fakeBrowser.windows, 'remove').mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab({ windowId: 7 }), undefined);

    expect(remove).not.toHaveBeenCalled();
  });

  it('still closes the remaining windows when one removal fails', async () => {
    vi.spyOn(fakeBrowser.windows, 'getAll').mockResolvedValue([
      fakeWindow({ id: 1 }),
      fakeWindow({ id: 2 }),
    ]);
    const remove = vi
      .spyOn(fakeBrowser.windows, 'remove')
      .mockRejectedValueOnce(new Error('No window with id: 1.'))
      .mockResolvedValue(undefined);

    await fakeBrowser.action.onClicked.trigger(fakeTab(), undefined);

    expect(remove).toHaveBeenCalledWith(2);
  });
});
