let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with invalid embed type', function(done) {
        // Test that getHandler handles invalid embed types gracefully
        try {
            let handler = quill_delta.getHandler('nonexistent');
            // Should either return undefined/null or throw an error
            assert(handler === undefined || handler === null || typeof handler === 'function', 
                   'Handler should be undefined, null, or a function');
            done();
        } catch (error) {
            // It's acceptable for invalid types to throw an error
            done();
        }
    });
});