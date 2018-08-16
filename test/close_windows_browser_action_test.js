/* eslint-env node, mocha */
(function () {
  'use strict';
  global.chrome = require('sinon-chrome/extensions');
  var sinon = require('sinon');

  require('../app/scripts/close_windows_browser_action');

  afterEach(function() {
    chrome.windows.getAll.flush();
    chrome.windows.remove.flush();
  })

  describe('when the browser action is clicked', function() {
    it('closes every window', function() {
      chrome.windows.getAll.yields([{id: 1}, {id: 2}])
      chrome.browserAction.onClicked.dispatch({})
      sinon.assert.calledWith(chrome.windows.remove, 1)
      sinon.assert.calledWith(chrome.windows.remove, 2)
    });

    it('does not close the window for the current tab', function() {
      chrome.windows.getAll.yields([{id: 3}])
      chrome.browserAction.onClicked.dispatch({windowId: 3})
      sinon.assert.notCalled(chrome.windows.remove)
    });
  });
})();
