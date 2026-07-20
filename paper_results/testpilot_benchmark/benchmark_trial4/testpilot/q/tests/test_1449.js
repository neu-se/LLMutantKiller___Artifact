let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should return undefined', function(done) {
        let result = q.stopUnhandledRejectionTracking();
        assert.strictEqual(result, undefined);
        done();
    });

    })