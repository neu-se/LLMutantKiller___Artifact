let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        // Test 1: Add a listener and verify it's called
        let eventFired = false;
        db.addListener('test-event', function(data) {
            eventFired = true;
            assert.equal(data, 'test-data');
            done(); // Call done when the event is handled
        });
        
        // Emit the event to trigger the listener
        db.em    })
})