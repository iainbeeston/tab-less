import { defineBackground } from '#imports';
import { registerCloseWindowsAction } from '@/utils/close-windows-action';
import { registerDetachNewTabs } from '@/utils/detach-new-tabs';
import { registerWindowCountBadge } from '@/utils/window-count-badge';

export default defineBackground(() => {
  registerCloseWindowsAction();
  registerDetachNewTabs();
  registerWindowCountBadge();
});
