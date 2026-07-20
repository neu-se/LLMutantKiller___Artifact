let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - empty delta', function(done) {
        let delta = new Delta([]);
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Peek on empty iterator should return undefined or null
        let peeked = iterator.peek();
        assert(peeked === undefined || peeked === null);
        
        done();
    });
});