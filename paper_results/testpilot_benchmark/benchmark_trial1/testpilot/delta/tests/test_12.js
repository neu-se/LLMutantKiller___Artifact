let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next - without length parameter', function(done) {
        let delta = new quill_delta.Delta([
            { insert: 'Test' },
            { retain: 5 },
            { delete: 3 }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Test getting next operation without specifying length
        let op1 = iterator.next();
        assert.equal(op1.insert, 'Test');
        
        let op2 = iterator.next();
        assert.equal(op2.retain, 5);
        
        let op3 = iterator.next();
        assert.equal(op3.delete, 3);
        
        done();
    });

    })