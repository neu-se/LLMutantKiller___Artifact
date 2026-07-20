let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle null/undefined input', function(done) {
        // Test with null
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(null);
        });
        
        // Test with undefined
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(undefined);
        });
        
        done();
    });
});