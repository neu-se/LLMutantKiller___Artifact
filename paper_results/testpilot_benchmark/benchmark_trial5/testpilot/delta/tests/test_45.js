let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should insert text without attributes', function(done) {
        const delta = new quill_delta();
        delta.insert('hello');
        assert.deepEqual(delta.ops, [{ insert: 'hello' }]);
        done();
    });
});