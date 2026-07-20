let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test with insert operation
        let delta1 = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekType(), 'insert', 'Should return insert type for insert operation');
        
        // Test with retain operation
        let delta2 = new quill_delta.Delta([
            { retain: 5 },
            { insert: 'text' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekType(), 'retain', 'Should return retain type for retain operation');
        
        // Test with delete operation
        let delta3 = new quill_delta.Delta([
            { delete: 3 },
            { insert: 'new text' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekType(), 'delete', 'Should return delete type for delete operation');
        
        // Test with empty operations
        let delta4 = new quill_delta.Delta([]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        assert.strictEqual(iter4.peekType(), 'retain', 'Should return retain type for empty operations');
        
        // Test after consuming operations
        let delta5 = new quill_delta.Delta([
            { insert: 'first' },
            { retain: 2 },
            { delete: 1 }
        ]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        iter5.next(); // consume first operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type for second operation');
        iter5.next(); // consume second operation
        assert.strictEqual(iter5.peekType(), 'delete', 'Should return delete type for third operation');
        iter5.next(); // consume third operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type when no more operations');
        
        done();
    });
});