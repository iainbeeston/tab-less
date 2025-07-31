/* eslint-env node, mocha */
(function () {
  'use strict';
  globalThis.chrome = require('sinon-chrome/extensions');
  var sinon = require('sinon');

  require('../app/scripts/close_windows_browser_action');

  describe('when the browser action is clicked', function() {
    afterEach(function() {
      chrome.windows.getAll.flush();
      chrome.windows.remove.flush();
    });

    it('closes every window', function() {
      chrome.windows.getAll.yields([{id: 1}, {id: 2}]);
      chrome.browserAction.onClicked.dispatch({});
      sinon.assert.calledWith(chrome.windows.remove, 1);
      sinon.assert.calledWith(chrome.windows.remove, 2);
    });

    it('does not close the window for the current tab', function() {
      chrome.windows.getAll.yields([{id: 3}]);
      chrome.browserAction.onClicked.dispatch({windowId: 3});
      sinon.assert.notCalled(chrome.windows.remove);
    });

    it('does not close minimised windows', function() {
      chrome.windows.getAll.yields([{id: 4, state: 'minimized'}]);
      chrome.browserAction.onClicked.dispatch({});
      sinon.assert.notCalled(chrome.windows.remove);
    });

    it('closes full screen windows', function() {
      chrome.windows.getAll.yields([{id: 5, state: 'fullscreen'}]);
      chrome.browserAction.onClicked.dispatch({});
      sinon.assert.calledWith(chrome.windows.remove, 5);
    });

    it('closes maximised windows', function() {
      chrome.windows.getAll.yields([{id: 6, state: 'maximized'}]);
      chrome.browserAction.onClicked.dispatch({});
      sinon.assert.calledWith(chrome.windows.remove, 6);
    });

    it('closes normal windows', function() {
      chrome.windows.getAll.yields([{id: 7, state: 'fullscreen'}]);
      chrome.browserAction.onClicked.dispatch({});
      sinon.assert.calledWith(chrome.windows.remove, 7);
    });
  });
})();
