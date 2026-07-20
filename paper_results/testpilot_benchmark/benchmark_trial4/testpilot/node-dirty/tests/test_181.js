let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        // Create a dirty database instance
        let db = dirty();
        let eventFired = false;
        
        // Set up event listener
        db.on('load', function() {
            eventFired = true;
        });
        
        // Give a small delay to ensure the event doesn't fire again
        setTimeout(() => {
            assert.strictEqual(eventFired, true);
            done();
        }, 10);
        
        // Emit the event or trigger it
        db.em    })
})