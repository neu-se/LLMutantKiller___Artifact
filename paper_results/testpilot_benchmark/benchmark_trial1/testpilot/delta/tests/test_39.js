let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test with insert operation
        let delta1 = new Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iter1 = new Delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekType(), 'insert', 'Should return insert type for insert operation');
        
        // Test with retain operation
        let delta2 = new Delta([
            { retain: 5 },
            { insert: 'text' }
        ]);
        let iter2 = new Delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekType(), 'retain', 'Should return retain type for retain operation');
        
        // Test with delete operation
        let delta3 = new Delta([
            { delete: 3 },
            { insert: 'new' }
        ]);
        let iter3 = new Delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekType(), 'delete', 'Should return delete type for delete operation');
        
        // Test with empty operations array
        let iter4 = new Delta.OpIterator([]);
        assert.strictEqual(iter4.peekType(), 'retain', 'Should return retain type for empty operations');
        
        // Test after consuming operations
        let delta5 = new Delta([
            { insert: 'first' },
            { retain: 2 }
        ]);
        let iter5 = new Delta.OpIterator(delta5.ops);
        assert.strictEqual(iter5.peekType(), 'insert', 'Should return insert type initially');
        iter5.next(); // consume first operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type after consuming insert');
        iter5.next(); // consume second operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type when no more operations');
        
        done();
    });
});