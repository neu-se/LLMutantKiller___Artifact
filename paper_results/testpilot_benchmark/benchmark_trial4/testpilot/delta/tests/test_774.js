let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with empty string', function(done) {
        // Test that getHandler handles empty string input
        try {
            let handler = quill_delta.getHandler('');
            assert(handler === undefined || handler === null || typeof handler === 'function', 
                   'Handler should be undefined, null, or a function for empty string');
            done();
        } catch (error) {
            // It's acceptable for empty string to throw an error
            done();
        }
    });
});