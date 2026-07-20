let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy with resolved promise', function(done) {
        // Create a resolved promise
        let resolvedPromise = q.resolve(42);
        
        // Test that passByCopy works on resolved promises
        let result = resolvedPromise.passByCopy();
        assert.strictEqual(result, resolvedPromise, 'passByCopy should work on resolved promises');
        done();
    });
});