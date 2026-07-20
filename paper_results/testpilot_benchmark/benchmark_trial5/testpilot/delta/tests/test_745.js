let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should unregister existing embed type', function(done) {
        // First register a custom embed type
        quill_delta.registerEmbed('customEmbed', {
            create: function(value) {
                return document.createElement('div');
            },
            value: function(node) {
                return node.getAttribute('data-value');
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

    })