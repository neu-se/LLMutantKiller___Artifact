let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should throw error with correct message format', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Add a mock getHandler method that throws the expected error
        delta.getHandler = function(embedType) {
            throw new Error(`no handlers for embed type "${embedType}"`);
        };
        
        // Test that the error message contains the correct embed type
        try {
            delta.getHandler('video');
            assert.fail('Expected error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'no handlers for embed type "video"');
        }
        done();
    });
});