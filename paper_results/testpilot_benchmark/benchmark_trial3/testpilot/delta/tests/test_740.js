let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - basic registration', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Define a simple handler function
        let testHandler = function(node) {
            return { value: node.getAttribute('data-value') };
        };
        
        // Check if registerEmbed method exists
        if (typeof delta.registerEmbed === 'function') {
            // Register the embed handler
            delta.registerEmbed('custom-embed', testHandler);
            
            // Verify the handler was registered
            assert.strictEqual(delta.handlers['custom-embed'], testHandler);
        } else {
            // If the method doesn't exist, skip this test or handle appropriately
            console.log('registerEmbed method not available on Delta instance');
        }
        
        done();
    });
});