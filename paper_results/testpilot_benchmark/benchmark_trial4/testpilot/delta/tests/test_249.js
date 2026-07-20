let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - same values should not appear in result', function(done) {
        const attr = { bold: true, italic: false };
        const base = { bold: true, italic: true };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = { italic: true };
        assert.deepEqual(result, expected);
        done();
    });
});