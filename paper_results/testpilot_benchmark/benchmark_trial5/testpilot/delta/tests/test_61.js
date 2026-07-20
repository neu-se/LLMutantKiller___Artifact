let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length with delete', function(done) {
        let op = { delete: 3 };
        let length = quill_delta.Op.length(op);
        assert.strictEqual(length, 3);
        done();
    });

    })