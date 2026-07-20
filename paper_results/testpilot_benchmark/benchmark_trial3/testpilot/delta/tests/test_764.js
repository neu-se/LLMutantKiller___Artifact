let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with null input', function(done) {
        // Test that getHandler handles null input
        try {
            const handler = quill_delta.getHandler(null);
            assert(handler === undefined || handler === null, 'Handler should be undefined or null for null input');
            done();
        } catch (error) {
            done(error);
        }
    });

    })