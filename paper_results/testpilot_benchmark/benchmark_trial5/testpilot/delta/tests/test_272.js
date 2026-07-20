let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with null/undefined values', function(done) {
        let a = { bold: true, italic: null };
        let b = { bold: null, underline: true };
        
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // null values should remove attributes
        let expected = { underline: true };
        assert.deepEqual(result, expected);
        done();
    });
});