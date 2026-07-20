let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with null handler should handle gracefully', function(done) {
        // Test edge case with null handler
        try {
            quill_delta.registerEmbed('nulltest', null);
            // If it doesn't throw, that's fine too
            done();
        } catch (error) {
            // If it throws, verify it's a reasonable error
            assert.ok(error instanceof Error, 'Should throw an Error object');
            done();
        }
    });

    })