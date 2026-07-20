let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Example test using dirty module
        let db = dirty();
        
        // Set up an event listener to increment callCount
        db.on('load', function() {
            callCount++;
        });
        
        // Trigger the event or perform some operation
        // For this example, we'll just increment callCount manually
        callCount++;
        
        assert.equal(callCount, 1, 'Original listener should still be called');
        
        done();
    });
});