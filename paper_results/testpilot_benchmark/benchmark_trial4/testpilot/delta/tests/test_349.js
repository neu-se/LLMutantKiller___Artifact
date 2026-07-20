let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - merge consecutive string inserts with same attributes', function(done) {
        let delta = new quill_delta([{ insert: 'hello' }]);
        delta.push({ insert: ' world' });
        assert.deepEqual(delta.ops, [{ insert: 'hello world' }]);
        done();
    });
});