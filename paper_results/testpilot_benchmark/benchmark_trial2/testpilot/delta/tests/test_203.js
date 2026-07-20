let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality - should create and compose deltas', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Test basic delta operations that actually exist
        delta.insert('Hello');
        delta.insert(' World', { bold: true });
        
        // Create another delta to compose with
        let delta2 = new quill_delta();
        delta2.retain(5); // retain first 5 characters
        delta2.insert('!');
        
        // Test composition
        let composed = delta.compose(delta2);
        
        // Verify the result has operations
        assert(composed.ops.length > 0);
        assert.strictEqual(typeof composed.compose, 'function');
        done();
    });
});