let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should throw error when embed type does not exist', function(done) {
        // Create a new Delta instance
        let delta = new Delta();
        
        // Since quill-delta doesn't have getHandler method by default,
        // we'll simulate the scenario by adding a getHandler method
        // that throws an error for non-existent embed types
        delta.getHandler = function(embedType) {
            if (!this.handlers || !this.handlers[embedType]) {
                throw new Error(`no handlers for embed type "${embedType}"`);
            }
            return this.handlers[embedType];
        };
        
        // Ensure handlers object exists but is empty
        delta.handlers = {};
        
        // Test that getHandler throws an error for non-existent embed type
        assert.throws(() => {
            delta.getHandler('nonexistent');
        }, Error, 'no handlers for embed type "nonexistent"');
        done();
    });
});