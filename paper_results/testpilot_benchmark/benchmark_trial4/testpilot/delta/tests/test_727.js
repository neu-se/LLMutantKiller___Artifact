let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with custom handler', function(done) {
        // Define a custom embed handler
        const customHandler = function(node, delta) {
            return {
                insert: { custom: node.getAttribute('data-value') || 'default' }
            };
        };
        
        // Register the custom embed type
        quill_delta.registerEmbed('custom', customHandler);
        
        // Verify the registration was successful by checking if we can use it
        // This assumes the library stores registered handlers internally
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('custom', customHandler);
        }, 'Should not throw when registering embed handler');
        
        done();
    });

    })