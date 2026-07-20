let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - base only', function(done) {
        // Test with only base provided
        let base = { bold: true, italic: false };
        let result = quill_delta.AttributeMap.invert({}, base);
        
        // Should return the base attributes
        assert.deepEqual(result, { bold: true, italic: false });
        done();
    });
});