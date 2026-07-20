let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPending', function(done) {
        // Test 1: A pending promise should return true
        let pendingPromise = q.defer().promise;
        assert.strictEqual(q.isPending(pendingPromise), true, 'Pending promise should return true');

        // Test 2: A resolved promise should return false
        let resolvedPromise = q.resolve('test value');
        assert.strictEqual(q.isPending(resolvedPromise), false, 'Resolved promise should return false');

        // Test 3: A rejected promise should return false
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isPending(rejectedPromise), false, 'Rejected promise should return false');

        // Test 4: Non-promise objects should return false
        assert.strictEqual(q.isPending({}), false, 'Plain object should return false');
        assert.strictEqual(q.isPending('string'), false, 'String should return false');
        assert.strictEqual(q.isPending(42), false, 'Number should return false');
        assert.strictEqual(q.isPending(null), false, 'Null should return false');
        assert.strictEqual(q.isPending(undefined), false, 'Undefined should return false');

        // Test 5: Test with a promise that gets resolved
        let deferred = q.defer();
        assert.strictEqual(q.isPending(deferred.promise), true, 'Deferred promise should initially be pending');
        
        deferred.resolve('resolved');
        assert.strictEqual(q.isPending(deferred.promise), false, 'Deferred promise should not be pending after resolution');

        // Test 6: Test with a promise that gets rejected
        let deferredReject = q.defer();
        assert.strictEqual(q.isPending(deferredReject.promise), true, 'Deferred promise should initially be pending');
        
        deferredReject.reject(new Error('rejected'));
        assert.strictEqual(q.isPending(deferredReject.promise), false, 'Deferred promise should not be pending after rejection');

        done();
    });
});