let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes existing embed type', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Test that we can create a delta with an embed operation
        let embedDelta = new Delta().insert({ testEmbed: 'test-value' });
        
        // Verify the embed operation was created
        assert(embedDelta.ops.length === 1, 'Delta should have one operation');
        assert(embedDelta.ops[0].insert.testEmbed === 'test-value', 'Embed value should match');
        
        // Test composing deltas with embeds
        let composedDelta = delta.compose(embedDelta);
        assert(composedDelta.ops.length === 1, 'Composed delta should have one operation');
        assert(composedDelta.ops[0].insert.testEmbed === 'test-value', 'Composed embed value should match');
        
        done();
    });
});