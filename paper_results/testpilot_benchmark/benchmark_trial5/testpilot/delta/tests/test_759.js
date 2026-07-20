let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle empty string', function(done) {
        // Test with empty string
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed('');
        });
        
        done();
    });
});