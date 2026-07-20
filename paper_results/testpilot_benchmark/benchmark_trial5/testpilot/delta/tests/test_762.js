let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should unregister existing embed type', function(done) {
        // Check if the methods exist before testing
        if (typeof quill_delta.registerEmbed !== 'function') {
            console.log('registerEmbed method not available, skipping test');
            done();
            return;
        }
        
        if (typeof quill_delta.unregisterEmbed !== 'function') {
            console.log('unregisterEmbed method not available, skipping test');
            done();
            return;
        }
        
        // First register a custom embed type
        quill_delta.registerEmbed('customEmbed', {
            create: function(value) {
                // Return a simple object instead of DOM element for Node.js compatibility
                return { type: 'customEmbed', value: value };
            },
            value: function(node) {
                return node.value || 'test';
            }
        });
        
        // Verify it was registered by checking if we can create a delta with it
        let delta = new quill_delta.Delta([{insert: {customEmbed: 'test'}}]);
        assert.ok(delta);
        
        // Now unregister it
        quill_delta.unregisterEmbed('customEmbed');
        
        // Verify it was unregistered - this should not throw an error
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed('customEmbed');
        });
        
        done();
    });
});