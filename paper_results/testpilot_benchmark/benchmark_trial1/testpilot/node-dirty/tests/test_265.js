let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let eventFired = false;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up an event listener to test if events are fired
        db.on('load', function() {
            eventFired = true;
        });
        
        // Trigger the load event or perform some operation
        // Since dirty fires 'load' event when ready, we can listen for it
        db.on('load', function() {
            assert.strictEqual(eventFired, true, 'Event should have been fired');
            done();
        });
    });
});