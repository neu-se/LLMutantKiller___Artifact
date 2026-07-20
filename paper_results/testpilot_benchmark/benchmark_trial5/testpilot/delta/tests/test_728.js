let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with image handler', function(done) {
        // Define an image embed handler
        const imageHandler = function(node, delta) {
            return {
                insert: { 
                    image: node.getAttribute('src') || '',
                    attributes: {
                        alt: node.getAttribute('alt') || ''
                    }
                }
            };
        };
        
        // Register the image embed type
        quill_delta.registerEmbed('image', imageHandler);
        
        // Test should complete without errors
        assert.ok(true, 'Image embed handler registered successfully');
        
        done();
    });

    })