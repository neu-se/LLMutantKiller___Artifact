let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should chop trailing retain without attributes', function(done) {
        const delta = new quill_delta();
        delta.insert('hello');
        delta.retain(5);
        delta.chop();
        assert.deepEqual(delta.ops, [{ insert: 'hello' }]);
        done();
    });
});