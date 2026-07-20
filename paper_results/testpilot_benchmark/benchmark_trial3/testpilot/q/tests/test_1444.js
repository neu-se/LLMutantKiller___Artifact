let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should not affect promise rejection handling', function(done) {
        q.stopUnhandledRejectionTracking();
        
        let promise = q.reject(new Error('test error'));
        promise.catch((error) => {
            assert.strictEqual(error.message, 'test error');
            done();
        });
    });
});