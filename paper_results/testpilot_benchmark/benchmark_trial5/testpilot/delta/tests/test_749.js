let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should unregister multiple embed types', function(done) {
        // Register multiple embed types
        quill_delta.registerEmbed('embed1', {
            create: function(value) { return document.createElement('span'); }
        });
        quill_delta.registerEmbed('embed2', {
            create: function(value) { return document.createElement('div'); }
        });
        
        // Unregister both
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed('embed1');
            quill_delta.unregisterEmbed('embed2');
        });
        
        done();
    });
});