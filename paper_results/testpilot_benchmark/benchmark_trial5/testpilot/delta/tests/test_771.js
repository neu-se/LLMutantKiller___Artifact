let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should return different handlers for different embed types', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Add multiple mock handlers
        const imageHandler = function(embed) { return 'image: ' + embed; };
        const videoHandler = function(embed) { return 'video: ' + embed; };
        
        delta.handlers = {
            'image': imageHandler,
            'video': videoHandler
        };
        
        // Test that getHandler returns the correct handlers
        assert.strictEqual(delta.getHandler('image'), imageHandler);
        assert.strictEqual(delta.getHandler('video'), videoHandler);
        assert.notStrictEqual(delta.getHandler('image'), delta.getHandler('video'));
        done();
    });
});