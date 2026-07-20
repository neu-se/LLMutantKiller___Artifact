let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - apply method calls function with context', function(done) {
        let testFunc = function(a, b) {
            return this.multiplier * (a + b);
        };
        let context = { multiplier: 2 };
        
        // Create a promise that resolves to the function result
        let result = testFunc.apply(context, [3, 4]);
        let promise = q.fulfill(result);
        
        promise.then(function(value) {
            assert.strictEqual(value, 14);
            done();
        }).catch(done);
    });
});