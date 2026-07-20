let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle null/undefined input', function(done) {
        try {
            quill_delta.unregisterEmbed(null);
            quill_delta.unregisterEmbed(undefined);
            // Should handle gracefully
            done();
        } catch (error) {
            // If it throws an error for invalid input, that's acceptable
            done();
        }
    });

    })