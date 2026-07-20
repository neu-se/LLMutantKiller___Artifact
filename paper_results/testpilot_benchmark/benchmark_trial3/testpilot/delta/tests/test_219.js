let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - mixed changes', function(done) {
        let a = { bold: true, italic: true, color: 'red' };
        let b = { bold: false, underline: true, color: 'red' };
        let result = quill_delta.AttributeMap.diff(a, b);
        assert.deepEqual(result, { bold: false, italic: null, underline: true });
        done();
    });
});