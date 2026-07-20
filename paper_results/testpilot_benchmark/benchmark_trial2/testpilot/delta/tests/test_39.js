let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test with retain operation
        let delta1 = new Delta([{ retain: 5 }]);
        let iter1 = new Delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekType(), 'retain');
        
        // Test with insert operation
        let delta2 = new Delta([{ insert: 'hello' }]);
        let iter2 = new Delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekType(), 'insert');
        
        // Test with delete operation
        let delta3 = new Delta([{ delete: 3 }]);
        let iter3 = new Delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekType(), 'delete');
        
        // Test with multiple operations - should return type of first operation
        let delta4 = new Delta([
            { insert: 'text' },
            { retain: 2 },
            { delete: 1 }
        ]);
        let iter4 = new Delta.OpIterator(delta4.ops);
        assert.strictEqual(iter4.peekType(), 'insert');
        
        // Test with empty operations array
        let delta5 = new Delta([]);
        let iter5 = new Delta.OpIterator(delta5.ops);
        assert.strictEqual(iter5.peekType(), 'retain');
        
        // Test that peekType doesn't advance the iterator
        let delta6 = new Delta([{ insert: 'test' }, { retain: 1 }]);
        let iter6 = new Delta.OpIterator(delta6.ops);
        assert.strictEqual(iter6.peekType(), 'insert');
        assert.strictEqual(iter6.peekType(), 'insert'); // Should still be 'insert'
        
        done();
    });
});