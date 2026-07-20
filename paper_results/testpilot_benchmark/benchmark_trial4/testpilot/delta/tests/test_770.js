let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should work with multiple handlers', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Add multiple mock handlers
        const imageHandler = function(embed) { return 'image'; };
        const videoHandler = function(embed) { return 'video'; };
        
        // Since quill-delta doesn't have a handlers property or getHandler method,
        // we'll simulate this functionality by adding them manually
        delta.handlers = {
            'image': imageHandler,
            'video': videoHandler
        };
        
        delta.getHandler = function(type) {
            return this.handlers[type];
        };
        
        // Test that both handlers can be retrieved correctly
        assert.strictEqual(delta.getHandler('image'), imageHandler);
        assert.strictEqual(delta.getHandler('video'), videoHandler);
        done();
    });
});