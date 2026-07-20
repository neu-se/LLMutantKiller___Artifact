let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - no changes', function(done) {
        let a = { bold: true, italic: false };
        let b = { bold: true, italic: false };
        let result = quill_delta.AttributeMap.diff(a, b);
        assert.deepEqual(result, {});
        done();
    });

    })