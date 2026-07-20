let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator constructor and basic functionality', function(done) {
        // Test with empty ops array
        let emptyIterator = new quill_delta.OpIterator([]);
        assert.strictEqual(emptyIterator.hasNext(), false);
        
        // Test with single operation
        let singleOp = [{ insert: 'Hello' }];
        let singleIterator = new quill_delta.OpIterator(singleOp);
        assert.strictEqual(singleIterator.hasNext(), true);
        
        done();
    });
});