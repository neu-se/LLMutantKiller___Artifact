let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - constructed with operations array', function(done) {
        let delta = new quill_delta([
            { retain: 2 },
            { insert: 'Hello' },
            { delete: 3 }
        ]);
        assert.strictEqual(delta.length(), 7);
        done();
    });
});