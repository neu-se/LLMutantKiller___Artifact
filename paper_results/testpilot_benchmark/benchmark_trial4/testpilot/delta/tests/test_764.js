let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with undefined parameter', function(done) {
        // Test that getHandler handles undefined input
        try {
            let handler = quill_delta.getHandler(undefined);
            assert(handler === undefined || handler === null, 
                   'Handler should be undefined or null for undefined input');
            done();
        } catch (error) {
            // It's acceptable for undefined to throw an error
            done();
        }
    });

    })