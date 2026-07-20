let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - empty iterator', function(done) {
        let delta = new quill_delta.Delta([]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Test next on empty iterator
        let op = iterator.next();
        assert.equal(op.retain, Infinity);
        
        done();
    });

    })