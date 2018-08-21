/* eslint-env node, mocha */
(function () {
  'use strict';
  global.chrome = require('sinon-chrome/extensions');
  var sinon = require('sinon');

  require('../app/scripts/window_count_badge');

  afterEach(function() {
    chrome.windows.getAll.flush();
    chrome.browserAction.setBadgeText.flush();
  })

  describe('when a window is opened', function() {
    it('sets the badge text to 1 when there is one window', function() {
      chrome.windows.getAll.yields([{id: 1}]);
      chrome.windows.onCreated.dispatch({});
      sinon.assert.calledWithMatch(chrome.browserAction.setBadgeText, sinon.match.has('text', '1'));
    });

    it('sets the badge text to 3 when there are three windows', function() {
      chrome.windows.getAll.yields([{id: 1}, {id: 2}, {id: 3}]);
      chrome.windows.onCreated.dispatch({});
      sinon.assert.calledWithMatch(chrome.browserAction.setBadgeText, sinon.match.has('text', '3'));
    });

    it('sets the badge colour to a gray slightly lighter than the icon', function() {
      chrome.windows.getAll.yields([]);
      chrome.windows.onCreated.dispatch({});
      sinon.assert.calledWithMatch(chrome.browserAction.setBadgeBackgroundColor, sinon.match.has('color', '#717171'));
    });
  });

  describe('when a window is closed', function() {
    it('sets the badge text to the number of windows', function() {
      chrome.windows.getAll.yields([{id: 1}]);
      chrome.windows.onRemoved.dispatch({});
      sinon.assert.calledWithMatch(chrome.browserAction.setBadgeText, sinon.match.has('text', '1'));
    });
  });

  describe('when the extension is installed', function() {
    it('sets the badge text to the number of windows', function() {
      chrome.windows.getAll.yields([{id: 1}]);
      chrome.runtime.onInstalled.dispatch({});
      sinon.assert.calledWithMatch(chrome.browserAction.setBadgeText, sinon.match.has('text', '1'));
    });
  });
})();
