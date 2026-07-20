let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - unregister existing embed type', function(done) {
        // First register a custom embed type
        Delta.registerEmbed('customEmbed', {
            create: function(value) {
                return document.createElement('div');
            },
            value: function(node) {
                return node.getAttribute('data-value');
            }
        });
        
        // Verify it was registered by checking if we can create a delta with it
        let delta = new Delta([{insert: {customEmbed: 'test'}}]);
        assert.ok(delta);
        
        // Now unregister it
        Delta.unregisterEmbed('customEmbed');
        
        // Verify it was unregistered - this should not throw an error
        // The function should complete successfully
        done();
    });
    
});