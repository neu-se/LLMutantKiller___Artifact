let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - embed operations', function(done) {
        let delta = new quill_delta();
        delta.insert('text');
        delta.insert({ image: 'url' });
        delta.insert('more text');
        assert.strictEqual(delta.length(), 14);
        done();
    });
});