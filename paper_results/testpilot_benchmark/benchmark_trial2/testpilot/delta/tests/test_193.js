let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - basic registration', function(done) {
        // Test basic embed registration
        const embedType = 'testEmbed';
        const handler = function(node, delta) {
            return { insert: { [embedType]: node.getAttribute('data-value') } };
        };
        
        // Register the embed
        quill_delta.registerEmbed(embedType, handler);
        
        // Verify registration doesn't throw
        assert.ok(true, 'registerEmbed should complete without error');
        done();
    });

    })