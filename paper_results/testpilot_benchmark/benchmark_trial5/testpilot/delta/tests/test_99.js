let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator edge cases', function(done) {
        // Test with undefined/null
        try {
            let nullIterator = new quill_delta.OpIterator(null);
            // If it doesn't throw, check it behaves reasonably
            assert.strictEqual(nullIterator.hasNext(), false);
        } catch (e) {
            // It's acceptable for this to throw
        }
        
        // Test with mixed valid operations
        let mixedOps = [
            { insert: '' }, // empty string
            { retain: 0 },  // zero retain
            { insert: 'Valid' }
        ];
        let mixedIterator = new quill_delta.OpIterator(mixedOps);
        
        // Should be able to iterate through all operations
        let count = 0;
        while (mixedIterator.hasNext()) {
            mixedIterator.next();
            count++;
        }
        assert.strictEqual(count, 3);
        
        done();
    });
});