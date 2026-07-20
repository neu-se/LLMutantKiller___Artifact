let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - simple text deletion', function(done) {
        const delta1 = new Delta([{ insert: 'Hello World' }]);
        const delta2 = new Delta([{ insert: 'Hello' }]);
        
        const result = delta1.diff(delta2);
        
        assert.strictEqual(result.ops.length, 2, 'Should have retain and delete operations');
        assert.deepStrictEqual(result.ops[0], { retain: 5 }, 'Should retain first 5 characters');
        assert.deepStrictEqual(result.ops[1], { delete: 6 }, 'Should delete 6 characters');
        done();
    });

    })