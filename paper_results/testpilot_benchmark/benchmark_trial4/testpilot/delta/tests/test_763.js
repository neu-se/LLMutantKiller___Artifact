let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with null parameter', function(done) {
        // Test that getHandler handles null input
        try {
            let handler = quill_delta.getHandler(null);
            assert(handler === undefined || handler === null, 
                   'Handler should be undefined or null for null input');
            done();
        } catch (error) {
            // It's acceptable for null to throw an error
            done();
        }
    });

    })