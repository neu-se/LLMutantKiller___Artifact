let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners - preserve other event listeners when removing specific type', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount1 = 0;
        let callCount2 = 0;
        let listener1 = () => { callCount1++; };
        let listener2 = () => { callCount2++; };
        
        // Add listeners for different events
        db.on('keepEvent', listener1);
        db.on('removeEvent', listener2);
        db.on('removeEvent', listener2); // Add another listener to same event
        
        // Verify listeners are added
        assert.equal(db.listenerCount('keepEvent'), 1);
        assert.equal(db.listenerCount('removeEvent'), 2);
        
        // Remove all listeners for 'removeEvent' only
        db.removeAllListeners('removeEvent');
        
        // Verify only 'removeEvent' listeners are removed
        assert.equal(db.listenerCount('keepEvent'), 1);
        assert.equal(db.listenerCount('removeEvent'), 0);
        
        // Emit events to verify behavior
        db.em    })
})