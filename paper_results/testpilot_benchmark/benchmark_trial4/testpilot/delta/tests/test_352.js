let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should return the delta instance for chaining', function(done) {
        let delta = new Delta();
        let insertOp = { insert: 'test' };
        
        let result = delta.push(insertOp);
        
        assert.equal(result, delta);
        assert.equal(delta.ops.length, 1);
        done();
    });
});