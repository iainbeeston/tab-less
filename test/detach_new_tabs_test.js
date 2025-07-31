/* eslint-env node, mocha */
(function () {
  'use strict';
  globalThis.chrome = require('sinon-chrome/extensions');
  var sinon = require('sinon');

  require('../app/scripts/detach_new_tabs');

  describe('when a new tab is created', function() {
    afterEach(function() {
      chrome.windows.get.flush();
      chrome.windows.create.flush();
    });

    it('moves the tab to a new window', function() {
      chrome.windows.get.yields({});
      chrome.tabs.onCreated.dispatch({id: 12_345});
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('tabId', 12_345));
    });

    it('does nothing if the tab is the first tab in that window', function() {
      chrome.tabs.onCreated.dispatch({index: 0});
      sinon.assert.notCalled(chrome.windows.get);
      sinon.assert.notCalled(chrome.windows.create);
    });

    it('does nothing if the tab is pinned', function() {
      chrome.tabs.onCreated.dispatch({pinned: true});
      sinon.assert.notCalled(chrome.windows.get);
      sinon.assert.notCalled(chrome.windows.create);
    });

    it('reuses the incognito status from the original tab', function() {
      chrome.windows.get.yields({});
      chrome.tabs.onCreated.dispatch({incognito: true});
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('incognito', true));
    });

    it('gets the state from the original window and sets it on the new window', function() {
      chrome.windows.get.withArgs(12_345).yields({state: 'minimized'});
      chrome.tabs.onCreated.dispatch({windowId: 12_345});
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('state', 'minimized'));
    });
  });

  describe('when the extension is installed', function() {
    it('queries all tabs and moves them to a new window', function() {
      chrome.tabs.query.yields([{ id: 1 }, { id: 2 }]);
      chrome.windows.get.yields({});
      chrome.runtime.onInstalled.dispatch();
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('tabId', 1));
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('tabId', 2));
    });
  });

  describe('when the browser is started', function() {
    it('queries all tabs and moves them to a new window', function() {
      chrome.tabs.query.yields([{ id: 1 }, { id: 2 }]);
      chrome.windows.get.yields({});
      chrome.runtime.onStartup.dispatch();
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('tabId', 1));
      sinon.assert.calledWithMatch(chrome.windows.create, sinon.match.has('tabId', 2));
    });
  });
})();
