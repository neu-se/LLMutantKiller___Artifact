let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - should handle non-existent embed type', function(done) {
        // Try to unregister an embed type that doesn't exist
        assert.doesNotThrow(() => {
            quill_delta.unregisterEmbed('nonExistentEmbed');
        });
        
        done();
    });

    })