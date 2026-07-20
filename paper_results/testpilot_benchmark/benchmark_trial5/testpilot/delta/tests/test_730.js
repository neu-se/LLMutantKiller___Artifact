let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with null handler should not throw', function(done) {
        // Test registering with null handler
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('nulltest', null);
        });
        
        done();
    });

    })