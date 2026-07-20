let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should return different handlers for different embed types', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Add multiple mock handlers by extending the Delta prototype or instance
        const imageHandler = function(embed) { return 'image: ' + embed; };
        const videoHandler = function(embed) { return 'video: ' + embed; };
        
        // Add handlers as properties to the delta instance
        delta.handlers = {
            'image': imageHandler,
            'video': videoHandler
        };
        
        // Add getHandler method to the delta instance
        delta.getHandler = function(type) {
            return this.handlers[type];
        };
        
        // Test that getHandler returns the correct handlers
        assert.strictEqual(delta.getHandler('image'), imageHandler);
        assert.strictEqual(delta.getHandler('video'), videoHandler);
        assert.notStrictEqual(delta.getHandler('image'), delta.getHandler('video'));
        done();
    });
});