let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - different event types', function(done) {
        let db = dirty();
        
        let event1Fired = false;
        let event2Fired = false;
        
        // Register once listeners for different events
        db.once('event1', function() {
            event1Fired = true;
        });
        
        db.once('event2', function() {
            event2Fired = true;
            // Check assertions and call done when we're finished
            assert.strictEqual(event1Fired, true, 'event1 should have fired');
            assert.strictEqual(event2Fired, true, 'event2 should have fired');
            done();
        });
        
        // Emit both events
        db.em    })
})