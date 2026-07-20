let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - method chaining', function(done) {
        let promise = q.makePromise();
        
        // Test method chaining
        let result = promise
            .set('chain1', 'value1')
            .set('chain2', 'value2')
            .set('chain3', 'value3');
        
        // Verify chaining returns the same promise
        assert.strictEqual(result, promise);
        
        done();
    });
});