let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - both empty', function(done) {
        // Test with both empty objects
        let attr = {};
        let base = {};
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, {});
        done();
    });
});