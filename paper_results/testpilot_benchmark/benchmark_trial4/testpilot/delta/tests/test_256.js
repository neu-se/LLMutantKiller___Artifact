let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - null values', function(done) {
        // Test with null values in attributes
        let attr = { bold: null, italic: true };
        let base = { bold: true, italic: false };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, { bold: true, italic: false });
        done();
    });
});