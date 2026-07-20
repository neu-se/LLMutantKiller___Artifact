let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending', function(done) {
        // Test 1: A newly created deferred promise should be pending
        let deferred1 = q.defer();
        assert.strictEqual(deferred1.promise.isPending(), true, 'New deferred promise should be pending');
        
        // Test 2: A resolved promise should not be pending
        let deferred2 = q.defer();
        deferred2.resolve('test value');
        assert.strictEqual(deferred2.promise.isPending(), false, 'Resolved promise should not be pending');
        
        // Test 3: A rejected promise should not be pending
        let deferred3 = q.defer();
        deferred3.reject(new Error('test error'));
        assert.strictEqual(deferred3.promise.isPending(), false, 'Rejected promise should not be pending');
        
        // Test 4: A promise created with q.resolve should not be pending
        let resolvedPromise = q.resolve('immediate value');
        assert.strictEqual(resolvedPromise.isPending(), false, 'q.resolve promise should not be pending');
        
        // Test 5: A promise created with q.reject should not be pending
        let rejectedPromise = q.reject(new Error('immediate error'));
        assert.strictEqual(rejectedPromise.isPending(), false, 'q.reject promise should not be pending');
        
        // Test 6: Test state transition from pending to resolved
        let deferred4 = q.defer();
        assert.strictEqual(deferred4.promise.isPending(), true, 'Promise should be pending before resolution');
        deferred4.resolve('resolved');
        assert.strictEqual(deferred4.promise.isPending(), false, 'Promise should not be pending after resolution');
        
        // Test 7: Test state transition from pending to rejected
        let deferred5 = q.defer();
        assert.strictEqual(deferred5.promise.isPending(), true, 'Promise should be pending before rejection');
        deferred5.reject(new Error('rejected'));
        assert.strictEqual(deferred5.promise.isPending(), false, 'Promise should not be pending after rejection');
        
        done();
    });
});