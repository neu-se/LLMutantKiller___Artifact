let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - retain and delete operations', function(done) {
        let delta = new Delta([
            { retain: 10 },
            { delete: 5 },
            { insert: 'New text' }
        ]);
        
        let iterator = new Delta.OpIterator(delta.ops);
        
        // Test partial retain
        let op1 = iterator.next(3);
        assert.equal(op1.retain, 3);
        
        // Test remaining retain
        let op2 = iterator.next(7);
        assert.equal(op2.retain, 7);
        
        // Test delete operation
        let op3 = iterator.next(2);
        assert.equal(op3.delete, 2);
        
        done();
    });
});