let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - basic functionality', function(done) {
        // Create a delta with some operations
        let delta = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' ', attributes: { bold: true } },
            { insert: 'World' }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Test getting next operation with specific length
        let op1 = iterator.next(3);
        assert.equal(op1.insert, 'Hel');
        
        let op2 = iterator.next(2);
        assert.equal(op2.insert, 'lo');
        
        let op3 = iterator.next(1);
        assert.equal(op3.insert, ' ');
        assert.deepEqual(op3.attributes, { bold: true });
        
        done();
    });
});