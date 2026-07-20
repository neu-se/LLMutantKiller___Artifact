let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with null and undefined values', function(done) {
        let promise = q.makePromise();
        
        // Test setting null and undefined values directly on the promise object
        promise.nullKey = null;
        promise.undefinedKey = undefined;
        
        assert.strictEqual(promise.nullKey, null);
        assert.strictEqual(promise.undefinedKey, undefined);
        done();
    });
});