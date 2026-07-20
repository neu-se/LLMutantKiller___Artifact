let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Test basic Delta operations
        delta.insert('Hello');
        delta.insert(' World', { bold: true });
        
        // Test that the delta has operations
        assert(delta.ops.length > 0);
        assert.strictEqual(delta.ops[0].insert, 'Hello');
        assert.strictEqual(delta.ops[1].insert, ' World');
        assert.deepStrictEqual(delta.ops[1].attributes, { bold: true });
        
        done();
    });
});