let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length with newline insert', function(done) {
        let op = { insert: '\n' };
        let length = quill_delta.Op.length(op);
        assert.strictEqual(length, 1);
        done();
    });
});