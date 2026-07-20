let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle unregistering non-existent embed type', function(done) {
        const nonExistentType = 'nonExistentEmbed';
        
        // Attempting to unregister a non-existent embed type should not throw an error
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(nonExistentType);
        }, 'Unregistering non-existent embed should not throw error');
        
        done();
    });
});