let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality - should create and compose deltas', function(done) {
        // Create a new Delta instance
        let delta1 = new quill_delta([
            { insert: 'Hello ' },
            { insert: 'World', attributes: { bold: true } }
        ]);
        
        let delta2 = new quill_delta([
            { retain: 6 },
            { insert: 'Beautiful ' }
        ]);
        
        // Test that compose works correctly
        const composed = delta1.compose(delta2);
        
        // Verify the result
        assert(composed instanceof quill_delta);
        assert.strictEqual(composed.ops.length, 3);
        assert.strictEqual(composed.ops[0].insert, 'Hello ');
        assert.strictEqual(composed.ops[1].insert, 'Beautiful ');
        assert.strictEqual(composed.ops[2].insert, 'World');
        
        done();
    });
});