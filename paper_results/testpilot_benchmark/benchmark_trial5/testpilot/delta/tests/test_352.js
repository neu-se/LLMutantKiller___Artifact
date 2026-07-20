let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add multiple operations', function(done) {
        let delta = new Delta();
        let op1 = { insert: 'Hello' };
        let op2 = { retain: 5 };
        let op3 = { delete: 2 };
        
        delta.push(op1);
        delta.push(op2);
        delta.push(op3);
        
        assert.strictEqual(delta.ops.length, 3, 'delta should have three operations');
        assert.deepStrictEqual(delta.ops[0], op1, 'first operation should match');
        assert.deepStrictEqual(delta.ops[1], op2, 'second operation should match');
        assert.deepStrictEqual(delta.ops[2], op3, 'third operation should match');
        done();
    });
});