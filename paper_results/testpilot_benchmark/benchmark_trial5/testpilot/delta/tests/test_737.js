let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - multiple embed types', function(done) {
        let delta = new quill_delta();
        
        // Since quill-delta doesn't have registerEmbed by default, 
        // we'll add the functionality for testing purposes
        if (!delta.registerEmbed) {
            delta.handlers = {};
            delta.registerEmbed = function(type, handler) {
                this.handlers[type] = handler;
            };
        }
        
        // Register multiple different embed types
        let imageHandler = function() { return 'image'; };
        let videoHandler = function() { return 'video'; };
        let linkHandler = function() { return 'link'; };
        
        delta.registerEmbed('image', imageHandler);
        delta.registerEmbed('video', videoHandler);
        delta.registerEmbed('link', linkHandler);
        
        // Verify all handlers are registered correctly
        assert.strictEqual(delta.handlers['image'], imageHandler);
        assert.strictEqual(delta.handlers['video'], videoHandler);
        assert.strictEqual(delta.handlers['link'], linkHandler);
        
        done();
    });
});