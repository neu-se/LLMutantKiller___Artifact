let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - empty deltas', function(done) {
        const delta1 = new Delta();
        const delta2 = new Delta([{ insert: 'Hello' }]);
        
        const result = delta1.diff(delta2);
        assert.strictEqual(result.ops.length, 1, 'Should have one insert operation');
        assert.deepStrictEqual(result.ops[0], { insert: 'Hello' }, 'Should insert all text');
        done();
    });

    })