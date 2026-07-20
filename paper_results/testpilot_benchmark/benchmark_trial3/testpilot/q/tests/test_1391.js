let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPromiseAlike', function(done) {
        // Test with actual Q promise
        let qPromise = q.defer().promise;
        assert.strictEqual(q.isPromiseAlike(qPromise), true, 'Q promise should be promise-like');
        
        // Test with native Promise
        let nativePromise = new Promise((resolve) => resolve());
        assert.strictEqual(q.isPromiseAlike(nativePromise), true, 'Native Promise should be promise-like');
        
        // Test with thenable object
        let thenable = {
            then: function(onFulfilled, onRejected) {
                // Mock thenable implementation
            }
        };
        assert.strictEqual(q.isPromiseAlike(thenable), true, 'Object with then method should be promise-like');
        
        // Test with non-thenable object
        let regularObject = { value: 42 };
        assert.strictEqual(q.isPromiseAlike(regularObject), false, 'Regular object should not be promise-like');
        
        // Test with object that has non-function then property
        let objectWithThenProperty = { then: 'not a function' };
        assert.strictEqual(q.isPromiseAlike(objectWithThenProperty), false, 'Object with non-function then should not be promise-like');
        
        // Test with null
        assert.strictEqual(q.isPromiseAlike(null), false, 'null should not be promise-like');
        
        // Test with undefined
        assert.strictEqual(q.isPromiseAlike(undefined), false, 'undefined should not be promise-like');
        
        // Test with primitive values
        assert.strictEqual(q.isPromiseAlike(42), false, 'number should not be promise-like');
        assert.strictEqual(q.isPromiseAlike('string'), false, 'string should not be promise-like');
        assert.strictEqual(q.isPromiseAlike(true), false, 'boolean should not be promise-like');
        
        // Test with function (but not thenable)
        let regularFunction = function() {};
        assert.strictEqual(q.isPromiseAlike(regularFunction), false, 'regular function should not be promise-like');
        
        done();
    });
});