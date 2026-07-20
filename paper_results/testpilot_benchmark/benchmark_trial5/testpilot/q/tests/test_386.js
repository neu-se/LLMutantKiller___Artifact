let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isFulfilled', function(done) {
        // Test 1: isFulfilled should return true for a fulfilled promise
        let fulfilledPromise = q.resolve('success');
        assert.strictEqual(q.isFulfilled(fulfilledPromise), true);
        
        // Test 2: isFulfilled should return false for a pending promise
        let pendingPromise = q.defer().promise;
        assert.strictEqual(q.isFulfilled(pendingPromise), false);
        
        // Test 3: isFulfilled should return false for a rejected promise
        let rejectedPromise = q.reject(new Error('failure'));
        assert.strictEqual(q.isFulfilled(rejectedPromise), false);
        
        // Test 4: isFulfilled should return false for non-promise objects
        assert.strictEqual(q.isFulfilled({}), false);
        assert.strictEqual(q.isFulfilled('string'), false);
        assert.strictEqual(q.isFulfilled(42), false);
        assert.strictEqual(q.isFulfilled(null), false);
        assert.strictEqual(q.isFulfilled(undefined), false);
        
        // Test 5: isFulfilled should work with promises that resolve asynchronously
        let deferred = q.defer();
        assert.strictEqual(q.isFulfilled(deferred.promise), false);
        
        deferred.resolve('async success');
        
        // Use setTimeout to ensure the promise has time to resolve
        setTimeout(function() {
            assert.strictEqual(q.isFulfilled(deferred.promise), true);
            done();
        }, 10);
    });
});