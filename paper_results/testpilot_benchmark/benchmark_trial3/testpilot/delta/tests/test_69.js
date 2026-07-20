let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length with retain', function(done) {
        let op = { retain: 5 };
        let length = quill_delta.Op.length(op);
        assert.strictEqual(length, 5);
        done();
    });
});