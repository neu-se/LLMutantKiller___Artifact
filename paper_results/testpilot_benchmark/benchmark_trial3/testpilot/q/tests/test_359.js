let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should work when called multiple times', function(done) {
            let promise = q.resolve('test');
            let result1 = promise.passByCopy();
            let result2 = promise.passByCopy();
            
            assert.strictEqual(result1, promise, 'First call should return same instance');
            assert.strictEqual(result2, promise, 'Second call should return same instance');
            assert.strictEqual(result1, result2, 'Multiple calls should return same instance');
            done();
        });
    });
});