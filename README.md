Tab-less
========

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/iainbeeston/tab-less/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/iainbeeston/tab-less/tree/main)
[![Mozilla Add-on](https://img.shields.io/amo/v/tab-less-addon.svg)](https://addons.mozilla.org/addon/tab-less-addon/)
[![Mozilla Add-on](https://img.shields.io/amo/stars/tab-less-addon.svg)](https://addons.mozilla.org/addon/tab-less-addon/)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mdndkociaebjkggmhnemegoegnbfbgoo.svg)](https://chrome.google.com/webstore/detail/tab-less/mdndkociaebjkggmhnemegoegnbfbgoo)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/mdndkociaebjkggmhnemegoegnbfbgoo.svg)](https://chrome.google.com/webstore/detail/tab-less/mdndkociaebjkggmhnemegoegnbfbgoo)

This extension disables tabbed browsing. Rather than opening new tabs, your browser will open windows wherever possible.

FAQs
----

* Why would you want to disable tabs?

Because I always find it difficult to find the tab I'm looking for. Tabs obscure the browsing experience, and I find it far easier to browse the web when I can see all of my windows at once. Most modern operating systems can arrange windows elegantly and efficiently, making tabs defunct.

* If you don't like tabs, then just don't use them! You don't need an extension for that

Increasingly, browsers force tabs on you by default. It does not provide an option to default to using windows rather than tabs. This extension overrides that behaviour to open windows instead, to make it seamless for users like myself.

* Why should I use Tab-less rather than New Tab, New Window?

1. Tab-less does not require any access to your browsing history at all (most extensions require access to your browsing history or the current page you're viewing).
2. It's designed to be as light-weight and simplistic as possible.
3. There's no magic, it just moves tabs to a new window, whenever they're opened (using the default settings for a new window).

Development
-----------

This is a [WXT](https://wxt.dev) browser extension written in TypeScript. After cloning, run `npm install`, then use:

* `npm run dev` — launch the extension in Chrome with hot reloading (`npm run dev:firefox` for Firefox)
* `npm test` — run the unit tests with Vitest
* `npm run lint` — lint with ESLint
* `npm run compile` — type-check with TypeScript
* `npm run build` — build the production extension into `.output/`
* `npm run zip` — package the build as a zip for store submission
* `npm run analyze` — build and open a bundle-size visualisation
* `npm run clean` — remove WXT's generated files and caches
* `npm run promo` — regenerate the Chrome Web Store promo tiles from `assets/promo_tile.svg`

> **macOS note:** if you have libvips installed globally (e.g. via Homebrew `vips`), install with `SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install` so `sharp` uses its prebuilt binary instead of trying — and failing — to build from source.

### Building for other browsers

WXT builds the same codebase for multiple browsers:

* `npm run build:firefox` / `npm run zip:firefox` — Firefox
* `npm run build:edge` / `npm run zip:edge` — Microsoft Edge
* `npm run build:safari` — Safari. This produces a web-extension build in `.output/safari-mv3/`; turning it into a distributable Safari app extension still requires Apple's tooling on macOS — `xcrun safari-web-extension-converter .output/safari-mv3` (which opens an Xcode project) followed by signing with an Apple Developer account.

### Publishing

WXT can upload and submit new versions to the Chrome Web Store, Firefox Add-ons, and Edge Add-ons:

1. `npm run submit:init` — one-time interactive setup that writes store API credentials to `.env.submit` (git-ignored).
2. `npm run submit` — builds fresh zips for all three stores and submits them for review in a single command. Extra flags are forwarded to WXT, e.g. `npm run submit -- --dry-run` checks authentication without uploading, and `npm run submit -- --chrome-skip-submit-review` uploads without submitting.

Contributing
------------

All of the code for this extension is open-sourced and can be found online at https://github.com/iainbeeston/tab-less. I'd be happy to receive any feedback, hear about any bugs or accept any pull-requests for new code at that address.
