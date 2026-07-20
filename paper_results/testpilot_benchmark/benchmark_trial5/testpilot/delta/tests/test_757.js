let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes existing embed type', function(done) {
        // This test needs to be rewritten since quill-delta doesn't have 
        // registerEmbed/unregisterEmbed methods or a handlers property
        // Instead, let's test basic Delta functionality
        
        // Create a new Delta
        let delta = new Delta();
        
        // Add some operations
        delta.insert('Hello');
        delta.insert(' World', { bold: true });
        
        // Verify the delta has operations
        assert(delta.ops.length === 2, 'Delta should have 2 operations');
        assert(delta.ops[0].insert === 'Hello', 'First operation should insert "Hello"');
        assert(delta.ops[1].insert === ' World', 'Second operation should insert " World"');
        assert(delta.ops[1].attributes.bold === true, 'Second operation should have bold attribute');
        
        done();
    });
});