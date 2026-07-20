let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - unregister non-existent embed type', function(done) {
        // Try to unregister an embed type that doesn't exist
        // This should not throw an error
        try {
            quill_delta.unregisterEmbed('nonExistentEmbed');
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })