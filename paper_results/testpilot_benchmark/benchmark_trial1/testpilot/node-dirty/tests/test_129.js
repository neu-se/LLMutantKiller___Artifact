let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up an event listener to track calls
        db.on('load', function() {
            callCount++;
        });
        
        // Trigger the event or perform some operation
        // Since dirty emits 'load' when ready, we can listen for it
        db.on('load', function() {
            // Verify the listener was called
            assert.equal(callCount, 1);
            done();
        });
    });
});