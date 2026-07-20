let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - mixed attributes', function(done) {
        // Test with overlapping and non-overlapping attributes
        let attr = { bold: true, color: 'blue', size: '12px' };
        let base = { bold: false, italic: true, color: 'red' };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, { 
            bold: false, 
            color: 'red', 
            size: null,
            italic: true 
        });
        done();
    });
});