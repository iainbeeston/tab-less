import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  imports: false,
  manifestVersion: 3,
  manifest: {
    name: '__MSG_appName__',
    description: '__MSG_appDescription__',
    default_locale: 'en',
    action: {
      default_title: '__MSG_browserActionTitle__',
    },
  },
  autoIcons: {
    baseIconPath: 'assets/icon.svg',
  },
});
