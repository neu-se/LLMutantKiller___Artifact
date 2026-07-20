let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles non-existent embed type gracefully', function(done) {
        // Try to unregister an embed that doesn't exist
        let initialHandlers = Object.keys(quill_delta.handlers).length;
        
        quill_delta.unregisterEmbed('nonExistentEmbed');
        
        // Verify no error was thrown and handlers count remains the same
        let finalHandlers = Object.keys(quill_delta.handlers).length;
        assert.equal(initialHandlers, finalHandlers, 'Handler count should remain unchanged');
        
        done();
    });

    })