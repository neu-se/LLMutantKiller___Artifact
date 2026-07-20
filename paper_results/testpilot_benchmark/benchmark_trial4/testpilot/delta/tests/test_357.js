let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add retain operation', function(done) {
        let delta = new Delta();
        let retainOp = { retain: 5 };
        
        delta.push(retainOp);
        
        assert.equal(delta.ops.length, 1);
        assert.deepEqual(delta.ops[0], retainOp);
        done();
    });
});