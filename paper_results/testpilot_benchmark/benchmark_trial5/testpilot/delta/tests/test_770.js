let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should throw error when handlers is undefined', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Ensure handlers is undefined
        delta.handlers = undefined;
        
        // Test that getHandler throws an error when handlers is undefined
        assert.throws(() => {
            delta.getHandler('video');
        }, /no handlers for embed type "video"/);
        done();
    });
    
    })