let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - attr has new properties', function(done) {
        const attr = { bold: true, underline: true };
        const base = { bold: false };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = { bold: false, underline: null };
        assert.deepEqual(result, expected);
        done();
    });

    })