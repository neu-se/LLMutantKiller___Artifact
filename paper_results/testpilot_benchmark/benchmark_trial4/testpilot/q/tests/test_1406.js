let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isFulfilled', function(done) {
        // Test 1: Non-promise objects should return true
        assert.strictEqual(q.isFulfilled(42), true, 'Number should be considered fulfilled');
        assert.strictEqual(q.isFulfilled('hello'), true, 'String should be considered fulfilled');
        assert.strictEqual(q.isFulfilled({}), true, 'Object should be considered fulfilled');
        assert.strictEqual(q.isFulfilled(null), true, 'null should be considered fulfilled');
        assert.strictEqual(q.isFulfilled(undefined), true, 'undefined should be considered fulfilled');
        
        // Test 2: Fulfilled promise should return true
        let fulfilledPromise = q.resolve('success');
        assert.strictEqual(q.isFulfilled(fulfilledPromise), true, 'Fulfilled promise should return true');
        
        // Test 3: Rejected promise should return false
        let rejectedPromise = q.reject(new Error('failed'));
        assert.strictEqual(q.isFulfilled(rejectedPromise), false, 'Rejected promise should return false');
        
        // Test 4: Pending promise should return false
        let pendingPromise = q.defer().promise;
        assert.strictEqual(q.isFulfilled(pendingPromise), false, 'Pending promise should return false');
        
        // Test 5: Promise that becomes fulfilled
        let deferred = q.defer();
        let promise = deferred.promise;
        assert.strictEqual(q.isFulfilled(promise), false, 'Promise should initially be unfulfilled');
        
        deferred.resolve('resolved value');
        assert.strictEqual(q.isFulfilled(promise), true, 'Promise should be fulfilled after resolving');
        
        done();
    });
});