let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with basic attributes', function(done) {
        let a = { bold: true, italic: false };
        let b = { underline: true, color: 'red' };
        
        // Use Delta's static method for transforming attributes
        let result = Delta.AttributeMap.transform(a, b, false);
        
        // Should merge attributes from b into a
        assert.deepEqual(result, { bold: true, italic: false, underline: true, color: 'red' });
        done();
    });
});