let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - with different operation types', function(done) {
        let delta = new quill_delta.Delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'text', attributes: { italic: true } }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Peek at retain operation
        let peeked1 = iterator.peek();
        assert.deepEqual(peeked1, { retain: 5 });
        
        // Advance and peek at delete operation
        iterator.next();
        let peeked2 = iterator.peek();
        assert.deepEqual(peeked2, { delete: 3 });
        
        // Advance and peek at insert operation with attributes
        iterator.next();
        let peeked3 = iterator.peek();
        assert.deepEqual(peeked3, { insert: 'text', attributes: { italic: true } });
        
        done();
    });
});