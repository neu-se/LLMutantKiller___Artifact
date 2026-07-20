let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - multiple insert operations', function(done) {
        let delta = new quill_delta();
        delta.insert('hello');
        delta.insert(' world');
        assert.strictEqual(delta.length(), 11);
        done();
    });
});