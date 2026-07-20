let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - remove non-existent listener', function(done) {
        let db = dirty();
        let callCount = 0;
        
        function testListener() {
            callCount++;
        }
        
        function nonExistentListener() {
            callCount += 10;
        }
        
        // Add one listener
        db.on('test-event', testListener);
        
        // Try to remove a listener that was never added
        db.removeListener('test-event', nonExistentListener);
        
        // Emit event to verify original listener still works
        db.em    })
})