let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - empty delta', function(done) {
        let delta = new quill_delta();
        assert.strictEqual(delta.length(), 0);
        done();
    });
});