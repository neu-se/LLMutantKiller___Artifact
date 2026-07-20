let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - basic inversion', function(done) {
        const attr = { bold: true, italic: false };
        const base = { bold: false, italic: true };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = { bold: false, italic: true };
        assert.deepEqual(result, expected);
        done();
    });

    })