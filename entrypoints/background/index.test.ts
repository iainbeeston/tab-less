import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import background from '@/entrypoints/background';

describe('the background entrypoint', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('wires the close-windows action to the browser action click', () => {
    const addListener = vi.spyOn(fakeBrowser.action.onClicked, 'addListener');

    background.main?.();

    expect(addListener).toHaveBeenCalled();
  });

  it('wires the detach feature to newly created tabs', () => {
    const addListener = vi.spyOn(fakeBrowser.tabs.onCreated, 'addListener');

    background.main?.();

    expect(addListener).toHaveBeenCalled();
  });

  it('wires the window-count badge to newly created windows', () => {
    const addListener = vi.spyOn(fakeBrowser.windows.onCreated, 'addListener');

    background.main?.();

    expect(addListener).toHaveBeenCalled();
  });
});
