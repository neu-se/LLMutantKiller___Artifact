let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        // Create a dirty database instance
        let db = dirty();
        let eventFired = false;
        
        // Set up event listener
        db.on('test-event', function(data) {
            eventFired = true;
            assert.strictEqual(data, 'second-data');
        });
            
        // Give a small delay to ensure the event handler doesn't fire again
        setTimeout(() => {
            assert.strictEqual(eventFired, true);
            done();
        }, 10);
        
        // Emit the event
        db.em    })
})