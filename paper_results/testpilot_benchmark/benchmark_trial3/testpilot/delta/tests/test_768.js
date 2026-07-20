let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should throw error when embed type does not exist', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Ensure handlers object exists but is empty
        delta.handlers = {};
        
        // Test that getHandler throws an error for non-existent embed type
        assert.throws(() => {
            delta.getHandler('nonexistent');
        }, Error, 'no handlers for embed type "nonexistent"');
        done();
    });
    
    })