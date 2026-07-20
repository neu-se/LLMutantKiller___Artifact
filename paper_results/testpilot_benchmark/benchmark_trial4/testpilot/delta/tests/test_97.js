let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test hasNext method', function(done) {
        const ops = [{ insert: 'Hello' }];
        const iterator = new quill_delta.OpIterator(ops);
        
        assert.strictEqual(iterator.hasNext(), true);
        
        // Move to end
        iterator.next();
        assert.strictEqual(iterator.hasNext(), false);
        
        // Empty ops
        const emptyIterator = new quill_delta.OpIterator([]);
        assert.strictEqual(emptyIterator.hasNext(), false);
        done();
    });
});