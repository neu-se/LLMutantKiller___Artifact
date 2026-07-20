let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with undefined handler should not throw', function(done) {
        // Test registering with undefined handler
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('undefinedtest', undefined);
        });
        
        done();
    });
});