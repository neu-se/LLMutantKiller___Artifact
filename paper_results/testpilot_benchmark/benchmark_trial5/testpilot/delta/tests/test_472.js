let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with sum operation', function(done) {
        // Create a delta with retain operations
        let delta = new quill_delta([
            { retain: 5 },
            { retain: 3 },
            { retain: 2 }
        ]);
        
        // Test reduce to sum all retain values
        let sum = delta.reduce((acc, op) => {
            return acc + (op.retain || 0);
        }, 0);
        
        assert.strictEqual(sum, 10);
        done();
    });
});