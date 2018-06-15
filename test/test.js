/* eslint-env node, mocha */

(function () {
  'use strict';

  var assert = require('chai').assert

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        assert(true)
      });
    });
  });
})();
