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
                        alt: node.getAttribute('alt') || '',
                        width: node.getAttribute('width') || null
                    }
                }
            };
        };
        
        // Register the image embed type
        quill_delta.registerEmbed('image', imageHandler);
        
        // Verify registration doesn't throw
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('image', imageHandler);
        }, 'Should not throw when registering image embed handler');
        
        done();
    });
});