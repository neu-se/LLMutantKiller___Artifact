let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add retain operation', function(done) {
        let delta = new Delta();
        let retainOp = { retain: 5 };
        
        let result = delta.push(retainOp);
        
        assert.strictEqual(result, delta, 'push should return the delta instance');
        assert.strictEqual(delta.ops.length, 1, 'delta should have one operation');
        assert.deepStrictEqual(delta.ops[0], retainOp, 'operation should match what was pushed');
        done();
    });
});