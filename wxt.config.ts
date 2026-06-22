import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  imports: false,
  manifestVersion: 3,
  manifest: ({ browser }) => ({
    name: '__MSG_appName__',
    description: '__MSG_appDescription__',
    default_locale: 'en',
    action: {
      default_title: '__MSG_browserActionTitle__',
    },
    ...(browser === 'firefox' && process.env.FIREFOX_GECKO_ID
      ? { browser_specific_settings: { gecko: { id: process.env.FIREFOX_GECKO_ID } } }
      : {}),
  }),
  autoIcons: {
    baseIconPath: 'assets/icon.svg',
  },
});
