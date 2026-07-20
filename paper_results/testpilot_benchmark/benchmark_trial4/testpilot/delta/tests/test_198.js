let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - remove attributes', function(done) {
        let a = { bold: true, italic: true };
        let b = {};
        let result = quill_delta.AttributeMap.diff(a, b);
        assert.deepEqual(result, { bold: null, italic: null });
        done();
    });

    })