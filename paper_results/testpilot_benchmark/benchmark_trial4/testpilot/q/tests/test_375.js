let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test passByCopy chaining', function(done) {
        let promise = q.resolve(42);
        let passByCopyPromise = promise.passByCopy();
        
        // Chain another operation
        let chainedPromise = passByCopyPromise.then(function(value) {
            return value * 2;
        });
        
        chainedPromise.then(function(value) {
            assert.strictEqual(value, 84, 'Should allow normal promise chaining');
            done();
        }).catch(done);
    });
});