let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create an empty delta', function(done) {
        let delta = new Delta();
        assert.strictEqual(delta.ops.length, 0);
        done();
    });
});