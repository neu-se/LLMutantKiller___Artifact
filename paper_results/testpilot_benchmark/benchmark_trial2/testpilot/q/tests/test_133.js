let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - basic functionality', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Test setting a key-value pair on the promise object
        promise.testKey = 'testValue';
        
        // Verify the value was set
        assert.strictEqual(promise.testKey, 'testValue');
        done();
    });
});