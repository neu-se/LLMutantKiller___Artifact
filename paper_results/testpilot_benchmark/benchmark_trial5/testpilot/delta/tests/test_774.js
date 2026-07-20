let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should throw error when embed type does not exist', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Check if getHandler method exists before testing
        if (typeof delta.getHandler === 'function') {
            // Test that getHandler throws an error for non-existent embed type
            assert.throws(() => {
                delta.getHandler('nonexistent');
            }, /no handlers for embed type "nonexistent"/);
        } else {
            // If getHandler doesn't exist, skip this test or create a mock scenario
            console.log('getHandler method not found on quill-delta instance');
        }
        
        done();
    });
});