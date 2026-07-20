let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle null/undefined embed type', function(done) {
        // Test with null
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(null);
        }, 'Unregistering null embed type should not throw error');
        
        // Test with undefined
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(undefined);
        }, 'Unregistering undefined embed type should not throw error');
        
        done();
    });
});