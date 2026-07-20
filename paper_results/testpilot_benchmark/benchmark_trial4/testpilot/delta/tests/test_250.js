let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - base has extra properties', function(done) {
        const attr = { bold: true };
        const base = { bold: false, italic: true };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = { bold: false };
        assert.deepEqual(result, expected);
        done();
    });
});