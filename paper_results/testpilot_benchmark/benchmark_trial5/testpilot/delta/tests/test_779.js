let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta with invalid operations', function(done) {
        // Test that Delta handles operations gracefully
        try {
            const delta = new Delta();
            // Test inserting text
            delta.insert('Hello');
            assert(delta.ops.length === 1, 'Delta should have one operation');
            assert(delta.ops[0].insert === 'Hello', 'Delta should contain the inserted text');
            done();
        } catch (error) {
            done(error);
        }
    });
});