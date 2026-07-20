let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length with empty string insert', function(done) {
        let op = { insert: '' };
        let length = quill_delta.Op.length(op);
        assert.strictEqual(length, 0);
        done();
    });

    })