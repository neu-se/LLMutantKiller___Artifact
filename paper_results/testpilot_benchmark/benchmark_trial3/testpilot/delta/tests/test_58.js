let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length with multi-line insert', function(done) {
        let op = { insert: 'line1\nline2\n' };
        let length = quill_delta.Op.length(op);
        assert.strictEqual(length, 12);
        done();
    });
});