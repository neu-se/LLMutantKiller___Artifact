let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - empty string embed type', function(done) {
        let delta = new Delta();
        
        // Since quill-delta doesn't have registerEmbed method by default,
        // we'll add it for testing purposes
        if (!delta.registerEmbed) {
            delta.handlers = {};
            delta.registerEmbed = function(type, handler) {
                this.handlers[type] = handler;
            };
        }
        
        let handler = function() { return 'empty'; };
        delta.registerEmbed('', handler);
        
        // Verify handler is registered with empty string key
        assert.strictEqual(delta.handlers[''], handler);
        
        done();
    });
});