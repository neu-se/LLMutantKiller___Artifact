let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add delete operation', function(done) {
        let delta = new Delta();
        let deleteOp = { delete: 3 };
        
        delta.push(deleteOp);
        
        assert.strictEqual(delta.ops.length, 1, 'delta should have one operation');
        assert.deepStrictEqual(delta.ops[0], deleteOp, 'delete operation should be added correctly');
        done();
    });

    })