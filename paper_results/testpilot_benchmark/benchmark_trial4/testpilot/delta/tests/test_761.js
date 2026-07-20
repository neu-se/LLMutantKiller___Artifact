let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with valid embed type', function(done) {
        // Test that getHandler returns a function for a valid embed type
        try {
            let handler = quill_delta.getHandler('image');
            assert(typeof handler === 'function', 'Handler should be a function');
            done();
        } catch (error) {
            done(error);
        }
    });

    })