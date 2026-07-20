let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes only specified embed type', function(done) {
        // Register multiple embed types
        quill_delta.registerEmbed('embedA', {});
        quill_delta.registerEmbed('embedB', {});
        quill_delta.registerEmbed('embedC', {});
        
        // Verify all are registered
        assert(quill_delta.handlers.hasOwnProperty('embedA'), 'embedA should be registered');
        assert(quill_delta.handlers.hasOwnProperty('embedB'), 'embedB should be registered');
        assert(quill_delta.handlers.hasOwnProperty('embedC'), 'embedC should be registered');
        
        // Unregister only embedB
        quill_delta.unregisterEmbed('embedB');
        
        // Verify only embedB was removed
        assert(quill_delta.handlers.hasOwnProperty('embedA'), 'embedA should still be registered');
        assert(!quill_delta.handlers.hasOwnProperty('embedB'), 'embedB should be unregistered');
        assert(quill_delta.handlers.hasOwnProperty('embedC'), 'embedC should still be registered');
        
        // Clean up
        quill_delta.unregisterEmbed('embedA');
        quill_delta.unregisterEmbed('embedC');
        
        done();
    });

    })