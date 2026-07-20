let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with undefined handler', function(done) {
        // Test edge case with undefined handler
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('undefinedType', undefined);
        }, 'Should handle undefined handler gracefully');
        
        done();
    });
});