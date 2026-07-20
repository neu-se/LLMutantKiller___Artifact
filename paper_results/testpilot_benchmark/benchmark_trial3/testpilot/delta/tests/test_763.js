let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with invalid embed type', function(done) {
        // Test that getHandler handles invalid embed types gracefully
        try {
            const handler = quill_delta.getHandler('nonexistent');
            assert(handler === undefined || handler === null, 'Handler should be undefined or null for invalid type');
            done();
        } catch (error) {
            done(error);
        }
    });

    })