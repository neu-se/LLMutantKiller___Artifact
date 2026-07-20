let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - empty iterator', function(done) {
        let delta = new Delta([]);
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Test next on empty iterator
        let op = iterator.next();
        assert.equal(op.retain, Infinity);
        
        done();
    });
});