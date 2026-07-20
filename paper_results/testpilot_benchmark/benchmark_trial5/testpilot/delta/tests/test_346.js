let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - merge consecutive string inserts with attributes', function(done) {
        let delta = new quill_delta([{ insert: 'hello', attributes: { bold: true } }]);
        delta.push({ insert: ' world', attributes: { bold: true } });
        assert.deepEqual(delta.ops, [{ insert: 'hello world', attributes: { bold: true } }]);
        done();
    });
});