let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles undefined/null embed type', function(done) {
        const initialHandlerCount = Object.keys(quill_delta.handlers).length;
        
        // Test with undefined
        quill_delta.unregisterEmbed(undefined);
        assert.strictEqual(Object.keys(quill_delta.handlers).length, initialHandlerCount, 'Handler count should remain same with undefined');
        
        // Test with null
        quill_delta.unregisterEmbed(null);
        assert.strictEqual(Object.keys(quill_delta.handlers).length, initialHandlerCount, 'Handler count should remain same with null');
        
        done();
    });
});