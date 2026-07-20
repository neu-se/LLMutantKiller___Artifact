let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with empty string', function(done) {
        // Test that getHandler handles empty string input
        try {
            const handler = quill_delta.getHandler('');
            assert(handler === undefined || handler === null, 'Handler should be undefined or null for empty string');
            done();
        } catch (error) {
            done(error);
        }
    });
});