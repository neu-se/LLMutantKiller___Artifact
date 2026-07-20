let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - insert operations', function(done) {
        let delta = new quill_delta();
        delta.insert('hello');
        delta.insert(' world');
        let length = delta.changeLength();
        assert.strictEqual(length, 11); // 5 + 6 characters inserted
        done();
    });
});