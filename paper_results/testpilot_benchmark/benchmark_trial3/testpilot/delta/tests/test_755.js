let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes only specified embed type', function(done) {
        // Register multiple embed types
        quill_delta.registerEmbed('embedA', {
            create: function(value) { return document.createElement('div'); }
        });
        quill_delta.registerEmbed('embedB', {
            create: function(value) { return document.createElement('span'); }
        });
        
        // Verify both are registered
        assert(quill_delta.handlers['embedA'] !== undefined, 'EmbedA should be registered');
        assert(quill_delta.handlers['embedB'] !== undefined, 'EmbedB should be registered');
        
        // Unregister only one
        quill_delta.unregisterEmbed('embedA');
        
        // Verify only the specified one was removed
        assert(quill_delta.handlers['embedA'] === undefined, 'EmbedA should be unregistered');
        assert(quill_delta.handlers['embedB'] !== undefined, 'EmbedB should still be registered');
        
        // Clean up
        quill_delta.unregisterEmbed('embedB');
        
        done();
    });
});