let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - with different operation types', function(done) {
        let delta = new Delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'text', attributes: { italic: true } }
        ]);
        
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Peek at retain operation
        let peeked1 = iterator.peek();
        assert.deepEqual(peeked1, { retain: 5 });
        
        // Move to delete operation
        iterator.next();
        let peeked2 = iterator.peek();
        assert.deepEqual(peeked2, { delete: 3 });
        
        // Move to insert operation
        iterator.next();
        let peeked3 = iterator.peek();
        assert.deepEqual(peeked3, { insert: 'text', attributes: { italic: true } });
        
        done();
    });
});