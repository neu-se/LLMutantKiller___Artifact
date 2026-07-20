let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - mixed operations', function(done) {
        let delta = new quill_delta();
        delta.retain(2);
        delta.insert('abc');
        delta.delete(1);
        delta.insert('de');
        delta.retain(3);
        delta.delete(2);
        let length = delta.changeLength();
        assert.strictEqual(length, 2); // +3 +2 -1 -2 = +2
        done();
    });
});