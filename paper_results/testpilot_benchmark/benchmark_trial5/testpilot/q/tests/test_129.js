let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - method chaining', function(done) {
        let promise = q.makePromise();
        
        // Test method chaining by calling set methods individually
        // and checking that each returns the same promise
        let result1 = promise.set('chain1', 'value1');
        let result2 = result1.set('chain2', 'value2');
        let result3 = result2.set('chain3', 'value3');
        
        // Verify each step returns the same promise
        assert.strictEqual(result1, promise);
        assert.strictEqual(result2, promise);
        assert.strictEqual(result3, promise);
        
        done();
    });
});