let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator peek() method', function() {
        let ops = [
            { insert: 'Test' },
            { retain: 5 },
            { delete: 3 }
        ];
        let iterator = new quill_delta.OpIterator(ops);
        
        // Peek should return the next operation without advancing
        let peeked = iterator.peek();
        assert.deepStrictEqual(peeked, { insert: 'Test' });
        
        // hasNext should still be true
        assert.strictEqual(iterator.hasNext(), true);
        
        // next() should return the same operation
        let next = iterator.next();
        assert.deepStrictEqual(next, { insert: 'Test' });
    });
});