let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with null and undefined values', function(done) {
        let promise = q.makePromise();
        
        // Test setting null and undefined values
        promise.set('nullKey', null);
        promise.set('undefinedKey', undefined);
        
        // Verify the values were set
        assert.strictEqual(promise.nullKey, null);
        assert.strictEqual(promise.undefinedKey, undefined);
        done();
    });

    })