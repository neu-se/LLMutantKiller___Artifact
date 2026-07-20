let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta - basic functionality test', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Test basic Delta functionality instead of non-existent getHandler method
        // Add some operations to the delta
        delta.insert('Hello');
        delta.insert(' World', { bold: true });
        
        // Verify the delta has operations
        assert(delta.ops.length > 0, 'Delta should have operations');
        assert.equal(delta.ops[0].insert, 'Hello', 'First operation should insert "Hello"');
        assert.equal(delta.ops[1].insert, ' World', 'Second operation should insert " World"');
        assert.equal(delta.ops[1].attributes.bold, true, 'Second operation should have bold attribute');
        
        done();
    });
});