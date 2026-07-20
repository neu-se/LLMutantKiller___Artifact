let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners - preserve other event listeners when removing specific event', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount1 = 0;
        let callCount2 = 0;
        let listener1 = () => { callCount1++; };
        let listener2 = () => { callCount2++; };
        
        // Add listeners for different events
        db.on('event1', listener1);
        db.on('event2', listener2);
        
        // Verify listeners are added
        assert.equal(db.listenerCount('event1'), 1);
        assert.equal(db.listenerCount('event2'), 1);
        
        // Remove listeners only for event1
        db.removeAllListeners('event1');
        
        // Verify only event1 listeners are removed
        assert.equal(db.listenerCount('event1'), 0);
        assert.equal(db.listenerCount('event2'), 1);
        
        // Emit both events
        db.em    })
})