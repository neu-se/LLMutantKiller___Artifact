let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with multiple operations', function(done) {
        // Create a delta with multiple operations
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ', attributes: { bold: true } },
            { insert: 'World' },
            { delete: 5 }
        ]);
        
        let operations = [];
        let indices = [];
        
        // Test that forEach calls the predicate for each operation
        delta.forEach(function(op, index) {
            operations.push(op);
            indices.push(index);
        });
        
        // Verify all operations were processed
        assert.equal(operations.length, 4);
        assert.equal(indices.length, 4);
        
        // Verify the operations match what we inserted
        assert.deepEqual(operations[0], { insert: 'Hello' });
        assert.deepEqual(operations[1], { insert: ' ', attributes: { bold: true } });
        assert.deepEqual(operations[2], { insert: 'World' });
        assert.deepEqual(operations[3], { delete: 5 });
        
        // Verify indices are correct
        assert.deepEqual(indices, [0, 1, 2, 3]);
        
        done();
    });
});