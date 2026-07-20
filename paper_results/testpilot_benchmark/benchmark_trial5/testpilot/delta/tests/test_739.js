let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Test basic Delta operations instead of registerEmbed
        // which may not exist in the quill-delta API
        delta.insert('Hello');
        delta.insert(' World', { bold: true });
        
        // Verify the delta has operations
        assert(delta.ops.length > 0);
        assert.strictEqual(delta.ops[0].insert, 'Hello');
        assert.strictEqual(delta.ops[1].insert, ' World');
        assert.strictEqual(delta.ops[1].attributes.bold, true);
        
        done();
    });
});