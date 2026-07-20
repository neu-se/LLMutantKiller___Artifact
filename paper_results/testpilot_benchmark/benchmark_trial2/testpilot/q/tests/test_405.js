let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isRejected', function(done) {
        // Test 1: Should return true for a rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isRejected(rejectedPromise), true);
        
        // Test 2: Should return false for a fulfilled promise
        let fulfilledPromise = q.resolve('success');
        assert.strictEqual(q.isRejected(fulfilledPromise), false);
        
        // Test 3: Should return false for a pending promise
        let pendingPromise = q.defer().promise;
        assert.strictEqual(q.isRejected(pendingPromise), false);
        
        // Test 4: Should return false for non-promise objects
        assert.strictEqual(q.isRejected({}), false);
        assert.strictEqual(q.isRejected(null), false);
        assert.strictEqual(q.isRejected(undefined), false);
        assert.strictEqual(q.isRejected('string'), false);
        assert.strictEqual(q.isRejected(42), false);
        assert.strictEqual(q.isRejected([]), false);
        
        // Test 5: Should return false for native Promise objects (they don't have inspect method)
        let nativePromise = Promise.resolve('test');
        assert.strictEqual(q.isRejected(nativePromise), false);
        
        // Test 6: Should return false for objects that look like promises but aren't Q promises
        let fakePromise = {
            then: function() {},
            inspect: function() { return { state: 'rejected' }; }
        };
        assert.strictEqual(q.isRejected(fakePromise), false);
        
        done();
    });
});