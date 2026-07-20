let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPromise', function(done) {
        // Test with actual Promise
        let promise1 = new Promise((resolve) => resolve('test'));
        assert.strictEqual(q.isPromise(promise1), true, 'Should return true for native Promise');
        
        // Test with Q promise
        let qPromise = q.defer().promise;
        assert.strictEqual(q.isPromise(qPromise), true, 'Should return true for Q promise');
        
        // Test with resolved Q promise
        let resolvedPromise = q.resolve('value');
        assert.strictEqual(q.isPromise(resolvedPromise), true, 'Should return true for resolved Q promise');
        
        // Test with rejected Q promise
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isPromise(rejectedPromise), true, 'Should return true for rejected Q promise');
        
        // Test with non-promise objects
        assert.strictEqual(q.isPromise({}), false, 'Should return false for plain object');
        assert.strictEqual(q.isPromise([]), false, 'Should return false for array');
        assert.strictEqual(q.isPromise('string'), false, 'Should return false for string');
        assert.strictEqual(q.isPromise(42), false, 'Should return false for number');
        assert.strictEqual(q.isPromise(null), false, 'Should return false for null');
        assert.strictEqual(q.isPromise(undefined), false, 'Should return false for undefined');
        assert.strictEqual(q.isPromise(function() {}), false, 'Should return false for function');
        
        // Test with promise-like object (thenable)
        let thenable = {
            then: function(onResolve, onReject) {
                onResolve('fake promise');
            }
        };
        assert.strictEqual(q.isPromise(thenable), false, 'Should return false for thenable object that is not a Promise instance');
        
        done();
    });
});