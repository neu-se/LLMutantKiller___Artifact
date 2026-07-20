let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add insert operation', function(done) {
        let delta = new Delta();
        let insertOp = { insert: 'Hello World' };
        
        delta.push(insertOp);
        
        assert.strictEqual(delta.ops.length, 1, 'delta should have one operation');
        assert.deepStrictEqual(delta.ops[0], insertOp, 'insert operation should be added correctly');
        done();
    });
});