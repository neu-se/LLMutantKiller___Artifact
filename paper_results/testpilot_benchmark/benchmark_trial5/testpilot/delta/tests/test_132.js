let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek', function(done) {
        // Test 1: peek() returns the current operation without advancing
        let ops = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ];
        let iterator = new quill_delta.OpIterator(ops);
        
        // Should return first operation
        let peeked = iterator.peek();
        assert.deepEqual(peeked, { insert: 'Hello' });
        
        // Peek again - should return same operation
        let peekedAgain = iterator.peek();
        assert.deepEqual(peekedAgain, { insert: 'Hello' });
        
        // Test 2: peek() after advancing iterator
        iterator.next(); // advance to second operation
        let secondPeek = iterator.peek();
        assert.deepEqual(secondPeek, { insert: ' ' });
        
        // Test 3: peek() at end of operations
        iterator.next(); // advance to third operation
        iterator.next(); // advance past last operation
        let endPeek = iterator.peek();
        assert.equal(endPeek, undefined);
        
        // Test 4: peek() with empty operations array
        let emptyIterator = new quill_delta.OpIterator([]);
        let emptyPeek = emptyIterator.peek();
        assert.equal(emptyPeek, undefined);
        
        // Test 5: peek() with single operation
        let singleOpIterator = new quill_delta.OpIterator([{ insert: 'Single' }]);
        let singlePeek = singleOpIterator.peek();
        assert.deepEqual(singlePeek, { insert: 'Single' });
        
        done();
    });
});