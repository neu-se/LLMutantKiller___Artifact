let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert and retain operations', function(done) {
        let delta = new quill_delta();
        delta.retain(5);
        delta.insert('test');
        assert.strictEqual(delta.length(), 9);
        done();
    });
});