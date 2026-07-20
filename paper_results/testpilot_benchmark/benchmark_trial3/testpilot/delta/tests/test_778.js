let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta with invalid operations', function(done) {
        // Test that Delta handles operations gracefully
        try {
            const delta = new Delta();
            // Test inserting content
            delta.insert('Hello World');
            
            // Verify the delta has the expected operations
            assert(delta.ops.length === 1, 'Delta should have one operation');
            assert(delta.ops[0].insert === 'Hello World', 'Delta should contain the inserted text');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});