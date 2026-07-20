let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - fires only once', function(done) {
        let db = dirty();
        
        let callCount = 0;
        
        // Register a once listener
        db.once('test-event', function() {
            callCount++;
        });
        
        // Emit the event multiple times
        db.em    })
})