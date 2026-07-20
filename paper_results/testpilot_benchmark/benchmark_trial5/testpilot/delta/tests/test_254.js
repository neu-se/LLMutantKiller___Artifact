let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - partial overlap', function(done) {
        // Test with partial overlap between attr and base
        let attr = { bold: true, italic: false, color: 'blue' };
        let base = { bold: false, underline: true };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, { bold: false });
        done();
    });
});