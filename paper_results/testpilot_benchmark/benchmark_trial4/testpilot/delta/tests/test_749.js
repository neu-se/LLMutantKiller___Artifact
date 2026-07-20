let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes existing embed type', function(done) {
        // First register an embed type to ensure it exists
        quill_delta.registerEmbed('testEmbed', {});
        
        // Verify it was registered
        assert(quill_delta.handlers.hasOwnProperty('testEmbed'), 'Embed type should be registered');
        
        // Unregister the embed type
        quill_delta.unregisterEmbed('testEmbed');
        
        // Verify it was removed
        assert(!quill_delta.handlers.hasOwnProperty('testEmbed'), 'Embed type should be unregistered');
        
        done();
    });

    })