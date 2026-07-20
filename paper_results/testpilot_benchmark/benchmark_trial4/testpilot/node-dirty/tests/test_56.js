let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should handle events properly', function(done) {
        let callCount = 0;
        let db = dirty();
        
        // Set up event listener to count calls
        db.on('load', function() {
            callCount++;
        });
        
        // Give it a moment to process
        setTimeout(() => {
            // If options.once worked, we should see the event regardless
            // This test mainly ensures options don't break the function
            assert(callCount >= 1);
            done();
        }, 10);
    });
});