let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        let eventFired = false;
        
        // Test that once() registers a listener that fires only once
        db.once('test-event', function(data) {
            eventFired = true;
            assert.strictEqual(data, 'test-data');
            
            // Emit the event again to verify it doesn't fire twice
            db.em})    })
})