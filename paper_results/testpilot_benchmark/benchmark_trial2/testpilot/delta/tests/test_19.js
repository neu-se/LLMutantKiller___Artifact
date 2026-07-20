let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - length larger than operation', function(done) {
        let delta = new Delta([
            { insert: 'Hi' },
            { insert: 'There' }
        ]);
        
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Request more characters than available in first operation
        let op1 = iterator.next(5);
        assert.equal(op1.insert, 'Hi');
        
        // Should move to next operation
        let op2 = iterator.next();
        assert.equal(op2.insert, 'There');
        
        done();
    });
});