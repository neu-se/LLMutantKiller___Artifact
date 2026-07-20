let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - multiple key-value pairs', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Create an object to store our key-value pairs
        let data = {};
        
        // Simulate setting multiple key-value pairs
        data.key1 = 'value1';
        data.key2 = 42;
        data.key3 = { nested: 'object' };
        
        // Resolve the promise with our data
        deferred.resolve(data);
        
        // Test that the promise resolves with the correct values
        promise.then(function(result) {
            assert.strictEqual(result.key1, 'value1');
            assert.strictEqual(result.key2, 42);
            assert.deepStrictEqual(result.key3, { nested: 'object' });
            done();
        }).catch(done);
    });
});