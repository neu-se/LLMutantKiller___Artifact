let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should retain text', function(done) {
        let delta = new Delta();
        delta.retain(10);
        assert.strictEqual(delta.ops.length, 1);
        assert.strictEqual(delta.ops[0].retain, 10);
        done();
    });
});