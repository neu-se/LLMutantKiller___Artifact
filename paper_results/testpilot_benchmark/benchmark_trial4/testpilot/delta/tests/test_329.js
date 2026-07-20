let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should add multiple operations', function(done) {
        let delta = new Delta();
        let insertOp = { insert: 'Hello' };
        let retainOp = { retain: 2 };
        let deleteOp = { delete: 1 };
        
        delta.push(insertOp);
        delta.push(retainOp);
        delta.push(deleteOp);
        
        assert.equal(delta.ops.length, 3);
        assert.deepEqual(delta.ops[0], insertOp);
        assert.deepEqual(delta.ops[1], retainOp);
        assert.deepEqual(delta.ops[2], deleteOp);
        done();
    });

    })