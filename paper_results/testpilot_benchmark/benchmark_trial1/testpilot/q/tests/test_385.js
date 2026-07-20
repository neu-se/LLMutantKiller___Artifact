let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPending', function(done) {
        // Test 1: A newly created deferred promise should be pending
        let deferred1 = q.defer();
        assert.strictEqual(q.isPending(deferred1.promise), true, 'Newly created promise should be pending');
        
        // Test 2: A resolved promise should not be pending
        let resolvedPromise = q.resolve('test value');
        assert.strictEqual(q.isPending(resolvedPromise), false, 'Resolved promise should not be pending');
        
        // Test 3: A rejected promise should not be pending
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isPending(rejectedPromise), false, 'Rejected promise should not be pending');
        
        // Test 4: A promise that gets resolved should no longer be pending
        let deferred2 = q.defer();
        assert.strictEqual(q.isPending(deferred2.promise), true, 'Promise should be pending before resolution');
        deferred2.resolve('resolved');
        assert.strictEqual(q.isPending(deferred2.promise), false, 'Promise should not be pending after resolution');
        
        // Test 5: A promise that gets rejected should no longer be pending
        let deferred3 = q.defer();
        assert.strictEqual(q.isPending(deferred3.promise), true, 'Promise should be pending before rejection');
        deferred3.reject(new Error('rejected'));
        assert.strictEqual(q.isPending(deferred3.promise), false, 'Promise should not be pending after rejection');
        
        // Test 6: Non-promise objects should return false
        assert.strictEqual(q.isPending({}), false, 'Plain object should not be pending');
        assert.strictEqual(q.isPending(null), false, 'null should not be pending');
        assert.strictEqual(q.isPending(undefined), false, 'undefined should not be pending');
        assert.strictEqual(q.isPending('string'), false, 'string should not be pending');
        assert.strictEqual(q.isPending(42), false, 'number should not be pending');
        
        done();
    });
});