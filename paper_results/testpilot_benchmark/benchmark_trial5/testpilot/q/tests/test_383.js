let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPromiseAlike', function(done) {
        // Test with actual Q promise
        let qPromise = q.defer().promise;
        assert.strictEqual(q.isPromiseAlike(qPromise), true, 'Q promise should be promise-like');
        
        // Test with native Promise
        let nativePromise = new Promise(function(resolve) { resolve(); });
        assert.strictEqual(q.isPromiseAlike(nativePromise), true, 'Native promise should be promise-like');
        
        // Test with thenable object
        let thenable = { then: function() {} };
        assert.strictEqual(q.isPromiseAlike(thenable), true, 'Object with then method should be promise-like');
        
        // Test with null
        assert.strictEqual(q.isPromiseAlike(null), false, 'null should not be promise-like');
        
        // Test with undefined
        assert.strictEqual(q.isPromiseAlike(undefined), false, 'undefined should not be promise-like');
        
        // Test with primitive values
        assert.strictEqual(q.isPromiseAlike(42), false, 'number should not be promise-like');
        assert.strictEqual(q.isPromiseAlike('string'), false, 'string should not be promise-like');
        assert.strictEqual(q.isPromiseAlike(true), false, 'boolean should not be promise-like');
        
        // Test with object without then method
        let plainObject = { foo: 'bar' };
        assert.strictEqual(q.isPromiseAlike(plainObject), false, 'plain object should not be promise-like');
        
        // Test with object with then property that is not a function
        let objectWithThenProperty = { then: 'not a function' };
        assert.strictEqual(q.isPromiseAlike(objectWithThenProperty), false, 'object with non-function then should not be promise-like');
        
        // Test with array
        assert.strictEqual(q.isPromiseAlike([]), false, 'array should not be promise-like');
        
        // Test with function
        let func = function() {};
        assert.strictEqual(q.isPromiseAlike(func), false, 'function should not be promise-like');
        
        done();
    });
});