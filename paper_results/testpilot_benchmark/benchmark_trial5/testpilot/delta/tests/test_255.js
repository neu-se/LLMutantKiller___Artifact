let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - no base attributes', function(done) {
        // Test with empty base object
        let attr = { bold: true, color: 'red' };
        let base = {};
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, {});
        done();
    });
});