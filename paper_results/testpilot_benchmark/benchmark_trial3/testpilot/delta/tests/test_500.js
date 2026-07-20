let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - mixed operations', function(done) {
        let delta = new quill_delta();
        delta.retain(3);
        delta.insert('abc');
        delta.delete(1);
        delta.insert('xyz');
        assert.strictEqual(delta.length(), 10);
        done();
    });
});