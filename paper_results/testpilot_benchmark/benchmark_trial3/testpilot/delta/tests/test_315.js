let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - retain zero length', function(done) {
        let delta = new quill_delta();
        let result = delta.retain(0);
        
        assert.strictEqual(result, delta, 'retain should return the delta instance for chaining');
        assert.strictEqual(delta.ops.length, 0, 'should have no operations for zero length retain');
        done();
    });
});