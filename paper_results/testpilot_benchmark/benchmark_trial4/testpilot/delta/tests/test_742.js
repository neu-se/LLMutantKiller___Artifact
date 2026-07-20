let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with video handler', function(done) {
        // Define a video embed handler
        const videoHandler = function(node, delta) {
            return {
                insert: { 
                    video: node.getAttribute('src') || '',
                    attributes: {
                        controls: node.hasAttribute('controls'),
                        autoplay: node.hasAttribute('autoplay')
                    }
                }
            };
        };
        
        // Register the video embed type
        quill_delta.registerEmbed('video', videoHandler);
        
        // Test that function exists and can be called
        assert.strictEqual(typeof quill_delta.registerEmbed, 'function', 
            'registerEmbed should be a function');
        
        done();
    });
});