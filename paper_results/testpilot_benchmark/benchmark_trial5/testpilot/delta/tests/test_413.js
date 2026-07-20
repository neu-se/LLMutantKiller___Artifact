let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach', function(done) {
        // Test 1: Basic forEach functionality
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ', attributes: { bold: true } },
            { insert: 'World' }
        ]);
        
        let operations = [];
        delta.forEach((op) => {
            operations.push(op);
        });
        
        assert.equal(operations.length, 3);
        assert.deepEqual(operations[0], { insert: 'Hello' });
        assert.deepEqual(operations[1], { insert: ' ', attributes: { bold: true } });
        assert.deepEqual(operations[2], { insert: 'World' });
        
        // Test 2: forEach with empty delta
        let emptyDelta = new quill_delta();
        let emptyOps = [];
        emptyDelta.forEach((op) => {
            emptyOps.push(op);
        });
        
        assert.equal(emptyOps.length, 0);
        
        // Test 3: forEach with different operation types
        let mixedDelta = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3, attributes: { italic: true } }
        ]);
        
        let mixedOps = [];
        mixedDelta.forEach((op) => {
            mixedOps.push(op);
        });
        
        assert.equal(mixedOps.length, 3);
        assert.deepEqual(mixedOps[0], { insert: 'Hello' });
        assert.deepEqual(mixedOps[1], { delete: 5 });
        assert.deepEqual(mixedOps[2], { retain: 3, attributes: { italic: true } });
        
        // Test 4: forEach with index parameter
        let indexDelta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        
        let indices = [];
        indexDelta.forEach((op, index) => {
            indices.push(index);
        });
        
        assert.deepEqual(indices, [0, 1, 2]);
        
        done();
    });
});