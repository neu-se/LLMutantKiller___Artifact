let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should not insert empty string', function(done) {
        const delta = new quill_delta();
        delta.insert('');
        assert.deepEqual(delta.ops, []);
        done();
    });
});