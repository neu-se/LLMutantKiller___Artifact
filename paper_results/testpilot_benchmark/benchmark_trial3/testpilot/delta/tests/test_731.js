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
        
        // Register the embed handler
        delta.registerEmbed('custom-embed', testHandler);
        
        // Verify the handler was registered
        assert.strictEqual(delta.handlers['custom-embed'], testHandler);
        
        done();
    });

    })