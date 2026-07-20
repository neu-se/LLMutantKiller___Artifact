let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - added attributes', function(done) {
        const a = { bold: true };
        const b = { bold: true, italic: true };
        const result = quill_delta.AttributeMap.diff(a, b);
        assert.deepStrictEqual(result, { italic: true });
        done();
    });
});