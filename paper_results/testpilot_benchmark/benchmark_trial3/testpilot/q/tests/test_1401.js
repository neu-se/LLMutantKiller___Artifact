let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isRejected', function(done) {
        // Test 1: isRejected should return true for a rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isRejected(rejectedPromise), true);
        
        // Test 2: isRejected should return false for a fulfilled promise
        let fulfilledPromise = q.resolve('success');
        assert.strictEqual(q.isRejected(fulfilledPromise), false);
        
        // Test 3: isRejected should return false for a pending promise
        let pendingPromise = q.defer().promise;
        assert.strictEqual(q.isRejected(pendingPromise), false);
        
        // Test 4: isRejected should return false for non-promise objects
        assert.strictEqual(q.isRejected({}), false);
        assert.strictEqual(q.isRejected(null), false);
        assert.strictEqual(q.isRejected(undefined), false);
        assert.strictEqual(q.isRejected('string'), false);
        assert.strictEqual(q.isRejected(42), false);
        assert.strictEqual(q.isRejected([]), false);
        
        // Test 5: isRejected should return false for native Promise objects
        let nativePromise = Promise.resolve('test');
        assert.strictEqual(q.isRejected(nativePromise), false);
        
        done();
    });
});