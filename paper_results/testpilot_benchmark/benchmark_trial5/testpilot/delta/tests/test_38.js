let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should not retain zero or negative length', function(done) {
        const delta = new quill_delta();
        delta.retain(0);
        delta.retain(-1);
        assert.deepEqual(delta.ops, []);
        done();
    });
});