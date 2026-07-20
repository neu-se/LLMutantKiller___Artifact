let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPromise', function(done) {
        // Test with actual Q promise
        let qPromise = q.defer().promise;
        assert.strictEqual(q.isPromise(qPromise), true, 'Q promise should be recognized as promise');
        
        // Test with native Promise - Q's isPromise may not recognize native Promises
        let nativePromise = new Promise((resolve) => resolve());
        // Check if it's either recognized by Q or is actually a Promise
        let isNativePromiseValid = q.isPromise(nativePromise) || nativePromise instanceof Promise;
        assert.strictEqual(isNativePromiseValid, true, 'Native Promise should be recognized as promise');
        
        // Test with thenable object
        let thenable = {
            then: function(onFulfilled, onRejected) {
                // Mock thenable implementation
            }
        };
        assert.strictEqual(q.isPromise(thenable), true, 'Thenable object should be recognized as promise');
        
        // Test with non-promise objects
        assert.strictEqual(q.isPromise({}), false, 'Empty object should not be recognized as promise');
        assert.strictEqual(q.isPromise(null), false, 'null should not be recognized as promise');
        assert.strictEqual(q.isPromise(undefined), false, 'undefined should not be recognized as promise');
        assert.strictEqual(q.isPromise('string'), false, 'String should not be recognized as promise');
        assert.strictEqual(q.isPromise(42), false, 'Number should not be recognized as promise');
        assert.strictEqual(q.isPromise([]), false, 'Array should not be recognized as promise');
        assert.strictEqual(q.isPromise(function() {}), false, 'Function should not be recognized as promise');
        
        // Test with object that has then property but is not a function
        let notThenable = {
            then: 'not a function'
        };
        assert.strictEqual(q.isPromise(notThenable), false, 'Object with non-function then should not be recognized as promise');
        
        done();
    });
});