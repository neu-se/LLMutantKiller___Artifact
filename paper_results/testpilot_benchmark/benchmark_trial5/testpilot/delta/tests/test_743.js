let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality', function(done) {
        // Test basic Delta creation and operations
        const delta = new Delta()
            .insert('Hello ')
            .insert('World', { bold: true })
            .insert('\n');
        
        // Verify the delta was created successfully
        assert.ok(delta, 'Delta created successfully');
        assert.equal(delta.ops.length, 3, 'Delta has correct number of operations');
        assert.equal(delta.ops[0].insert, 'Hello ', 'First operation is correct');
        assert.equal(delta.ops[1].insert, 'World', 'Second operation is correct');
        assert.deepEqual(delta.ops[1].attributes, { bold: true }, 'Second operation has correct attributes');
        
        done();
    });
});