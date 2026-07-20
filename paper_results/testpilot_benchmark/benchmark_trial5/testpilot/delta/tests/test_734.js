let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed - multiple embed types', function(done) {
        let delta = new quill_delta();
        
        // Register multiple different embed types
        let imageHandler = function() { return 'image'; };
        let videoHandler = function() { return 'video'; };
        let linkHandler = function() { return 'link'; };
        
        delta.registerEmbed('image', imageHandler);
        delta.registerEmbed('video', videoHandler);
        delta.registerEmbed('link', linkHandler);
        
        // Verify all handlers are registered correctly
        assert.strictEqual(delta.handlers['image'], imageHandler);
        assert.strictEqual(delta.handlers['video'], videoHandler);
        assert.strictEqual(delta.handlers['link'], linkHandler);
        
        done();
    });

    })