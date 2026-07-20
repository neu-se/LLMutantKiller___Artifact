let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - removed attributes', function(done) {
        const a = { bold: true, italic: true };
        const b = { bold: true };
        const result = quill_delta.AttributeMap.diff(a, b);
        assert.deepStrictEqual(result, { italic: null });
        done();
    });

    })