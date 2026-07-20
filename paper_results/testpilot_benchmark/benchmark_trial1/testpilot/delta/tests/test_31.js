let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - after next()', function(done) {
        let delta = new Delta([
            { insert: 'First' },
            { insert: 'Second' },
            { insert: 'Third' }
        ]);
        
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Advance to next operation
        iterator.next();
        
        // Peek should now return the second operation
        let peeked = iterator.peek();
        assert.deepEqual(peeked, { insert: 'Second' });
        
        done();
    });
});