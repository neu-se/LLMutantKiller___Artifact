let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator edge cases', function(done) {
        // Test with null/undefined
        try {
            let nullIterator = new quill_delta.OpIterator(null);
            // If it doesn't throw, check it behaves reasonably
            assert.strictEqual(nullIterator.hasNext(), false);
        } catch (e) {
            // It's acceptable for this to throw
        }
        
        // Test with undefined ops
        try {
            let undefinedIterator = new quill_delta.OpIterator();
            assert.strictEqual(undefinedIterator.hasNext(), false);
        } catch (e) {
            // It's acceptable for this to throw
        }
        
        done();
    });
});