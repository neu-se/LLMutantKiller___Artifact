let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        let eventFired = false;
        let eventData = null;
        
        // Test that once() registers a listener that fires only once
        db.once('test-event', function(data) {
            eventFired = true;
            eventData = data;
            
            // Verify the event was fired with correct data
            assert.strictEqual(eventFired, true);
            assert.strictEqual(eventData, 'test-data');
            
            // Emit the event again to verify it only fires once
            db.em})    })
})