let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - handler with null/undefined', function(done) {
        let delta = new quill_delta();
        
        // Register handler with null
        delta.registerEmbed('null-handler', null);
        assert.strictEqual(delta.handlers['null-handler'], null);
        
        // Register handler with undefined
        delta.registerEmbed('undefined-handler', undefined);
        assert.strictEqual(delta.handlers['undefined-handler'], undefined);
        
        done();
    });

    })