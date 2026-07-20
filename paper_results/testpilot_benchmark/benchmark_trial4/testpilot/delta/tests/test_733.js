let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - overwrite existing handler', function(done) {
        let delta = new quill_delta();
        
        // Register first handler
        let firstHandler = function() { return 'first'; };
        delta.registerEmbed('test-type', firstHandler);
        
        // Register second handler for same type
        let secondHandler = function() { return 'second'; };
        delta.registerEmbed('test-type', secondHandler);
        
        // Verify the second handler overwrote the first
        assert.strictEqual(delta.handlers['test-type'], secondHandler);
        assert.notStrictEqual(delta.handlers['test-type'], firstHandler);
        
        done();
    });

    })