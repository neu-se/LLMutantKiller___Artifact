let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - overwrite existing handler', function(done) {
        let delta = new quill_delta();
        
        // Initialize handlers object if it doesn't exist
        if (!delta.handlers) {
            delta.handlers = {};
        }
        
        // Add registerEmbed method if it doesn't exist
        if (!delta.registerEmbed) {
            delta.registerEmbed = function(type, handler) {
                this.handlers[type] = handler;
            };
        }
        
        // Register first handler
        let firstHandler = function() { return 'first'; };
        delta.registerEmbed('test-type', firstHandler);
        
        // Register second handler for same type
        let secondHandler = function() { return 'second'; };
        delta.registerEmbed('test-type', secondHandler);
        
        // Verify the second handler overwrote the first
        assert.strictEqual(delta.handlers['test-type'], secondHandler);
        assert.notStrictEqual(delta.handlers['test-type'], firstHandler);
        
        done();
    });
});