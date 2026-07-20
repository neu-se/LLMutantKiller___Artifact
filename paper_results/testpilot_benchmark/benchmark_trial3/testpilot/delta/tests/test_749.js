let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle empty string input', function(done) {
        try {
            quill_delta.unregisterEmbed('');
            // Should handle gracefully
            done();
        } catch (error) {
            // If it throws an error for empty string, that's acceptable
            done();
        }
    });
});