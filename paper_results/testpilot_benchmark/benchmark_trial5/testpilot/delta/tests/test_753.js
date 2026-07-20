let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles undefined/null embed type', function(done) {
        let initialHandlers = Object.keys(quill_delta.handlers).length;
        
        // Test with undefined
        quill_delta.unregisterEmbed(undefined);
        
        // Test with null
        quill_delta.unregisterEmbed(null);
        
        // Verify no handlers were affected
        let finalHandlers = Object.keys(quill_delta.handlers).length;
        assert.equal(initialHandlers, finalHandlers, 'Handler count should remain unchanged');
        
        done();
    });
});