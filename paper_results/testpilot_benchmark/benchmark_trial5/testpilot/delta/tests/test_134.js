let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - at end of operations', function(done) {
        let delta = new quill_delta.Delta([
            { insert: 'Only one' }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Consume the only operation
        iterator.next();
        
        // Peek should return undefined/null when at end
        let peeked = iterator.peek();
        assert.ok(peeked === undefined || peeked === null);
        
        done();
    });
});