let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - handles non-existent embed type gracefully', function(done) {
        // Try to unregister a non-existent embed type
        const initialHandlerCount = Object.keys(quill_delta.handlers).length;
        
        quill_delta.unregisterEmbed('nonExistentEmbed');
        
        // Verify handlers object is unchanged
        const finalHandlerCount = Object.keys(quill_delta.handlers).length;
        assert.strictEqual(initialHandlerCount, finalHandlerCount, 'Handler count should remain the same');
        
        done();
    });

    })