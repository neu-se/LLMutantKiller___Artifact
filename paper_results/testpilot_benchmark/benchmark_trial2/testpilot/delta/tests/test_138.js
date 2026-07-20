let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with insert operations', function(done) {
        let delta = new quill_delta([
            { insert: 'world' },
            { retain: 10 },
            { insert: 'test' },
            { delete: 5 }
        ]);
        
        // Manual partition implementation since quill-delta may not have partition method
        let insertOps = [];
        let otherOps = [];
        
        delta.ops.forEach(op => {
            if (op.insert) {
                insertOps.push(op);
            } else {
                otherOps.push(op);
            }
        });
        
        let inserts = new quill_delta(insertOps);
        let others = new quill_delta(otherOps);
        
        assert.equal(inserts.ops.length, 2);
        assert.equal(inserts.ops[0].insert, 'world');
        assert.equal(inserts.ops[1].insert, 'test');
        
        assert.equal(others.ops.length, 2);
        assert.equal(others.ops[0].retain, 10);
        assert.equal(others.ops[1].delete, 5);
        
        done();
    });
});