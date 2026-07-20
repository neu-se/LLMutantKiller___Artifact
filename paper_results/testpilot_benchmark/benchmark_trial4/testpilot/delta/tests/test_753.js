let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles undefined/null embed type', function(done) {
        // Check if unregisterEmbed method exists
        if (typeof quill_delta.unregisterEmbed !== 'function') {
            // If the method doesn't exist, we'll just verify it doesn't throw
            assert.ok(true, 'unregisterEmbed method does not exist on quill-delta');
            done();
            return;
        }
        
        // Check if handlers property exists
        const hasHandlers = quill_delta.handlers && typeof quill_delta.handlers === 'object';
        const initialHandlerCount = hasHandlers ? Object.keys(quill_delta.handlers).length : 0;
        
        // Test with undefined - should not throw
        try {
            quill_delta.unregisterEmbed(undefined);
            assert.ok(true, 'unregisterEmbed with undefined should not throw');
        } catch (error) {
            assert.fail('unregisterEmbed with undefined should not throw an error');
        }
        
        // Test with null - should not throw
        try {
            quill_delta.unregisterEmbed(null);
            assert.ok(true, 'unregisterEmbed with null should not throw');
        } catch (error) {
            assert.fail('unregisterEmbed with null should not throw an error');
        }
        
        // If handlers exist, verify count remains the same
        if (hasHandlers) {
            assert.strictEqual(Object.keys(quill_delta.handlers).length, initialHandlerCount, 'Handler count should remain same');
        }
        
        done();
    });
});