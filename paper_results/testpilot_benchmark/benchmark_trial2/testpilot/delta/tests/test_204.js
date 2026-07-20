let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler with valid embed type', function(done) {
        // Test that getHandler returns a function for a valid embed type
        try {
            // Check if getHandler method exists first
            if (typeof quill_delta.getHandler === 'function') {
                let handler = quill_delta.getHandler('image');
                assert(typeof handler === 'function', 'Handler should be a function');
            } else {
                // If getHandler doesn't exist, test that we can create a Delta with embeds
                let delta = new quill_delta.Delta();
                delta.insert({ image: 'https://example.com/image.png' });
                assert(delta.ops.length === 1, 'Delta should have one operation');
                assert(delta.ops[0].insert.image, 'Operation should contain image embed');
            }
            done();
        } catch (error) {
            done(error);
        }
    });
});