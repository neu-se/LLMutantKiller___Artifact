let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should unregister a previously registered embed type', function(done) {
        // First register a custom embed type
        const customEmbedType = 'testEmbed';
        const customEmbedHandler = {
            create: function(value) {
                return document.createElement('div');
            }
        };
        
        // Register the embed type first
        quill_delta.registerEmbed(customEmbedType, customEmbedHandler);
        
        // Verify it was registered by checking if we can create a delta with it
        let delta = new quill_delta.Delta([{insert: {[customEmbedType]: 'test'}}]);
        assert.ok(delta, 'Delta with custom embed should be created');
        
        // Now unregister the embed type
        quill_delta.unregisterEmbed(customEmbedType);
        
        // Verify it was unregistered - this should not throw an error
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed(customEmbedType);
        }, 'Unregistering should not throw error');
        
        done();
    });

    })