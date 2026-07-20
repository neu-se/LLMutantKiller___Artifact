let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - empty string embed type', function(done) {
        let delta = new quill_delta();
        
        let handler = function() { return 'empty'; };
        delta.registerEmbed('', handler);
        
        // Verify handler is registered with empty string key
        assert.strictEqual(delta.handlers[''], handler);
        
        done();
    });
});