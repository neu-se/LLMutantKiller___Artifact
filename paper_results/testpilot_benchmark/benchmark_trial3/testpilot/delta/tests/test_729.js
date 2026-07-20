let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with null handler', function(done) {
        // Test edge case with null handler
        assert.doesNotThrow(() => {
            quill_delta.registerEmbed('nullType', null);
        }, 'Should handle null handler gracefully');
        
        done();
    });

    })