let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        // Test 1: Remove a listener that was added
        let callCount = 0;
        function testListener() {
            callCount++;
        }
        
        // Add the listener
        db.on('test-event', testListener);
        
        // Verify listener is added by emitting event
        db.em    })
})