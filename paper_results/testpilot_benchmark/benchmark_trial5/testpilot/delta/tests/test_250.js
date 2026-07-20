let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - default parameters', function(done) {
        // Test with default parameters (both empty objects)
        let result = quill_delta.AttributeMap.invert();
        
        assert.deepEqual(result, {});
        done();
    });
});