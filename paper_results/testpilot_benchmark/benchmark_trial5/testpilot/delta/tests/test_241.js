let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - complex scenario', function(done) {
        const attr = { bold: true, italic: false, color: 'red', size: '12px' };
        const base = { bold: false, italic: false, underline: true, size: '14px' };
        const result = quill_delta.AttributeMap.invert(attr, base);
        const expected = { bold: false, size: '14px', color: null };
        assert.deepEqual(result, expected);
        done();
    });
});