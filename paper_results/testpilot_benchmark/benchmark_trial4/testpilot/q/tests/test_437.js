let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString returns correct string', function(done) {
        // Create a promise using q.makePromise
        let promise = q.makePromise();
        
        // Test that toString() returns the expected string
        let result = promise.toString();
        assert.strictEqual(result, "[object Promise]");
        done();
    });
});