let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should return undefined', function(done) {
        let result = q.resetUnhandledRejections();
        assert.strictEqual(result, undefined, 'resetUnhandledRejections should return undefined');
        done();
    });
});