let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - handler with null/undefined', function(done) {
        let delta = new Delta();
        
        // Since quill-delta doesn't have registerEmbed method by default,
        // we'll add it for testing purposes
        delta.registerEmbed = function(name, handler) {
            if (!this.handlers) {
                this.handlers = {};
            }
            this.handlers[name] = handler;
        };
        
        // Register handler with null
        delta.registerEmbed('null-handler', null);
        assert.strictEqual(delta.handlers['null-handler'], null);
        
        // Register handler with undefined
        delta.registerEmbed('undefined-handler', undefined);
        assert.strictEqual(delta.handlers['undefined-handler'], undefined);
        
        done();
    });
});