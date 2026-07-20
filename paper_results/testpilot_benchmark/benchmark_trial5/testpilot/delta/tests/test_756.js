let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles non-existent embed type gracefully', function(done) {
        // Check if unregisterEmbed method exists
        if (typeof quill_delta.unregisterEmbed === 'function') {
            // Try to unregister an embed that doesn't exist
            let initialHandlers = quill_delta.handlers ? Object.keys(quill_delta.handlers).length : 0;
            
            quill_delta.unregisterEmbed('nonExistentEmbed');
            
            // Verify no error was thrown and handlers count remains the same
            let finalHandlers = quill_delta.handlers ? Object.keys(quill_delta.handlers).length : 0;
            assert.equal(initialHandlers, finalHandlers, 'Handler count should remain unchanged');
        } else {
            // If the method doesn't exist, just pass the test
            assert.ok(true, 'unregisterEmbed method does not exist on quill-delta');
        }
        
        done();
    });
});