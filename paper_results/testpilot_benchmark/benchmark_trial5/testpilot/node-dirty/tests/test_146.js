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
        });
        
        // Emit only one of the events
        db.em    })
})