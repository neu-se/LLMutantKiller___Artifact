let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy', function(done) {
        // Test 1: Basic functionality - should return the same promise instance
        let promise = q.makePromise();
        let result = promise.passByCopy();
        
        assert.strictEqual(result, promise, 'passByCopy should return the same promise instance');
        
        // Test 2: Method chaining - should allow chaining with other promise methods
        let chainedPromise = q.makePromise().passByCopy();
        assert(chainedPromise instanceof Object, 'chained result should be an object');
        assert.strictEqual(typeof chainedPromise.passByCopy, 'function', 'chained result should have passByCopy method');
        
        // Test 3: Multiple calls - should consistently return the same instance
        let promise2 = q.makePromise();
        let result1 = promise2.passByCopy();
        let result2 = promise2.passByCopy();
        
        assert.strictEqual(result1, promise2, 'first call should return same instance');
        assert.strictEqual(result2, promise2, 'second call should return same instance');
        assert.strictEqual(result1, result2, 'multiple calls should return same instance');
        
        done();
    });
    
    })