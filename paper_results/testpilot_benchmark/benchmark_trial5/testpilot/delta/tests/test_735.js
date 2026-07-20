let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - handler with complex logic', function(done) {
        let delta = new quill_delta();
        
        // Define a more complex handler
        let complexHandler = function(node, delta) {
            return {
                type: node.tagName.toLowerCase(),
                attributes: {
                    src: node.getAttribute('src'),
                    alt: node.getAttribute('alt')
                }
            };
        };
        
        delta.registerEmbed('complex-embed', complexHandler);
        
        // Verify the complex handler was registered
        assert.strictEqual(delta.handlers['complex-embed'], complexHandler);
        assert.strictEqual(typeof delta.handlers['complex-embed'], 'function');
        
        done();
    });
});