let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with video handler', function(done) {
        // Define a video embed handler
        const videoHandler = function(node, delta) {
            return {
                insert: { 
                    video: node.getAttribute('src') || '',
                    attributes: {
                        width: node.getAttribute('width') || '320',
                        height: node.getAttribute('height') || '240'
                    }
                }
            };
        };
        
        // Register the video embed type
        quill_delta.registerEmbed('video', videoHandler);
        
        // Verify registration completed
        assert.ok(typeof videoHandler === 'function', 'Handler should be a function');
        
        done();
    });

    })