let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - at end of operations', function(done) {
        let delta = new Delta([
            { insert: 'Only one' }
        ]);
        
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Advance past the only operation
        iterator.next();
        
        // Peek should return undefined/null when at end
        let peeked = iterator.peek();
        assert.ok(peeked === undefined || peeked === null);
        
        done();
    });
});