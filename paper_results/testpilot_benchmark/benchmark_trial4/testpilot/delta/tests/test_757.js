let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle empty string embed type', function(done) {
        // Test with empty string
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed('');
        }, 'Unregistering empty string embed type should not throw error');
        
        done();
    });
});