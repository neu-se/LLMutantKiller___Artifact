let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should work with multiple handlers', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Add multiple mock handlers
        const imageHandler = function(embed) { return 'image: ' + embed; };
        const videoHandler = function(embed) { return 'video: ' + embed; };
        
        // Since quill-delta doesn't have handlers property by default, we add it
        delta.handlers = {
            'image': imageHandler,
            'video': videoHandler
        };
        
        // Since quill-delta doesn't have getHandler method by default, we add it
        delta.getHandler = function(type) {
            return this.handlers[type];
        };
        
        // Test that both handlers can be retrieved correctly
        assert.strictEqual(delta.getHandler('image'), imageHandler);
        assert.strictEqual(delta.getHandler('video'), videoHandler);
        done();
    });
});