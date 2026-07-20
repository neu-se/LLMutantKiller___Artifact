let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - retain with empty attributes object', function(done) {
        let delta = new quill_delta();
        let result = delta.retain(4, {});
        
        assert.strictEqual(result, delta, 'retain should return the delta instance for chaining');
        assert.strictEqual(delta.ops.length, 1, 'should have one operation');
        assert.strictEqual(delta.ops[0].retain, 4, 'should retain 4 characters');
        assert.strictEqual(delta.ops[0].attributes, undefined, 'empty attributes object should be treated as no attributes');
        done();
    });
});