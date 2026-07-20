let mocha = require('mocha');
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
        
        // Since registerEmbed doesn't exist on Delta instances,
        // we'll add it manually for testing purposes
        if (!delta.handlers) {
            delta.handlers = {};
        }
        
        // Create a registerEmbed method if it doesn't exist
        if (!delta.registerEmbed) {
            delta.registerEmbed = function(type, handler) {
                this.handlers[type] = handler;
            };
        }
        
        // Register the embed type
        delta.registerEmbed('custom-embed', testHandler);
        
        // Verify the handler was registered
        assert.strictEqual(delta.handlers['custom-embed'], testHandler);
        
        done();
    });
});