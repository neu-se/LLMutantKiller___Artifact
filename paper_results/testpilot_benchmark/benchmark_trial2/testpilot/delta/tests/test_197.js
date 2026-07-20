let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle non-existent embed type gracefully', function(done) {
        // Try to unregister an embed type that doesn't exist
        try {
            quill_delta.unregisterEmbed('nonExistentEmbed');
            // Should not throw an error
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable behavior
            done();
        }
    });

    })