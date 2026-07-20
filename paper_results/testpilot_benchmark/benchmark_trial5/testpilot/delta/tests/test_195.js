let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - add attributes', function(done) {
        let a = {};
        let b = { bold: true, italic: true };
        let result = quill_delta.AttributeMap.diff(a, b);
        assert.deepEqual(result, { bold: true, italic: true });
        done();
    });

    })