let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer consistency', function(done) {
        // Test that calling the same function with the same input returns consistent results
        let value = 42;
        let result1 = q.nearer(value);
        let result2 = q.nearer(value);
        assert.strictEqual(result1, result2, 'Function should return consistent results for same input');
        done();
    });
});